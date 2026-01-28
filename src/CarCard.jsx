import './CarCard.css'

function CarCard({ car }) {
  return (
    <div className="car-card">
      <div className="car-card-image">
        <img src={car.image} alt={car.name} />
      </div>
      <div className="car-card-content">
        <h3 className="car-card-name">{car.name}</h3>
        <div className="car-card-details">
          <div className="detail-item">
            <span className="detail-label">Price:</span>
            <span className="detail-value price">{car.price}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Condition:</span>
            <span className="detail-value">{car.condition}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Mileage:</span>
            <span className="detail-value">{car.mileage}</span>
          </div>
        </div>
        <button className="car-card-btn">View Details</button>
      </div>
    </div>
  )
}

export default CarCard
