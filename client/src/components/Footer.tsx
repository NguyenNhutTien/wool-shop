import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import { TEXT, APP_NAME, CONTACT_INFO, SOCIAL_MEDIA } from '@/constants';

const Footer = () => {
  const quickLinks = [
    { name: TEXT.NAV.HOME, href: '/' },
    { name: TEXT.NAV.PRODUCTS, href: '/products' },
    { name: TEXT.NAV.ORDER, href: '/order' },
    { name: TEXT.NAV.CONTACT, href: '/contact' },
  ];

  const socialLinks = [
    { name: 'Facebook', href: SOCIAL_MEDIA.FACEBOOK, icon: Facebook },
    { name: 'Instagram', href: SOCIAL_MEDIA.INSTAGRAM, icon: Instagram },
  ];

  return (
    <footer className="bg-neutral-800 text-neutral-300">
      <div className="container">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">W</span>
                </div>
                <span className="text-xl font-bold text-white">{APP_NAME}</span>
              </div>
              <p className="text-sm leading-relaxed">
                {TEXT.FOOTER.ABOUT_TEXT}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{TEXT.FOOTER.QUICK_LINKS}</h3>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-sm hover:text-primary-400 transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{TEXT.FOOTER.CONTACT_INFO}</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">{CONTACT_INFO.PHONE}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">{CONTACT_INFO.EMAIL}</span>
                </li>
                <li className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-primary-400" />
                  <span className="text-sm">{CONTACT_INFO.ADDRESS}</span>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">{TEXT.FOOTER.FOLLOW_US}</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-neutral-700 rounded-lg flex items-center justify-center hover:bg-primary-500 transition-colors duration-200"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Zalo:</p>
                <a
                  href={SOCIAL_MEDIA.ZALO}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary-400 hover:text-primary-300 transition-colors duration-200"
                >
                  {CONTACT_INFO.ZALO}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-neutral-700">
          <div className="text-center">
            <p className="text-sm text-neutral-400">
              {TEXT.FOOTER.COPYRIGHT}
            </p>
            <div className="mt-2">
              <a
                href="/admin/login"
                className="text-xs text-neutral-500 hover:text-primary-400 transition-colors duration-200"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
