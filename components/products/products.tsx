"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/redux/hook";
import { addItem } from "@/redux/features/cart/cartSlice";

const baseUrl = process.env.NEXT_PUBLIC_API || "";

type Product = {
  _id: string;
  name: string;
  slug: string;
  price: number;
  unit?: string;
  quantity?: number; // optional quantity field
  images?: { url: string }[];
};

export default function ProductSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${baseUrl}/products`);
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Add to cart
  const handleAddToCart = (product: Product) => {
    dispatch(
      addItem({
        id: product._id,
        name: product.name,
        price: Number(product.price),
        quantity: 1,
        image: product.images?.[0]?.url ?? "/placeholder.png",
      })
    );
  };

  return (
    <section className="container mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-green-700 mb-8">
        Featured Products
      </h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading products...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="relative bg-white rounded-lg shadow-sm overflow-hidden group flex flex-col"
              >
                {/* Product Image */}
                <Link
                  href={`/product/${product.slug}`}
                  className="relative w-full h-36 md:h-40"
                >
                  <Image
                    src={product.images?.[0]?.url ?? "/placeholder.png"}
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

                  <div className="mt-2 flex flex-col gap-2">
                    <span className="text-green-600 font-bold text-base md:text-lg">
                      ৳ {Number(product.price).toLocaleString("en-BD")}
                    </span>

                    {product.quantity && product.quantity > 0 ? (
                      <Button
                        className="px-3 py-1 text-xs md:text-sm rounded-md transition cursor-pointer"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add To Bag
                      </Button>
                    ) : (
                      <Button
                        disabled
                        className="px-3 py-1 text-xs md:text-sm rounded-md transition cursor-not-allowed"
                      >
                        Out of Stock
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found
            </p>
          )}
        </div>
      )}
    </section>
  );
}
