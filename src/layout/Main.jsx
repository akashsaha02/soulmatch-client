import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"
import { Outlet } from "react-router-dom"

const Main = () => {
  return (
    <div>

      <Navbar />
      <div className="max-w-[1920px] mx-auto min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Main
