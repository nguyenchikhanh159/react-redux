import *as types from './../constants/ActionTypes';


  var s=()=>{
        return Math.floor((1+Math.random())*0x100).toString(16).substring(1);
      }
    var  generateID=()=>{
        return s()+s()+ s();
      }
       FindIndex=(id)=>{
          var {tasks}=this.state;
         return tasks.findIndex((item)=>{
            return (item.id===id);
         });
      }
var data=JSON.parse(localStorage.getItem('tasks'));
var initialState=data? data:[];

var myReducer=(state=initialState,action)=>{
	switch(action.type){
		case types.LIST_ALL:
			return state;
		case types.ADD_TASK:
			{
				var newTask={
				id: generateID(),
				name:action.task.name,
				status:action.task .status ==='true'? true:false
			}
			state.push(newTask);
			localStorage.setItem('task',JSON.stringify(state));
			return [...state];
		}
		
		case types.UPDATE_STATUS_TASK:
			{
				console.log(action);
        var {tasks}=this.state;
        // var index=this.FindIndex(id);
        var index=findIndex(tasks,(task)=>{
            return task.id===id;
        });
        if(index !== -1){
          tasks[index].status =! tasks[index].status;
          this.setState({
          tasks:tasks
         
          });
          localStorage.setItem('tasks',JSON.stringify(tasks));
        }

      }

		
		default: return state;
	}
	return state;
};

export default myReducer;
