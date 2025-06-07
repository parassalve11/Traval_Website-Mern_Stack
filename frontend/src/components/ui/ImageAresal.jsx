import React, { useState } from "react";
import { AnimatePresence, motion as Motion} from "framer-motion";

const items = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGluZGlhfGVufDB8fDB8fHww",
    title: "Manali",
    description: "Snowy Himalayan Retreat",
    tags: ["Mountains", "Snow", "Adventure"],
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1572782252655-9c8771392601?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFoYXJhc2h0cmF8ZW58MHx8MHx8fDA%3D",
    title: "Goa",
    description: "Vibrant Coastal Paradise",
    tags: ["Beaches", "Sunset", "Relaxation"],
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGluZGlhfGVufDB8fDB8fHww",
    title: "Ladakh",
    description: "Rugged Desert Adventure",
    tags: ["Desert", "Monasteries", "Exploration"],
  },
  {
    id: "4",
    url: "https://images.unsplash.com/photo-1519955266818-0231b63402bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhfGVufDB8fDB8fHww",
    title: "Kerala",
    description: "Lush Backwaters",
    tags: ["Backwaters", "Greenery", "Serenity"],
  },
  {
    id: "5",
    url: "https://images.unsplash.com/photo-1626407339413-60f4e6bc455e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1haGFyYXNodHJhfGVufDB8fDB8fHww",
    title: "Rajasthan",
    description: "Royal Desert Palaces",
    tags: ["Palaces", "Desert", "Culture"],
  },
];

const articleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const Gallery = ({ items, setIndex, index }) => {
  return (
    <div className="w-full h-full flex flex-row gap-1 overflow-x-auto snap-x snap-mandatory scrollbar-hidden">
      {items.slice(0, 5).map((item, i) => (
        <Motion.div
          layout // Enable layout animations for smooth width transitions
          whileTap={{ scale: 0.95 }}
          className={`rounded-lg relative ${
            index === i ? "w-[70%] sm:w-[300px] md:w-[400px]" : "w-[15%] sm:w-[48px] md:w-[64px]"
          } h-full flex-shrink-0 transition-[width] duration-500 ease-in-out snap-center overflow-hidden`}
          key={item.id}
          onClick={() => setIndex(i)}
          onMouseEnter={() => setIndex(i)}
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setIndex(i)}
          aria-label={`Select ${item.title} image`}
        >
          <img
            src={item.url}
            className={`${
              index === i ? "cursor-default" : "cursor-pointer"
            } w-full h-full object-cover rounded-lg`}
            width={960}
            height={480}
            alt={`Image of ${item.title}`}
            loading={i === index ? "eager" : "lazy"}
          />
          <AnimatePresence>
            {index === i && (
              <Motion.article
                key={item.id}
                variants={articleVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                className="absolute flex rounded-lg flex-col justify-end h-full top-0 p-2 sm:p-3 space-y-1 overflow-hidden bg-gradient-to-t from-black/70 to-transparent to-70%"
              >
                <Motion.h1
                  variants={articleVariants}
                  className="text-xs sm:text-sm md:text-lg font-bold text-teal-600 font-display"
                >
                  {item.title}
                </Motion.h1>
                <Motion.p
                  variants={articleVariants}
                  className="text-[10px] sm:text-xs md:text-sm text-white font-body leading-tight"
                >
                  {item.description}
                </Motion.p>
              </Motion.article>
            )}
          </AnimatePresence>
        </Motion.div>
      ))}
    </div>
  );
};

const TravelGallery = () => {
  const [index, setIndex] = useState(0);
  return (
    <div className="relative w-full h-full">
      <Gallery items={items} index={index} setIndex={setIndex} />
    </div>
  );
};

export default TravelGallery;