import { useNavigate } from "react-router-dom";
import PropertyCard from "../../components/PropertyCard";
import { useEffect, useState } from "react";

function PropertyPage() {
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Sample data
    const sampleProperties = [
      {
        id: 1,
        title: "Property 1",
        description: "Description for Property 1",
        location: "Location 1",
        imageUrlList: ["url1", "url2"],
        bodyText: "Body text for Property 1",
        price: 100000,
        pricePerUnit: 1000,
        pricePerRiai: 500,
        finalPrice: 95000,
        tags: ["tag1", "tag2"],
      },
      {
        id: 2,
        title: "Property 2",
        description: "Description for Property 2",
        location: "Location 2",
        imageUrlList: ["url3", "url4"],
        bodyText: "Body text for Property 2",
        price: 200000,
        pricePerUnit: 2000,
        pricePerRiai: 1000,
        finalPrice: 190000,
        tags: ["tag2", "tag4"],
      },
      {
        id: 3,
        title: "Property 3",
        description: "Description for Property 3",
        location: "Location 3",
        imageUrlList: ["url5", "url6"],
        bodyText: "Body text for Property 3",
        price: 300000,
        pricePerUnit: 3000,
        pricePerRiai: 1500,
        finalPrice: 285000,
        tags: ["tag5", "tag6"],
      },
    ];

    setProperties(sampleProperties);
  }, []);

  const handlePropertyClick = (id) => {
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
    <div className="flex w-screen min-h-screen justify-center items-center pt-20 lg:px-20 px-5">
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
