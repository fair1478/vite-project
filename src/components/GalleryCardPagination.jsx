import React, { useState } from "react";
import { Typography, IconButton } from "@material-tailwind/react";
import { GalleryCard } from "./GalleryCard";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
export function GalleryCardPagination({ cards = [], cardsPerPage = 3 }) {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  // Calculate total pages
  const totalPages = Math.ceil(cards.length / cardsPerPage);

  // Get cards for current page
  const getCurrentPageCards = () => {
    const startIndex = currentPage * cardsPerPage;
    return cards.slice(startIndex, startIndex + cardsPerPage);
  };

  // Handle navigation
  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) =>
      prev < totalPages - 1 ? prev + 1 : totalPages - 1
    );
  };
  const handlePropertyClick = (id) => {
    try {
      api.post(`/incrementPopularity`, { id: id }).then((response) => {
        if (response.status === 200) {
          navigate(`/properties/${id}`);
        } else {
          console.error(
            "Error incrementing popularity: ",
            response.status,
            response.statusText
          );
        }
      });
    } catch (error) {
      console.error("Error incrementing popularity: ", error);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex gap-x-2 w-full">
      {window.innerWidth > 720 && (
        <div className="self-center justify-center items-center space-x-4">
          <IconButton variant="text" onClick={handlePrevious}>
            <ChevronLeftIcon className="h-6 w-6  text-[#5F6368]" />
          </IconButton>
        </div>
      )}
      <div className="flex overflow-x-auto md:grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-4 w-full">
        {getCurrentPageCards().map((card, index) => (
          <GalleryCard
            key={index}
            imageUrlList={card.imageUrlList}
            title={card.title}
            subtitle={card.subtitle}
            location={card.location}
            price={card.price}
            pricePerSquareWha={card.pricePerSquareWha}
            pricePerRai={card.pricePerRai}
            finalPrice={card.finalPrice}
            onClick={() => handlePropertyClick(card.id)}
          />
        ))}
      </div>
      {/* Navigation */}
      {window.innerWidth > 720 && (
        <div className="self-center justify-center items-center space-x-4">
          <IconButton variant="text" onClick={handleNext}>
            <ChevronRightIcon className="h-6 w-6  text-[#5F6368]" />
          </IconButton>
        </div>
      )}
    </div>
  );
}
