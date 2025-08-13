// Get bagItems from localStorage or create new array
let bagItems = JSON.parse(localStorage.getItem('bagItems')) || [];

// Function to show bag count in header
function displayBagIcon() {
    let bagItemCountElement = document.querySelector('.bag_item_count');
    if (bagItems.length > 0) {
        bagItemCountElement.style.visibility = "visible";
        bagItemCountElement.innerText = bagItems.length;
    } else {
        bagItemCountElement.style.visibility = "hidden";
    }
}

// Called on page load
function onLoad() {
    displayItemsOnHomePage();
    displayBagIcon();
}

// Renders all items and buttons
function displayItemsOnHomePage() {
    let itemsContainerElement = document.querySelector(".items_container");
    if (!itemsContainerElement) return;

    let innerHtml = '';

    items.forEach(item => {
        const isInBag = bagItems.includes(item.id);

        innerHtml += `<div class="item_container">
                <img class="item_image" src="${item.image}" alt="item image">
                <div class="rating">${item.rating.stars} ⭐ | ${item.rating.count}</div>
                <div class="company_name">${item.company}</div>
                <div class="item_name">${item.item_name}</div>
                <div class="price">
                    <span class="current_price">Rs ${item.current_price}</span>
                    <span class="original_price">Rs ${item.original_price}</span>
                    <span class="discount_percentage">(${item.discount_percentage}% OFF)</span>
                </div>
                <button class="btn_add_to_bag"
                    data-id="${item.id}"
                    onclick="addToBag('${item.id}')"
                    ${isInBag ? 'disabled' : ''}
                    style="${isInBag ? 'background-color: #ccc; cursor: not-allowed;' : ''}">
                    ${isInBag ? 'Added' : 'Add to Bag'}
                </button>
            </div>`;
    });

    itemsContainerElement.innerHTML = innerHtml;
}

// Add item to bag and update UI
function addToBag(itemId) {
    if (!bagItems.includes(itemId)) {
        bagItems.push(itemId);
        localStorage.setItem('bagItems', JSON.stringify(bagItems));
        displayBagIcon();

        // ✅ Change button label & style immediately
        const button = document.querySelector(`.btn_add_to_bag[data-id="${itemId}"]`);
        if (button) {
            button.innerText = "Added";
            button.disabled = true;
            button.style.backgroundColor = "#ccc";
            button.style.cursor = "not-allowed";
        }
    }
}
