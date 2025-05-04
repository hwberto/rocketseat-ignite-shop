"use client";

import { CartProvider } from "use-shopping-cart";

export function Providers({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<CartProvider
			language="pt-BR"
			cartMode="checkout-session"
			stripe={process.env.STRIPE_SECRET_KEY as string}
			currency="BRL"
			shouldPersist
		>
			{children}
		</CartProvider>
	);
}
