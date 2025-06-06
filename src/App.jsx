import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import GallaryPage from "./pages/GallaryPage"
import UpcomingTripsPage from "./pages/UpcomingTripsPage"
import DestinationPage from "./pages/DestinationPage"
import BookingPage from "./pages/BookingPage"

function App() {
  
  return <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallary" element={<GallaryPage />} />
      <Route path="/upcoming-trips" element={<UpcomingTripsPage />} />
      <Route path="/destination" element={<DestinationPage />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path="/reviews" element={<BookingPage />} />
    </Routes>
  </Layout>
}

export default App
