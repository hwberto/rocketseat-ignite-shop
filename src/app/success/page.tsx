import Image from "next/image";
import { notFound } from "next/navigation";

import { type Stripe, stripe } from "@/lib/stripe";

import { Header } from "@/components/header";
import { Link } from "@/components/link";

async function getCheckoutSession(sessionId: string) {
	const customer = await stripe.checkout.sessions.retrieve(sessionId);
	const line_items = await stripe.checkout.sessions.listLineItems(sessionId, {
		expand: ["data.price.product"],
	});

	const products = line_items.data.map((item) => {
		const product = item.price?.product as Stripe.Product;

		return {
			...item,
			name: product.name,
			image: product.images[0],
		};
	});

	return {
		customer,
		products,
	};
}

export default async function SuccessPage({
	searchParams,
}: {
	searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
	const sessionId = (await searchParams).session_id;
	const checkoutSession = await getCheckoutSession(sessionId || "");

	if (!checkoutSession) {
		notFound();
	}

	function getTotalItems(lineItems: Stripe.LineItem[] | undefined): number {
		if (!lineItems) return 0;

		return lineItems.reduce((total, item) => total + (item.quantity || 0), 0);
	}

	return (
		<main className="w-full px-20 max-w-7xl mx-auto py-8 relative">
			<Header cartVisible={false} />
			<section className="py-24 flex flex-col justify-center items-center gap-5">
				<ul className="flex *:rounded-full *:size-35 *:flex *:items-center *:justify-center *:shadow-[0_0_60px] *:shadow-black/80">
					{checkoutSession.products.map((item) => (
						<Image
							className="bg-linear-to-b from-[#1EA483] to-[#7465D4] -ml-6 first:-ml-0"
							key={item.name}
							src={item.image}
							alt={item.name}
							width={130}
							height={130}
						/>
					))}
				</ul>
				<h1 className="font-bold text-3xl text-title">Compra efetuada!</h1>
				<h2 className="text-xl text-text text-center">
					Uhuul <b>{checkoutSession.customer.customer_details?.name}</b>, sua
					compra de {getTotalItems(checkoutSession.products)} camisetas já
					<br /> está a caminho de sua casa.
				</h2>
				<Link href="/" className="mt-6">
					Voltar ao catálogo
				</Link>
			</section>
		</main>
	);
}
