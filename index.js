import {menuArray} from "./data.js"
let myOrder = []
    
document.addEventListener('click', function(e) {
    handleGetItem(e.target.dataset)
 
})

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
                <div>
                    <button class="add-btn" data-add="${item.id}"> + </button>
                </div>
            </div>
            <div class="page-break"></div>
            `
    }); return feedHtml
}

function getOrderHtml() {
    let orderHtml = ''
    myOrder.forEach(function(item){
        orderHtml += 
            `
            <h1> ${item.name} </h1>
            <h1> ${item.price} </h1>
            `
    }); return orderHtml 
}

function render() {
    let feedHtml = getFeedHtml()
    let menuContainer = document.getElementById('menu-contianer')
    menuContainer.innerHTML = feedHtml

    let orderhtml = getOrderHtml()
    let orderContainer = document.getElementById('order-container')
    orderContainer.innerHTML = orderhtml

}

render()










// forEach item clicked add it the myOrder

//Render myOrder the the orderHtml

//remove my order

//Pop up payment detail on 

