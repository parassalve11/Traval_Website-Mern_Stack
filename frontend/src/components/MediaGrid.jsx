

import React, { useRef, useState } from 'react';
import { motion as Motion, useInView } from 'motion/react';


function MediaGrid() {
  const [_, setSelected] = useState(null);

  return (
    <section className="bg-black py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-teal-600 font-display text-center mb-6">
          Explore More Destinations
        </h2>
        <div className="columns-2 md:columns-3 2xl:columns-4 gap-4">
          {items.map((item, index) => (
            <MediaItem
              key={item.id}
              item={item}
              index={index}
              setSelected={setSelected}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function MediaItem({ item, setSelected }) {
  const ref = useRef(null);
  const videoRef = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => console.error('Video play failed:', error));
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <Motion.figure
      whileTap={{ scale: 0.9 }}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      ref={ref}
      className="inline-block group w-full rounded-md relative bg-black overflow-hidden before:absolute before:top-0 before:content-[''] before:h-full before:w-full hover:before:bg-gradient-to-t before:from-black/70 before:from-5% before:to-transparent before:to-90% cursor-pointer"
      onClick={() => {
        setSelected(item);
        if (item.type === 'video') {
          isPlaying ? handlePause() : handlePlay();
        }
      }}
      onMouseEnter={item.type === 'video' ? handlePlay : undefined}
      onMouseLeave={item.type === 'video' ? handlePause : undefined}
      aria-label={item.type === 'video' ? `Video of ${item.title}, hover to play` : `Image of ${item.title}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && setSelected(item)}
    >
      {item.type === 'video' ? (
        <Motion.video
          layoutId={`card-${item.id}`}
          whileHover={{ scale: 1.025 }}
          ref={videoRef}
          className="w-full h-full object-cover rounded-md"
          src={item.videoUrl}
          poster={item.url}
          muted
          loop
          preload="metadata"
        />
      ) : (
        <Motion.img
          layoutId={`card-${item.id}`}
          whileHover={{ scale: 1.025 }}
          src={item.url}
          className="w-full h-full object-cover rounded-md"
          alt={`Image of ${item.title}`}
        />
      )}
      <div className="flex flex-wrap mt-2 absolute bottom-0 left-0 p-2 group-hover:opacity-100 opacity-0 font-semibold">
        <h1 className="text-teal-600 font-display text-lg">{item.title}</h1>
      </div>
    </Motion.figure>
  );
}
// @/components/website/constant.js
export const items = [
  {
    id: '1',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1572782252655-9c8771392601?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFoYXJhc2h0cmF8ZW58MHx8MHx8fDA%3D',
    title: 'Manali',
    description: 'Snowy Himalayan Retreat',
  },
  {
    id: '2',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1580818135730-ebd11086660b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGtlcmFsYXxlbnwwfHwwfHx8MA%3D%3D',
    title: 'Goa',
    description: 'Vibrant Coastal Paradise',
  },
  {
    id: '3',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1519955266818-0231b63402bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhfGVufDB8fDB8fHww',
    title: 'Ladakh',
    description: 'Rugged Desert Adventure',
  },
  {
    id: '4',
    type: 'video',
    url: 'https://images.unsplash.com/photo-1496372412473-e8548ffd82bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aW5kaWF8ZW58MHx8MHx8fDA%3D',
    videoUrl: 'https://videos.pexels.com/video-files/855171/855171-hd_1920_1080_30fps.mp4',
    title: 'Kerala',
    description: 'Lush Backwaters',
  },
  {
    id: '5',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGluZGlhfGVufDB8fDB8fHww',
    title: 'Rajasthan',
    description: 'Royal Desert Palaces',
  },
  {
    id: '6',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1580818135730-ebd11086660b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGtlcmFsYXxlbnwwfHwwfHx8MA%3D%3D',
    title: 'Shimla',
    description: 'Himalayan Serenity',
  },
  {
    id: '7',
    type: 'image',
    url: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGluZGlhfGVufDB8fDB8fHww',
    title: 'Andaman',
    description: 'Island Paradise',
  },
  {
    id: '8',
    type: 'video',
    url: "/video1.mp4",
    videoUrl: 'https://videos.pexels.com/video-files/854656/854656-hd_1920_1080_30fps.mp4',
    title: 'Udaipur',
    description: 'City of Lakes',
  },
];
export default MediaGrid;