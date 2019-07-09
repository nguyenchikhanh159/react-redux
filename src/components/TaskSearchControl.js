import React, { Component } from 'react';


class Search extends Component {

      constructor(props){
        super(props);
        this.state={
          keyword:''
        }
      }

      onChange=(event)=>{
        var target=event.target;
        var name=target.name;
        var value=target.value;
        this.setState({
          [name]:value
        });
      }
      onSearch=()=>{
       this.props.onSearch(this.state.keyword);
      }
  render() {
    var {keyword}=this.state;
    return (
         <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                    <div class="input-group">
                      <input 
                        name="keyword"
                        type="text"
                        class="form-control"
                        id="exampleInputAmount"
                        placeholder="Nhập từ khóa"
                        value={keyword}
                        onChange={this.onChange}
                        />
                      <span class="input-group-btn">
                        <button 
                        type="button"
                        class="btn btn-default"
                        onClick={this.onSearch}>
                         <span className="fa fa-search"></span>Tìm
                        </button>
                      </span>
                    </div>
                
          </div>
    );
  }
}

export default Search;
