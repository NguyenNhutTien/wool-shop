import { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useTags } from '@/hooks/useProducts';
import ProductGrid from '@/components/ProductGrid';
import { TEXT } from '@/constants';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch products with current filters
  const { data: productsData, isLoading, error } = useProducts({
    search: searchTerm || undefined,
    tag: selectedTag || undefined,
    page,
    limit: 12,
  });

  // Fetch available tags
  const { data: tagsData } = useTags();

  // Set page title
  useEffect(() => {
    document.title = `${TEXT.PRODUCTS.TITLE} - Wool Shop`;
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedTag]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the effect above
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
    setShowFilters(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTag('');
    setPage(1);
  };

  const hasActiveFilters = searchTerm || selectedTag;

  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">
            {TEXT.PRODUCTS.TITLE}
          </h1>
          <p className="text-lg text-neutral-600">
            Khám phá bộ sưu tập sản phẩm len thủ công độc đáo
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={TEXT.PRODUCTS.SEARCH_PLACEHOLDER}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10 pr-4"
                />
              </div>
            </form>

            {/* Filter Toggle & Clear */}
            <div className="flex items-center space-x-2">
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="btn-ghost btn-sm flex items-center"
                >
                  <X className="w-4 h-4 mr-1" />
                  {TEXT.COMMON.CLEAR}
                </button>
              )}
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="btn-outline btn-sm flex items-center sm:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                {TEXT.COMMON.FILTER}
              </button>
            </div>
          </div>

          {/* Tags Filter */}
          <div className={`mt-4 ${showFilters ? 'block' : 'hidden sm:block'}`}>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleTagSelect('')}
                className={`badge ${
                  !selectedTag
                    ? 'bg-primary-500 text-white'
                    : 'badge-neutral hover:bg-neutral-200'
                } cursor-pointer transition-colors duration-200`}
              >
                {TEXT.COMMON.ALL}
              </button>
              
              {tagsData?.data?.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  className={`badge ${
                    selectedTag === tag
                      ? 'bg-primary-500 text-white'
                      : 'badge-neutral hover:bg-neutral-200'
                  } cursor-pointer transition-colors duration-200`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="mt-4 flex flex-wrap gap-2 items-center">
              <span className="text-sm text-neutral-600">Bộ lọc đang áp dụng:</span>
              
              {searchTerm && (
                <span className="badge-secondary flex items-center">
                  Tìm kiếm: "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm('')}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              
              {selectedTag && (
                <span className="badge-secondary flex items-center">
                  Danh mục: {selectedTag}
                  <button
                    onClick={() => setSelectedTag('')}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={productsData?.data || []}
          loading={isLoading}
          error={error?.message}
        />

        {/* Pagination */}
        {productsData?.pagination && productsData.pagination.pages > 1 && (
          <div className="mt-12 flex justify-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={!productsData.pagination.hasPrev}
                className="btn-outline btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {TEXT.COMMON.PREVIOUS}
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: productsData.pagination.pages }, (_, i) => i + 1)
                  .filter(pageNum => {
                    // Show first page, last page, current page, and pages around current
                    return (
                      pageNum === 1 ||
                      pageNum === productsData.pagination.pages ||
                      Math.abs(pageNum - page) <= 1
                    );
                  })
                  .map((pageNum, index, array) => {
                    // Add ellipsis if there's a gap
                    const showEllipsis = index > 0 && pageNum - array[index - 1] > 1;
                    
                    return (
                      <div key={pageNum} className="flex items-center">
                        {showEllipsis && <span className="px-2 text-neutral-400">...</span>}
                        <button
                          onClick={() => setPage(pageNum)}
                          className={`w-8 h-8 text-sm rounded ${
                            page === pageNum
                              ? 'bg-primary-500 text-white'
                              : 'text-neutral-600 hover:bg-neutral-100'
                          }`}
                        >
                          {pageNum}
                        </button>
                      </div>
                    );
                  })}
              </div>
              
              <button
                onClick={() => setPage(page + 1)}
                disabled={!productsData.pagination.hasNext}
                className="btn-outline btn-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {TEXT.COMMON.NEXT}
              </button>
            </div>
          </div>
        )}

        {/* Results Info */}
        {productsData?.pagination && (
          <div className="mt-8 text-center text-sm text-neutral-600">
            Hiển thị {((productsData.pagination.page - 1) * productsData.pagination.limit) + 1} - {Math.min(productsData.pagination.page * productsData.pagination.limit, productsData.pagination.total)} trong tổng số {productsData.pagination.total} sản phẩm
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
