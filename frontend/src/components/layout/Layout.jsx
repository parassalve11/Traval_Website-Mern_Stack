import Footer from "../Footer";
import Navbar from "./Navbar";


export default function Layout({children}) {
  return <div className='h-screen bg-gray-300'>
    <Navbar />
<main className='w-full m-auto'>
{children}
</main>
<Footer />
  </div>
}
