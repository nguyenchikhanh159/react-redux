import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import _ from 'lodash';
import {connect} from 'react-redux';
import * as actions from './actions/index'



class App extends Component {
   constructor(props){
        super(props);
        this.state={
            idDisplayForm: false,
            taskEditing:null,
            filter:{
              name:'',
              status:-1
            },
            keyword:'',
           sortBy:'name',
           sortValue:1
        }
      }
    
     
      // s=()=>{
      //   return Math.floor((1+Math.random())*0x100).toString(16).substring(1);
      // }
      // generateID=()=>{
      //   return this.s()+this.s()+ this.s();
      // }
      onToggleForm=()=>{
           //  if(this.state.taskEditing!==null && this.state.idDisplayForm){
           //    this.setState({
           //    idDisplayForm: true,
           //    taskEditing:null
           // });
           //  }else
           //  {this.setState({
           //    idDisplayForm: !this.state.idDisplayForm,
           //    taskEditing:null
           //  });
           //  }
           this.props.onToggleForm();
      }
      // onCloseForm=()=>{
      //   this.setState({
      //     idDisplayForm:false
      //   });
      // }
      onShowForm=()=>{
          this.setState({
          idDisplayForm:true
        });
      }
      onSubmit=(data)=>{
        var {tasks}=this.state;
        if(data.id==='')
        { data.id=this.generateID();
         tasks.push(data);
       }
       else
        {
          var index=this.FindIndex(data.id)
          tasks[index]=data;
        }
         this.setState({
          tasks:tasks,
           taskEditing:null
         });
         localStorage.setItem('tasks',JSON.stringify(tasks));
       }
      
      FindIndex=(id)=>{
          var {tasks}=this.state;
         return tasks.findIndex((item)=>{
            return (item.id===id);
         });
      }
      onDelete=(id)=>{
         var {tasks}=this.state;
        var index=this.FindIndex(id);
        if(index !== -1){
            tasks.splice(index,1)
          }
          this.setState({
            tasks:tasks
          });
          localStorage.setItem('tasks',JSON.stringify(tasks));
        }
      onUpdate=(id)=>{
        var {tasks}=this.state;
        var index=this.FindIndex(id);
        var taskEditing=tasks[index];
        this.setState({
          taskEditing:taskEditing
        });
        this.onShowForm();
      }  
      onFilter=(filterName,filterStatus)=>{
          filterStatus=parseInt(filterStatus,10);
          this.setState({
            filter:{
              name:filterName.toLowerCase(),
              status:filterStatus
            }
          });

      }
      onSearch=(keyword)=>{

          this.setState({
            keyword:keyword
          });
      }
      onSort=(sortBy,sortValue)=>{
         this.setState({
          sortBy:sortBy,
          sortValue:sortValue
         });
         console.log(this.state);
      }
  render() {
    
    var {/*idDisplayForm,*/taskEditing,filter,keyword,sortBy,sortValue}=this.state;
      // if(filter){
      //   if(filter.name){
      //      tasks =tasks.filter((task)=>{
      //       return task.name.toLowerCase().indexOf(filter.name)!==-1;
      //     });
      //   }
      //   tasks=tasks.filter((task)=>{
      //     if(filter.status===-1){
      //       return task;
      //     }else{
      //         return task.status===(filter.status===1?true : false);
      //     }
      //   });
      //   if(keyword)
      //   {
      //     tasks=tasks.filter((task)=>{
      //       return task.name.toLowerCase().indexOf(keyword)!==-1;
      //     });
      //   }
      // }
      // if(sortBy='name'){
      //   tasks.sort((a,b)=>{
      //     if(a.name>b.name) return sortValue;
      //       else if(a.name<b.name) return -sortValue;
      //       else
      //         return 0;
      //   });
      // }
      //   else
      //   {
      //     tasks.sort((a,b)=>{
      //     if(a.status>b.status) return -sortValue;

      //       else if(a.status<b.status) return sortValue;
      //       else
      //         return 0;
      //       });
      //   }

      var {idDisplayForm}=this.props;

    var elmTaskForm = idDisplayForm===true ? <TaskForm 
                  onSubmit={this.onSubmit} 
                /*{  onCloseForm=this.onCloseForm }*/
                  task={taskEditing}
                  /> : '';
    return (
      <div className="container">
          <div className="text-center">
                <h1>Quản Lý Công Việc</h1>
          </div>
          <div className="row">
            <div className={ idDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4'
            : ''}>
                  {elmTaskForm}
            </div>
                <div class= {idDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' :
                'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
                  <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={this.onToggleForm}
                  >
                      <span className="fa fa-plus mr-5"></span>Thêm công việc
                  </button>
                
                    <TaskControl 
                    onSearch={this.onSearch}
                    onSort={this.onSort}
                    sortBy={sortBy}
                    sortValue={sortValue}
                    />
                 
                    <TaskList 
         
                    // onUpdateStatus={this.onUpdateStatus}
                    onDelete={this.onDelete}
                    onUpdate={this.onUpdate}
                    onFilter={this.onFilter}
                  
                    /> 
                </div>



            </div>
      </div>
     
    );
  }
}
const mapStateToProps=state=>{
  return {
    idDisplayForm:state.idDisplayForm
  }
};
const mapDispatchToProps=(dispatch,props)=>{
  return {
      onToggleForm:()=>{
        dispatch(actions.toggleForm())
      },
      onCloseForm:()=>{
        dispatch(actions.closeForm())
      }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
