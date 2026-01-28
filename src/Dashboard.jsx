import { useState } from 'react'
import './Dashboard.css'

function Dashboard({ onLogout }) {
  // Sample car data - 30 cars
  const [cars] = useState([
    { id: 1, name: 'Tesla Model 3', price: 'KSh 4,650,000', image: '🚗', color: 'Electric Blue' },
    { id: 2, name: 'BMW X5', price: 'KSh 7,680,000', image: '🚙', color: 'Black' },
    { id: 3, name: 'Mercedes C-Class', price: 'KSh 5,350,000', image: '🚗', color: 'Silver' },
    { id: 4, name: 'Audi A4', price: 'KSh 5,015,000', image: '🚗', color: 'White' },
    { id: 5, name: 'Toyota Camry', price: 'KSh 3,540,000', image: '🚗', color: 'Blue' },
    { id: 6, name: 'Honda Accord', price: 'KSh 3,225,000', image: '🚗', color: 'Red' },
    { id: 7, name: 'Ford Mustang', price: 'KSh 3,645,000', image: '🏎️', color: 'Candy Red' },
    { id: 8, name: 'Chevrolet Corvette', price: 'KSh 6,965,000', image: '🏎️', color: 'Yellow' },
    { id: 9, name: 'Porsche 911', price: 'KSh 12,820,000', image: '🏎️', color: 'Metallic Gray' },
    { id: 10, name: 'Lamborghini Huracán', price: 'KSh 26,880,000', image: '🏎️', color: 'Orange' },
    { id: 11, name: 'Ferrari F8', price: 'KSh 36,200,000', image: '🏎️', color: 'Red' },
    { id: 12, name: 'Nissan Altima', price: 'KSh 3,470,000', image: '🚗', color: 'Pearl White' },
    { id: 13, name: 'Volkswagen Golf', price: 'KSh 3,745,000', image: '🚗', color: 'Gray' },
    { id: 14, name: 'Mazda CX-5', price: 'KSh 3,705,000', image: '🚙', color: 'Soul Red' },
    { id: 15, name: 'Hyundai Elantra', price: 'KSh 2,835,000', image: '🚗', color: 'Ebony Black' },
    { id: 16, name: 'Kia Sportage', price: 'KSh 3,625,000', image: '🚙', color: 'Arctic White' },
    { id: 17, name: 'Subaru Outback', price: 'KSh 3,770,000', image: '🚙', color: 'Crystal Black' },
    { id: 18, name: 'Jeep Wrangler', price: 'KSh 4,885,000', image: '🚙', color: 'Sting Gray' },
    { id: 19, name: 'GMC Sierra', price: 'KSh 4,575,000', image: '🚙', color: 'Carbon Metallic' },
    { id: 20, name: 'Ford F-150', price: 'KSh 4,275,000', image: '🚙', color: 'Lithium Gray' },
    { id: 21, name: 'Ram 1500', price: 'KSh 4,475,000', image: '🚙', color: 'Diamond Black' },
    { id: 22, name: 'Dodge Charger', price: 'KSh 4,295,000', image: '🏎️', color: 'Go Mango' },
    { id: 23, name: 'Cadillac CTS', price: 'KSh 4,640,000', image: '🚗', color: 'Radiant Silver' },
    { id: 24, name: 'Lexus RX 350', price: 'KSh 6,295,000', image: '🚙', color: 'Pearl White' },
    { id: 25, name: 'Acura MDX', price: 'KSh 6,320,000', image: '🚙', color: 'Ebony Pearl' },
    { id: 26, name: 'Infiniti QX60', price: 'KSh 5,930,000', image: '🚙', color: 'Majestic White' },
    { id: 27, name: 'Range Rover', price: 'KSh 10,920,000', image: '🚙', color: 'Fuji White' },
    { id: 28, name: 'Bugatti Chiron', price: 'KSh 336,000,000', image: '🏎️', color: 'Blue' },
    { id: 29, name: 'McLaren 720S', price: 'KSh 40,700,000', image: '🏎️', color: 'Orange' },
    { id: 30, name: 'Rolls Royce Phantom', price: 'KSh 59,450,000', image: '🚗', color: 'Black' },
  ])

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>🚗 Car Showroom Dashboard</h1>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="cars-grid">
          {cars.map((car) => (
            <div key={car.id} className="car-card">
              <div className="car-icon">{car.image}</div>
              <h3>{car.name}</h3>
              <p className="car-color">Color: {car.color}</p>
              <p className="car-price">{car.price}</p>
              <button className="view-btn">View Details</button>
            </div>
          ))}
        </div>
      </div>

      <div className="dashboard-footer">
        <p>Total Cars in Showroom: {cars.length}</p>
      </div>
    </div>
  )
}

export default Dashboard
