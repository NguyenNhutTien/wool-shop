const LoadingSkeleton = () => {
  return (
    <div className="card animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-neutral-200"></div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Tags skeleton */}
        <div className="flex space-x-2">
          <div className="h-5 bg-neutral-200 rounded-full w-16"></div>
          <div className="h-5 bg-neutral-200 rounded-full w-12"></div>
        </div>
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-neutral-200 rounded w-3/4"></div>
          <div className="h-5 bg-neutral-200 rounded w-1/2"></div>
        </div>
        
        {/* Price skeleton */}
        <div className="h-6 bg-neutral-200 rounded w-24"></div>
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-neutral-200 rounded w-full"></div>
          <div className="h-4 bg-neutral-200 rounded w-2/3"></div>
        </div>
      </div>
      
      {/* Buttons skeleton */}
      <div className="p-4 pt-0 flex space-x-2">
        <div className="h-8 bg-neutral-200 rounded flex-1"></div>
        <div className="h-8 bg-neutral-200 rounded w-20"></div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
