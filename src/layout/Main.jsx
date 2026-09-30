import { useEffect } from "react"
import Footer from "@/components/shared/Footer"
import Navbar from "@/components/shared/Navbar"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { Outlet, useLocation } from "react-router-dom"

const Main = () => {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      // Wait a frame so the target section has rendered.
      requestAnimationFrame(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }))
    } else {
      window.scrollTo({ top: 0, behavior: "instant" })
    }
  }, [pathname, hash])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      {/* The home hero sits under the fixed navbar; every other page is pushed below it. */}
      <main className={cn("flex-1", pathname !== "/" && "pt-16 md:pt-20")}>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default Main
