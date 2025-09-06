import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/hooks/useCart';
import { TEXT, FALLBACK_IMAGE } from '@/constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  return (
    <div className="card-hover group">
      <Link to={`/products/${product.slug}`} className="block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <img
            src={product.images[0] || FALLBACK_IMAGE}
            alt={product.name}
            onError={handleImageError}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handleAddToCart}
                className="btn-primary btn-sm"
                title={TEXT.COMMON.ADD_TO_CART}
              >
                <ShoppingBag className="w-4 h-4" />
              </button>
              <div className="btn-secondary btn-sm" title={TEXT.COMMON.VIEW_DETAILS}>
                <Eye className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="badge-primary text-xs">
                {tag}
              </span>
            ))}
            {product.tags.length > 2 && (
              <span className="badge-neutral text-xs">
                +{product.tags.length - 2}
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-semibold text-neutral-800 group-hover:text-primary-600 transition-colors duration-200 truncate-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-primary-600">
              {formatPrice(product.price)}{TEXT.PRODUCTS.CURRENCY}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-600 truncate-2">
            {product.description}
          </p>
        </div>
      </Link>

      {/* Action buttons */}
      <div className="p-4 pt-0 flex space-x-2">
        <button
          onClick={handleAddToCart}
          className="btn-primary flex-1 btn-sm"
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          {TEXT.COMMON.ADD_TO_CART}
        </button>
        <Link
          to={`/products/${product.slug}`}
          className="btn-outline btn-sm"
        >
          {TEXT.COMMON.VIEW_DETAILS}
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
