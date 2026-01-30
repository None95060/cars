import { useState, useEffect, useMemo } from 'react'
import { Car, Wallet, Award, Truck } from 'lucide-react'
import './Dashboard.css'
import Sidebar from './Sidebar'
import SearchBar from './SearchBar'
import CarCard from './CarCard'
import CarModal from './CarModal'

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

  // Sample car data - Kenyan market focused
  const cars = useMemo(() => [
    { id: 1, name: 'Toyota Axio', price: 1850000, year: 2020, mileage: 45000, brand: 'Toyota', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Toyota+Axio' },
    { id: 2, name: 'Nissan Sunny', price: 1650000, year: 2019, mileage: 55000, brand: 'Nissan', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Manual', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Nissan+Sunny' },
    { id: 3, name: 'Toyota Prado', price: 4500000, year: 2018, mileage: 80000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Toyota+Prado' },
    { id: 4, name: 'Honda Fit', price: 1450000, year: 2021, mileage: 35000, brand: 'Honda', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Honda+Fit' },
    { id: 5, name: 'Mitsubishi L200', price: 2200000, year: 2019, mileage: 65000, brand: 'Mitsubishi', bodyType: 'Pickup', fuelType: 'Diesel', transmission: 'Manual', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Mitsubishi+L200' },
    { id: 6, name: 'Toyota Hiace', price: 2800000, year: 2020, mileage: 40000, brand: 'Toyota', bodyType: 'Van', fuelType: 'Diesel', transmission: 'Manual', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Toyota+Hiace' },
    { id: 7, name: 'Subaru Forester', price: 3200000, year: 2021, mileage: 30000, brand: 'Subaru', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Subaru+Forester' },
    { id: 8, name: 'Mazda Demio', price: 1350000, year: 2022, mileage: 25000, brand: 'Mazda', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Mazda+Demio' },
    { id: 9, name: 'Nissan Patrol', price: 3800000, year: 2017, mileage: 90000, brand: 'Nissan', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Nissan+Patrol' },
    { id: 10, name: 'Toyota Corolla', price: 1950000, year: 2021, mileage: 28000, brand: 'Toyota', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Toyota+Corolla' },
    { id: 11, name: 'Honda CR-V', price: 3500000, year: 2020, mileage: 45000, brand: 'Honda', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Honda+CR-V' },
    { id: 12, name: 'Isuzu D-Max', price: 2400000, year: 2019, mileage: 60000, brand: 'Isuzu', bodyType: 'Pickup', fuelType: 'Diesel', transmission: 'Manual', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Isuzu+D-Max' },
    { id: 13, name: 'Hyundai Tucson', price: 3100000, year: 2021, mileage: 32000, brand: 'Hyundai', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Hyundai+Tucson' },
    { id: 14, name: 'Kia Sportage', price: 2950000, year: 2020, mileage: 38000, brand: 'Kia', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Kia+Sportage' },
    { id: 15, name: 'Mercedes-Benz C-Class', price: 4200000, year: 2019, mileage: 55000, brand: 'Mercedes-Benz', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Mercedes+C-Class' },
    { id: 16, name: 'BMW X3', price: 4800000, year: 2020, mileage: 40000, brand: 'BMW', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=BMW+X3' },
    { id: 17, name: 'Audi A4', price: 4100000, year: 2018, mileage: 70000, brand: 'Audi', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Audi+A4' },
    { id: 18, name: 'Volkswagen Golf', price: 2250000, year: 2021, mileage: 29000, brand: 'Volkswagen', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Manual', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Volkswagen+Golf' },
    { id: 19, name: 'Ford Ranger', price: 2600000, year: 2019, mileage: 58000, brand: 'Ford', bodyType: 'Pickup', fuelType: 'Diesel', transmission: 'Manual', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Ford+Ranger' },
    { id: 20, name: 'Toyota Land Cruiser', price: 6500000, year: 2017, mileage: 85000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Toyota+Land+Cruiser' },
    { id: 21, name: 'Toyota Allion', price: 1750000, year: 2022, mileage: 20000, brand: 'Toyota', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Toyota+Allion' },
    { id: 22, name: 'Suzuki Swift', price: 1200000, year: 2021, mileage: 32000, brand: 'Suzuki', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Suzuki+Swift' },
    { id: 23, name: 'Renault Duster', price: 2350000, year: 2020, mileage: 48000, brand: 'Renault', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Manual', location: 'Kisumu', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Renault+Duster' },
    { id: 24, name: 'Datsun Go', price: 850000, year: 2022, mileage: 15000, brand: 'Datsun', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Manual', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Datsun+Go' },
    { id: 25, name: 'Mahindra Bolero', price: 2150000, year: 2019, mileage: 62000, brand: 'Mahindra', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Manual', location: 'Nakuru', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Mahindra+Bolero' },
    { id: 26, name: 'Chevrolet Cruze', price: 1580000, year: 2021, mileage: 42000, brand: 'Chevrolet', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Chevrolet+Cruze' },
    { id: 27, name: 'Hyundai i10', price: 1100000, year: 2022, mileage: 18000, brand: 'Hyundai', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Manual', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Hyundai+i10' },
    { id: 28, name: 'Toyota Mark X', price: 2100000, year: 2020, mileage: 52000, brand: 'Toyota', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Toyota+Mark+X' },
    { id: 29, name: 'Mitsubishi Outlander', price: 3400000, year: 2019, mileage: 58000, brand: 'Mitsubishi', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Mitsubishi+Outlander' },
    { id: 30, name: 'Nissan X-Trail', price: 3650000, year: 2020, mileage: 44000, brand: 'Nissan', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Nissan+X-Trail' },
    { id: 31, name: 'Toyota Vitz', price: 1300000, year: 2021, mileage: 30000, brand: 'Toyota', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Toyota+Vitz' },
    { id: 32, name: 'Kia Picanto', price: 950000, year: 2022, mileage: 12000, brand: 'Kia', bodyType: 'Hatchback', fuelType: 'Petrol', transmission: 'Manual', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Kia+Picanto' },
    { id: 33, name: 'Toyota RAV4', price: 3900000, year: 2020, mileage: 36000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Toyota+RAV4' },
    { id: 34, name: 'Toyota Camry', price: 2850000, year: 2021, mileage: 31000, brand: 'Toyota', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Toyota+Camry' },
    { id: 35, name: 'Toyota Fortuner', price: 5200000, year: 2019, mileage: 67000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Toyota+Fortuner' },
    { id: 36, name: 'Toyota Wish', price: 2050000, year: 2021, mileage: 26000, brand: 'Toyota', bodyType: 'Van', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Toyota+Wish' },
    { id: 37, name: 'Toyota Land Cruiser Prado TX', price: 4950000, year: 2020, mileage: 41000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Toyota+Prado+TX' },
    { id: 38, name: 'Toyota Land Cruiser V8', price: 7200000, year: 2018, mileage: 78000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Land+Cruiser+V8' },
    { id: 39, name: 'Toyota Land Cruiser 300', price: 8500000, year: 2022, mileage: 8000, brand: 'Toyota', bodyType: 'SUV', fuelType: 'Diesel', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Land+Cruiser+300' },
    { id: 40, name: 'Nissan Qashqai', price: 3250000, year: 2020, mileage: 47000, brand: 'Nissan', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Nissan+Qashqai' },
    { id: 41, name: 'Nissan Altima', price: 2450000, year: 2021, mileage: 35000, brand: 'Nissan', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Nissan+Altima' },
    { id: 42, name: 'Nissan Murano', price: 3750000, year: 2019, mileage: 52000, brand: 'Nissan', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Nissan+Murano' },
    { id: 43, name: 'Nissan Rogue', price: 3100000, year: 2020, mileage: 39000, brand: 'Nissan', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Nissan+Rogue' },
    { id: 44, name: 'Nissan Frontier', price: 2750000, year: 2019, mileage: 54000, brand: 'Nissan', bodyType: 'Pickup', fuelType: 'Diesel', transmission: 'Manual', location: 'Nakuru', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Nissan+Frontier' },
    { id: 45, name: 'Subaru Outback', price: 3550000, year: 2020, mileage: 42000, brand: 'Subaru', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Subaru+Outback' },
    { id: 46, name: 'Subaru Impreza', price: 2750000, year: 2021, mileage: 28000, brand: 'Subaru', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Subaru+Impreza' },
    { id: 47, name: 'Subaru XV', price: 3450000, year: 2020, mileage: 38000, brand: 'Subaru', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Subaru+XV' },
    { id: 48, name: 'Subaru Legacy', price: 2950000, year: 2021, mileage: 32000, brand: 'Subaru', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Subaru+Legacy' },
    { id: 49, name: 'Porsche 911', price: 12500000, year: 2020, mileage: 15000, brand: 'Porsche', bodyType: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Porsche+911' },
    { id: 50, name: 'Porsche Cayenne', price: 10800000, year: 2021, mileage: 12000, brand: 'Porsche', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Porsche+Cayenne' },
    { id: 51, name: 'Porsche Panamera', price: 11200000, year: 2020, mileage: 18000, brand: 'Porsche', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Porsche+Panamera' },
    { id: 52, name: 'Porsche Boxster', price: 9500000, year: 2021, mileage: 10000, brand: 'Porsche', bodyType: 'Convertible', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=Porsche+Boxster' },
    { id: 53, name: 'Porsche Macan', price: 8900000, year: 2022, mileage: 8000, brand: 'Porsche', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=Porsche+Macan' },
    { id: 54, name: 'Porsche Cayman', price: 10200000, year: 2021, mileage: 14000, brand: 'Porsche', bodyType: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=Porsche+Cayman' },
    { id: 55, name: 'BMW 3 Series', price: 6200000, year: 2021, mileage: 22000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=BMW+3+Series' },
    { id: 56, name: 'BMW 5 Series', price: 7850000, year: 2020, mileage: 28000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=BMW+5+Series' },
    { id: 57, name: 'BMW X5', price: 8950000, year: 2020, mileage: 36000, brand: 'BMW', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=BMW+X5' },
    { id: 58, name: 'BMW X7', price: 10500000, year: 2021, mileage: 20000, brand: 'BMW', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=BMW+X7' },
    { id: 59, name: 'BMW 7 Series', price: 9200000, year: 2020, mileage: 25000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=BMW+7+Series' },
    { id: 60, name: 'BMW X1', price: 5400000, year: 2021, mileage: 18000, brand: 'BMW', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=BMW+X1' },
    { id: 61, name: 'BMW M440i', price: 8500000, year: 2021, mileage: 16000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=BMW+M440i' },
    { id: 62, name: 'BMW i7', price: 11800000, year: 2022, mileage: 6000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Electric', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=BMW+i7' },
    { id: 63, name: 'BMW M2', price: 9800000, year: 2021, mileage: 14000, brand: 'BMW', bodyType: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=BMW+M2' },
    { id: 64, name: 'BMW M3', price: 11500000, year: 2020, mileage: 20000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=BMW+M3' },
    { id: 65, name: 'BMW M4', price: 12900000, year: 2021, mileage: 16000, brand: 'BMW', bodyType: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=BMW+M4' },
    { id: 66, name: 'BMW M5', price: 13200000, year: 2020, mileage: 24000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=BMW+M5' },
    { id: 67, name: 'BMW M550i', price: 10200000, year: 2021, mileage: 19000, brand: 'BMW', bodyType: 'Sedan', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/DA0010/FFFFFF?text=BMW+M550i' },
    { id: 68, name: 'BMW XM', price: 14500000, year: 2022, mileage: 5000, brand: 'BMW', bodyType: 'SUV', fuelType: 'Petrol', transmission: 'Automatic', location: 'Nairobi', image: 'https://via.placeholder.com/300x200/FFD100/000000?text=BMW+XM' },
    { id: 69, name: 'BMW M8', price: 15200000, year: 2021, mileage: 11000, brand: 'BMW', bodyType: 'Coupe', fuelType: 'Petrol', transmission: 'Automatic', location: 'Mombasa', image: 'https://via.placeholder.com/300x200/009639/FFFFFF?text=BMW+M8' }
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
  const handleProfile = () => setCurrentView('profile')
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
                  <Wallet className="stat-icon" />
                  <div className="stat-content">
                    <div className="stat-value">KES {stats.averagePrice.toLocaleString()}</div>
                    <div className="stat-label">Average Car Price</div>
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
    </div>
  )
}

export default Dashboard
