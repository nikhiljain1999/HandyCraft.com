import * as actionType from "./action"
const initialState={
    token:localStorage.getItem('token'),
    isAuthenticated:false,
    isLoading:false,
    user:null

}

const reducer =(state=initialState,action)=>{
    switch(action.type){
        case action.Type.USER_LOADING:
            return {
                ...state,
                isLoading:true

            }
            case action.type.USER_LOADED:
                return {
                    ...state,
                    isAuthenticated:true,
                    isLoading:false,
                    user:action.payload
                }
            case actionType.LOGIN_SUCCESS:
            case actionType.REGISTER_SUCCESS:
                return{
                    ...state,
                    user:action.payload,
                    isAuthenticated:true,
                    isLoading:false
                }
            case actionType.LOGOUT_SUCCESS:
                return{
                    ...state,
                    token:null,
                    user:null,
                    isAuthenticated:false,
                    isLoading:false
                }
    }
}
export default reducer