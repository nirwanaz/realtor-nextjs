"use client";

import millify from 'millify';
import Image from 'next/image';
import Link from 'next/link';

import { FaBath, FaBed } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';

import DefaultImage from '../../assets/images/house.jpg';
import { Agency } from '@/interfaces';

interface PropertyProps {
    property: {
        coverPhoto: {
            url: string;
        };
        price: number;
        rentFrequency: number;
        rooms: number;
        title: string;
        baths: number;
        area: number;
        agency: Agency;
        isVerified: boolean;
        externalID: string;
    }
}

const Property = ({ property: {
    coverPhoto,
    price,
    rentFrequency,
    rooms,
    title,
    baths,
    area,
    agency,
    isVerified,
    externalID,
} }: PropertyProps) => {
  return (
    <Link href={`/property/${externalID}`} passHref>
        <div className="flex flex-wrap max-w-[420px] p-5 pt-0 border dark:bg-gray-900 rounded-lg justify-start cursor-pointer">
            <div className="relative">
                <Image src={coverPhoto ? coverPhoto.url : DefaultImage} width={400} height={200} alt="cover photo" className='h-56'/>
            </div>
            <div className="w-full">
                <div className="flex pt-2 items-center justify-between">
                    <div className="flex items-center">
                        <div className="pe-3 text-green-400">
                            {isVerified && <GoVerified />}
                        </div>
                        <p className='font-bold text-lg'>
                            AED {price}{rentFrequency && `/${rentFrequency}`}
                        </p>
                    </div>
                    <div className="relative">
                        <Image className='inline-block h-[40px] object-contain' height={40} width={40} src={agency?.logo?.url} alt='avatar'/>
                    </div>
                </div>
                <div className="flex items-center p-1 justify-between w-[250px] text-blue-400">
                    {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
                </div>
                <div className="text-base uppercase">
                    {title.length > 30 ? title.substring(0, 30) + '...' : title}
                </div>
            </div>
        </div>
    </Link>
  )
}

export default Property