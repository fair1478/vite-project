import React, { useState } from "react";
import { Typography, IconButton } from "@material-tailwind/react";
import { GalleryCard } from "./GalleryCard";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
export function GalleryCardPagination({ cards = [], cardsPerPage = 3 }) {
  const [currentPage, setCurrentPage] = useState(0);

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

  return (
    <div className="container flex gap-x-4 mx-auto px-4">
      <div className="self-center justify-center items-center space-x-4">
        <IconButton variant="text" onClick={handlePrevious}>
          <ChevronLeftIcon className="h-6 w-6  text-[#5F6368]" />
        </IconButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {getCurrentPageCards().map((card, index) => (
          <GalleryCard
            key={index}
            images={card.images}
            title={card.title}
            bodyText={card.bodyText}
            location={card.location}
            price={card.price}
            pricePerUnit={card.pricePerUnit}
            pricePerRiai={card.pricePerRiai}
            className="w-full"
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="self-center justify-center items-center space-x-4">
        <IconButton variant="text" onClick={handleNext}>
          <ChevronRightIcon className="h-6 w-6  text-[#5F6368]" />
        </IconButton>
      </div>
    </div>
  );
}
