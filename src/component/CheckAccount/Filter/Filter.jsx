import React from 'react'
import "./Filter.sass"

const Filter = (props) => {
  return (
    <div className="filter-container"> 
        <RemoveDuplicates />
        <div className="filter-container-wrapper-2">
            <FilterButton />
            <CheckLive />
        </div>
    </div>
  )
}

const RemoveDuplicates = (props) => {
    return (
        <div className="filter-container-remove-duplicates">
            Remove duplicate&nbsp;<input type="checkbox" name="duplicate" className="filter-duplicate-input" />
        </div>
    )
}

const FilterButton= (props)=> {
    return (
        <div className="filter-container-filter-button">
            Filter
        </div>
    )
}

const CheckLive= (props) => {
    return (
        <div className="filter-container-check-live">
            Check live
        </div>
    )
}

export default Filter
