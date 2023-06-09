import {menuArray} from "./data.js"
let myOrder = []
const orderBtn = document.getElementById('order-btn')
const orderSummary = document.getElementById('order-summary')
    
document.addEventListener('click', function(e) {
  handleGetItem(e.target.dataset);
  handleRemoveItem(e.target);
})

document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault();
  document.getElementById('pop-up').classList.toggle('hidden')
  document.getElementById('dynamic').classList.toggle('hidden')
  document.getElementById('thankyou-msg').classList.toggle('hidden')
  let msgEl = document.getElementById('thank-you-text')
  let formEl = document.querySelector('form')
  msgEl.innerHTML = `Thak you so much,  ${formEl.name.value}! `
  orderSummary.innerHTML = getSummaryHtml()
  let totalCost = getTotalOrderAmount()
  document.getElementById('final-amount').innerHTML = "$" + totalCost
});


orderBtn.addEventListener('click', function() {
  handleOpenPopUp() 
})

function handleOpenPopUp() {
  if (myOrder.length > 0) {
document.getElementById('pop-up').classList.toggle('hidden')
  }
} 

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
//   myOrder.forEach(function(item, index) {
//     if (item.id === parseInt(target.dataset.orderNumber)) {
//       console.log(`Removing item at index ${index}`);
//       myOrder.splice(index, 1);
//       render();
//     }
//   });
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

function getSummaryHtml() {
  let totalOrderAmount = getTotalOrderAmount();
  document.getElementById('total-amount').innerHTML = "$" + totalOrderAmount
  let orderHtml = ''
  myOrder.forEach(function(item){
    orderHtml += 
      `
      <div class="summary-order-item" data-order-number="${item.id}" id="indi-order-item">
        <div class="order-name-and-price  flex">
          <h2 class="ordered-item-title"> ${item.name} </h2>
        </div>
        <div class="ordered-price-container">
          <h2 class="ordered-item-price"> $${item.price} </h2>
        </div>
      </div>
      `

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


render()
