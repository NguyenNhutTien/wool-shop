// App constants
export const APP_NAME = 'Wool Shop';
export const APP_DESCRIPTION = 'Sản phẩm len thủ công handmade';

// API endpoints
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  ORDERS: '/orders',
  CONTACTS: '/contacts',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 12;
export const MAX_PAGE_SIZE = 50;

// Image fallbacks
export const FALLBACK_IMAGE = 'https://via.placeholder.com/400x400?text=No+Image';

// Contact info
export const CONTACT_INFO = {
  PHONE: '0123456789',
  ZALO: '0123456789',
  EMAIL: 'contact@woolshop.com',
  ADDRESS: 'Hà Nội, Việt Nam',
} as const;

// Social media
export const SOCIAL_MEDIA = {
  FACEBOOK: 'https://facebook.com/woolshop',
  INSTAGRAM: 'https://instagram.com/woolshop',
  ZALO: 'https://zalo.me/0123456789',
} as const;

// Vietnamese text constants (i18n ready)
export const TEXT = {
  // Navigation
  NAV: {
    HOME: 'Trang chủ',
    PRODUCTS: 'Sản phẩm',
    ORDER: 'Đặt hàng',
    CONTACT: 'Liên hệ',
    CART: 'Giỏ hàng',
  },

  // Common
  COMMON: {
    LOADING: 'Đang tải...',
    ERROR: 'Có lỗi xảy ra',
    SUCCESS: 'Thành công',
    CANCEL: 'Hủy',
    CONFIRM: 'Xác nhận',
    SAVE: 'Lưu',
    EDIT: 'Sửa',
    DELETE: 'Xóa',
    VIEW_DETAILS: 'Xem chi tiết',
    ADD_TO_CART: 'Thêm vào giỏ',
    ORDER_NOW: 'Đặt hàng ngay',
    BACK: 'Quay lại',
    NEXT: 'Tiếp theo',
    PREVIOUS: 'Trước',
    SEARCH: 'Tìm kiếm',
    FILTER: 'Lọc',
    CLEAR: 'Xóa',
    ALL: 'Tất cả',
  },

  // Home page
  HOME: {
    HERO_TITLE: 'Sản phẩm len thủ công handmade',
    HERO_SUBTITLE: 'Mỗi sản phẩm đều được làm thủ công tỉ mỉ với tình yêu và sự chăm sóc. Từ những sợi len mềm mại, chúng tôi tạo ra những món quà đáng yêu và ý nghĩa.',
    HERO_CTA: 'Khám phá sản phẩm',
    STORY_TITLE: 'Câu chuyện của chúng tôi',
    STORY_CONTENT: 'Wool Shop ra đời từ niềm đam mê với nghệ thuật móc len và mong muốn mang đến những sản phẩm handmade chất lượng cao. Mỗi sản phẩm đều được chúng tôi làm thủ công với tình yêu và sự tỉ mỉ.',
    FEATURES_TITLE: 'Tại sao chọn chúng tôi?',
    FEATURE_HANDMADE: 'Thủ công 100%',
    FEATURE_HANDMADE_DESC: 'Mỗi sản phẩm đều được làm thủ công tỉ mỉ',
    FEATURE_QUALITY: 'Chất lượng cao',
    FEATURE_QUALITY_DESC: 'Sử dụng len cao cấp, bền đẹp theo thời gian',
    FEATURE_UNIQUE: 'Độc đáo',
    FEATURE_UNIQUE_DESC: 'Thiết kế riêng biệt, không trùng lặp',
  },

  // Products page
  PRODUCTS: {
    TITLE: 'Sản phẩm',
    NO_PRODUCTS: 'Không tìm thấy sản phẩm nào',
    SEARCH_PLACEHOLDER: 'Tìm kiếm sản phẩm...',
    FILTER_BY_TAG: 'Lọc theo danh mục',
    PRICE: 'Giá',
    CURRENCY: 'đ',
    TAGS: 'Danh mục',
    DESCRIPTION: 'Mô tả',
    RELATED_PRODUCTS: 'Sản phẩm liên quan',
  },

  // Cart & Order
  CART: {
    TITLE: 'Giỏ hàng',
    EMPTY: 'Giỏ hàng trống',
    EMPTY_MESSAGE: 'Bạn chưa có sản phẩm nào trong giỏ hàng',
    CONTINUE_SHOPPING: 'Tiếp tục mua sắm',
    QUANTITY: 'Số lượng',
    TOTAL: 'Tổng cộng',
    CHECKOUT: 'Thanh toán',
    REMOVE: 'Xóa',
    UPDATE: 'Cập nhật',
  },

  ORDER: {
    TITLE: 'Đặt hàng',
    CUSTOMER_INFO: 'Thông tin khách hàng',
    NAME: 'Họ và tên',
    PHONE: 'Số điện thoại',
    ADDRESS: 'Địa chỉ',
    NOTE: 'Ghi chú',
    ORDER_SUMMARY: 'Tóm tắt đơn hàng',
    SUBMIT: 'Đặt hàng',
    SUCCESS: 'Đặt hàng thành công!',
    SUCCESS_MESSAGE: 'Chúng tôi sẽ liên hệ với bạn sớm nhất để xác nhận đơn hàng.',
    REQUIRED: 'Bắt buộc',
    PHONE_PLACEHOLDER: 'VD: 0123456789',
    ADDRESS_PLACEHOLDER: 'Địa chỉ giao hàng (không bắt buộc)',
    NOTE_PLACEHOLDER: 'Ghi chú thêm về đơn hàng...',
  },

  // Contact page
  CONTACT: {
    TITLE: 'Liên hệ',
    SUBTITLE: 'Chúng tôi luôn sẵn sàng hỗ trợ bạn',
    NAME: 'Họ và tên',
    PHONE: 'Số điện thoại',
    MESSAGE: 'Tin nhắn',
    SEND: 'Gửi tin nhắn',
    SUCCESS: 'Gửi tin nhắn thành công!',
    SUCCESS_MESSAGE: 'Chúng tôi sẽ phản hồi bạn sớm nhất có thể.',
    CONTACT_INFO: 'Thông tin liên hệ',
    PHONE_LABEL: 'Điện thoại',
    ZALO_LABEL: 'Zalo',
    EMAIL_LABEL: 'Email',
    ADDRESS_LABEL: 'Địa chỉ',
    MESSAGE_PLACEHOLDER: 'Nội dung tin nhắn...',
  },

  // Footer
  FOOTER: {
    ABOUT: 'Về chúng tôi',
    ABOUT_TEXT: 'Wool Shop chuyên cung cấp các sản phẩm len thủ công chất lượng cao, được làm với tình yêu và sự tỉ mỉ.',
    QUICK_LINKS: 'Liên kết nhanh',
    CONTACT_INFO: 'Thông tin liên hệ',
    FOLLOW_US: 'Theo dõi chúng tôi',
    COPYRIGHT: '© 2024 Wool Shop. Tất cả quyền được bảo lưu.',
  },

  // Validation messages
  VALIDATION: {
    REQUIRED: 'Trường này là bắt buộc',
    INVALID_PHONE: 'Số điện thoại không hợp lệ',
    INVALID_EMAIL: 'Email không hợp lệ',
    MIN_LENGTH: 'Tối thiểu {min} ký tự',
    MAX_LENGTH: 'Tối đa {max} ký tự',
    MIN_QUANTITY: 'Số lượng tối thiểu là 1',
    MAX_QUANTITY: 'Số lượng tối đa là 100',
  },

  // Error messages
  ERROR: {
    NETWORK: 'Lỗi kết nối mạng',
    SERVER: 'Lỗi server',
    NOT_FOUND: 'Không tìm thấy',
    VALIDATION: 'Dữ liệu không hợp lệ',
    UNKNOWN: 'Lỗi không xác định',
  },
} as const;
