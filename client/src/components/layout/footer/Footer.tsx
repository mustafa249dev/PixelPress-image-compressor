import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const links = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

const social = [
  { icon: <FaGithub />, href: "https://github.com/", label: "GitHub" },
  { icon: <FaTwitter />, href: "https://twitter.com/", label: "Twitter" },
  { icon: <FaLinkedin />, href: "https://linkedin.com/", label: "LinkedIn" },
];

const Footer = () => (
  <footer className="bg-zinc-900 text-gray-200 py-8">
    <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center gap-6">
      <div className="flex flex-col items-center md:items-start">
        <span className="text-2xl font-bold text-white">PixelPress</span>
        <span className="text-sm text-gray-400 mt-1">
          &copy; {new Date().getFullYear()} PixelPress. All rights reserved.
        </span>
      </div>
      <nav className="flex flex-wrap gap-4">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.href}
            className="hover:text-white transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>
      <div className="flex gap-4">
        {social.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.label}
            className="text-gray-400 hover:text-white text-xl transition-colors"
          >
            {item.icon}
          </a>
        ))}
      </div>
    </div>
  </footer>
);

export default Footer;
