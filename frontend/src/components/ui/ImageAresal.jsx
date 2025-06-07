
import React, { useState } from 'react';
import { AnimatePresence, motion as Motion } from 'motion/react';


const items = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGluZGlhfGVufDB8fDB8fHww',
    title: 'Manali',
    description: 'Snowy Himalayan Retreat',
    tags: ['Mountains', 'Snow', 'Adventure'],
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1572782252655-9c8771392601?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFoYXJhc2h0cmF8ZW58MHx8MHx8fDA%3D',
    title: 'Goa',
    description: 'Vibrant Coastal Paradise',
    tags: ['Beaches', 'Sunset', 'Relaxation'],
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1572782252655-9c8771392601?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFoYXJhc2h0cmF8ZW58MHx8MHx8fDA%3D',
    title: 'Ladakh',
    description: 'Rugged Desert Adventure',
    tags: ['Desert', 'Monasteries', 'Exploration'],
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1519955266818-0231b63402bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhfGVufDB8fDB8fHww',
    title: 'Kerala',
    description: 'Lush Backwaters',
    tags: ['Backwaters', 'Greenery', 'Serenity'],
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1626407339413-60f4e6bc455e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1haGFyYXNodHJhfGVufDB8fDB8fHww',
    title: 'Rajasthan',
    description: 'Royal Desert Palaces',
    tags: ['Palaces', 'Desert', 'Culture'],
  },
];

const articleVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

const Gallery = ({ items, setIndex, index }) => {
  return (
    <div className="w-full max-w-3xl m-auto gap-1 flex flex-col md:flex-row ">
      {items.slice(0, 5).map((item, i) => (
        <Motion.div
          whileTap={{ scale: 0.95 }}
          className={`rounded-lg relative ${
            index === i ? 'w-full md:w-[400px]' : 'w-full md:w-[64px]'
          } h-28 md:h-36 flex-shrink-0 transition-[width] duration-500 ease-in-out origin-center overflow-hidden`}
          key={item.id}
          onClick={() => setIndex(i)}
          onMouseEnter={() => setIndex(i)}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIndex(i)}
          aria-label={`Select ${item.title} image`}
        >
          <img
            src={item.url}
            className={`${
              index === i ? 'cursor-default' : 'cursor-pointer'
            } w-full h-full object-cover rounded-lg`}
            width={960}
            height={480}
            alt={`Image of ${item.title}`}
            priority={i === index}
          />
          <AnimatePresence mode="wait">
            {index === i && (
              <Motion.article
                variants={articleVariants}
                initial="hidden"
                animate="show"
                className="absolute flex rounded-lg flex-col justify-end h-full top-0 p-4 space-y-2 overflow-hidden bg-gradient-to-t from-black/70 to-transparent to-70%"
              >
                <Motion.h1
                  variants={articleVariants}
                  className="text-lg md:text-xl font-bold text-teal-600 font-display"
                >
                  {item.title}
                </Motion.h1>
                <Motion.p
                  variants={articleVariants}
                  className="text-sm md:text-base text-white font-body leading-tight"
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
    <div className="relative bg-transparent mb-2 w-full">
      <Gallery items={items} index={index} setIndex={setIndex} />
    </div>
  );
};

export default TravelGallery;