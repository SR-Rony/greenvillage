"use client";

// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeItem, updateQuantity, clearCart } from "@/redux/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Image from "next/image";

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items, totalAmount } = useAppSelector((s) => s.cart);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                  )}
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-sm text-gray-600">${item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      dispatch(
                        updateQuantity({ id: item.id, quantity: +e.target.value })
                      )
                    }
                    className="w-16 border rounded-md text-center"
                  />
                  <button
                    onClick={() => dispatch(removeItem(item.id))}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={() => dispatch(clearCart())}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Clear Cart
            </button>
            <div className="text-xl font-bold">
              Total: ${totalAmount.toFixed(2)}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
