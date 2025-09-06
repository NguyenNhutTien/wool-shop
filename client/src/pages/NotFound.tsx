import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

const NotFound = () => {
  // Set page title
  useEffect(() => {
    document.title = 'Không tìm thấy trang - Wool Shop';
  }, []);

  return (
    <div className="section">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl sm:text-9xl font-bold text-neutral-200 mb-4">
              404
            </div>
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full mx-auto opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">W</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">
            Oops! Không tìm thấy trang
          </h1>
          <p className="text-lg text-neutral-600 mb-8">
            Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên hoặc tạm thời không khả dụng.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="btn-primary inline-flex items-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Về trang chủ
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn-outline inline-flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Quay lại
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <h2 className="text-lg font-semibold text-neutral-800 mb-4">
              Có thể bạn đang tìm:
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/products"
                className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                Sản phẩm
              </Link>
              <Link
                to="/order"
                className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                Đặt hàng
              </Link>
              <Link
                to="/contact"
                className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                Liên hệ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
