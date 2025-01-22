import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import { StateContext } from "../../context/StateContext";
import PropertyCard from "../../components/PropertyCard";

import axios from "axios";

function PropertyPage() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const navigate = useNavigate();
  const state = useLocation().state;

  useEffect(() => {
    const fetchProperties = () => {
      try {
        // const response = await axios.get("http://localhost:5000/data");
        const newProperty = [
          {
            id: 1,
            title: "Property 3",
            description: "Description for Property 3",
            location: "Location 3",
            date: "",
            imageUrlList: [
              "https://img.f4-ir.com/Dota%202%20Screenshot%202023.12.20%20-%2020.41.22.52.png",
              "https://img.f4-ir.com/testing.png",
            ],
            bodyText:
              "Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3",
            price: 300000,
            pricePerUnit: 3000,
            pricePerRiai: 1500,
            finalPrice: 285000,
            tags: ["tag5", "tag6"],
          },
          {
            id: 2,
            title: "Property 3",
            description: "Description for Property 3",
            location: "Location 3",
            date: "",
            imageUrlList: [
              "https://img.f4-ir.com/Dota%202%20Screenshot%202023.12.20%20-%2020.41.22.52.png",
              "https://img.f4-ir.com/testing.png",
            ],
            bodyText:
              "Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3Body text for Property 3",
            price: 300000,
            pricePerUnit: 3000,
            pricePerRiai: 1500,
            finalPrice: 285000,
            tags: ["tag5", "tag6"],
          },
        ];
        setProperties(newProperty);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    if (state) {
      setSelectedLocation(state.data);
    }
    fetchProperties();
  }, []);

  const handlePropertyClick = (id) => {
    console.log("id", id);
    navigate(`/properties/${id}`);
  };

  const filteredProperties = properties.filter(
    (property) =>
      (property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.bodyText.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedLocation === "" || property.location === selectedLocation) &&
      (selectedTag === "" || property.tags.includes(selectedTag))
  );

  const uniqueLocations = [
    ...new Set(properties.map((property) => property.location)),
  ];

  const uniqueTags = [
    ...new Set(properties.flatMap((property) => property.tags)),
  ];

  return (
    <div className="flex min-h-screen justify-center items-center">
      <div className="flex flex-col gap-5 h-full justify-center items-center w-full lg:pb-0 pb-6">
        <p className="font-black text-black bg-red-500">Property Page</p>
        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="flex gap-4">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="location-dropdown"
          >
            <option value="">All Locations</option>
            {uniqueLocations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="tag-dropdown"
          >
            <option value="">All Tags</option>
            {uniqueTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
        {filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            imageUrlList={property.imageUrlList}
            title={property.title}
            bodyText={property.bodyText}
            location={property.location}
            date={property.date}
            price={property.price}
            pricePerUnit={property.pricePerUnit}
            pricePerRiai={property.pricePerRiai}
            finalPrice={property.finalPrice}
            tags={property.tags}
            onClick={() => handlePropertyClick(property.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default PropertyPage;
