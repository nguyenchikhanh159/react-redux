import React, { Component } from 'react';
import {connect} from 'react-redux';
import *as actions from './../actions/index'
class TaskForm extends Component {

    constructor(props){
      super(props);
      this.state={
        id:'',
        name: '',
        status: false
      }
    }
    // componentWillMount()
    // {
    //     if(this.props.task){
    //         this.setState({
    //             id:this.props.task.id,
    //             name:this.props.task.name,
    //             status:this.props.task.status
    //         });
    //     }

    // }
    // componentWillReceiveProps(nextProps){
    //   if(nextProps.task){
    //         this.setState({
    //             id:nextProps.task.id,
    //             name:nextProps.task.name,
    //             status:nextProps.task.status  
    //         });
    //     }else {
    //         this.setState({
    //         id:'',
    //         name: '',
    //         status: false
    //         });
    //     }
    // }

    onCloseForm=()=>{
     this.props.onCloseForm();
    }
    onChange=(event)=>{
      var target=event.target;
      var name=target.name;
      var value= target.value;
      if(name==='status'){
        value=target.value==='true' ? true : false;
      }
      this.setState({
        [name]:value
      });

    }
    onSubmit=(event)=>{
      event.preventDefault();
      // this.props.onSubmit(this.state);
      this.props.onAddTask(this.state);
      this.onClear();
      this.onCloseForm();
      
    }
    onClear=()=>{
      this.setState({
        name:'',
        status:false
      })
    }
  render() {
    var {id}=this.props
    return (
     <div className="panel panel-warning">
                        <div className="panel-heading">
                          <h3 className="panel-title">
                            {id==='' ? 'Thêm công việc':'Cập nhật công việc'}
                              <span
                                className="fa fa-times-circle text-right"
                                onClick={this.onCloseForm}
                              ></span>
                          </h3>
                        </div>
                        <div className="panel-body">
                         <form onSubmit={this.onSubmit}>
                         
                                 <div class="form-group">
                                   <label>Tên: </label>
                                   <input
                                    type="text"
                                    class="form-control"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                     />
                                
                                    
                                 </div>
                                    <label>Trạng Thái </label>
                                   <select
                                    class="form-control"
                                    name="status"
                                     value={this.state.status}
                                    onChange={this.onChange}
                                    >
                                      <option value={true}>Kích Hoạt </option>
                                       <option value={false}>Ẩn </option>
                                    </select><br/>
                                  <div className="text-center">

                                  <button type="submit" class="btn btn-warning">
                                      <span className="fa fa-plus mr-5"></span>Lưu
                                  </button>&nbsp;
                                  <button 
                                  type="submit" 
                                  class="btn btn-danger"
                                  onClick={this.onClear}
                                  >
                                      <span className="fa fa-plus mr-5"></span>Hủy bỏ
                                  </button>&nbsp;
                                  </div>

                         </form>
                    </div>
      </div>
    );
  }
}

const mapStateToProps=(state)=>{
    return {
      isDisplayForm :state.isDisplayForm
    }
};
const mapDispathToProps=(dispatch,props)=>{
  return{
      onAddTask:(task)=>{
        dispatch(actions.addTask(task));
      },
      onCloseForm:()=>{
        dispatch(actions.closeForm());
      }
  }
}
export default connect(mapStateToProps,mapDispathToProps)(TaskForm);
