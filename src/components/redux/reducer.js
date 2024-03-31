import { ADD_ITEM } from "./types"

const initialState = {
    cartItems: []
}

const cartReducer =(state = initialState, action)=>{
    console.log(action.type)
    switch(action.type){
        case ADD_ITEM: return{
            cartItems: [...state.cartItems, action.payload],
        }
        default: return state
    }
}

export default cartReducer