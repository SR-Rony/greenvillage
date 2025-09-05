"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Product {
  _id: string;
  name: string;
  price: number;
  unit?: string;
  images?: { url: string }[];
}

interface OrderItem {
  product?: Product | null;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  fullAddress: string;
  upazila: string;
  zilla: string;
}

interface Order {
  _id: string;
  createdAt: string;
  items: OrderItem[];
  notes?: string;
  paymentMethod: string;
  shippingAddress: ShippingAddress;
  shippingFee: number;
  status: string;
  subtotal: number;
  total: number;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${baseUrl}/orders`, { credentials: "include" });
        const data = await res.json();
        if (Array.isArray(data)) setOrders(data);
        else if (Array.isArray(data.orders)) setOrders(data.orders);
        else if (Array.isArray(data.data)) setOrders(data.data);
        else setOrders([]);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(
    (o) =>
      (o.shippingAddress?.fullName ?? "").toLowerCase().includes(search.toLowerCase()) ||
      (o.shippingAddress?.phone ?? "").includes(search) ||
      (o.status ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 md:p-8">
      <Card className="shadow-md">
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
          <CardTitle className="text-xl font-semibold">Orders</CardTitle>
          <div className="flex items-center gap-2 mt-3 md:mt-0">
            <Search className="w-4 h-4 text-gray-500" />
            <Input
              placeholder="Search orders..."
              className="w-[220px]"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <p className="text-center text-gray-500 py-6">No orders found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">{order._id.slice(-6)}</TableCell>
                      <TableCell>{order.shippingAddress?.fullName ?? "Unknown"}</TableCell>
                      <TableCell>{order.shippingAddress?.phone ?? "N/A"}</TableCell>
                      <TableCell>৳{order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            order.status === "pending"
                              ? "secondary"
                              : order.status === "completed"
                              ? "default"
                              : "destructive"
                          }
                        >
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setSelectedOrder(order)}
                            >
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl">
                            <DialogHeader>
                              <DialogTitle>Order Details</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && selectedOrder._id === order._id && (
                              <div className="space-y-6">
                                {/* Shipping Info */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <h4 className="font-semibold mb-2">Shipping Information</h4>
                                  <p>Name: {selectedOrder.shippingAddress?.fullName}</p>
                                  <p>Phone: {selectedOrder.shippingAddress?.phone}</p>
                                  <p>
                                    Address: {selectedOrder.shippingAddress?.fullAddress},{" "}
                                    {selectedOrder.shippingAddress?.upazila},{" "}
                                    {selectedOrder.shippingAddress?.zilla}
                                  </p>
                                </div>

                                {/* Payment Info */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <h4 className="font-semibold mb-2">Payment</h4>
                                  <p>Method: {selectedOrder.paymentMethod.toUpperCase()}</p>
                                  <p>Subtotal: ৳{selectedOrder.subtotal.toFixed(2)}</p>
                                  <p>Shipping Fee: ৳{selectedOrder.shippingFee.toFixed(2)}</p>
                                  <p className="font-bold text-lg">
                                    Total: ৳{selectedOrder.total.toFixed(2)}
                                  </p>
                                </div>

                                {/* Items */}
                                <div>
                                  <h4 className="font-semibold mb-3">Items</h4>
                                  <div className="space-y-2">
                                    {selectedOrder.items.map((item, idx) => (
                                      <div
                                        key={idx}
                                        className="flex items-center justify-between border-b pb-2 gap-3"
                                      >
                                        <div className="w-16 h-16 flex-shrink-0">
                                          <Image
                                            src={
                                              item.product?.images?.[0]?.url ||
                                              "/placeholder.png"
                                            }
                                            alt={item.name}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover rounded-md border"
                                          />
                                        </div>
                                        <div className="flex-1">
                                          <p className="font-medium">{item.name}</p>
                                          <p className="text-sm text-gray-500">
                                            {item.quantity} {item.unit} × ৳{item.price}
                                          </p>
                                        </div>
                                        <p className="font-semibold">
                                          ৳{(item.price * item.quantity).toFixed(2)}
                                        </p>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
