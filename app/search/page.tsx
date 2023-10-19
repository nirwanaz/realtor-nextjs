import Property from "@/components/property/Property";
import Search from "@/components/search/Search";
import { baseUrl, fetchApi } from "@/utils/fetchApi";
import Image from "next/image";
import queryString from "query-string";

import noresult from "../../assets/images/noresult.svg";

const getProperties = async (searchParams: any) => {

    const urlParams = {
      purpose: searchParams.purpose || 'for-rent',
      rentFrequency: searchParams.rentFrequency || 'daily',
      minPrice: searchParams.minPrice || '10000',
      maxPrice: searchParams.maxPrice || '50000',
      roomsMin: searchParams.roomsMin || '1',
      bathsMin: searchParams.bathsMin || '1',
      sort: searchParams.sort || 'price-asc',
      areaMax: searchParams.areaMax || '1000',
      locationExternalIDs: searchParams.locationExternalIDs || '5002',
      categoryExternalIDs: searchParams.categoryExternalIDs || '4',
      hitsPerPage: searchParams.hitsPerPage || '6',
    }
  
    const searchQuery = queryString.stringify(urlParams);
  
    const properties = await fetchApi(`${baseUrl}/properties/list?${searchQuery}`);
  
    return properties?.hits;
  }
  
  export default async function SearchPage({ searchParams }: { searchParams: URLSearchParams }) {
    const properties = await getProperties(searchParams);
    
    return (
      <main className="flex flex-col min-h-screen items-center justify-center p-24">
        <Search />
        <div className="flex flex-wrap gap-2">
            {properties?.map((property: any) => <Property property={property} key={property.id} />)}
        </div>
        {properties.length === 0 && (
            <div className="flex justify-center items-center flex-col my-5">
                <Image src={noresult} width={400} height={400} alt="no result"/>
                <div className="text-xl mt-3">No Result Found.</div>
            </div>
        )}
      </main>
    )
  }