import { useState } from "react";
import {
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@material-tailwind/react";
import { GalleryCard } from "./GalleryCard";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
export function GalleryCardPagination({ cards = [], cardsPerPage = 3 }) {
  const [currentPage, setCurrentPage] = useState(0);
  const navigate = useNavigate();
  const safeCards = Array.isArray(cards) ? cards : [];
  const safeCardsPerPage = Number(cardsPerPage) > 0 ? Number(cardsPerPage) : 3;
  const totalPages = Math.ceil(safeCards.length / safeCardsPerPage);

  const getCurrentPageCards = () => {
    const startIndex = currentPage * safeCardsPerPage;
    return safeCards.slice(startIndex, startIndex + safeCardsPerPage);
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

  if (cards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-36 md:h-48 xl:h-64 p-4">
        <Typography variant="paragraph" className="!text-h3 text-gray-500">
          ยังไม่มีรายการที่ดิน
        </Typography>
      </div>
    );
  }

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
            id={`${card.id}-${index}`}
            key={index}
            imageUrlList={card.imageUrlList}
            title={card.title}
            subtitle={card.subtitle}
            location={card.location}
            areaRai={card.areaRai}
            areaSquareWah={card.areaSquareWah}
            price={card.price}
            pricePerSquareWah={card.pricePerSquareWah}
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
