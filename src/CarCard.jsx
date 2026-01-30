import './CarCard.css'

function CarCard({ car, onViewDetails, onContactSeller, onToggleFavorite, isFavorite }) {
  const isUrl = typeof car.image === 'string' && (car.image.startsWith('http') || car.image.startsWith('/'))

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('en-US').format(mileage) + ' KM'
  }

  return (
    <div className="car-card">
      <div className="car-card-image">
        {isUrl ? (
          <img src={car.image} alt={car.name} />
        ) : (
          <div className="car-emoji" aria-hidden>{car.image}</div>
        )}
        <button
          className="favorite-btn"
          onClick={() => onToggleFavorite(car.id)}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="car-card-content">
        <h3 className="car-card-name">{car.name}</h3>
        <div className="car-card-details">
          <div className="detail-item">
            <span className="detail-label">Price:</span>
            <span className="detail-value price">{formatPrice(car.price)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Mileage:</span>
            <span className="detail-value">{formatMileage(car.mileage)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Fuel Type:</span>
            <span className="detail-value">{car.fuelType}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Transmission:</span>
            <span className="detail-value">{car.transmission}</span>
          </div>
        </div>
        <div className="car-card-buttons">
          <button className="car-card-btn" onClick={() => onViewDetails(car)}>
            View Details
          </button>
          <button className="car-card-btn contact-btn" onClick={() => onContactSeller(car)}>
            Contact Seller
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarCard
