import { useState } from 'react'
import './Sidebar.css'

function Sidebar({ filters, onFiltersChange, showFilters, onLogout, onHome, onProfile, onFavourites, onMaps }) {
  const handleFilterChange = (filterType, value) => {
    onFiltersChange({
      ...filters,
      [filterType]: value
    })
  }

  const brands = ['Toyota', 'Nissan', 'Honda', 'Subaru', 'Mazda', 'Mitsubishi', 'Isuzu', 'Hyundai', 'Kia', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Ford']
  const bodyTypes = ['Sedan', 'SUV', 'Pickup', 'Hatchback', 'Van']
  const priceRanges = ['Under 1M', '1M - 2M', '2M - 3M', '3M - 4M', '4M - 5M', 'Over 5M']
  const fuelTypes = ['Petrol', 'Diesel', 'Hybrid']
  const transmissions = ['Automatic', 'Manual']

  return (
    <div className={`sidebar ${showFilters ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>🔍 Filters</h2>
      </div>

      <div className="navigation-section">
        <button className="nav-btn" onClick={onHome}>
          🏠 Home
        </button>
        <button className="nav-btn" onClick={onProfile}>
          👤 Profile
        </button>
        <button className="nav-btn" onClick={onFavourites}>
          ❤️ Favourites
        </button>
        <button className="nav-btn" onClick={onMaps}>
          🗺️ Maps
        </button>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>Brand</label>
          <select
            value={filters.brand}
            onChange={(e) => handleFilterChange('brand', e.target.value)}
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Body Type</label>
          <select
            value={filters.bodyType}
            onChange={(e) => handleFilterChange('bodyType', e.target.value)}
          >
            <option value="">All Types</option>
            {bodyTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Price Range (KES)</label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
          >
            <option value="">All Prices</option>
            {priceRanges.map(range => (
              <option key={range} value={range}>{range}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Fuel Type</label>
          <select
            value={filters.fuelType}
            onChange={(e) => handleFilterChange('fuelType', e.target.value)}
          >
            <option value="">All Fuels</option>
            {fuelTypes.map(fuel => (
              <option key={fuel} value={fuel}>{fuel}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Transmission</label>
          <select
            value={filters.transmission}
            onChange={(e) => handleFilterChange('transmission', e.target.value)}
          >
            <option value="">All Transmissions</option>
            {transmissions.map(trans => (
              <option key={trans} value={trans}>{trans}</option>
            ))}
          </select>
        </div>

        <button className="clear-filters-btn" onClick={() => onFiltersChange({
          brand: '',
          bodyType: '',
          priceRange: '',
          fuelType: '',
          transmission: ''
        })}>
          Clear All Filters
        </button>
      </div>

      <button className="logout-btn" onClick={onLogout}>
        🚪 Logout
      </button>
    </div>
  )
}

export default Sidebar
