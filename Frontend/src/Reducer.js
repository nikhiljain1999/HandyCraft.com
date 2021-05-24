
export const initialState={
    basket:[]
}

export const getBasketTotal=(basket)=>basket?.reduce((
    amount,item)=>item.price*item.quantity+amount,0)
const reducer=(state,action)=>{
    switch(action.type){
        case "UPDATE_QUANTITY":
            console.log(action.quantity)
            let updatedBasket=[...state.basket];
            updatedBasket=updatedBasket.map(item=> {
                if(item.id===action.id){
                    return {
                        ...item,
                        quantity: item.quantity+action.quantity
                    }
                }
                return item;
            })
            
            return {
                ...state,
                basket: updatedBasket
            };
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
