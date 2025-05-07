import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { useState, useRef } from "react";

const Carousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState(null);
  const containerRef = useRef(null);

  const goTo = (index) => {
    const total = items.length;
    setCurrentIndex((index + total) % total);
  };

  const goPrev = () => goTo(currentIndex - 1);
  const goNext = () => goTo(currentIndex + 1);

  return (
    <div className="relative w-screen overflow-hidden select-none" ref={containerRef}>
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex*33.335}%)`, width: `${items.length * 100}%` }}
      >
        {items.map((item, index) => (
          <div className="w-screen flex-shrink-0 flex items-center justify-center">
            <img
              src={item}
              alt={`Slide ${index}`}
              className="w-full h-50 sm:h-auto max-h-screen object-cover"
            />
          </div>        
        ))}

      </div>

      <button
        onClick={goPrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-green-600 hover:cursor-pointer"
      >
        <CircleArrowLeft size={40} />
      </button>
      <button
        onClick={goNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-600 hover:cursor-pointer"
      >
        <CircleArrowRight size={40} />
      </button>

      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-white/50"
            }`}
            onClick={() => goTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
