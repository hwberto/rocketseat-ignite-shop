import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { stripe } from "@/lib/stripe";
import type Stripe from "stripe";

import { AddToCartButton } from "@/components/add-to-cart-button";

async function getProductById(id: string) {
	const product = await stripe.products.retrieve(`prod_${id}`, {
		expand: ["default_price"],
	});

	if (!product) {
		notFound();
	}

	const price = product.default_price as Stripe.Price;

	return {
		id: product.id,
		name: product.name,
		description: product.description || "",
		image: product.images[0],
		price: price.unit_amount || 0,
		price_id: price.id,
		formattedPrice: Number.parseFloat(price.unit_amount_decimal || "") / 100,
		currency: "BRL",
	};
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const product = await getProductById(slug);

	return {
		title: product.name,
	};
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const product = await getProductById(slug);

	return (
		<section className="mt-12 flex max-lg:flex-col gap-14">
			<div className="basis-1/2 h-120 flex justify-center items-center bg-linear-to-b from-[#1EA483] to-[#7465D4] shadow-[0_0_48px] shadow-black/90 rounded-lg">
				<Image
					src={product.image}
					alt={product.name}
					height={401}
					width={401}
				/>
			</div>
			<div className="basis-1/2 space-y-4 lg:mt-6 relative lg:pb-17">
				<h1 className="text-title font-bold text-3xl">{product.name}</h1>
				<span className="text-light font-bold text-3xl">
					R$ {product.formattedPrice.toFixed(2).replace(/[.]/, ",")}
				</span>
				<div className="mt-10 text-text">{product.description}</div>
				<AddToCartButton
					product={product}
					className="w-full bottom-0 lg:absolute"
				>
					Colocar na sacola
				</AddToCartButton>
			</div>
		</section>
	);
}
