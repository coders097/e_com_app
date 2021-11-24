import { AuthState } from "../state/authState";

const reducer=(state:AuthState,action:{
    type:String,
    payload:AuthState
})=>{
    switch(action.type){
        case "LOGIN":
            localStorage.setItem('account-login',JSON.stringify(action.payload));
            return action.payload;
        
        case "LOGOUT":
            localStorage.removeItem('account-login');
            return {
                _id: "",
                name: "",
                email: "",
                pic: "",
                phone: 0,
                token: "",
                loggedIn:false
            };
        
        case "UPDATE":
            localStorage.setItem('account-login',JSON.stringify(action.payload));
            return action.payload;
            
        default:
            return state;
    }
}

export default reducer;