"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";

interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
    unit?: string;
    images?: { url: string }[];
  };
  quantity: number;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  zilla: string;
  upazila: string;
  fullAddress: string;
}

interface User {
  name: string;
  email: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  shippingFee: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  user?: User | null;
}

export default function OrderSuccessPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`${baseUrl}/orders/${id}`);
        const data = await res.json();
        if (res.ok) setOrder(data); // assuming API returns order object directly
      } catch (err) {
        console.error("Failed to fetch order:", err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-green-700">Order Placed Successfully!</h1>
        <p className="text-gray-600 mt-2">Order ID: {order._id}</p>
        <p className="text-gray-600 mt-1">
          Placed on: {new Date(order.createdAt).toLocaleString()}
        </p>
      </div>

      {/* Shipping Details */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
        <p><strong>Name:</strong> {order.shippingAddress.fullName}</p>
        <p><strong>Phone:</strong> {order.shippingAddress.phone}</p>
        <p><strong>Zilla:</strong> {order.shippingAddress.zilla}</p>
        <p><strong>Upazila:</strong> {order.shippingAddress.upazila}</p>
        <p><strong>Address:</strong> {order.shippingAddress.fullAddress}</p>
        {order.notes && <p><strong>Notes:</strong> {order.notes}</p>}
      </div>

      {/* Order Summary */}
      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {item.product.images?.[0]?.url ? (
                  <Image
                    src={item.product.images[0].url}
                    alt={item.product.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <span className="text-sm font-medium">{item.product.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">{item.quantity}x</span>
                <span className="text-green-600 font-semibold">
                  ৳ {(item.product.price * item.quantity).toLocaleString("en-BD")}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 flex flex-col gap-2">
          <div className="flex justify-between text-gray-700">
            <span>Shipping:</span>
            <span>৳ {order.shippingFee.toLocaleString("en-BD")}</span>
          </div>
          <div className="flex justify-between font-bold text-green-700 text-lg">
            <span>Total:</span>
            <span>৳ {order.total.toLocaleString("en-BD")}</span>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Button
          onClick={() => router.push("/")}
          className="bg-green-600 hover:bg-green-700"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
}
