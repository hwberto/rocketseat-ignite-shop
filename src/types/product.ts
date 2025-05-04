import type { Product as ProductPrimitive } from "use-shopping-cart/core";

export type Product = ProductPrimitive & {
	formattedPrice?: number;
};
