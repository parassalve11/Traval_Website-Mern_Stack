import { Route, Routes } from "react-router-dom"
import Layout from "./components/layout/Layout"
import HomePage from "./pages/HomePage"
import GallaryPage from "./pages/GallaryPage"

function App() {
  
  return <Layout>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/gallary" element={<GallaryPage />} />
    </Routes>
  </Layout>
}

export default App
