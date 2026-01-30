import './CarModal.css'

function CarModal({ car, onClose }) {
  if (!car) return null

  const isUrl = typeof car.image === 'string' && (car.image.startsWith('http') || car.image.startsWith('/'))

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price)
  }

  const formatMileage = (mileage) => {
    return new Intl.NumberFormat('en-US').format(mileage) + ' miles'
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        {isUrl ? (
          <img src={car.image} alt={car.name} className="modal-image" />
        ) : (
          <div className="modal-emoji" aria-hidden>{car.image}</div>
        )}

        <h2 className="modal-title">{car.name}</h2>

        <div className="modal-details">
          <div className="detail-item">
            <span className="detail-label">Price:</span>
            <span className="detail-value">{formatPrice(car.price)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Year:</span>
            <span className="detail-value">{car.year}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Condition:</span>
            <span className="detail-value">{car.condition}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Mileage:</span>
            <span className="detail-value">{formatMileage(car.mileage)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Color:</span>
            <span className="detail-value">{car.color}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Fuel Type:</span>
            <span className="detail-value">{car.fuelType || 'Gasoline'}</span>
          </div>
        </div>

        {car.description && (
          <div className="modal-description">
            <h3>Description</h3>
            <p>{car.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CarModal
