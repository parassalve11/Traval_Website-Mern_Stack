import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import GallaryPage from "./pages/GallaryPage"
import UpcomingTripsPage from "./pages/UpcomingTripsPage"
import DestinationPage from "./pages/DestinationPage"
import BookingPage from "./pages/BookingPage"
import { Toaster } from "react-hot-toast"
import Booking from "./components/Booking"
import AboutPage from "./pages/AboutPage"
import ReviewsPage from "./pages/ReviewPage"

function App() {
  
  return <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallary" element={<GallaryPage />} />
      <Route path="/upcoming-trips" element={<UpcomingTripsPage />} />
      <Route path="/destination" element={<DestinationPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/reviews" element={<ReviewsPage />} />
      <Route path="/testimonials" element={<ReviewsPage />} />
      <Route path="/admin34" element={<Booking />} />
    </Routes>
    <Toaster position="top-center" />
  </Layout>
}

export default App
