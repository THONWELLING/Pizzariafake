let cart = []
let modalQt = 1
let modalKey = 0

const c = (e) => document.querySelector(e)
const cs = (e) => document.querySelectorAll(e)

//Listagem Das Pizzas
pizzaJson.map((item, index) => {
  let PizzaItem = document.querySelector('.models .pizzaItem').cloneNode(true)
  
  PizzaItem.setAttribute('dataKey', index)
  PizzaItem.querySelector('.pizzaItemImg img').src = item.img
  PizzaItem.querySelector('.pizzaItemPrice').innerHTML = `R$ ${item.price.toFixed(2)}`
  PizzaItem.querySelector('.pizzaItemName').innerHTML = item.name
  PizzaItem.querySelector('.pizzaItemDesc').innerHTML = item.description
  PizzaItem.querySelector('a').addEventListener('click', (e) => {
    e.preventDefault()
    let key = e.target.closest('.pizzaItem').getAttribute('dataKey')
    modalQt = 1
    modalKey = key

    c('.pizzaBig img').src = pizzaJson[key].img
    c('.pizzaInfo h1').innerHTML = pizzaJson[key].name
    c('.pizzaInfoDesc').innerHTML = pizzaJson[key].description
    c('.pizzaInfoActualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`
    c('.pizzaInfoSize.selected').classList.remove('selected')
    cs('.pizzaInfoSize').forEach((size, sizeIndex) => {
      if(sizeIndex == 2) {
        size.classList.add('selected')
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })
    c('.pizzaInfoQt').innerHTML = modalQt

    c('.pizzaWindowArea').style.opacity = 0
    c('.pizzaWindowArea').style.display = "flex"
    setTimeout(()=> {
      c('.pizzaWindowArea').style.opacity = 1
    }, 200)
  })

  document.querySelector('.pizzaArea').append( PizzaItem )
})

// eventos relacionados ao modal

const closeModal =()=> {
  c('.pizzaWindowArea').style.opacity = 0
    setTimeout(()=> {
      c('.pizzaWindowArea').style.display = 'none'
    }, 200)
}
cs('.pizzaInfoCancelButton, .pizzaInfoCancelMobileButton').forEach((item) => {
  item.addEventListener('click', closeModal)
})

//lidando com a adição e a subtração da quantidade de pizzas

c('.pizzaInfoQtmenos').addEventListener('click', () => {
  if(modalQt > 1) {
  modalQt--
  c('.pizzaInfoQt').innerHTML = modalQt
  }
})
c('.pizzaInfoQtmais').addEventListener('click', () => {
  modalQt++
  c('.pizzaInfoQt').innerHTML = modalQt
  if(modalQt != 1){
    c('.cartArea').innerHTML
  }
})


//Lidando com os tamanhos das pizzas

 cs('.pizzaInfoSize').forEach((size, sizeIndex) => {
  size.addEventListener('click', (e) => {
    c('.pizzaInfoSize.selected').classList.remove('selected')
    size.classList.add('selected')
  })
})

//Adicionando ao Carrinho 

c('.pizzaInfoAddButton').addEventListener('click', () => {
  let size = parseInt(c('.pizzaInfoSize.selected').getAttribute('data-key'))
  let identifier = pizzaJson[modalKey].id + '&' + size
  let key = cart.findIndex((item) => item.identifier == identifier) 
  if(key > -1) {
    cart[key].qt += modalQt
  }else{
    cart.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size,
      qt: modalQt
    })
  }
  updateCart()
  closeModal()
})


c('.menuOpenner').addEventListener('click', () => {
  if(cart.length > 0) {
    c('aside').style.left = '0'
  }
})
c('.menuCloser').addEventListener('click', () => {
  c('aside').style.left = '100vw'
})
const updateCart =()=> {
  c('.menuOpenner').innerHTML = cart.length
  if(cart.length > 0) {
    c('aside').classList.add('show')
    c('.cart').innerHTML = ''

    let subtotal = 0
    let discount = 0
    let total = 0

    for(let i in cart) {
      let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id)
      subtotal += pizzaItem.price * cart[i].qt

      let cartItem = c('.models .cartItem').cloneNode(true)
      let pizzaSizeName
      switch(cart[i].size) {
        case 0:
          pizzaSizeName = 'Pequena'
        break
        case 1:
          pizzaSizeName = "Média"
        break
        case 2:
          pizzaSizeName = "Grande"
        break
      }
      let pizzaData = `${pizzaItem.name} (${pizzaSizeName})`

      cartItem.querySelector('img').src = pizzaItem.img
      cartItem.querySelector('.cartItemNome').innerHTML = pizzaData
      cartItem.querySelector('.cartItemQt').innerHTML = cart[i].qt
      cartItem.querySelector('.cartItemQtmenos').addEventListener('click', () => {
        if(cart[i].qt > 1 ) {
          cart[i].qt--
        } else {
          cart.splice(i, 1)
        }
        updateCart()
      })
      cartItem.querySelector('.cartItemQtmais').addEventListener('click', () => {
        cart[i].qt++
        updateCart()
      })
      
      c('.cart').append(cartItem)
    }
      desconto = subtotal * 0.1
      total = subtotal - desconto
      c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
      c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
      c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`
  }else{
    c('aside').classList.remove('show')
    c('aside').style.left = '100vw'

  }
}