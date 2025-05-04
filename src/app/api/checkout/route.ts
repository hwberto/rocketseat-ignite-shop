import { NextResponse, type NextRequest } from "next/server";
import { stripe } from "@/lib/stripe";
import type { Product } from "@/types/product";
import { z } from "zod";

export async function POST(req: NextRequest) {
	const requestBody = await req.json();
	const parsedRequest = z
		.object({
			products: z.custom<Product[]>(),
		})
		.parse(requestBody);

	const checkoutSession = await stripe.checkout.sessions.create({
		success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
		mode: "payment",
		line_items: parsedRequest.products.map((product) => ({
			price: product.price_id,
			quantity: product.quantity,
		})),
	});

	return NextResponse.json({
		checkoutUrl: checkoutSession.url,
	});
}
