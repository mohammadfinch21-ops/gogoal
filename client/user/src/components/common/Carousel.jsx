import { useState } from "react";

const Carousel = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide}
            alt={`slide-${index}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <div className="absolute inset-0 flex items-center justify-between px-4 z-20">

        <button
          onClick={prevSlide}
          className="btn btn-circle bg-black/50 border-none text-white"
        >
          ❮
        </button>

        <button
          onClick={nextSlide}
          className="btn btn-circle bg-black/50 border-none text-white"
        >
          ❯
        </button>

      </div>

    </div>
  );
};

export default Carousel;