"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function DashboardPage() {
  const chartData = [
    { month: "Jan", sales: 4000 },
    { month: "Feb", sales: 3200 },
    { month: "Mar", sales: 2800 },
    { month: "Apr", sales: 5000 },
    { month: "May", sales: 4200 },
    { month: "Jun", sales: 6000 },
  ];

  const recentOrders = [
    { id: "#1001", customer: "John Doe", total: "$120.00", status: "Shipped" },
    { id: "#1002", customer: "Jane Smith", total: "$85.50", status: "Pending" },
    { id: "#1003", customer: "Mark Wilson", total: "$210.99", status: "Delivered" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader><CardTitle>Revenue</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">$12,430</p>
            <p className="text-sm text-gray-500">+15% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Orders</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">340</p>
            <p className="text-sm text-gray-500">+8% from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Customers</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">1,280</p>
            <p className="text-sm text-gray-500">+12 new today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Products</CardTitle></CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">58</p>
            <p className="text-sm text-gray-500">5 out of stock</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Monthly Sales</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader><CardTitle>Recent Orders</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
