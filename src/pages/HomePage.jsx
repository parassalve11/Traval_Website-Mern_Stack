

import HeroSection from '../components/HeroSection';
import { TopCategories } from '../components/TopCategarioes';
import SeeAllUpcomingTrips from '../components/SeeAllUpcomingTrips';
import HowItWorks from '../components/HowItWorks';
import Gallery from '../components/Gallery';
import BookingForm from '../components/form/BookingForm';



const HomePage = () => {
  // Define video paths (assuming videos are in public/videos/)
  

  

  return (
   <div>
    <HeroSection />
    <TopCategories />
    <SeeAllUpcomingTrips />
    <BookingForm />
    <Gallery />
    <HowItWorks />
   </div>
  );
};

export default HomePage;