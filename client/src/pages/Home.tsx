import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Award, Sparkles } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import ProductGrid from '@/components/ProductGrid';
import { TEXT } from '@/constants';
import { useEffect } from 'react';

const Home = () => {
  const { data: productsData, isLoading, error } = useProducts({ limit: 8 });

  // Set page title
  useEffect(() => {
    document.title = `${TEXT.HOME.HERO_TITLE} - Wool Shop`;
  }, []);

  const features = [
    {
      icon: Heart,
      title: TEXT.HOME.FEATURE_HANDMADE,
      description: TEXT.HOME.FEATURE_HANDMADE_DESC,
    },
    {
      icon: Award,
      title: TEXT.HOME.FEATURE_QUALITY,
      description: TEXT.HOME.FEATURE_QUALITY_DESC,
    },
    {
      icon: Sparkles,
      title: TEXT.HOME.FEATURE_UNIQUE,
      description: TEXT.HOME.FEATURE_UNIQUE_DESC,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 overflow-hidden">
        <div className="absolute inset-0 bg-white/50"></div>
        <div className="relative container section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 mb-6">
              <span className="text-gradient">{TEXT.HOME.HERO_TITLE}</span>
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              {TEXT.HOME.HERO_SUBTITLE}
            </p>
            <Link
              to="/products"
              className="btn-primary btn-lg inline-flex items-center group"
            >
              {TEXT.HOME.HERO_CTA}
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-200 rounded-full opacity-20 animate-bounce-gentle"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-secondary-200 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-accent-200 rounded-full opacity-20 animate-bounce-gentle" style={{ animationDelay: '2s' }}></div>
      </section>

      {/* Story Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-6">
              {TEXT.HOME.STORY_TITLE}
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              {TEXT.HOME.STORY_CONTENT}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-neutral-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">
              {TEXT.HOME.FEATURES_TITLE}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-800 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="section bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">
              Sản phẩm nổi bật
            </h2>
            <p className="text-lg text-neutral-600">
              Khám phá những sản phẩm len thủ công đẹp nhất của chúng tôi
            </p>
          </div>
          
          <ProductGrid
            products={productsData?.data || []}
            loading={isLoading}
            error={error?.message}
          />
          
          {productsData?.data && productsData.data.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="btn-outline btn-lg inline-flex items-center group"
              >
                Xem tất cả sản phẩm
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
