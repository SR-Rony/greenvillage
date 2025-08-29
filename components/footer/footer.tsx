"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-green-50 to-green-100 border-t mt-10">
      <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-green-700">Greenvillage</h2>
          <p className="mt-3 text-gray-600 text-sm">
            Fresh, organic and healthy products directly from the village to your home.
          </p>
          <div className="flex gap-3 mt-4">
            <Link href="#" className="p-2 bg-green-600 rounded-full text-white hover:bg-green-700">
              <Facebook className="h-4 w-4" />
            </Link>
            <Link href="#" className="p-2 bg-green-600 rounded-full text-white hover:bg-green-700">
              <Instagram className="h-4 w-4" />
            </Link>
            <Link href="#" className="p-2 bg-green-600 rounded-full text-white hover:bg-green-700">
              <Twitter className="h-4 w-4" />
            </Link>
            <Link href="#" className="p-2 bg-green-600 rounded-full text-white hover:bg-green-700">
              <Youtube className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-green-700">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>
              <Link href="/" className="hover:text-green-600">Home</Link>
            </li>
            <li>
              <Link href="/all-products" className="hover:text-green-600">All Products</Link>
            </li>
            <li>
              <Link href="/categories" className="hover:text-green-600">Categories</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-600">Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h3 className="text-lg font-semibold text-green-700">Customer Service</h3>
          <ul className="mt-4 space-y-2 text-gray-600">
            <li>
              <Link href="/faq" className="hover:text-green-600">FAQ</Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-green-600">Shipping & Delivery</Link>
            </li>
            <li>
              <Link href="/returns" className="hover:text-green-600">Returns & Refunds</Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-green-600">Privacy Policy</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-green-700">Get in Touch</h3>
          <ul className="mt-4 space-y-3 text-gray-600 text-sm">
            <li className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <span>Village Market, Dhaka, Bangladesh</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-green-600" />
              <span>+880 1743-493707</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-green-600" />
              <span>support@greenvillage.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-green-700 text-white py-3 text-center text-sm">
        © {new Date().getFullYear()} Greenvillage. All Rights Reserved.
      </div>
    </footer>
  );
}
