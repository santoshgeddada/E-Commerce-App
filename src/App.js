import {Component} from 'react'
import {Route, Routes,Navigate} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import ErrorBoundary from './components/ErrorBoundary'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }


  incrementCartItemQuantity = (id, increment) => {
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.map(eachProduct => {
          if (id === eachProduct.id) {
            return {...eachProduct, quantity: eachProduct.quantity + increment}
          }
          return {...eachProduct}
        }),
      ],
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.map(eachProduct => {
          if (id === eachProduct.id) {
            if (eachProduct.quantity === 1) {
              return {...eachProduct}
            }
            return {...eachProduct, quantity: eachProduct.quantity - 1}
          }
          return {...eachProduct}
        }),
      ],
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(
        eachProduct => productId !== eachProduct.id,
      ),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <ErrorBoundary>
          <Routes>
            <Route exact path="/login" element={<LoginForm/>} />
            <ProtectedRoute exact path="/" element={<Home/>} />
            <ProtectedRoute exact path="/products" element={<Products/>} />
            <ProtectedRoute
              exact
              path="/products/:id"
              element={<ProductItemDetails/>}
            />
            <ProtectedRoute exact path="/cart" element={<Cart/>} />
            <Route path="/not-found" element={<NotFound/>} />
            <Navigate to="not-found" />
          </Routes>
        </ErrorBoundary>
      </CartContext.Provider>
    )
  }
}

export default App