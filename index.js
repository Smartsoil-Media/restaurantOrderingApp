import {menuArray} from "./data.js"
let myOrder = []
    
document.addEventListener('click', function(e) {
  handleGetItem(e.target.dataset);
  handleRemoveItem(e.target);
})

function getTotalOrderAmount() {
  let totalAmount = 0
  myOrder.forEach(function(item){
    totalAmount += item.price;
  }); return totalAmount
}

function handleGetItem(data) {
  let selectedItem = ''
  menuArray.forEach(function (item) {
    if (item.id === parseInt(data.add)) {
      selectedItem = item;
      myOrder.push(selectedItem)
      render()
    } 
  })
}

function handleRemoveItem(target) {
  if (target.classList.contains('remove-btn')) {
    const orderItem = target.closest('.indi-order-item');
    const orderNumber = orderItem.dataset.orderNumber;
    console.log(`Removing item at index ${orderNumber}`);
    myOrder.splice(orderNumber, 1);
    render();
  }
}

// function handleRemoveItem(target) {
//   console.log(target)
//   // if (target.parentElement.parentElement.id === 'indi-order-item')
//   // target.parentElement.parentElement.remove()
// }


function getFeedHtml() {
  let feedHtml = ''
  menuArray.forEach(function(item) {
    feedHtml += `
      <div class="single-item-container data-id=${item.id} flex">
        <div class="emoji">
          <p> ${item.emoji} </p>
        </div>
        <div class="item-desc flex-col">
          <h2 class="item-name">${item.name}</h2>
          <p class="item-ingred italic "> ${item.ingredients.join(", ")} </p>
          <p class="item-price"> $${item.price} </p>
        </div>
        <div id="button-container">
          <button class="add-btn" data-add="${item.id}"> + </button>
        </div>
      </div>
      <div class="page-break"></div>
    `
  }); return feedHtml
}

function getOrderHtml() {
  let numOfItems = 0
  let totalOrderAmount = getTotalOrderAmount();
  document.getElementById('total-amount').innerHTML = "$" + totalOrderAmount
  let orderHtml = ''
  myOrder.forEach(function(item){
    orderHtml += 
      `
      <div class="indi-order-item" data-order-number="${numOfItems}" id="indi-order-item">
        <div class="order-name-and-price  flex">
          <h2 class="ordered-item-title"> ${item.name} </h2>
          <button class="remove-btn italic" data-order-number="${numOfItems}"> remove </button>
        </div>
        <div class="ordered-price-container">
          <h2 class="ordered-item-price"> $${item.price} </h2>
        </div>
      </div>
      `
      numOfItems++

  });

  let orderContainer = document.getElementById('order-container')
  orderContainer.innerHTML = orderHtml


  return orderHtml
}

function render() {
  let feedHtml = getFeedHtml()
  let menuContainer = document.getElementById('menu-contianer')
  menuContainer.innerHTML = feedHtml

  let orderHtml = getOrderHtml()
}

// function handleRemoveItem(target) {
//   if (target.classList.contains('remove-btn')) {
//     const orderItem = target.closest('.indi-order-item');
//     console.log(orderItem)
//     myOrder.pop(orderItem);
//     render();
//   }
// }

render()
