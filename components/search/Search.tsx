"use client";

import { useState } from "react";
import { BsFilter } from "react-icons/bs";
import SearchFilters from "../layouts/SearchFilters";
import { useSearchParams } from "next/navigation";

export default function Search() {
    const [searchFilters, setSearchFilters] = useState(false);
    const searchParams = useSearchParams();

    return (
        <div className="relative">
            <div className="flex cursor-pointer border-b border-gray-200 p-2 font-black text-lg justify-center items-center" onClick={() => setSearchFilters(!searchFilters)}>
                <div className="text-base">Search Property By Filters</div>
                <div className="pl-2 w-7"><BsFilter /></div>
            </div>
            {searchFilters && <SearchFilters />}
            <div className="text-2xl p-4 font-bold">
                Properties {searchParams.get('purpose')}
            </div>
        </div>
    )
}