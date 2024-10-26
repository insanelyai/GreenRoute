"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import {
  Send,
  MapPin,
  Loader2,
  Hotel,
  MapPinned,
  Leaf,
  Sun,
  Droplet,
  Recycle,
  CloudRain,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pointsContext } from "@/context/PointsContext";

export default function TravelPlanner() {
  const [destination, setDestination] = useState("");
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chat, setChat] = useState(null);

  // Filter states
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [accommodationType, setAccommodationType] = useState("all");
  const [certification, setCertification] = useState("all");

  const {points, setPoints} = useContext(pointsContext)

  const API_KEY = "AIzaSyA2_m4kLCwqWJGqkuU31QlmYY8dLj39eaA";
  const MODEL_NAME = "gemini-1.0-pro-001";
  const genAI = new GoogleGenerativeAI(API_KEY);

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 2048,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  useEffect(() => {
    const initChat = async () => {
      try {
        const newChat = await genAI
          .getGenerativeModel({ model: MODEL_NAME })
          .startChat({
            generationConfig,
            safetySettings,
          });
        setChat(newChat);
      } catch (error) {
        setError("Failed to initialize chat. Please try again.");
      }
    };
    initChat();
  }, []);

  const handleSubmit = async () => {
    if (!destination.trim()) {
      setError("Please provide a destination.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      if (chat) {
        const inputPrompt = `
          You are a skilled travel planner. I will provide a destination, and you will give me 5 hotel recommendations in a JSON format with [] only and nothing else before and after those brackets only data fill inside.
          Each hotel should include the following keys: "name", "price" (as a number in Rupees), "address", "carbon_offset" (in kg), "description", "type", "certifications", and "features".
          The destination is: ${destination}.
        `;

        const result = await chat.sendMessage(inputPrompt);
        const resultText = await result.response.text();

        const cleanedResultText = resultText.replace(/```JSON|```/g, "").trim();

        let parsedHotels;
        try {
          parsedHotels = JSON.parse(cleanedResultText);
          console.log(parsedHotels);
        } catch (parseError) {
          console.error("JSON parsing error:", parseError);
          setError("Failed to parse hotel recommendations. Please try again.");
          return;
        }

        // Add random ratings to each hotel
        const hotelsWithRatings = parsedHotels.map((hotel) => ({
          ...hotel,
          rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1), // Random rating between 3.5 and 5
          image: "/placeholder.svg?height=200&width=300", // Placeholder image
        }));

        setHotels(hotelsWithRatings);
        setFilteredHotels(hotelsWithRatings);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setError("Failed to get hotel recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterAccommodations = () => {
    const filtered = hotels.filter((hotel) => {
      const priceInRange =
        hotel.price >= priceRange[0] && hotel.price <= priceRange[1];
      const typeMatch =
        accommodationType === "all" || hotel.type === accommodationType;
      const certMatch =
        certification === "all" || hotel.certifications.includes(certification);
      return priceInRange && typeMatch && certMatch;
    });
    setFilteredHotels(filtered);
  };

  useEffect(() => {
    filterAccommodations();
  }, [priceRange, accommodationType, certification]);

  const certifications = [
    ...new Set(hotels.flatMap((hotel) => hotel.certifications)),
  ];

  const bookHotels = (carbon_offset) => {
    //console.log(carbon_offset * 10)
    return () => {
      setPoints(prev => prev + carbon_offset * 10)
    };
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-6 flex items-center justify-center">
          <MapPin className="mr-3 h-10 w-10 text-green-600" /> Eco-Friendly
          Travel Planner
        </h1>
        <h2 className="text-xl font-semibold text-center text-gray-600 mb-8">
          Discover Sustainable Hotels for Your Next Adventure
        </h2>

        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <div className="w-full md:w-3/4">
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full rounded-lg border-2 border-green-300 focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50 bg-white p-3 text-gray-700"
              placeholder="Enter your dream destination..."
            />
          </div>
          <Button
            onClick={handleSubmit}
            className="w-full md:w-1/4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg text-lg px-6 py-3 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Send className="mr-2 h-5 w-5" />
            )}
            {loading ? "Searching..." : "Find Hotels"}
          </Button>
        </div>

        {error && (
          <p className="text-center text-red-500 mb-4 bg-red-100 p-3 rounded-lg">
            {error}
          </p>
        )}

        <section className="container mx-auto py-16 px-4">
          <h2 className="text-4xl font-bold mb-8 text-center text-green-800">
            Eco-Friendly Accommodations
          </h2>

          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price-range" className="text-green-700">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </Label>
              <Slider
                id="price-range"
                min={0}
                max={100000}
                step={50}
                value={priceRange}
                onValueChange={setPriceRange}
                className="w-full"
              />
            </div>

            <div>
              <Label htmlFor="accommodation-type" className="text-green-700">
                Accommodation Type
              </Label>
              <Select
                value={accommodationType}
                onValueChange={setAccommodationType}
              >
                <SelectTrigger id="accommodation-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Eco Lodge">Eco Lodge</SelectItem>
                  <SelectItem value="Treehouse">Treehouse</SelectItem>
                  <SelectItem value="Eco-Friendly Hotel">
                    Eco-Friendly Hotel
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="certification" className="text-green-700">
                Eco Certification
              </Label>
              <Select value={certification} onValueChange={setCertification}>
                <SelectTrigger id="certification">
                  <SelectValue placeholder="Select certification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Certifications</SelectItem>
                  {certifications.map((cert) => (
                    <SelectItem key={cert} value={cert}>
                      {cert}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredHotels.map((hotel, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {hotel.name}
                  </CardTitle>
                  <CardDescription className="flex items-center space-x-2">
                    <MapPinned className="h-4 w-4 text-green-600" />
                    <span>{hotel.address}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover rounded-lg mb-4" /> */}
                  <div className="text-gray-600">
                    <strong>Description :</strong> <br />
                    {hotel.description}
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-green-600 flex items-center space-x-2">
                      <span className="font-semibold text-lg">
                        ₹{hotel.price}
                      </span>
                    </div>
                    <div className="text-yellow-500 flex items-center space-x-1">
                      <Hotel className="h-5 w-5" />
                      <span>{hotel.rating} / 5</span>
                    </div>
                  </div>

                  {/* Carbon Offset Section */}
                  <div className="mt-4 flex items-center space-x-2">
                    <Leaf className="h-5 w-5 text-green-500" />
                    <span className="text-sm text-gray-500">
                      Carbon offset: {hotel.carbon_offset} kg
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap justify-between gap-2">
                  <Button 
                  onClick={bookHotels(hotel.carbon_offset)}
                  className="w-full md:w-1/4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg px-6 py-3 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                    Book Now
                  </Button>
                  <div className="flex flex-wrap gap-2">

                  {hotel.certifications.map((cert, certIndex) => (
                    <Badge
                    key={certIndex}
                    variant="outline"
                    className="bg-green-100 text-green-600 border-green-600"
                    >
                      {cert}
                    </Badge>
                  ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
