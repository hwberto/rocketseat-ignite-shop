"use client";

import { useCallback, useState } from "react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	type CarouselApi,
} from "./ui/carousel";

import { PiCaretLeft, PiCaretRight } from "react-icons/pi";

function CarouselComponent({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	const [api, setApi] = useState<CarouselApi>();
	const canScrollPrev = api?.canScrollPrev;
	const canScrollNext = api?.canScrollNext;

	const scrollPrev = useCallback(() => {
		api?.scrollPrev();
	}, [api]);

	const scrollNext = useCallback(() => {
		api?.scrollNext();
	}, [api]);

	return (
		<>
			<Carousel className="overflow-hidden px-20 -ml-20 -mr-20" setApi={setApi}>
				{canScrollPrev && (
					<button
						type="button"
						onClick={scrollPrev}
						className="cursor-pointer h-full top-0 z-20 absolute left-0 w-20 flex justify-center items-center bg-gradient-to-r from-background to-transparent text-4xl text-text hover:text-white transition-colors"
					>
						<PiCaretLeft />
					</button>
				)}
				<CarouselContent className="gap-20 py-12">{children}</CarouselContent>
				{canScrollNext && (
					<button
						type="button"
						onClick={scrollNext}
						className="cursor-pointer h-full top-0 z-20 absolute right-0 w-20 flex justify-center items-center bg-gradient-to-l from-background to-transparent text-4xl text-text hover:text-white transition-colors"
					>
						<PiCaretRight />
					</button>
				)}
			</Carousel>
		</>
	);
}

export { CarouselComponent as Carousel, CarouselItem };
