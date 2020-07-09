const initialState={
    user:[],
    workflow:[
        {
          "id": 0,
          "name": "workflow1",
          "state": "pending",
          "nodes": [
            { "title": "node1", "content": "content", "state": "pending" },
            { "title": "node2", "content": "content2", "state": "progress" },
            { "title": "node3", "content": "content3", "state": "completed" }
          ]
        },
        {
          "id": 1,
          "name": "workflow2",
          "state": "pending",
          "nodes": [{ "title": "node4", "content": "content", "state": "progress" }]
        },
        {
          "id": 2,
          "name": "workflow3",
          "state": "pending",
          "nodes": [{ "title": "node5", "content": "content", "state": "progress" }]
        }
      ]
}

const reducer = (state =initialState ,action) => {
    if(action.type==='INCREMENT'){
        return{
            user:action.val
        }
    }
    if(action.type==='SAVEWORKFLOW'){
        return{
            workflow:action.val
        }
    }
    if(action.type==='GETWORKFLOW'){
      return{
        workflow:state.workflow
      }
    }
    
    return state;
}

export default reducer;