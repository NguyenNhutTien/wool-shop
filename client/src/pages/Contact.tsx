import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from 'lucide-react';
import { useCreateContact } from '@/hooks/useContacts';
import { CreateContactInput, FormErrors } from '@/types';
import { TEXT, CONTACT_INFO, SOCIAL_MEDIA } from '@/constants';

const Contact = () => {
  const [formData, setFormData] = useState<CreateContactInput>({
    name: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState(false);

  const createContactMutation = useCreateContact();

  // Set page title
  useEffect(() => {
    document.title = `${TEXT.CONTACT.TITLE} - Wool Shop`;
  }, []);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = TEXT.VALIDATION.REQUIRED;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = TEXT.VALIDATION.REQUIRED;
    } else if (!/^[0-9+\-\s()]+$/.test(formData.phone)) {
      newErrors.phone = TEXT.VALIDATION.INVALID_PHONE;
    }

    if (!formData.message.trim()) {
      newErrors.message = TEXT.VALIDATION.REQUIRED;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await createContactMutation.mutateAsync({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        message: formData.message.trim(),
      });
      
      setSuccess(true);
      setFormData({ name: '', phone: '', message: '' });
      setErrors({});
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleInputChange = (field: keyof CreateContactInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const contactMethods = [
    {
      icon: Phone,
      label: TEXT.CONTACT.PHONE_LABEL,
      value: CONTACT_INFO.PHONE,
      href: `tel:${CONTACT_INFO.PHONE}`,
    },
    {
      icon: MessageCircle,
      label: TEXT.CONTACT.ZALO_LABEL,
      value: CONTACT_INFO.ZALO,
      href: SOCIAL_MEDIA.ZALO,
    },
    {
      icon: Mail,
      label: TEXT.CONTACT.EMAIL_LABEL,
      value: CONTACT_INFO.EMAIL,
      href: `mailto:${CONTACT_INFO.EMAIL}`,
    },
    {
      icon: MapPin,
      label: TEXT.CONTACT.ADDRESS_LABEL,
      value: CONTACT_INFO.ADDRESS,
      href: '#',
    },
  ];

  return (
    <div className="section">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">
              {TEXT.CONTACT.TITLE}
            </h1>
            <p className="text-lg text-neutral-600">
              {TEXT.CONTACT.SUBTITLE}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="space-y-6">
              <div className="card p-6">
                {success ? (
                  // Success message
                  <div className="text-center py-8">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                      {TEXT.CONTACT.SUCCESS}
                    </h3>
                    <p className="text-neutral-600 mb-6">
                      {TEXT.CONTACT.SUCCESS_MESSAGE}
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="btn-primary"
                    >
                      Gửi tin nhắn khác
                    </button>
                  </div>
                ) : (
                  // Contact form
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                      Gửi tin nhắn cho chúng tôi
                    </h2>

                    {/* Name */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {TEXT.CONTACT.NAME} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
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
                        {TEXT.CONTACT.PHONE} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className={`input ${errors.phone ? 'input-error' : ''}`}
                        placeholder="VD: 0123456789"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">
                        {TEXT.CONTACT.MESSAGE} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className={`textarea ${errors.message ? 'input-error' : ''}`}
                        rows={5}
                        placeholder={TEXT.CONTACT.MESSAGE_PLACEHOLDER}
                      />
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={createContactMutation.isLoading}
                      className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {createContactMutation.isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="spinner w-5 h-5 mr-2"></div>
                          Đang gửi...
                        </div>
                      ) : (
                        TEXT.CONTACT.SEND
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-neutral-800 mb-6">
                  {TEXT.CONTACT.CONTACT_INFO}
                </h2>

                <div className="space-y-4">
                  {contactMethods.map((method, index) => {
                    const Icon = method.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-neutral-800 mb-1">
                            {method.label}
                          </h3>
                          {method.href !== '#' ? (
                            <a
                              href={method.href}
                              target={method.href.startsWith('http') ? '_blank' : undefined}
                              rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                              className="text-primary-600 hover:text-primary-700 transition-colors duration-200"
                            >
                              {method.value}
                            </a>
                          ) : (
                            <span className="text-neutral-600">{method.value}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Business Hours */}
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                  Giờ làm việc
                </h2>
                <div className="space-y-2 text-neutral-600">
                  <div className="flex justify-between">
                    <span>Thứ 2 - Thứ 6:</span>
                    <span>8:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thứ 7:</span>
                    <span>8:00 - 17:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chủ nhật:</span>
                    <span>9:00 - 16:00</span>
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="card p-6">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">
                  Câu hỏi thường gặp
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-1">
                      Thời gian giao hàng?
                    </h3>
                    <p className="text-sm text-neutral-600">
                      Thường từ 3-7 ngày làm việc tùy theo địa điểm giao hàng.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-1">
                      Có thể đặt hàng theo yêu cầu?
                    </h3>
                    <p className="text-sm text-neutral-600">
                      Có, chúng tôi nhận đặt hàng theo yêu cầu với màu sắc và kích thước tùy chỉnh.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-neutral-800 mb-1">
                      Chính sách đổi trả?
                    </h3>
                    <p className="text-sm text-neutral-600">
                      Đổi trả trong vòng 7 ngày nếu sản phẩm có lỗi từ nhà sản xuất.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
