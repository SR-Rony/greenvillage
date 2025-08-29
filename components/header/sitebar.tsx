import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";

export default function Sitebar (){
    const categories = [
    "All Products",
    "Fruits & Vegetables",
    "Meat & Fish",
    "Dairy & Eggs",
    "Snacks",
    "Drinks",
    "New Arrivals",
    "Trending",
  ];


    return(
        <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-[var(--primary)] hover:bg-gray-200 rounded-lg p-2 transition"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-6 bg-white text-gray-800">
                <h2 className="text-lg font-bold text-[var(--primary)] mb-4">Categories</h2>
                <nav className="flex flex-col gap-3">
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/category/${cat.toLowerCase().replace(/ /g, "-")}`}
                      className="hover:text-[var(--primary)] font-medium transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
    )
}