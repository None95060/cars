import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import './CarModal.css'

function CarModal({ car, onClose }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  if (!car) return null

  const images = car.images || [car.image]
  const currentImage = images[selectedImageIndex]

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
        <button className="modal-back-btn" onClick={onClose}>
          <ArrowLeft size={20} />
          <span>Back to Dashboard</span>
        </button>

        {/* Image Gallery */}
        <div className="modal-image-gallery">
          <div className="modal-main-image">
            <img src={currentImage} alt={car.name} className="modal-image" />
          </div>
          {images.length > 1 && (
            <div className="modal-thumbnails">
              {images.map((image, index) => (
                <button
                  key={index}
                  className={`thumbnail-btn ${index === selectedImageIndex ? 'active' : ''}`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img src={image} alt={`${car.name} ${index + 1}`} className="thumbnail-image" />
                </button>
              ))}
            </div>
          )}
        </div>

        <h2 className="modal-title">{car.name}</h2>

        {/* Basic Details */}
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
            <span className="detail-label">Mileage:</span>
            <span className="detail-value">{formatMileage(car.mileage)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Fuel Type:</span>
            <span className="detail-value">{car.fuelType || 'Gasoline'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Transmission:</span>
            <span className="detail-value">{car.transmission || 'Manual'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{car.location}</span>
          </div>
        </div>

        {/* Engine Specifications */}
        {(car.engineSize || car.horsepower || car.torque || car.engineCondition) && (
          <div className="modal-section">
            <h3>Engine Specifications</h3>
            <div className="modal-details">
              {car.engineSize && (
                <div className="detail-item">
                  <span className="detail-label">Engine Size:</span>
                  <span className="detail-value">{car.engineSize}</span>
                </div>
              )}
              {car.horsepower && (
                <div className="detail-item">
                  <span className="detail-label">Horsepower:</span>
                  <span className="detail-value">{car.horsepower}</span>
                </div>
              )}
              {car.torque && (
                <div className="detail-item">
                  <span className="detail-label">Torque:</span>
                  <span className="detail-value">{car.torque}</span>
                </div>
              )}
              {car.engineCondition && (
                <div className="detail-item full-width">
                  <span className="detail-label">Engine Condition:</span>
                  <span className="detail-value">{car.engineCondition}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Performance */}
        {(car.acceleration || car.topSpeed || car.fuelEfficiency) && (
          <div className="modal-section">
            <h3>Performance</h3>
            <div className="modal-details">
              {car.acceleration && (
                <div className="detail-item">
                  <span className="detail-label">0-100 km/h:</span>
                  <span className="detail-value">{car.acceleration}</span>
                </div>
              )}
              {car.topSpeed && (
                <div className="detail-item">
                  <span className="detail-label">Top Speed:</span>
                  <span className="detail-value">{car.topSpeed}</span>
                </div>
              )}
              {car.fuelEfficiency && (
                <div className="detail-item">
                  <span className="detail-label">Fuel Efficiency:</span>
                  <span className="detail-value">{car.fuelEfficiency}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Physical Details */}
        {(car.seatingCapacity || car.doors || car.color || car.condition) && (
          <div className="modal-section">
            <h3>Physical Details</h3>
            <div className="modal-details">
              {car.seatingCapacity && (
                <div className="detail-item">
                  <span className="detail-label">Seating Capacity:</span>
                  <span className="detail-value">{car.seatingCapacity} passengers</span>
                </div>
              )}
              {car.doors && (
                <div className="detail-item">
                  <span className="detail-label">Doors:</span>
                  <span className="detail-value">{car.doors}</span>
                </div>
              )}
              {car.color && (
                <div className="detail-item">
                  <span className="detail-label">Color:</span>
                  <span className="detail-value">{car.color}</span>
                </div>
              )}
              {car.condition && (
                <div className="detail-item">
                  <span className="detail-label">Condition:</span>
                  <span className="detail-value">{car.condition}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Seat Information */}
        {(car.seatMaterial || car.seatType || (car.seatFeatures && car.seatFeatures.length > 0)) && (
          <div className="modal-section">
            <h3>Seat Information</h3>
            <div className="modal-details">
              {car.seatMaterial && (
                <div className="detail-item">
                  <span className="detail-label">Seat Material:</span>
                  <span className="detail-value">{car.seatMaterial}</span>
                </div>
              )}
              {car.seatType && (
                <div className="detail-item">
                  <span className="detail-label">Seat Type:</span>
                  <span className="detail-value">{car.seatType}</span>
                </div>
              )}
            </div>
            {car.seatFeatures && car.seatFeatures.length > 0 && (
              <div className="modal-features" style={{ marginTop: '10px' }}>
                {car.seatFeatures.map((feature, index) => (
                  <span key={index} className="feature-tag">{feature}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Features */}
        {car.features && car.features.length > 0 && (
          <div className="modal-section">
            <h3>Features</h3>
            <div className="modal-features">
              {car.features.map((feature, index) => (
                <span key={index} className="feature-tag">{feature}</span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {car.description && (
          <div className="modal-description">
            <h3>Description</h3>
            <p>{car.description}</p>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="modal-actions">
          <button className="modal-back-btn-bottom" onClick={onClose}>
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CarModal
