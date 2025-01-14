// import { useState } from "react";
// import clsx from "clsx";
// import { Link, NavLink } from "react-router-dom";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "About", href: "/about" },
//     { name: "Services", href: "/services" },
//     { name: "Contact", href: "/contact" },
//   ];

//   return (
//     <nav className="bg-white border-b shadow-md sticky top-0 z-50">
//       <div className="container mx-auto flex items-center justify-between p-4">
//         {/* Logo */}
//         <div className="text-xl font-bold">Logo</div>

//         {/* Hamburger Icon */}
//         <button
//           className="lg:hidden flex items-center text-gray-700 focus:outline-none"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="w-6 h-6"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//             />
//           </svg>
//         </button>

//         {/* Nav Items and Buttons */}
//         <div
//           className={clsx(
//             "lg:flex items-center justify-center lg:space-x-8 lg:static absolute top-full left-0 w-full bg-white lg:bg-transparent lg:w-auto z-50 transition-transform duration-300",
//             {
//               "transform translate-y-0": isOpen,
//               "transform -translate-y-full lg:transform-none": !isOpen,
//             }
//           )}
//         >
//           {/* Centered Nav Items */}
//           <ul className="flex flex-col lg:flex-row items-center lg:space-x-6 space-y-4 lg:space-y-0">
//             {navItems.map((item) => (
//               <li key={item.name}>
//                 <NavLink
//                   to={item.href}
//                   className="block text-gray-700 px-4 py-2 hover:text-blue-500"
//                 >
//                   {item.name}
//                 </NavLink>
//               </li>
//             ))}
//           </ul>

//           {/* Right Aligned Buttons */}
//           <div className="flex flex-col lg:flex-row lg:space-x-4 mt-4 lg:mt-0 items-center">
//             <Link
//               to="/login"
//               className="block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
//             >
//               Login
//             </Link>
//             <Link
//               to="/register"
//               className="block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
//             >
//               Register
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";
import { Card } from "@/components/ui/card";
//   import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
//   import ShadcnKit from "@/components/icons/shadcn-kit";
import { nanoid } from "nanoid";
import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <Card className="bg-card py-3 px-4 border-0 flex items-center justify-between gap-6">
            {/* <ShadcnKit className="text-primary cursor-pointer" /> */}
            <div className="">
                Matrimonealsite
            </div>

            <ul className="hidden md:flex items-center gap-10 text-card-foreground">
                <li className="text-primary font-medium">
                    <a href="#home">Home</a>
                </li>
                <li>
                    <a href="#features">Features</a>
                </li>
                <li>
                    <a href="#pricing">Pricing</a>
                </li>
                <li>
                    <a href="#faqs">FAQs</a>
                </li>
               
            </ul>

            <div className="flex items-center">
                <Button variant="secondary" className="hidden md:block px-2">
                    Login
                </Button>
                <Button className="hidden md:block ml-2 mr-2">Get Started</Button>

                <div className="flex md:hidden mr-2 items-center gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <span className="py-2 px-2 bg-gray-100 rounded-md">Pages</span>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="start">
                            {landings.map((page) => (
                                <DropdownMenuItem key={page.id}>
                                    <Link href={page.route}>{page.title}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5 rotate-0 scale-100" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <a href="#home">Home</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#features">Features</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#pricing">Pricing</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <a href="#faqs">FAQs</a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button variant="secondary" className="w-full text-sm">
                                    Login
                                </Button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Button className="w-full text-sm">Get Started</Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* <ThemeToggle /> */}
            </div>
        </Card>
    );
};

const landings = [
    {
        id: nanoid(),
        title: "Landing 01",
        route: "/project-management",
    },
    {
        id: nanoid(),
        title: "Landing 02",
        route: "/crm-landing",
    },
    {
        id: nanoid(),
        title: "Landing 03",
        route: "/ai-content-landing",
    },
    {
        id: nanoid(),
        title: "Landing 04",
        route: "/new-intro-landing",
    },
    
];

export default Navbar;
