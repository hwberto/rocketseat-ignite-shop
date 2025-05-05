import Image from "next/image";
import Link from "next/link";

import { stripe, type Stripe } from "@/lib/stripe";

import { Carousel, CarouselItem } from "@/components/carousel";

import { PiHandbagBold } from "react-icons/pi";
import { AddToCartButton } from "@/components/add-to-cart-button";

async function getProducts() {
	const response = await stripe.products.list({
		expand: ["data.default_price"],
	});
	const products = [];

	for (const product of response.data) {
		const price = product.default_price as Stripe.Price;

		products.push({
			id: product.id,
			name: product.name,
			image: product.images[0],
			price: price.unit_amount || 0,
			price_id: price.id,
			formattedPrice: Number.parseFloat(price.unit_amount_decimal || "") / 100,
			currency: "BRL",
		});
	}

	return products;
}

export default async function ShopPage() {
	const products = await getProducts();

	return (
		<Carousel>
			{products.reverse().map((product) => (
				<CarouselItem
					className="group md:min-w-120 lg:min-w-160 relative basis-1/2 max-md:basis-full bg-linear-to-b from-[#1EA483] to-[#7465D4] shadow-[0_0_48px] shadow-black/90 rounded-lg"
					key={product.id}
				>
					<Link
						className="sm:h-80 md:h-100 lg:h-120 w-full flex items-center justify-center"
						href={`/product/${product.id.slice(5, product.id.length)}`}
					>
						<Image
							src={product.image}
							alt={product.name}
							height={401}
							width={401}
							className="max-lg:size-88 max-md:size-78 max-sm:size-70"
						/>
					</Link>
					<div className="absolute bottom-1 flex items-center justify-between opacity-0 pointer-events-none gap-4 left-1 w-[calc(100%-0.5rem)] bg-elements/90 backdrop-blur-xs rounded-lg p-6 group-hover:opacity-100 group-hover:pointer-events-auto transition-all">
						<div className="space-y-1">
							<h1 className="text-title font-bold lg:text-lg max-w-full overflow-hidden text-ellipsis">
								{product.name}
							</h1>
							<span className="text-light font-bold text-xl lg:text-2xl">
								R$ {product.formattedPrice.toFixed(2).replace(/[.]/, ",")}
							</span>
						</div>
						<AddToCartButton
							product={product}
							className="p-3 lg:p-4 text-xl lg:text-2xl h-max"
						>
							<PiHandbagBold />
						</AddToCartButton>
					</div>
				</CarouselItem>
			))}
		</Carousel>
	);
}
