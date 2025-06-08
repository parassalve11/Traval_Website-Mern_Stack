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
      'https://images.unsplash.com/photo-1573143950521-36ef5345dae9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFoYXJhc2h0cmF8ZW58MHx8MHx8fDA%3D',
  },
  {
    title: 'Jaipur',
    description: 'Explore the Pink City with its majestic forts, palaces, and rich Rajasthani heritage.',
    imageUrl:
      'https://images.unsplash.com/photo-1626407339413-60f4e6bc455e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1haGFyYXNodHJhfGVufDB8fDB8fHww',
  },
  {
    title: 'Kerala Backwaters',
    description: 'Cruise through tranquil waters, lush greenery, and unique houseboat experiences.',
    imageUrl:
      'https://images.unsplash.com/photo-1519955266818-0231b63402bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhfGVufDB8fDB8fHww',
  },
  {
    title: 'Goa',
    description: 'Relax on pristine beaches, enjoy vibrant nightlife, and savor coastal cuisine.',
    imageUrl:
      'https://images.unsplash.com/photo-1519955266818-0231b63402bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhfGVufDB8fDB8fHww',
  },
  {
    title: 'Ladakh',
    description: 'Discover rugged landscapes, ancient monasteries, and thrilling biking routes.',
    imageUrl:
      'https://images.unsplash.com/photo-1519955266818-0231b63402bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGluZGlhfGVufDB8fDB8fHww',
  },
  {
    title: 'Varanasi',
    description: 'Immerse in spiritual vibes, ancient ghats, and the sacred Ganges River.',
    imageUrl:
      'https://images.unsplash.com/photo-1573143950521-36ef5345dae9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bWFoYXJhc2h0cmF8ZW58MHx8MHx8fDA%3D',
  },
  {
    title: 'Udaipur',
    description: 'Marvel at romantic lakes, grand palaces, and the charm of the City of Lakes.',
    imageUrl:
      'https://images.unsplash.com/photo-1626407339413-60f4e6bc455e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fG1haGFyYXNodHJhfGVufDB8fDB8fHww',
  },
];