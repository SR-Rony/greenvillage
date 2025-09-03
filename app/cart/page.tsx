"use client";

import { removeItem, updateQuantity, clearCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";
import { Trash2, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items, totalAmount, totalQuantity } = useAppSelector((s) => s.cart);

  const [shippingCost, setShippingCost] = useState(50); // Example shipping cost

  const handleIncrease = (id: string, current: number) => {
    dispatch(updateQuantity({ id, quantity: current + 1 }));
  };

  const handleDecrease = (id: string, current: number) => {
    if (current > 1) dispatch(updateQuantity({ id, quantity: current - 1 }));
  };

  const totalWithShipping = totalAmount + shippingCost;

  const handleCheckout = () => {
  if (items.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  router.push("/checkout"); // navigate to your checkout page
};

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-700">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:justify-between bg-white rounded-lg shadow p-4 sm:p-6 gap-4"
              >
                {/* Item Info */}
                <div className="flex items-center gap-4 flex-1">
                  {item.image ? (
                    <Image
                      src={item.image || "/placeholder.png"}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}
                  <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-green-600 font-bold text-base mt-1">
                      ৳ {item.price.toLocaleString("en-BD")}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div className="flex items-center gap-3 mt-3 sm:mt-0">
                  <button
                    onClick={() => handleDecrease(item.id, item.quantity)}
                    className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 py-1 border rounded-md">{item.quantity}</span>
                  <button
                    onClick={() => handleIncrease(item.id, item.quantity)}
                    className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    <Plus className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md transition ml-4"
                  >
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between bg-green-50 rounded-lg p-6 shadow gap-4">
            <div className="text-lg font-medium text-gray-700">
              Total Items: <span className="font-bold">{totalQuantity}</span>
            </div>
            <div className="text-lg font-medium text-gray-700">
              Shipping: <span className="font-bold">৳ {shippingCost.toLocaleString("en-BD")}</span>
            </div>
            <div className="text-xl font-bold text-green-700">
              Total: ৳ {totalWithShipping.toLocaleString("en-BD")}
            </div>
            <button
              onClick={() => dispatch(clearCart())}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
            >
              Clear Cart
            </button>
          </div>

          {/* Checkout Button */}
          <div className="mt-6 text-center">
            <button
              onClick={handleCheckout}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
