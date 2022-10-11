const elPhonesBody = document.querySelector("#phones-wrapper");
const elPhonesTemplate = document.querySelector("#phones-template");

// ==== date ====

const getDateText = function (date) {
    const pastDate = new Date(date);
    return `${pastDate.getDate()}-${pastDate.getMonth()}-${pastDate.getFullYear()}  
    ${pastDate.getHours()}:${pastDate.getMinutes()}`;
};

const elModal = new bootstrap.Modal(
    document.querySelector("#edit-student-modal")
  );

const renderPhones = function(showingProduct = products) {
    elPhonesBody.innerHTML = "";
    showingProduct.forEach(function (product) {
        const elPhonesCard = elPhonesTemplate.cloneNode(true).content;
        
        const { title, img, price, model, benefits, id, addedDate } = product;
        
        const elImgCard = elPhonesCard.querySelector(".card-img-top");
        elImgCard.src = img;
        
        const elTitleCard = elPhonesCard.querySelector(".card-title");
        elTitleCard.textContent = title;
        
        const elCardText = elPhonesCard.querySelector(".mark");
        elCardText.textContent = `UZS ${price}`;
        
        const elPriceCard = elPhonesCard.querySelector(".bg-success");
        elPriceCard.textContent = model;
        
        const elDeleteButton = elPhonesCard.querySelector(".deleted-product");
        elDeleteButton.dataset.id = id;

        const elEditButton = elPhonesCard.querySelector(".edit-product");
        elEditButton.dataset.id = id;

        const elCardDate = elPhonesCard.querySelector(".product-date");
        elCardDate.textContent = getDateText(addedDate)
        
        let elListBenefit = elPhonesCard.querySelector(".benefit-list");

        for (let i = 0; i < benefits.length; i++) {
            const benefit = benefits[i];
        
            const elItemBenefit = document.createElement("li");
            elItemBenefit.classList.add("me-1", "mb-1", "badge", "bg-primary");
            elItemBenefit.textContent = benefit;
            
            elListBenefit.append(elItemBenefit);
        };


        elPhonesBody.append(elPhonesCard);
    });
};

renderPhones();


// ============= DELETED-CORPS and EDIT-CORPS ==============


const elProductForm = document.querySelector(".product-form");

const elProductTitle = document.querySelector("#editproductModalTitle");
const elProductButton = document.querySelector(".product-button");
const elAddModal = document.querySelector(".product-add")

const setFormsValue = ({ title, price, model, benefits }, type) => {
     
    const {
        title: elNameInput,
        price: elPriceName,
        manufacturer: elModel,
        benefits: elBenefit, 
    } = elProductForm.elements;

    elNameInput.value = title || "";
    elPriceName.value = price || "";
    elModel.value = model || "";
    elBenefit.value = benefits || "";

    elProductTitle.textContent = type;
    elProductButton.textContent = type;
};


// ============= ADD-PRODUCT =========


elAddModal.addEventListener("click", () => {
    elProductTitle.textContent = "Add Product";
    elProductButton.textContent = "Add Product";
  
    elProductForm.dataset.type = "add";

    setFormsValue({}, "Add Product");
    elProductForm.dataset.editingId = "";
});

elPhonesBody.addEventListener("click", function(evt) {
    if (evt.target.matches(".deleted-product")) {
        const id = +evt.target.dataset.id;
        
        const deletedIndex = products.findIndex((product) => product.id === id);
        products.splice(deletedIndex, 1);
        renderPhones();
    }
    
    if (evt.target.matches(".edit-product")) {
        const clickedProductId = +evt.target.dataset.id;
        const clickedProduct = products.find((product) => {
            return product.id === clickedProductId;
        });

       setFormsValue(clickedProduct, "Edit product")
       elProductForm.dataset.type = "edit";
       elProductForm.dataset.editingId = clickedProductId;
    };
    
});

// ============== MANUFACTURERS =============


const elProductManufacturer = elProductForm.querySelector("#manufacturer");

manufacturers.forEach(function (manufacturer) {
    
    const elManufacturerOption = document.createElement("option");
    elManufacturerOption.textContent = manufacturer.name;
    
    elProductManufacturer.appendChild(elManufacturerOption);
});


const elNewPrice = document.querySelector("#price");
const elNewBenefits = document.querySelector("#benefits");
const elNewTitle = document.querySelector("#title");



// ============ FORM-LISTENER =========


elProductForm.addEventListener("submit", function(evt) {
    evt.preventDefault();

    
    const target = evt.target;
    const formType = target.dataset.type;
    
    if (formType === "edit") {
        const editingProductId = +target.dataset.editingId;
        const editingProductIndex = products.findIndex(function (product) {
            return product.id === editingProductId;
        });

        console.log(editingProductIndex);
        const {
            title: elTitleInput,
            price: elPriceName,
            manufacturer: elModel,
            benefits: elBenefit, 
        } = elProductForm.elements;
        
        products.splice(editingProductIndex, 1, {
            id: editingProductId,
            title: elTitleInput.value,
            img: "https://picsum.photos/id/3/300/200",
            price: elPriceName.value,
            model: elModel.value,
            addedDate: new Date().toISOString(), 
            benefits: elBenefit.value,
        });
        
        renderPhones();
    } else if (formType === "add") {
        
        const titleValue = elNewTitle.value;
        const priceValue = elNewPrice.value;
        const modelValue = elProductManufacturer.value;
        const benefitsValue = elNewBenefits.value;


        const newPhones = {
            img: "https://picsum.photos/id/3/300/200",
            title: titleValue,
            price: priceValue,
            model: modelValue,
            benefits: benefitsValue,
            addedDate: new Date().toISOString(),
        };
        
        products.push(newPhones);
        renderPhones();
    }

    elModal.hide();
});

// =============== FILTER-CORPS ==============


const elFilterForm = document.querySelector("#filter-form");

const elFiltertManufacturer = elFilterForm.querySelector("#manufacturer");

manufacturers.forEach(function (manufacturer) {
    
    const elManufacturerOption = document.createElement("option");
    elManufacturerOption.textContent = manufacturer.name;
    
    elFiltertManufacturer.appendChild(elManufacturerOption);
});

elFilterForm.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const {
      search: { value: searchValue},
      from: { value: fromValue},
      to: { value: toValue},
      manufacturer: { value: manufacturerValue},
      sortby: { value: sortByValue}
    } = elFilterForm.elements

    const filterProducts = products.filter((product) => {
        return (
            `${product.title}`
            .toLowerCase()
            .trim()
            .includes(searchValue.trim().toLowerCase()) &&
            product.price >= +fromValue && (+toValue ? product.price <= +toValue : true) &&
           product.model === manufacturerValue
          );

        });
        filterProducts.sort((a, b) => {
            switch (+sortByValue) {
              case 1:
                if (a.title > b.title) {
                  return 1;
                } else if (a.title < b.title) {
                  return -1;
                }
                return 0;
              case 2:
                return b.price - a.price;
              case 3:
                return a.pr - b.price;
              default:
                return 0;
            }
        });

    renderPhones(filterProducts);
    console.log(filterProducts);
}) 