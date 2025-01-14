import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"
import { Outlet } from "react-router-dom"

const Main = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Main
