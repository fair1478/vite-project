import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";

const PropertyCardDetail = ({
  pricePerSquareWah,
  pricePerRai,
  price,
  finalPrice,
}) => {
  const formatPrice = (price) => {
    if (price === 0) return "-";
    return price.toLocaleString("en-US");
  };

  return (
    <Card shadow={false} className="h-full w-full border-[1px] border-primary">
      <CardBody className="bg-primaryLight rounded-t-xl text-[#162113] !text-body1">
        <div className="flex justify-between">
          <Typography className="!text-sm xl:!text-base">ตารางวาละ</Typography>
          <Typography className="!text-sm xl:!text-base">
            {pricePerSquareWah == 0 ? "-" : formatPrice(pricePerSquareWah)} บาท
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography className="!text-sm xl:!text-base">ไร่ละ</Typography>
          <Typography className="!text-sm xl:!text-base">
            {pricePerRai == 0 ? "-" : formatPrice(pricePerRai)} บาท
          </Typography>
        </div>
      </CardBody>
      <CardFooter className="flex flex-col justify-center items-center border-t-[1px] border-primary">
        {price != 0 && (
          <Typography className="!text-h3 2xl:!text-h3 text-[#D8C9C4] line-through">
            ยกแปลง {formatPrice(price)} บาท
          </Typography>
        )}
        <Typography
          className={`!text-h2 2xl:!text-h2 flex items-center ${
            price != 0 ? "text-primaryDark" : "h-[50px]"
          }`}
        >
          ยกแปลง {formatPrice(finalPrice)} บาท
        </Typography>
      </CardFooter>
    </Card>
  );
};

PropertyCardDetail.propTypes = {
  pricePerSquareWah: PropTypes.number.isRequired,
  pricePerRai: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  finalPrice: PropTypes.number,
};

export default PropertyCardDetail;
