import { baseUrl, fetchApi } from "@/utils/fetchApi";
import { filterData, getFilterValues } from "@/utils/filterData";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md";

import noresult from "../../assets/images/noresult.svg";
import { FilterValues } from "@/interfaces";
import { useRouter } from "next/navigation";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

interface LocationData {
  id: number;
  name: string;
  externalID: string;
}

const SearchFilters = () => {
  const [filters] = useState(filterData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<FilterValues | null>(null);
  const [locationData, setLocationData] = useState<LocationData[] | null>(null);
  const [showLocations, setShowLocations] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  let queryParams: URLSearchParams | null = null;

  const searchProperties = (filterValues: FilterValues) => {
    if (typeof window !== "undefined") {
      queryParams = new URLSearchParams(window.location.search);

      const values = getFilterValues(filterValues);

      values.forEach((item) => {
        if (item.value && filterValues?.[item.name]) {
          if (queryParams?.has(item.name)) {
            queryParams.set(item.name, item.value as string);
          } else {
            queryParams?.append(item.name, item.value as string);
          }
        }
      });

      const path = window.location.pathname + "?" + queryParams.toString();
      router.push(path);
    }
  };

  useEffect(() => {
    if (searchTerm !== "") {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await fetchApi(
            `${baseUrl}/auto-complete?query=${searchTerm}`
          );
          setLoading(false);
          setLocationData(data?.hits);
        } catch (error) {
          setLoading(false);
          console.error(error);
        }
      };

      fetchData();
    }
  }, [searchTerm]);

  return (
    <div className="flex p-4 justify-center flex-wrap gap-2">
      {filters?.map((filter) => (
        <div className="relative" key={filter.queryName}>
          <Listbox
            value={selected?.[filter.queryName] || filter.items[0]}
            onChange={(target) => {
              searchProperties({ [filter.queryName]: target.value });
              setSelected({ ...selected, [filter.queryName]: target });
            }}
          >
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium leading-6">
                  {filter.placeholder}
                </Listbox.Label>
                <div className="realtive mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    <span className="block truncate">
                      {selected?.[filter.queryName]?.name ||
                        filter.items[0].name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filter?.items.map((item) => (
                        <Listbox.Option
                          key={item.value}
                          className={({ active }) =>
                            `${
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900"
                            } relative cursor-default select-none py-2 pl-3 pr-9`
                          }
                          value={item}
                        >
                          {item.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox>
        </div>
      ))}

      <div className="flex flex-col self-end">
        <button
          type="button"
          className="border text-base mt-2 border-gray-50 p-2 rounded-md hover:bg-slate-200"
          onClick={() => setShowLocations(!showLocations)}
        >
          Search Location
        </button>
        {showLocations && (
          <div className="flex flex-col relative pt-2">
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Type Here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm !== "" && (
              <div
                className="absolute cursor-pointer right-5 top-5 z-[100]"
                onClick={() => {
                  setSearchTerm("");
                  setLocationData(null);
                }}
              >
                <MdCancel />
              </div>
            )}
            {loading && <div className="m-auto mt-3">Loading...</div>}

            {locationData?.map((location) => (
              <div
                key={location.id}
                className="relative"
                onClick={() => {
                  searchProperties({
                    locationExternalIDs: location.externalID,
                  });
                  setShowLocations(false);
                  setSearchTerm(location.name);
                }}
              >
                <div className="cursor-pointer p-2 border-b border-gray-100">
                  {location.name}
                </div>
              </div>
            ))}
            {!loading && !locationData?.length && (
              <div className="flex justify-center items-center flex-col my-5">
                <Image
                  src={noresult}
                  alt="no result"
                  width={200}
                  height={200}
                />
                <div className="text-xl mt-3">Waiting to search!</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
