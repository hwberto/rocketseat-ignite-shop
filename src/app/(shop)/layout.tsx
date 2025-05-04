import { Header } from "@/components/header";

export default function ShopLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<main className="w-full px-20 max-w-7xl mx-auto py-8 relative">
			<Header />
			{children}
		</main>
	);
}
