
export const initialState={
    basket:[]
}

//selector
export const getBasketTotal=(basket)=>basket?.reduce((
    amount,item)=>item.price+amount,0)
const reducer=(state,action)=>{
    switch(action.type){
        case "ADD_TO_CART":
            return{
                ...state,
                basket:[...state.basket,action.item],
                
            }
        case "REMOVE_FROM_CART":
            let { basket } = state;
            const index= state.basket.findIndex(
                (basketItem)=>(basketItem.id ===action.payload)
            );
            console.log("index",index);

            
            let newBasket= basket.splice(index,1)
            console.log("newBasket",newBasket);
            if(index >=0){
                newBasket.splice(index,1);
            }
            else{
                console.warn("Cant remove")
            } 
            return{
                ...state,
                newBasket
            }      
             
        default : 
            return state;
    }

}
export default reducer
