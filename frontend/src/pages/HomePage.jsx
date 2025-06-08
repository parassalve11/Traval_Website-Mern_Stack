

import HeroSection from '../components/HeroSection';
import { TopCategories } from '../components/TopCategarioes';
import SeeAllUpcomingTrips from '../components/SeeAllUpcomingTrips';
import HowItWorks from '../components/HowItWorks';
import Gallery from '../components/Gallery';
import BookingForm from '../components/form/BookingForm';
import ReviewsPage from './ReviewPage';
import MediaGrid from '../components/MediaGrid'


const HomePage = () => {
  // Define video paths (assuming videos are in public/videos/)
  

  

  return (
   <div>
    <HeroSection />
    <TopCategories />
    <SeeAllUpcomingTrips />
    <Gallery />
    <HowItWorks />
    <BookingForm />
    <MediaGrid />
    <ReviewsPage />
    
    
   </div>
  );
};

export default HomePage;