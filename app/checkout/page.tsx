"use client";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import Image from "next/image";
import { toast } from "sonner";
import { clearCart } from "@/redux/features/cart/cartSlice";
import { useRouter } from "next/navigation";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export default function CheckoutPage() {
  const { items, totalAmount } = useAppSelector((s) => s.cart);
  const dispatch = useAppDispatch();
  const router = useRouter()

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    zilla: "",
    upazila: "",
    fullAddress: "",
    notes: "",
  });

  const shippingCost = 50;
  const totalWithShipping = totalAmount + shippingCost;

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = async () => {
  if (!form.fullName || !form.phone || !form.zilla || !form.upazila || !form.fullAddress) {
    return toast.error("Please fill in all required fields.");
  }

  try {
    const orderData = {
      items: items.map((i) => ({
        productId: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        unit: i.unit || "pcs",
        image: i.image || "",
      })),
      shippingAddress: {
        fullName: form.fullName,
        phone: form.phone,
        zilla: form.zilla,
        upazila: form.upazila,
        fullAddress: form.fullAddress,
      },
      paymentMethod: "cod",
      notes: form.notes || "",
    };

    const res = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (!res.ok) return toast.error(data.message || "Failed to place order");

    toast.success("Order placed successfully!");
    dispatch(clearCart());

    // Redirect to dynamic order success page
    router.push(`/success-order/${data.order._id}`);
  } catch (err) {
    console.error("Order error:", err);
    toast.error("Something went wrong. Please try again.");
  }
};

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-10">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Billing Form */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow space-y-4">
          <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name *"
              value={form.fullName}
              onChange={handleInput}
              className="w-full border rounded-md p-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone *"
              value={form.phone}
              onChange={handleInput}
              className="w-full border rounded-md p-2"
            />
            <input
              type="text"
              name="zilla"
              placeholder="Zilla *"
              value={form.zilla}
              onChange={handleInput}
              className="w-full border rounded-md p-2"
            />
            <input
              type="text"
              name="upazila"
              placeholder="Upazila *"
              value={form.upazila}
              onChange={handleInput}
              className="w-full border rounded-md p-2"
            />
            <textarea
              name="fullAddress"
              placeholder="Full Address *"
              value={form.fullAddress}
              onChange={handleInput}
              className="w-full border rounded-md p-2 resize-none"
              rows={3}
            />
            <textarea
              name="notes"
              placeholder="Additional Notes (optional)"
              value={form.notes}
              onChange={handleInput}
              className="w-full border rounded-md p-2 resize-none"
              rows={2}
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 bg-white p-6 rounded-lg shadow flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {items.length === 0 ? (
              <p className="text-gray-500 text-center">Your cart is empty.</p>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={50}
                        height={50}
                        className="rounded-md object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{item.quantity}x</span>
                    <span className="text-green-600 font-semibold">
                      ৳ {(item.price * item.quantity).toLocaleString("en-BD")}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t pt-4 flex flex-col gap-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span>৳ {totalAmount.toLocaleString("en-BD")}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping:</span>
              <span>৳ {shippingCost.toLocaleString("en-BD")}</span>
            </div>
            <div className="flex justify-between font-bold text-green-700 text-lg">
              <span>Total:</span>
              <span>৳ {totalWithShipping.toLocaleString("en-BD")}</span>
            </div>
          </div>

          <button
            onClick={handlePayment}
            className="mt-4 w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
