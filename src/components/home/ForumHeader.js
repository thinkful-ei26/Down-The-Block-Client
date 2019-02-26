import React from 'react';
import {connect} from 'react-redux';
import Select from 'react-select';
import chroma from 'chroma-js';
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
      {value: "", label:"See Category:", color: "#ccc"},
      {value: "Crime", label: "Crime", color: '#e36060'},
      {value: "Personal", label: "Personal", color: '#45bb85'},
      {value: "Event", label: "Event", color: '#c093d7'},
      {value: "Other", label: "Other", color: '#f3c59c'}
    ];

    const dot = (color = '#ccc') => ({
      alignItems: 'center',
      display: 'flex',
    
      ':before': {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
      },
    });

    const colorStyles = {
      control: styles => ({ ...styles, backgroundColor: 'white' }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        console.log('here');
        const color = chroma(data.color);
        return {
          ...styles,
          backgroundColor: isDisabled
            ? null
            : isSelected ? data.color : isFocused ? color.alpha(0.1).css() : null,
          color: isDisabled
            ? '#ccc'
            : isSelected
              ? chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
              : data.color,
          cursor: isDisabled ? 'not-allowed' : 'default',
        };
      },
      input: styles => ({ ...styles, ...dot() }),
      placeholder: styles => ({ ...styles, ...dot() }),
      singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };

    return(
      <header className="forum-header">

        {this.whichForum()}
        <Select
          defaultValue={filterOptions[0]} 
          options={filterOptions} 
          placeholder="See Category" 
          className="filter-posts" 
          onChange={option => this.props.dispatch(changeCategoryFilter(option.value))}
          styles={colorStyles}
        />

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
