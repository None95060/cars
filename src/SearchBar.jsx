import { useState } from 'react'
import './SearchBar.css'

function SearchBar({ searchTerm, onSearchChange, onToggleFilters, showFilters }) {
  const handleSearchChange = (e) => {
    onSearchChange(e.target.value)
  }

  return (
    <div className="search-bar-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search cars (e.g. Toyota Axio)"
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button
          onClick={onToggleFilters}
          className="filter-toggle-btn"
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>
    </div>
  )
}

export default SearchBar
