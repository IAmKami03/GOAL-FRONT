import React from "react";

const SkeletonCard = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl shadow-[0_4px_4px_rgba(0,0,0,0.1)] px-4 py-6 sm:px-8 sm:py-10 flex flex-col gap-6">
      {/* Title */}
      <div className="flex flex-col gap-3">
        <div className="w-32 h-4 bg-gray-300 rounded"></div>
        <div className="w-48 h-5 bg-gray-300 rounded"></div>
        <div className="w-full h-4 bg-gray-300 rounded"></div>
        <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
      </div>

      {/* Progress + Buttons */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Progress */}
        <div className="w-full lg:w-[380px] flex flex-col gap-3">
          <div className="w-24 h-4 bg-gray-300 rounded"></div>
          <div className="w-full h-[12px] bg-gray-300 rounded"></div>
        </div>

        {/* Buttons */}
        <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-4">
          <div className="flex-1 sm:w-[48%] h-12 bg-gray-300 rounded-lg"></div>
          <div className="flex-1 sm:w-[48%] h-12 bg-gray-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
