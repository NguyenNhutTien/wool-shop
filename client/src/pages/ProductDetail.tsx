import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useProduct, useRelatedProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import ProductGrid from '@/components/ProductGrid';
import { TEXT, FALLBACK_IMAGE } from '@/constants';

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const { data: productData, isLoading, error } = useProduct(slug!);
  const product = productData?.data;

  const { data: relatedData } = useRelatedProducts(product?._id || '', 4);
  const relatedProducts = relatedData?.data || [];

  const { addItem } = useCart();

  // Set page title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - Wool Shop`;
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= 100) {
      setQuantity(newQuantity);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  if (isLoading) {
    return (
      <div className="section">
        <div className="container">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image skeleton */}
              <div className="space-y-4">
                <div className="aspect-square bg-neutral-200 rounded-xl"></div>
                <div className="flex space-x-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="w-20 h-20 bg-neutral-200 rounded-lg"></div>
                  ))}
                </div>
              </div>
              
              {/* Content skeleton */}
              <div className="space-y-6">
                <div className="h-8 bg-neutral-200 rounded w-3/4"></div>
                <div className="h-6 bg-neutral-200 rounded w-1/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-full"></div>
                  <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
                </div>
                <div className="h-12 bg-neutral-200 rounded w-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="section">
        <div className="container">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-neutral-800 mb-4">
              Không tìm thấy sản phẩm
            </h1>
            <p className="text-neutral-600 mb-6">
              Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <Link to="/products" className="btn-primary">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại danh sách sản phẩm
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center text-neutral-600 hover:text-primary-600 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {TEXT.COMMON.BACK}
          </Link>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-neutral-100 rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImageIndex] || FALLBACK_IMAGE}
                alt={product.name}
                onError={handleImageError}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto scrollbar-thin">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                      selectedImageIndex === index
                        ? 'border-primary-500'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      onError={handleImageError}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="badge-primary">
                  {tag}
                </span>
              ))}
            </div>

            {/* Name */}
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800">
              {product.name}
            </h1>

            {/* Price */}
            <div className="text-3xl font-bold text-primary-600">
              {formatPrice(product.price)}{TEXT.PRODUCTS.CURRENCY}
            </div>

            {/* Description */}
            <div className="prose prose-neutral max-w-none">
              <p className="text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-neutral-700">
                  {TEXT.CART.QUANTITY}:
                </span>
                <div className="flex items-center border border-neutral-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= 100}
                    className="p-2 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="btn-primary btn-lg w-full sm:w-auto"
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                {TEXT.COMMON.ADD_TO_CART}
              </button>
            </div>

            {/* Additional Info */}
            <div className="border-t border-neutral-200 pt-6 space-y-2 text-sm text-neutral-600">
              <p>✓ Sản phẩm thủ công 100%</p>
              <p>✓ Chất liệu len cao cấp</p>
              <p>✓ Bảo hành chất lượng</p>
              <p>✓ Giao hàng toàn quốc</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-8">
              {TEXT.PRODUCTS.RELATED_PRODUCTS}
            </h2>
            <ProductGrid products={relatedProducts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
