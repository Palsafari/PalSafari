import React from "react";
import { useParams } from "react-router-dom";
import { safariPackages } from "../assets/assets";
import { assets } from "../assets/assets";

const MoreDetails = () => {
  const { id } = useParams();
  const safariPackage = safariPackages.find((pckg) => pckg.id === parseInt(id));
  return (
    <div className="max-w-3xl mx-auto pt-5 px-3">
      <img
        src={safariPackage.lead_image[0]}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-2xl font-bold mt-4">{safariPackage.title.en}</h1>
      <div className="w-full pt-4 flex justify-between items-start">
        <div className="flex items-center gap-2">
          <img
            src={`https://flagcdn.com/w40/${safariPackage.country_code.toLowerCase()}.png`}
            className="w-6 h-4 rounded-sm"
          />
          <p className="font-semibold text-gray-500">{safariPackage.country}</p>
        </div>
        <div className="leading-tight">
          <div className="flex items-center gap-2">
            <div className="font-semibold">Days:</div>
            <div className="font-semibold text-gray-500">5</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold">Nights:</div>
            <div className="font-semibold text-gray-500">4</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-semibold">Minimum guests:</div>
          <div className="font-semibold text-gray-500">2</div>
        </div>
        <div className="leading-tight">
          <div className="text-sm text-gray-600">from</div>
          <div className="text-secondary font-bold text-lg">
            ${safariPackage.low_season_price}
          </div>
          <div className="text-sm text-gray-600">only at PalSafari</div>
        </div>
        <div className="flex items-start gap-2">
          <img
            className="h-5 pt-0 mt-0 w-14 object-cover"
            src={assets.review}
          />
          <p className="text-sm text-gray-500">(102)</p>
        </div>
      </div>
      <p className="mt-4">{safariPackage.description.en}</p>

      <div className="mt-6 flex gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Book-Now
        </button>
      </div>
    </div>
  );
};

export default MoreDetails;
