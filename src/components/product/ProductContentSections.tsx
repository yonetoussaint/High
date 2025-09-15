import React from "react";
import ProductSectionWrapper from "@/components/product/ProductSectionWrapper";
import ProductDetailsTabs from '@/components/product/ProductDetailsTabs';
import SearchInfoComponent from '@/components/product/SearchInfoComponent';
import FlashDeals from '@/components/home/FlashDeals';
import ReviewGallery from '@/components/product/ReviewGallery';
import DynamicDescription from '@/components/product/DynamicDescription';

interface ProductContentSectionsProps {
  productId: string;
  product: any;
  descriptionRef?: React.RefObject<HTMLDivElement>;
  productDetailsSheetOpen: boolean;
  setProductDetailsSheetOpen: (open: boolean) => void;
  sections?: any[];
  activeSection?: string;
}

const ProductContentSections: React.FC<ProductContentSectionsProps> = ({
  productId,
  product,
  descriptionRef,
  productDetailsSheetOpen,
  setProductDetailsSheetOpen,
  sections = [],
  activeSection = 'overview'
}) => {
  return (
    <div className="flex-1 overscroll-none pb-[112px]">
      <div className="bg-white pb-20">
        {/* Product Details Tabs */}
        <div ref={descriptionRef}>
          <ProductSectionWrapper>
            <ProductDetailsTabs 
              isSheetOpen={productDetailsSheetOpen}
              onSheetOpenChange={setProductDetailsSheetOpen}
            />
          </ProductSectionWrapper>
        </div>

        {/* Search Info Component - Only on overview */}
        <div id="overview" className="px-4 pb-4">
          <SearchInfoComponent productId={productId} />
        </div>

        {/* Flash Deals - Same as For You page */}
        <FlashDeals />

        {/* Reviews */}
        <ProductSectionWrapper>
          <ReviewGallery />
        </ProductSectionWrapper>

        {/* Description */}
        <ProductSectionWrapper>
          <div className="w-full space-y-6 py-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
            <div className="w-full">
              {product?.description ? (
                <DynamicDescription 
                  content={product.description} 
                  product={product}
                  className="w-full text-gray-600 leading-relaxed mb-4"
                />
              ) : (
                <p className="w-full text-gray-600 leading-relaxed mb-4">
                  Experience premium quality with {product?.name || 'this product'}.
                </p>
              )}
            </div>
          </div>
        </ProductSectionWrapper>
      </div>
    </div>
  );
};

export default ProductContentSections;