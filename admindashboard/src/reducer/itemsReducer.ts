import { ItemState } from "../state/itemsState";

const reducer=(state:ItemState[],action:{
    type:String,
    payload:ItemState[]
})=>{
    switch(action.type){
        case "LOAD":
            return action.payload;
        
        case "ADD":
            return action.payload;
        
        case "DELETE":
            return action.payload;

        case "UPDATE":
            return action.payload;
            
        default:
            return state;
    }
}

export default reducer;