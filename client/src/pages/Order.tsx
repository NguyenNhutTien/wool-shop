import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, CheckCircle } from 'lucide-react';
import { useCart } from '@/hooks/useCart';
import { useCreateOrder } from '@/hooks/useOrders';
import { CreateOrderInput, FormErrors } from '@/types';
import { TEXT, FALLBACK_IMAGE } from '@/constants';

const Order = () => {
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCart();
  const createOrderMutation = useCreateOrder();

  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [orderSuccess, setOrderSuccess] = useState(false);

  // Set page title
  useEffect(() => {
    document.title = `${TEXT.ORDER.TITLE} - Wool Shop`;
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!customerInfo.name.trim()) {
      newErrors.name = TEXT.VALIDATION.REQUIRED;
    }

    if (!customerInfo.phone.trim()) {
      newErrors.phone = TEXT.VALIDATION.REQUIRED;
    } else if (!/^[0-9+\-\s()]+$/.test(customerInfo.phone)) {
      newErrors.phone = TEXT.VALIDATION.INVALID_PHONE;
    }

    if (items.length === 0) {
      newErrors.items = 'Giỏ hàng không được trống';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const orderData: CreateOrderInput = {
      items: items.map(item => ({
        productId: item.product._id,
        quantity: item.quantity,
      })),
      customer: {
        name: customerInfo.name.trim(),
        phone: customerInfo.phone.trim(),
        address: customerInfo.address.trim() || undefined,
      },
      note: note.trim() || undefined,
    };

    try {
      await createOrderMutation.mutateAsync(orderData);
      setOrderSuccess(true);
      clearCart();
      setCustomerInfo({ name: '', phone: '', address: '' });
      setNote('');
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = FALLBACK_IMAGE;
  };

  // Success state
  if (orderSuccess) {
    return (
      <div className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-neutral-800 mb-4">
                {TEXT.ORDER.SUCCESS}
              </h1>
              <p className="text-neutral-600 mb-8">
                {TEXT.ORDER.SUCCESS_MESSAGE}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/products" className="btn-primary">
                  Tiếp tục mua sắm
                </Link>
                <Link to="/" className="btn-outline">
                  Về trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-8 text-center">
            {TEXT.ORDER.TITLE}
          </h1>

          {items.length === 0 ? (
            // Empty cart
            <div className="text-center py-12">
              <ShoppingBag className="w-16 h-16 text-neutral-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-neutral-800 mb-2">
                {TEXT.CART.EMPTY}
              </h2>
              <p className="text-neutral-600 mb-6">
                {TEXT.CART.EMPTY_MESSAGE}
              </p>
              <Link to="/products" className="btn-primary">
                {TEXT.CART.CONTINUE_SHOPPING}
              </Link>
            </div>
          ) : (
            // Order form
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Cart Items */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-neutral-800">
                  {TEXT.ORDER.ORDER_SUMMARY}
                </h2>

                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.product._id} className="card p-4">
                      <div className="flex items-center space-x-4">
                        {/* Product Image */}
                        <div className="w-16 h-16 bg-neutral-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.images[0] || FALLBACK_IMAGE}
                            alt={item.product.name}
                            onError={handleImageError}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-neutral-800 truncate">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-neutral-600">
                            {formatPrice(item.product.price)}{TEXT.PRODUCTS.CURRENCY}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                            className="p-1 hover:bg-neutral-100 rounded transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                            className="p-1 hover:bg-neutral-100 rounded transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.product._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded transition-colors duration-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total */}
                <div className="card p-4 bg-neutral-50">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>{TEXT.CART.TOTAL}:</span>
                    <span className="text-primary-600">
                      {formatPrice(getTotalPrice())}{TEXT.PRODUCTS.CURRENCY}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer Form */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-neutral-800">
                  {TEXT.ORDER.CUSTOMER_INFO}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {TEXT.ORDER.NAME} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={customerInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`input ${errors.name ? 'input-error' : ''}`}
                      placeholder="Nhập họ và tên"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {TEXT.ORDER.PHONE} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className={`input ${errors.phone ? 'input-error' : ''}`}
                      placeholder={TEXT.ORDER.PHONE_PLACEHOLDER}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {TEXT.ORDER.ADDRESS}
                    </label>
                    <input
                      type="text"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="input"
                      placeholder={TEXT.ORDER.ADDRESS_PLACEHOLDER}
                    />
                  </div>

                  {/* Note */}
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      {TEXT.ORDER.NOTE}
                    </label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="textarea"
                      rows={3}
                      placeholder={TEXT.ORDER.NOTE_PLACEHOLDER}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={createOrderMutation.isLoading}
                    className="btn-primary w-full btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createOrderMutation.isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="spinner w-5 h-5 mr-2"></div>
                        Đang xử lý...
                      </div>
                    ) : (
                      TEXT.ORDER.SUBMIT
                    )}
                  </button>

                  {errors.items && (
                    <p className="text-sm text-red-600 text-center">{errors.items}</p>
                  )}
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
