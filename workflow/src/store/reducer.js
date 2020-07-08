const initialState={
    user:[]
}

const reducer = (state =initialState ,action) => {
    if(action.type==='INCREMENT'){
        return{
            user:action.val
        }
    }
    
    return state;
}

export default reducer;