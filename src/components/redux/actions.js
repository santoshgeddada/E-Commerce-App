import { ADD_ITEM } from "./types"

export const addItem = (product)=>{
    console.log(product)
    return {
        type: ADD_ITEM,
        payload: product
    }
}