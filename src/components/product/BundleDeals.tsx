import React, { useState, useMemo } from 'react';
import { Clock, ChevronDown } from 'lucide-react';

const BundleDeals = ({ className = "" }) => {
  const [showAll, setShowAll] = useState(false);
  const [selectedTier, setSelectedTier] = useState(null);
  
  // Sample data - you can replace this with your actual data
  const visibleTiers = [
    { min: 1, max: 10, discount: 0, isMinimum: true },
    { min: 11, max: 50, discount: 5, isMinimum: false },
    { min: 51, max: 100, discount: 10, isMinimum: false },
    { min: 101, max: 250, discount: 15, isMinimum: false },
    { min: 251, max: 500, discount: 20, isMinimum: false },
    { min: 501, max: Infinity, discount: 25, isMinimum: false }
  ];
  
  // Base price - you can adjust this
  const basePrice = 100;
  
  // Calculate displayed tiers based on showAll state
  const displayedTiers = useMemo(() => {
    return showAll ? visibleTiers : visibleTiers.slice(0, 3);
  }, [showAll, visibleTiers]);
  
  // Find current tier (could be based on current quantity or selection)
  const currentTier = selectedTier || visibleTiers[0];
  const activeTier = selectedTier;
  
  // Calculate final price with discount
  const calculateFinalPrice = (discount) => {
    return basePrice * (1 - discount / 100);
  };
  
  // Handle tier selection
  const handleTierSelect = (tier) => {
    setSelectedTier(tier);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Bundle Deals</h3>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="mr-1" size={12} />
          <span>Limited time offer</span>
        </div>
      </div>

      {/* Selected Bundle Display */}
      {currentTier && (
        <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-gray-900">
                {currentTier.max === Infinity ? `${currentTier.min}+ units` : `${currentTier.min}-${currentTier.max} units`}
                {currentTier.isMinimum && (
                  <span className="ml-2 text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full font-medium">
                    Minimum Order
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600">
                {currentTier.discount > 0 ? `Discounted pricing` : 'Standard pricing'}
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-orange-700 text-sm">
                HTG {calculateFinalPrice(currentTier.discount).toFixed(0)}/unit
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Bundle Options - Grid Layout */}
      <div className="grid grid-cols-3 gap-4">
        {displayedTiers.map((tier, index) => {
          const rangeLabel = `${tier.min}+ units`;
          const isSelected = selectedTier === tier || activeTier === tier;
          const isMinimumTier = tier.isMinimum;

          return (
            <div
              key={index}
              onClick={() => handleTierSelect(tier)}
              className={`border rounded-lg overflow-hidden transition-all cursor-pointer bg-white
                ${isSelected
                  ? "border-orange-500 ring-2 ring-orange-200"
                  : "border-gray-300 hover:border-gray-400"}`}
            >

              {/* Top section - Unit info */}
              <div className="bg-white">
                <div className="text-sm font-bold text-gray-900 text-center py-1">
                  {rangeLabel}
                </div>
                <div className="bg-black bg-opacity-10 text-center leading-none">
                  <span className="text-xs text-gray-700">
                    {tier.discount > 0 ? `${tier.discount}% off` : "Standard"}
                  </span>
                </div>
              </div>


              {/* Price section at bottom */}
              <div className="text-xs text-gray-600 p-2 bg-gray-100">
                <span className="text-gray-900 font-medium">
                  HTG {calculateFinalPrice(tier.discount).toFixed(0)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* View More/Less Button */}
      {visibleTiers.length > 3 && (
        <button 
          onClick={() => setShowAll(!showAll)}
          className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors py-3 rounded-full w-full text-gray-600 font-medium"
        >
          <span>{showAll ? 'Show less bundles' : 'View more bundles'}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showAll ? 'rotate-180' : ''}`} />
        </button>
      )}
    </div>
  );
};

export default BundleDeals;