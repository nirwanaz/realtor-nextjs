"use client";

import ImageScrollbar from '../layouts/ImageScrollbar'
import Image from 'next/image'
import { FaBath, FaBed } from 'react-icons/fa'
import { BsGridFill } from 'react-icons/bs'
import { GoVerified } from 'react-icons/go'
import millify from 'millify'
import { Agency, Amenities, Photos } from '@/interfaces'

interface PropertyDetailsProps {
    propertyDetails: {
        price: number,
        rentFrequentcy: number;
        rooms: number;
        title: string;
        baths: number;
        area: number;
        agency: Agency;
        isVerified: boolean;
        description: string;
        type: string;
        purpose: string;
        furnishingStatus: string;
        amenities: Amenities[];
        photos: Photos[];
    }
}

const PropertyDetails = ({ propertyDetails: {
    price,
    rentFrequentcy,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
} }: PropertyDetailsProps) => {
  return (
    <div className="max-w-[1000px] m-auto p-4 dark:bg-gray-400">
        {photos && <ImageScrollbar data={photos} />}
        <div className="w-full p-6">
            <div className="flex pt-2 items-center justify-between">
                <div className="pr-3 text-green-400">{isVerified && <GoVerified />}</div>
                <div className="font-bold text-lg dark:text-gray-900">
                    AED {price} {rentFrequentcy && `/${rentFrequentcy}`}
                </div>
                <Image className='inline-block object-contain' height={40} width={40} src={agency?.logo?.url} alt='avatar' />
            </div>
            <div className="flex items-center p-1 justify-between w-[250px] text-blue-400">
                {rooms}<FaBed /> | {baths}<FaBath /> | {millify(area)} sqft<BsGridFill />
            </div>
        </div>
        <div className="mt-2">
            <div className="text-lg mb-2 font-bold dark:text-gray-900">{title}</div>
            <div className="leading-loose text-gray-600">{description}</div>
        </div>
        <div className="flex flex-wrap uppercase justify-between">
            <div className="flex justify-between w-[400px] border-b border-gray-200 p-3">
                <span className='text-gray-900'>Type</span>
                <span className='font-bold text-gray-900'>{type}</span>
            </div>
            <div className="flex justify-between w-[400px] border-b border-gray-200 p-3">
                <span className='text-gray-900'>Purpose</span>
                <span className='font-bold text-gray-900'>{purpose}</span>
            </div>
            {furnishingStatus && (
                <div className="flex justify-between w-[400px] border-b border-gray-200 p-3">
                    <span className='text-gray-900'>Furnishing Status</span>
                    <span className="font-bold text-gray-900">{furnishingStatus}</span>
                </div>
            )}
        </div>
        <div className="relative">
            {amenities.length > 0 && <div className='text-2xl text-gray-900 font-black mt-5'>Facilites:</div>}
                <div className="flex flex-wrap">
                    {amenities?.map((item) => (
                        item?.amenities?.map((amenity) => (
                            <div key={amenity.text} className='font-bold text-blue-400 text-base p-2 bg-gray-200 m-1 rounded-lg'>
                                {amenity.text}
                            </div>
                        ))
                    ))}

                </div>
        </div>
    </div>
  )
}

export default PropertyDetails;