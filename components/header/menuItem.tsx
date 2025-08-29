import Link from "next/link";

export default function MenuItem (){
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

    return (
        <div className="bg-gray-100 hidden md:flex">
            <div className="container mx-auto px-4 flex items-center justify-center gap-4 h-10 text-sm font-medium overflow-x-auto">
            {categories.map((cat) => (
                <Link
                key={cat}
                href={`/category/${cat.toLowerCase().replace(/ /g, "-")}`}
                className="hover:text-[var(--primary)] transition-colors whitespace-nowrap"
                >
                {cat}
                </Link>
            ))}
            </div>
        </div>
    )
}