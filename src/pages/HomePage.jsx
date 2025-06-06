
import { FaGoogle, FaInstagram, FaFacebook, FaMapMarkerAlt, FaStar, FaCompass } from 'react-icons/fa';
import HeroSection from '../components/HeroSection';
import { TopCategories } from '../components/TopCategarioes';
import SeeAllUpcomingTrips from '../components/SeeAllUpcomingTrips';
import HowItWorks from '../components/HowItWorks';
import Gallery from '../components/Gallery';



const HomePage = () => {
  // Define video paths (assuming videos are in public/videos/)
  

  

  return (
   <div>
    <HeroSection />
    <TopCategories />
    <SeeAllUpcomingTrips />
    <Gallery />
    <HowItWorks />
   </div>
  );
};

export default HomePage;