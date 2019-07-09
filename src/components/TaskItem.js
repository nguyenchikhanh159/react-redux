import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from './../actions/index';


class TaskItem extends Component {

    onUpdateStatus=()=>{
      this.props.onUpdateStatus(this.props.task.id);
    }
    onDelete=()=>{
      this.props.onDelete(this.props.task.id);
    }
   onUpdate=()=>{
    this.props.onUpdate(this.props.task.id);  
   }

  render() {
    var {task,index }=this.props;
    return (
       <tr>

              <td>{index+1}</td>
              <td>{task.name}</td>
              <td className="text-center">
              <span 
                className={task.status===true? 'label label-danger' :'label label-success'}
                onClick={this.onUpdateStatus}
              >{task.status===true
                ? 'Kích Hoạt' : 'Ẩn'}</span>
              </td>
              <td className="text-center">
              <button 
              type="button" 
               class="btn btn-warning"
                onClick={this.onUpdate}
               >
              <span className="fa fa-pencil mr-5"></span>Sửa
             </button>&nbsp;                    
             <button 
             type="button" 
             class="btn btn-danger"
             onClick={this.onDelete}
             >                        
              <span className="fa fa-trash mr-5"></span>Xóa
             </button>&nbsp;
            </td>

        </tr>
    );
  }
}
const mapStateToProps=state=>{
  return {
  
  };
};
const mapDispatchToProps=(dispatch,props)=>{
  return {
     onUpdateStatus:(id)=>{
        dispatch(actions.updateStatus(id));
      }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskItem);

