"use client";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import productImg from "@/public/product/images.jpg"; // StaticImageData

type Product = {
  id: number;
  name: string;
  slug: string;
  price: number;
  unit?: string;
  image: string | StaticImageData;
};

const products: Product[] = [
  {
    id: 1,
    name: "Fresh Organic Vegetables",
    slug: "organic-vegetables",
    price: 250,
    unit: "1 kg",
    image: productImg,
  },
  {
    id: 2,
    name: "Farm Fresh Chicken",
    slug: "fresh-chicken",
    price: 550,
    unit: "1 kg",
    image: productImg,
  },
  {
    id: 3,
    name: "Natural Farm Eggs",
    slug: "farm-eggs",
    price: 120,
    unit: "12 pcs",
    image: productImg,
  },
  {
    id: 4,
    name: "Fresh River Fish",
    slug: "river-fish",
    price: 600,
    unit: "1 kg",
    image: productImg,
  },
];

export default function ProductSection() {
  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-8">
        Featured Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="relative bg-white rounded-lg shadow-sm overflow-hidden group flex flex-col"
          >
            {/* Product Image */}
            <Link
              href={`/product/${product.slug}`}
              className="relative w-full h-36 md:h-40"
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-2 transition duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Product Info */}
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-sm md:text-base font-semibold text-gray-800 line-clamp-2">
                  {product.name}
                </h3>
                {product.unit && (
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    {product.unit}
                  </p>
                )}
              </div>

              <div className="mt-2 flex items-center justify-between">
                <span className="text-green-600 font-bold text-base md:text-lg">
                  ৳ {product.price}
                </span>
              </div>
            </div>

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-green-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition cursor-pointer">
              <span className="font-semibold text-sm md:text-base text-[var(--primary)]">
                Add to Bag
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
