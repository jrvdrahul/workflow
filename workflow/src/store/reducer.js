import * as actionTypes from './action'

const initialState={
    user:[{email:'a@gmail.com',password:'abcd'},],
    workflow:[
        {
          "id": 0,
          "name": "workflow1",
          "state": "pending",
          "nodes": [
            { "title": "node1", "content": "content", "state": "pending" },
            { "title": "node2", "content": "content2", "state": "pending" },
            { "title": "node3", "content": "content3", "state": "pending" }
          ]
        },
        {
          "id": 1,
          "name": "workflow2",
          "state": "pending",
          "nodes": [{ "title": "node4", "content": "content", "state": "pending" }]
        },
        {
          "id": 2,
          "name": "workflow3",
          "state": "pending",
          "nodes": [{ "title": "node5", "content": "content", "state": "pending" }]
        }
      ],
      isAuthenticated:false
}

const reducer = (state =initialState ,action) => {
  switch(action.type){
    case actionTypes.ADDUSER:
      return{
          user:state.user
      }
    case actionTypes.LOGGED:
      return{
        isAuthenticated:action.val
      }  
    case actionTypes.SAVEWORKFLOW:
      return{
        workflow:action.val
      }
    case actionTypes.DELETEWORKFLOW:
      const updated=[...state.workflow];
      updated.splice(action.val, 1)
      return{
        workflow:updated
      }
  }
    return state;
}

export default reducer;