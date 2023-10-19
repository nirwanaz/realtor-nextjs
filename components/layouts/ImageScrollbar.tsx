"use client";

import { Photos } from "@/interfaces";
import Image from "next/image";
import { useContext } from "react"
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import 'react-horizontal-scrolling-menu/dist/styles.css';

const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext);

    return (
        <div className="flex items-center justify-center mr-1">
            <div className="text-2xl cursor-pointer text-gray-900" onClick={() => scrollPrev()}>
                <FaArrowAltCircleLeft />
            </div>
        </div>
    )
}

const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext);

    return (
        <div className="flex items-center justify-center ml-1">
            <div className="text-2xl cursor-pointer text-gray-900" onClick={() => scrollNext()}>
                <FaArrowAltCircleRight />
            </div>
        </div>
    )
}

export default function ImageScrollbar({ data }: { data: Photos[] }) {
    return (
        <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} scrollContainerClassName="overflow-hidden">
            {data.map((item) => (
                <div className="w-[910px] overflow-hidden p-1" key={item.id}>
                    <Image placeholder="blur" blurDataURL={item.url} src={item.url} width={1000} height={500} sizes="(max-width: 500px) 100px, (max-width: 1023px) 400px, 1000px" alt="blur" />
                </div>
            ))}
        </ScrollMenu>
    )
}