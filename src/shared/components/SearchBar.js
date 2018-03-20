// Unused

import React from "react";

class SearchBar extends React.Component {
    constructor(){
        super();
        this.state={term:''};
    }
    addSearchTerm(event){
        this.setState({term: event.target.value});
    }
    submitSearch(event){
        event.preventDefault();
        this.props.dispatch(this.props.action(this.state.term));
    }
    render(){
        return(
            <form onSubmit={this.submitSearch.bind(this)}>
                <div class="input-group">
                  <input onChange={this.addSearchTerm.bind(this)} type="search" class="form-control" 
                  placeholder="Enter a book name" required/>
                  <span class="input-group-btn">
                    <button type="submit" class="btn btn-primary">
                      Start
                    </button> 
                  </span>
                </div>
            </form>
        )
    }
}
export default SearchBar;