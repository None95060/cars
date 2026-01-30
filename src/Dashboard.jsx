import { useState, useEffect, useMemo } from 'react'
import { Car, Award, Truck } from 'lucide-react'
import './Dashboard.css'
import Sidebar from './Sidebar'
import SearchBar from './SearchBar'
import CarCard from './CarCard'
import CarModal from './CarModal'
import ProfileModal from './ProfileModal'

function Dashboard({ onLogout }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    brand: '',
    bodyType: '',
    priceRange: '',
    fuelType: '',
    transmission: ''
  })
  const [selectedCar, setSelectedCar] = useState(null)
  const [favorites, setFavorites] = useState([])
  const [currentView, setCurrentView] = useState('home')
  const [selectedYard, setSelectedYard] = useState(null)
  const [showProfileModal, setShowProfileModal] = useState(false)

  // Sample car data - Kenyan market focused
  const cars = useMemo(() => [
    { id: 1, name: 'Toyota Axio', price: 1850000, year: 2020, mileage: 45000, brand: 'Toyota', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' },
    { id: 2, name: 'Nissan Sunny', price: 1650000, year: 2019, mileage: 55000, brand: 'Nissan', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Manual', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop' },
    { id: 3, name: 'Toyota Prado', price: 4500000, year: 2018, mileage: 80000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1533473359331-35f3dd50f23f?w=400&h=300&fit=crop' },
    { id: 4, name: 'Honda Fit', price: 1450000, year: 2021, mileage: 35000, brand: 'Honda', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop' },
    { id: 5, name: 'Mitsubishi L200', price: 2200000, year: 2019, mileage: 65000, brand: 'Mitsubishi', bodyType: 'Pickup', fuelType: 'Diesel', transmission: 'Manual', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1605559424843-9e4c3a0a97c1?w=400&h=300&fit=crop' },
    { id: 6, name: 'Toyota Hiace', price: 2800000, year: 2020, mileage: 40000, brand: 'Toyota', bodyType: 'Van', fuelType: 'Diesel', transmission: 'Manual', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1527787937119-74fcc22827a6?w=400&h=300&fit=crop' },
    { id: 7, name: 'Subaru Forester', price: 3200000, year: 2021, mileage: 30000, brand: 'Subaru', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop' },
    { id: 8, name: 'Mazda Demio', price: 1350000, year: 2022, mileage: 25000, brand: 'Mazda', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1609708536965-52294fedd708?w=400&h=300&fit=crop' },
    { id: 9, name: 'Nissan Patrol', price: 3800000, year: 2017, mileage: 90000, brand: 'Nissan', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
    { id: 10, name: 'Toyota Corolla', price: 1950000, year: 2021, mileage: 28000, brand: 'Toyota', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1461231338391-be40c63f6b60?w=400&h=300&fit=crop' },
    { id: 11, name: 'Honda CR-V', price: 3500000, year: 2020, mileage: 45000, brand: 'Honda', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop' },
    { id: 12, name: 'Isuzu D-Max', price: 2400000, year: 2019, mileage: 60000, brand: 'Isuzu', bodyType: 'Pickup', fuelType: 'Diesel', transmission: 'Manual', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
    { id: 13, name: 'Hyundai Tucson', price: 3100000, year: 2021, mileage: 32000, brand: 'Hyundai', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1533473359331-35f3dd50f23f?w=400&h=300&fit=crop' },
    { id: 14, name: 'Kia Sportage', price: 2950000, year: 2020, mileage: 38000, brand: 'Kia', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop' },
    { id: 15, name: 'Mercedes-Benz C-Class', price: 4200000, year: 2019, mileage: 55000, brand: 'Mercedes-Benz', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1542362567-b07e54fb18a5?w=400&h=300&fit=crop' },
    { id: 16, name: 'BMW X3', price: 4800000, year: 2020, mileage: 40000, brand: 'BMW', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1533473359331-35f3dd50f23f?w=400&h=300&fit=crop' },
    { id: 17, name: 'Audi A4', price: 4100000, year: 2018, mileage: 70000, brand: 'Audi', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop' },
    { id: 18, name: 'Volkswagen Golf', price: 2250000, year: 2021, mileage: 29000, brand: 'Volkswagen', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Manual', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1461231338391-be40c63f6b60?w=400&h=300&fit=crop' },
    { id: 19, name: 'Ford Ranger', price: 2600000, year: 2019, mileage: 58000, brand: 'Ford', bodyType: 'Pickup', fuelType: 'Diesel', transmission: 'Manual', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1605559424843-9e4c3a0a97c1?w=400&h=300&fit=crop' },
    { id: 20, name: 'Toyota Land Cruiser', price: 6500000, year: 2017, mileage: 85000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
    { id: 21, name: 'Toyota Allion', price: 1750000, year: 2022, mileage: 20000, brand: 'Toyota', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1460640020682-bc78b0fa4c29?w=400&h=300&fit=crop' },
    { id: 22, name: 'Suzuki Swift', price: 1200000, year: 2021, mileage: 32000, brand: 'Suzuki', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop' },
    { id: 23, name: 'Renault Duster', price: 2350000, year: 2020, mileage: 48000, brand: 'Renault', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Manual', location: 'Kisumu', image: 'https://images.unsplash.com/photo-1533473359331-35f3dd50f23f?w=400&h=300&fit=crop' },
    { id: 24, name: 'Datsun Go', price: 850000, year: 2022, mileage: 15000, brand: 'Datsun', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Manual', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1609708536965-52294fedd708?w=400&h=300&fit=crop' },
    { id: 25, name: 'Mahindra Bolero', price: 2150000, year: 2019, mileage: 62000, brand: 'Mahindra', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Manual', location: 'Nakuru', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop' },
    { id: 26, name: 'Chevrolet Cruze', price: 1580000, year: 2021, mileage: 42000, brand: 'Chevrolet', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' },
    { id: 27, name: 'Hyundai i10', price: 1100000, year: 2022, mileage: 18000, brand: 'Hyundai', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Manual', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1461231338391-be40c63f6b60?w=400&h=300&fit=crop' },
    { id: 28, name: 'Toyota Mark X', price: 2100000, year: 2020, mileage: 52000, brand: 'Toyota', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop' },
    { id: 29, name: 'Mitsubishi Outlander', price: 3400000, year: 2019, mileage: 58000, brand: 'Mitsubishi', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1533473359331-35f3dd50f23f?w=400&h=300&fit=crop' },
    { id: 30, name: 'Nissan X-Trail', price: 3650000, year: 2020, mileage: 44000, brand: 'Nissan', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
    { id: 31, name: 'Toyota Vitz', price: 1300000, year: 2021, mileage: 30000, brand: 'Toyota', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop' },
    { id: 32, name: 'Kia Picanto', price: 950000, year: 2022, mileage: 12000, brand: 'Kia', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Manual', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1461231338391-be40c63f6b60?w=400&h=300&fit=crop' },
    { id: 33, name: 'Toyota RAV4', price: 3900000, year: 2020, mileage: 36000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop' },
    { id: 34, name: 'Toyota Camry', price: 2850000, year: 2021, mileage: 31000, brand: 'Toyota', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' },
    { id: 35, name: 'Toyota Fortuner', price: 5200000, year: 2019, mileage: 67000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1533473359331-35f3dd50f23f?w=400&h=300&fit=crop' },
    { id: 36, name: 'Toyota Wish', price: 2050000, year: 2021, mileage: 26000, brand: 'Toyota', bodyType: 'Van', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1527787937119-74fcc22827a6?w=400&h=300&fit=crop' },
    { id: 37, name: 'Toyota Land Cruiser Prado TX', price: 4950000, year: 2020, mileage: 41000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
    { id: 38, name: 'Toyota Land Cruiser V8', price: 7200000, year: 2018, mileage: 78000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop' },
    { id: 39, name: 'Toyota Land Cruiser 300', price: 8500000, year: 2022, mileage: 8000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1533473359331-35f3dd50f23f?w=400&h=300&fit=crop' },
    { id: 40, name: 'Nissan Qashqai', price: 3250000, year: 2020, mileage: 47000, brand: 'Nissan', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop' },
    { id: 41, name: 'Nissan Altima', price: 2450000, year: 2021, mileage: 35000, brand: 'Nissan', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop' },
    { id: 42, name: 'Nissan Murano', price: 3750000, year: 2019, mileage: 52000, brand: 'Nissan', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop' },
    { id: 43, name: 'Nissan Rogue', price: 3100000, year: 2020, mileage: 39000, brand: 'Nissan', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop' },
    { id: 44, name: 'Nissan Frontier', price: 2750000, year: 2019, mileage: 54000, brand: 'Nissan', bodyType: 'Pickup', fuelType: 'Diesel', transmission: 'Manual', location: 'Nakuru', image: 'https://images.unsplash.com/photo-1605559424843-9e4c3a0a97c1?w=400&h=300&fit=crop' },
    { id: 45, name: 'Subaru Outback', price: 3550000, year: 2020, mileage: 42000, brand: 'Subaru', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop' },
    { id: 46, name: 'Subaru Impreza', price: 2750000, year: 2021, mileage: 28000, brand: 'Subaru', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' },
    { id: 47, name: 'Subaru XV', price: 3450000, year: 2020, mileage: 38000, brand: 'Subaru', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1533473359331-35f3dd50f23f?w=400&h=300&fit=crop' },
    { id: 48, name: 'Subaru Legacy', price: 2950000, year: 2021, mileage: 32000, brand: 'Subaru', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop' },
    { id: 49, name: 'Porsche 911', price: 12500000, year: 2020, mileage: 15000, brand: 'Porsche', bodyType: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1566023967268-70246b22d726?w=400&h=300&fit=crop' },
    { id: 50, name: 'Porsche Cayenne', price: 10800000, year: 2021, mileage: 12000, brand: 'Porsche', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1611339555312-e607c04352fa?w=400&h=300&fit=crop' },
    { id: 51, name: 'Porsche Panamera', price: 11200000, year: 2020, mileage: 18000, brand: 'Porsche', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop' },
    { id: 52, name: 'Porsche Boxster', price: 9500000, year: 2021, mileage: 10000, brand: 'Porsche', bodyType: 'Convertible', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1566023967268-70246b22d726?w=400&h=300&fit=crop' },
    { id: 53, name: 'Porsche Macan', price: 8900000, year: 2022, mileage: 8000, brand: 'Porsche', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1611339555312-e607c04352fa?w=400&h=300&fit=crop' },
    { id: 54, name: 'Porsche Cayman', price: 10200000, year: 2021, mileage: 14000, brand: 'Porsche', bodyType: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1542362567-b07e54fb18a5?w=400&h=300&fit=crop' },
    { id: 55, name: 'BMW 3 Series', price: 6200000, year: 2021, mileage: 22000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1463225763393-42505fee2e1b?w=400&h=300&fit=crop' },
    { id: 56, name: 'BMW 5 Series', price: 7850000, year: 2020, mileage: 28000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' },
    { id: 57, name: 'BMW X5', price: 8950000, year: 2020, mileage: 36000, brand: 'BMW', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop' },
    { id: 58, name: 'BMW X7', price: 10500000, year: 2021, mileage: 20000, brand: 'BMW', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1533473359331-35f3dd50f23f?w=400&h=300&fit=crop' },
    { id: 59, name: 'BMW 7 Series', price: 9200000, year: 2020, mileage: 25000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop' },
    { id: 60, name: 'BMW X1', price: 5400000, year: 2021, mileage: 18000, brand: 'BMW', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&h=300&fit=crop' },
    { id: 61, name: 'BMW M440i', price: 8500000, year: 2021, mileage: 16000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop' },
    { id: 62, name: 'BMW i7', price: 11800000, year: 2022, mileage: 6000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Electric', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1463225763393-42505fee2e1b?w=400&h=300&fit=crop' },
    { id: 63, name: 'BMW M2', price: 9800000, year: 2021, mileage: 14000, brand: 'BMW', bodyType: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1566023967268-70246b22d726?w=400&h=300&fit=crop' },
    { id: 64, name: 'BMW M3', price: 11500000, year: 2020, mileage: 20000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop' },
    { id: 65, name: 'BMW M4', price: 12900000, year: 2021, mileage: 16000, brand: 'BMW', bodyType: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1542362567-b07e54fb18a5?w=400&h=300&fit=crop' },
    { id: 66, name: 'BMW M5', price: 13200000, year: 2020, mileage: 24000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=400&h=300&fit=crop' },
    { id: 67, name: 'BMW M550i', price: 10200000, year: 2021, mileage: 19000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400&h=300&fit=crop' },
    { id: 68, name: 'BMW XM', price: 14500000, year: 2022, mileage: 5000, brand: 'BMW', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop' },
    { id: 69, name: 'BMW M8', price: 15200000, year: 2021, mileage: 11000, brand: 'BMW', bodyType: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://images.unsplash.com/photo-1566023967268-70246b22d726?w=400&h=300&fit=crop' }
  ], [])

  const carYards = useMemo(() => [
    {
      id: 'westlands',
      name: 'Westlands Motor Hub',
      city: 'Nairobi',
      address: 'Waiyaki Way, Westlands',
      mapQuery: 'Westlands car yard Nairobi Kenya'
    },
    {
      id: 'mombasa-road',
      name: 'Mombasa Road Auto Yard',
      city: 'Nairobi',
      address: 'Mombasa Road, Industrial Area',
      mapQuery: 'Mombasa Road car yard Nairobi Kenya'
    },
    {
      id: 'thika-road',
      name: 'Thika Road Auto Market',
      city: 'Nairobi',
      address: 'Thika Road, Kasarani',
      mapQuery: 'Thika Road car yard Nairobi Kenya'
    },
    {
      id: 'nakuru',
      name: 'Nakuru Car Yard',
      city: 'Nakuru',
      address: 'Oginga Odinga Avenue',
      mapQuery: 'Nakuru car yard Kenya'
    },
    {
      id: 'kisumu',
      name: 'Kisumu Motor Yard',
      city: 'Kisumu',
      address: 'Oginga Odinga Street',
      mapQuery: 'Kisumu car yard Kenya'
    },
    {
      id: 'eldoret',
      name: 'Eldoret Auto Plaza',
      city: 'Eldoret',
      address: 'Uganda Road, Eldoret',
      mapQuery: 'Eldoret car yard Kenya'
    },
    {
      id: 'mombasa',
      name: 'Mombasa Car Mart',
      city: 'Mombasa',
      address: 'Nyerere Avenue',
      mapQuery: 'Mombasa car yard Kenya'
    }
  ], [])

  useEffect(() => {
    if (!selectedYard && carYards.length > 0) {
      setSelectedYard(carYards[0])
    }
  }, [carYards, selectedYard])

  // Filtered cars based on search and filters
  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = searchTerm === '' ||
        car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.bodyType.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesBrand = filters.brand === '' || car.brand === filters.brand
      const matchesBodyType = filters.bodyType === '' || car.bodyType === filters.bodyType
      const matchesFuelType = filters.fuelType === '' || car.fuelType === filters.fuelType
      const matchesTransmission = filters.transmission === '' || car.transmission === filters.transmission

      // Price range filtering
      let matchesPrice = true
      if (filters.priceRange) {
        const price = car.price
        switch (filters.priceRange) {
          case '0-2000000':
            matchesPrice = price <= 2000000
            break
          case '2000000-4000000':
            matchesPrice = price > 2000000 && price <= 4000000
            break
          case '4000000+':
            matchesPrice = price > 4000000
            break
        }
      }

      return matchesSearch && matchesBrand && matchesBodyType && matchesFuelType && matchesTransmission && matchesPrice
    })
  }, [cars, searchTerm, filters])

  // Statistics from filtered cars
  const stats = useMemo(() => {
    const totalCars = filteredCars.length
    const averagePrice = totalCars > 0 ? Math.round(filteredCars.reduce((sum, car) => sum + car.price, 0) / totalCars) : 0

    // Most popular brand
    const brandCount = filteredCars.reduce((acc, car) => {
      acc[car.brand] = (acc[car.brand] || 0) + 1
      return acc
    }, {})
    const mostPopularBrand = Object.keys(brandCount).length > 0 ?
      Object.keys(brandCount).reduce((a, b) => brandCount[a] > brandCount[b] ? a : b) : 'N/A'

    // SUVs count
    const suvsCount = filteredCars.filter(car => car.bodyType === 'SUV').length

    return { totalCars, averagePrice, mostPopularBrand, suvsCount }
  }, [filteredCars])

  const handleViewDetails = (car) => {
    setSelectedCar(car)
  }

  const handleContactSeller = (car) => {
    alert(`Contacting seller for ${car.name}`)
  }

  const handleToggleFavorite = (carId) => {
    setFavorites(prev =>
      prev.includes(carId)
        ? prev.filter(id => id !== carId)
        : [...prev, carId]
    )
  }

  const handleHome = () => setCurrentView('home')
  const handleProfile = () => setShowProfileModal(true)
  const handleFavourites = () => setCurrentView('favourites')
  const handleMaps = () => setCurrentView('maps')

  return (
    <div className="dashboard-wrapper">
      {/* Top Navbar */}
      <nav className="top-navbar">
        <div className="navbar-logo">
          <h1>KenyaAuto</h1>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          onToggleFilters={() => setShowFilters(!showFilters)}
          showFilters={showFilters}
        />
      </nav>

      <div className="dashboard-container">
        <Sidebar
          filters={filters}
          onFiltersChange={setFilters}
          showFilters={showFilters}
          onLogout={onLogout}
          onHome={handleHome}
          onProfile={handleProfile}
          onFavourites={handleFavourites}
          onMaps={handleMaps}
        />

        <div className="dashboard-content">
          {currentView === 'home' && (
            <>
              {/* Statistics Cards */}
              <div className="stats-row">
                <div className="stat-card">
                  <Car className="stat-icon" />
                  <div className="stat-content">
                    <div className="stat-value">{stats.totalCars}</div>
                    <div className="stat-label">Total Cars Listed</div>
                  </div>
                </div>
                <div className="stat-card">
                  <Award className="stat-icon" />
                  <div className="stat-content">
                    <div className="stat-value">{stats.mostPopularBrand}</div>
                    <div className="stat-label">Most Popular Brand</div>
                  </div>
                </div>
                <div className="stat-card">
                  <Truck className="stat-icon" />
                  <div className="stat-content">
                    <div className="stat-value">{stats.suvsCount}</div>
                    <div className="stat-label">Available SUVs</div>
                  </div>
                </div>
              </div>

              <div className="cars-grid">
                {filteredCars.map((car) => (
                  <CarCard
                    key={car.id}
                    car={car}
                    onViewDetails={handleViewDetails}
                    onContactSeller={handleContactSeller}
                    onToggleFavorite={handleToggleFavorite}
                    isFavorite={favorites.includes(car.id)}
                  />
                ))}
              </div>
            </>
          )}

          {currentView === 'favourites' && (
            <div className="cars-grid">
              {filteredCars.filter(car => favorites.includes(car.id)).map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onViewDetails={handleViewDetails}
                  onContactSeller={handleContactSeller}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.includes(car.id)}
                />
              ))}
            </div>
          )}

          {currentView === 'maps' && (
            <div className="map-view">
              <div className="map-header">
                <h2>Car Yards Map (Kenya)</h2>
                <p>Select a car yard to view it on the map.</p>
              </div>

              <div className="map-layout">
                <div className="map-list">
                  {carYards.map((yard) => (
                    <button
                      key={yard.id}
                      className={`map-yard-btn ${selectedYard?.id === yard.id ? 'active' : ''}`}
                      onClick={() => setSelectedYard(yard)}
                    >
                      <span className="map-yard-name">{yard.name}</span>
                      <span className="map-yard-meta">{yard.city} • {yard.address}</span>
                    </button>
                  ))}

                  {selectedYard && (
                    <a
                      className="map-open-link"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedYard.mapQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  )}
                </div>

                <div className="map-embed">
                  {selectedYard && (
                    <iframe
                      title={`Map for ${selectedYard.name}`}
                      src={`https://www.google.com/maps?q=${encodeURIComponent(selectedYard.mapQuery)}&output=embed`}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {currentView === 'profile' && (
            <div className="profile-view">
              <h2>Profile</h2>
              <p>User profile information will be displayed here.</p>
            </div>
          )}
        </div>

        <div className="dashboard-footer">
          <p>Total Cars in Showroom: {cars.length}</p>
        </div>
      </div>

      {selectedCar && (
        <CarModal car={selectedCar} onClose={() => setSelectedCar(null)} />
      )}

      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </div>
  )
}

export default Dashboard
