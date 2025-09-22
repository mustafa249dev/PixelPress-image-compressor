import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const links = [
    { name: "Home", href: "/" },
    { name: "Compress", href: "/compress" },
    { name: "About", href: "#" },
    { name: "Services", href: "#" },
  ];
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-zinc-900 shadow-md fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex-shrink-0 text-xl font-bold text-white">
          <Link to="/">PixelPress</Link>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-white hover:text-gray-300"
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setOpen(true)}
            className="text-white focus:outline-none"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 shadow-lg z-30 transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="flex items-center justify-between px-4 h-16 border-b">
          <span className="text-xl font-bold text-white">
            <Link to="/">PixelPress</Link>
          </span>
          <button
            onClick={() => setOpen(false)}
            className="text-white focus:outline-none"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col mt-4 space-y-4 px-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-white hover:text-gray-300 p-2 border-b  border-gray-700"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
