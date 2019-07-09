import React, { Component } from 'react';
import TaskItem from './TaskItem';
import {connect} from 'react-redux';

class TaskList extends Component {

    constructor(props){
      super(props);
      this.state={
        filtername:'',
        filterStatus:-1
      }
    }
    onChange=(event)=>{
      var target=event.target;
      var name=target.name;
      var value=target.value;
      this.props.onFilter(
        name==='filtername' ? value : this.state.filtername,
        name==='filterStatus' ? value : this.state.filterStatus
        )
      this.setState({
        [name]:value
      });
    }
  render() {
    console.log(this.props.todos);
    var {tasks}=this.props;
    var {filtername,filterStatus}=this.state;
    var elmTasks=tasks.map((task,index)=>{
          return <TaskItem 
                key={task.id} 
                index={index} 
                task={task}
                // onUpdateStatus={this.props.onUpdateStatus}
                onDelete={this.props.onDelete}
                onUpdate={this.props.onUpdate}
                />
    });
    return (
       <div class="row mt-15">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                      <table class="table table-hover mt-15">
                          <thead>
                              <tr>
                                <th className="text-center">STT</th>
                                <th className="text-center">Tên</th>
                                <th className="text-center">Trạng Thái</th>
                                <th className="text-center">Hành Động</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr>
                                 <td></td>
                                 <td>
                                    <input 
                                    type="text"
                                    className="form-control"
                                    name="filtername" 
                                    value={filtername}
                                    onChange={this.onChange} 
                                     />
                                  
                                 </td>
                                 <td>
                                    <select
                                        className="form-control"
                                        name="filterStatus"
                                        value={filterStatus}
                                        onChange={this.onChange}

                                    >
                                        <option value={-1}>Tất cả</option>
                                        <option value={0}>Ẩn</option>
                                        <option value={1}>Kích Hoạt</option>
                                    </select>
                                 </td>
                              </tr>
                        {elmTasks}
                          </tbody>
                        
                      </table>
                    </div>
                  </div>
     
    );
  }
}
const mapStateToProps=(state)=>{
  return {
    tasks:state.tasks
  }

};
export default connect(mapStateToProps,null)(TaskList);
