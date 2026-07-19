export default function GlobalLoading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center w-full">
      {/* Şık ve minimalist bir CSS spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute w-full h-full border-4 border-gray-100 rounded-full"></div>
        <div className="absolute w-full h-full border-4 border-black rounded-full border-t-transparent animate-spin"></div>
      </div>
      <p className="mt-4 text-sm font-medium text-gray-500 tracking-wide animate-pulse">
        YÜKLENİYOR...
      </p>
    </div>
  );
}