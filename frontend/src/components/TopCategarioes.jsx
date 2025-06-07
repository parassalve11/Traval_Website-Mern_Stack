import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { BentoGrid, BentoGridItem } from '../components/ui/bento-grid';

// Placeholder component for the image header
const Skeleton = ({ imageUrl }) => (
  <div
    className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-cover bg-center"
    style={{ backgroundImage: `url(${imageUrl})` }}
  ></div>
);

export function TopCategories() {
  const headingRef = useRef(null);

  useEffect(() => {
    // Animate heading
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <h2
          ref={headingRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-teal-800 mb-8 font-display"
        >
          Top Categories
        </h2>
        <BentoGrid className="max-w-7xl mx-auto">
          {destinations.map((destination, i) => (
            <BentoGridItem
              key={i}
              title={destination.title}
              description={destination.description}
              header={<Skeleton imageUrl={destination.imageUrl} />}
              icon={destination.icon}
              className={i === 0 || i === 3 ? 'md:col-span-2' : ''}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}

const destinations = [
  {
    title: 'Manali',
    description: 'Experience the serene hills, adventure sports, and vibrant culture of this Himalayan gem.',
    imageUrl:
      'https://images.unsplash.com/photo-1597073867736-6758e842e983?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Jaipur',
    description: 'Explore the Pink City with its majestic forts, palaces, and rich Rajasthani heritage.',
    imageUrl:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Kerala Backwaters',
    description: 'Cruise through tranquil waters, lush greenery, and unique houseboat experiences.',
    imageUrl:
      'https://images.unsplash.com/photo-1618142857173-3d7916d95d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Goa',
    description: 'Relax on pristine beaches, enjoy vibrant nightlife, and savor coastal cuisine.',
    imageUrl:
      'https://images.unsplash.com/photo-1514282401047-d2e53feda951?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Ladakh',
    description: 'Discover rugged landscapes, ancient monasteries, and thrilling biking routes.',
    imageUrl:
      'https://images.unsplash.com/photo-1597751853364-2c3e53e798dd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Varanasi',
    description: 'Immerse in spiritual vibes, ancient ghats, and the sacred Ganges River.',
    imageUrl:
      'https://images.unsplash.com/photo-1587668178277-295251f432ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  },
  {
    title: 'Udaipur',
    description: 'Marvel at romantic lakes, grand palaces, and the charm of the City of Lakes.',
    imageUrl:
      'https://images.unsplash.com/photo-1567337710280-f9c516b6dd4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  },
];