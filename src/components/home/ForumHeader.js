import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import { changeSearchTerm, changeCategoryFilter } from '../../actions/posts'
import './forum-header.scss';

export class ForumHeader extends React.Component{
  
  whichForum(){
    return (
      this.props.type === "neighbors" ? 
      <h1>Happening In Your Neighborhood</h1> : 
      <h1>Happening In Your City</h1>
    );
  }

  render(){
    const filterOptions = [
      {value:"", label:"Filter Category:"},
      {value: "Crime", label: "Crime"},
      {value: "Personal", label: "Personal"},
      {value: "Event", label: "Event"},
      {value: "Other", label: "Other"}
    ];

    return(
      <header className="forum-header">

        {this.whichForum()}
        <Select options={filterOptions} placeholder="Filter Category" className="filter-posts" onChange={option => this.props.dispatch(changeCategoryFilter(option.value))} />

        <i class="fas fa-search"></i>

        <input 
          type="text" 
          onChange={e=>this.props.dispatch(changeSearchTerm(e.target.value))} 
          className="search-posts" 
          placeholder="Search Forum"/> 

      </header>
    );
  }
}

export default connect()(ForumHeader)
