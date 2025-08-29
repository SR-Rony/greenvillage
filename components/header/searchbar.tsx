import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";


export default function SearchBar (){
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = () => {
    if (searchValue.trim()) {
      console.log("Search:", searchValue);
      // Add navigation or API call here
    }
  };

    return(
        <div className="flex w-full rounded-full overflow-hidden shadow-md bg-white relative">
            <Input
              type="text"
              placeholder="Search for products..."
              className="w-full border-0 focus:ring-0 px-4 py-2 bg-white text-gray-700 placeholder-gray-400"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button
              onClick={handleSearch}
              className="absolute right-0 top-0 h-full px-4 bg-[var(--primary)] hover:bg-green-600 text-white rounded-r-full flex items-center justify-center transition"
            >
              <Search className="h-5 w-5" />
            </Button>
        </div>
    )
}