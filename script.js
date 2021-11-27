const c = (e) => document.querySelector(e)
const cs = (e) => document.querySelectorAll(e)

pizzaJson.map((item, index) => {
  let PizzaItem = document.querySelector('.models .pizzaItem').cloneNode(true)
  
  PizzaItem.querySelector('.pizzaItemImg img').src = item.img
  
  PizzaItem.querySelector('.pizzaItemPrice').innerHTML = `R$ ${item.price.toFixed(2)}`
  PizzaItem.querySelector('.pizzaItemName').innerHTML = item.name
  PizzaItem.querySelector('.pizzaItemDesc').innerHTML = item.description

  document.querySelector('.pizzaArea').append( PizzaItem )
})