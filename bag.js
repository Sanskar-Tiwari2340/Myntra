const CONVENIENCE_FEES = 99;
let BagItemObjects;

onLoad();

function onLoad(){
    loadBagItemsObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}

function displayBagSummary(){
    let bagSummaryElement = document.querySelector(".bag-summary");
    let totalItem = BagItemObjects.length;
    let totalMRP = 0;
    let totalDiscount = 0;

    BagItemObjects.forEach(bagItem => {
        totalMRP += bagItem.original_price;
        totalDiscount += bagItem.original_price - bagItem.current_price;
    });

    let convenienceFee = totalItem > 0 ? CONVENIENCE_FEES : 0;
    let finalPayment = totalMRP - totalDiscount + convenienceFee;

    bagSummaryElement.innerHTML = `<div class="bag-details-container">
            <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
            <div class="price-item">
              <span class="price-item-tag">Total MRP</span>
              <span class="price-item-value"> Rs ${totalMRP} </span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Discount on MRP</span>
              <span class="price-item-value priceDetail-base-discount">-Rs ${totalDiscount}</span>
            </div>
            <div class="price-item">
              <span class="price-item-tag">Convenience Fee</span>
              <span class="price-item-value">Rs ${convenienceFee}</span>
            </div>
            <hr>
            <div class="price-footer">
              <span class="price-item-tag">Total Amount</span>
              <span class="price-item-value">Rs ${finalPayment}</span>
            </div>
          </div>
          <button class="btn-place-order">
            <div class="place-order-btn">PLACE ORDER</div>
          </button>`;
}

function loadBagItemsObjects(){
    // ✅ Load bagItems from localStorage first
    bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];

    console.log(bagItems);
    BagItemObjects = bagItems.map(itemId => {
        for(let i=0; i<items.length; i++){
            if(itemId == items[i].id){
                return items[i];
            }
        }
    });
    console.log(BagItemObjects);
}


function displayBagItems() {
    let containerElement = document.querySelector('.bag-items-container');
    let emptyBagElement = document.getElementById('emptyBag');
    let bagSummaryElement = document.querySelector('.bag-summary'); // ✅ Price summary

    if (BagItemObjects.length === 0) {
        containerElement.style.display = 'none'; // ✅ Hide items container
        bagSummaryElement.style.display = 'none'; // ✅ Hide price summary
        emptyBagElement.style.display = 'block';  // Show empty bag UI
    } else {
        let innerHTML = '';
        BagItemObjects.forEach(bagItem => {
            innerHTML += generateItemHTML(bagItem);
        });
        containerElement.innerHTML = innerHTML;
        containerElement.style.display = 'block'; // Show items container
        bagSummaryElement.style.display = 'block'; // Show price summary
        emptyBagElement.style.display = 'none';   // Hide empty bag UI
    }
}


function displayBagIcon(){
    document.querySelector('.bag_item_count').innerText = bagItems.length;
}


function generateItemHTML(item){
    return `<div class="bag-item-container">
            <div class="item-left-part">
              <img class="bag-item-img" src="${item.image}">
            </div>
            <div class="item-right-part">
              <div class="company">${item.company}</div>
              <div class="item-name">${item.item_name}</div>
              <div class="price-container">
                <span class="current-price">Rs ${item.current_price}</span>
                <span class="original_price">Rs ${item.original_price}</span>
                <span class="discount_percentage">(${item.discount_percentage}% OFF)</span>
              </div>
              <div class="return-period">
                <span class="return-period-days">${item.return_period} days</span> return available
              </div>
              <div class="delivery-details">
                Delivery by
                <span class="delivery-details-days">${item.delivery_date}</span>
              </div>
            </div>

            <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
          </div>`;
}

function removeFromBag(itemId){
    bagItems = bagItems.filter(bagItemId => bagItemId != itemId);
    localStorage.setItem('bagItems',JSON.stringify(bagItems));
    loadBagItemsObjects();
    displayBagIcon();
    displayBagItems();
    displayBagSummary();
}