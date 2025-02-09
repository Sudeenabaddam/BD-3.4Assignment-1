const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;
let cors = require('cors');
app.use(cors());
let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];
function addToCart(cart,productId, name, price, quantity ){
  cart.push({productId, name, price, quantity});
  return cart;
}
app.get('/cart/add',(req,res)=>{
  let productId=parseInt(req.query.productId);
  let name=req.query.name;
  let price=parseInt(req.query.price);
  let quantity=parseInt(req.query.quantity);
  let result=addToCart(cart,productId, name, price, quantity);
  res.json(result);
});
app.get('/cart/edit', (req, res) => {
  let { productId, quantity } = req.query;
  productId = parseInt(productId);
  quantity = parseInt(quantity);
  let item = cart.find(item => item.productId === productId);
  if (item) {
    item.quantity = quantity;
    return res.json({ cartItems: cart });
  } else {
    return res.status(404).json({ message: 'Item not found in cart' });
  }
});
app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  cart = cart.filter(item => item.productId !== productId);
  res.json({ cartItems: cart});
});
app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});
function calculateTotalQuantity(cart){
  let totalQuantity = 0;

  for (let i = 0; i < cart.length; i++) {
    totalQuantity += cart[i].quantity;
  }
  return totalQuantity;
}
app.get('/cart/total-quantity',(req,res)=>{
  let result=calculateTotalQuantity(cart);
  res.json({totalQuantity:result});
});
function calculateTotalPrice(cart){
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}
app.get('/cart/total-price',(req,res)=>{
  let result=calculateTotalPrice(cart);
  res.json({totalPrice:result});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
