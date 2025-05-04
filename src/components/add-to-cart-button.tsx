"use client";

import { useShoppingCart } from "use-shopping-cart";
import type { Product } from "@/types/product";

import { Button } from "./button";

export function AddToCartButton({
	product,
	className,
	type,
	children,
	...props
}: React.ComponentProps<"button"> & { product: Product }) {
	const { addItem } = useShoppingCart();

	return (
		<Button
			className={className}
			type={type}
			{...props}
			onClick={() => addItem(product)}
		>
			{children}
		</Button>
	);
}
