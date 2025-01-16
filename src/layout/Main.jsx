import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"
import { Outlet } from "react-router-dom"

const Main = () => {
  return (
    <div>

      <Navbar />
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Main
