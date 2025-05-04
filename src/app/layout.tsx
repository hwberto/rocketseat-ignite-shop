import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import { cn } from "@/lib/utils";

import { Providers } from "./providers";

import "./globals.css";

const roboto = Roboto();

export const metadata: Metadata = {
	title: {
		template: "%s — Ignite Shop",
		default: "Ignite Shop — Loja virtual",
	},
	description:
		" O Ignite Shop é uma aplicação web de vendas de camisetas com temas do mundo dev, mostrando com detalhes a parte visual e informacional das camisetas, além de apresentar um carrinho onde o cliente pode adicionar as suas compras.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			className={cn(
				"antialiased scroll-smooth leading-[1.6rem] bg-background",
				roboto.className,
			)}
			lang="pt-BR"
		>
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
