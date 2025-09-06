import { Product } from '@/types';
import ProductCard from './ProductCard';
import LoadingSkeleton from './LoadingSkeleton';
import { TEXT } from '@/constants';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  error?: string | null;
}

const ProductGrid = ({ products, loading, error }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 text-lg font-medium mb-2">
          {TEXT.COMMON.ERROR}
        </div>
        <p className="text-neutral-600">{error}</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-neutral-500 text-lg font-medium mb-2">
          {TEXT.PRODUCTS.NO_PRODUCTS}
        </div>
        <p className="text-neutral-600">
          Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
