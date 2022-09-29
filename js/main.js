const elPhonesBody = document.querySelector("#phones-wrapper");
const elPhonesTemplate = document.querySelector("#phones-template");


const renderPhones = function() {
    products.forEach(function (product) {
        const elPhonesCard = elPhonesTemplate.cloneNode(true).content;

        const { title, img, price, model, benefits } = product;

        const elImgCard = elPhonesCard.querySelector(".card-img-top");
        elImgCard.src = img;

       const elTitleCard = elPhonesCard.querySelector(".card-title");
       elTitleCard.textContent = title;

       const elCardText = elPhonesCard.querySelector(".mark");
       elCardText.textContent = `UZS ${price}`;

       const elPriceCard = elPhonesCard.querySelector(".bg-success");
       elPriceCard.textContent = model;


    //    const elListBenefit = document.querySelector(".benefit-list");
       
    //    benefits.forEach(function (benefit) {
           
    //        const elItemBenefit = document.createElement("li");
    //        elItemBenefit.classList.add("me-1", "mb-1", "badge", "bg-primary");
    //        elItemBenefit.textContent = benefit;
           
    //     //    elListBenefit.append(elItemBenefit);
    //     });
        
        elPhonesBody.append(elPhonesCard);
    });
};

renderPhones();

// ============== MANUFACTURERS =============


const elNewTitle = document.querySelector("#product-title");
const elProductManufacture = document.querySelector("#product-manufacturer");

manufacturers.forEach(function (manufacturer) {

    const elManufacturerOption = document.createElement("option");
    elManufacturerOption.textContent = manufacturer.name;
    
    elProductManufacture.appendChild(elManufacturerOption);
});

// ============= ADD-PRODUCT =========

const elAddForm = document.querySelector(".product-form");


elAddForm.addEventListener("submit", function(evt) {
    evt.preventDefault();
    

    const elNewPrice = document.querySelector("#product-price");
    // const elNewModel = document.querySelector("#product-manufacture");
    const elNewBenefits = document.querySelector("#product-benefits")
 
   
    const titleValue = elNewTitle.value;
    const priceValue = elNewPrice.value;
    const modelValue = elProductManufacture.value;
    const benefitsValue = elNewBenefits.value;

    console.log(titleValue);

    const newPhones = {
        img: "https://picsum.photos/300/200",
        title: titleValue,
        price: priceValue,
        model: modelValue,
        benefits: benefitsValue
    };


    products.push(newPhones);
    elPhonesBody.innerHTML = "";
    renderPhones();
});