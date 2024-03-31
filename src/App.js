import {Component} from 'react'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux"

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
import store from './components/redux/store'
// import store from './components/redux/store'

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
      <Provider store={store}>
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
          <BrowserRouter>
            <>
              <Routes>
                  <Route exact path="/login" element={<LoginForm/>} />
                  <Route exact path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
                  <Route exact path="/products" element={<ProtectedRoute><Products/></ProtectedRoute>} />
                  <Route
                    exact
                    path="/products/:id"
                    element={<ProtectedRoute><ProductItemDetails/></ProtectedRoute>}
                  />
                  <Route exact path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
                  <Route path="*" element={<NotFound/>} />
              </Routes>
            </>
          </BrowserRouter>
        </ErrorBoundary>
      </CartContext.Provider>
      </Provider>
    )
  }
}

export default App