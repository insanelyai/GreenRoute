'use client'

import React, { useState } from 'react';
import Header from './Header';
import TravelPlanner from './TravelPlanner';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Leaf, Home, Hotel, Droplet, Sun, Recycle } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

const ecoAccommodations = [
  {
    id: 1,
    name: "Green Leaf Eco Lodge",
    type: "Eco Lodge",
    description: "Immerse yourself in nature at our sustainable eco lodge.",
    price: 150,
    rating: 4.5,
    certifications: ["Green Key", "LEED Certified"],
    features: ["Solar Power", "Water Conservation", "Organic Garden"],
    image: "https://images.unsplash.com/photo-1618767689160-da3fb810aad7?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: 2,
    name: "Treehouse Retreat",
    type: "Treehouse",
    description: "Experience a unique stay in our eco-friendly treehouse.",
    price: 200,
    rating: 4.8,
    certifications: ["Rainforest Alliance"],
    features: ["Sustainable Materials", "Wildlife Conservation", "Eco Tours"],
    image: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: 3,
    name: "Sustainable Suites",
    type: "Eco-Friendly Hotel",
    description: "Luxury meets sustainability in our eco-friendly hotel.",
    price: 180,
    rating: 4.3,
    certifications: ["Green Globe", "ISO 14001"],
    features: ["Energy Efficient", "Waste Reduction", "Green Transportation"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: 4,
    name: "Solar Powered Inn",
    type: "Eco-Friendly Hotel",
    description: "Stay at our 100% solar-powered inn for a guilt-free vacation.",
    price: 160,
    rating: 4.6,
    certifications: ["Energy Star", "BREEAM Excellent"],
    features: ["100% Renewable Energy", "Electric Vehicle Charging", "Recycling Program"],
    image: "https://images.unsplash.com/photo-1617870952348-7524edfb61b7?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: 5,
    name: "Bamboo Bungalows",
    type: "Eco Lodge",
    description: "Experience sustainable living in our bamboo bungalows.",
    price: 130,
    rating: 4.4,
    certifications: ["EarthCheck"],
    features: ["Sustainable Architecture", "Local Community Support", "Organic Toiletries"],
    image: "https://images.unsplash.com/photo-1570793005527-824cf1a3d7a9?auto=format&fit=crop&q=80&w=300&h=200"
  },
  {
    id: 6,
    name: "Cliff-side Eco Pods",
    type: "Eco Lodge",
    description: "Enjoy breathtaking views from our energy-efficient eco pods.",
    price: 220,
    rating: 4.9,
    certifications: ["Green Tourism Business Scheme"],
    features: ["Minimal Environmental Impact", "Sustainable Water Management", "Dark Sky Friendly Lighting"],
    image: "https://images.unsplash.com/photo-1618245318763-a15156d6b23c?auto=format&fit=crop&q=80&w=300&h=200"
  }
];

function EcoAccommodations() {
  const [filteredAccommodations, setFilteredAccommodations] = useState(ecoAccommodations);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [accommodationType, setAccommodationType] = useState('all');
  const [certification, setCertification] = useState('all');

  const filterAccommodations = () => {
    let filtered = ecoAccommodations.filter(acc => 
      acc.price >= priceRange[0] && acc.price <= priceRange[1]
    );

    if (accommodationType !== 'all') {
      filtered = filtered.filter(acc => acc.type === accommodationType);
    }

    if (certification !== 'all') {
      filtered = filtered.filter(acc => acc.certifications.includes(certification));
    }

    setFilteredAccommodations(filtered);
  };

  const certifications = [...new Set(ecoAccommodations.flatMap(acc => acc.certifications))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Header />
      <TravelPlanner />
    </div>
  );
}

export default EcoAccommodations;