"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useShoppingCart } from "use-shopping-cart";
import type { Product } from "@/types/product";

import { Button } from "./button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";

import { PiHandbagBold, PiMinus, PiPlus } from "react-icons/pi";

import axios from "axios";

export function Cart() {
	const {
		cartCount,
		cartDetails,
		removeItem,
		incrementItem,
		decrementItem,
		formattedTotalPrice,
		clearCart,
	} = useShoppingCart();
	const router = useRouter();

	if (!cartDetails || !cartCount) {
		return (
			<button
				type="button"
				className="cursor-pointer rounded-md size-12 text-2xl relative flex justify-center items-center bg-elements text-icon"
			>
				<PiHandbagBold />
			</button>
		);
	}

	const productsInCart: Product[] = Object.keys(cartDetails).map(
		(product) => cartDetails[product],
	);

	const redirectToCheckout = async () => {
		const checkoutUrl = await axios
			.post("/api/checkout", {
				products: productsInCart,
			})
			.then((res) => res.data.checkoutUrl);

		clearCart();

		router.push(checkoutUrl);
	};

	return (
		<Sheet>
			<SheetTrigger className="cursor-pointer rounded-md size-12 text-2xl relative flex justify-center items-center bg-elements text-text">
				<span className="size-7 rounded-full bg-principal border-4 border-background text-xs text-white font-bold flex justify-center items-center absolute -right-3 -top-3">
					{cartCount}
				</span>
				<PiHandbagBold />
			</SheetTrigger>
			<SheetContent className="py-12 px-10 flex flex-col justify-between gap-4">
				<div className="space-y-2 max-h-9/12 overflow-hidden">
					<SheetTitle className="text-xl font-bold text-title">
						Sacola de compras
					</SheetTitle>
					<ul className="max-h-full overflow-y-scroll">
						{productsInCart.map((product) => (
							<li className="py-4 flex items-center gap-4" key={product.id}>
								<div className="w-25.5 h-24 bg-linear-to-b from-[#1EA483] to-[#7465D4] flex justify-center items-center rounded-lg">
									<Image
										src={product.image || ""}
										alt={product.name}
										width={95}
										height={95}
									/>
								</div>
								<div>
									<span className="text-text">{product.name}</span>
									<h1 className="font-bold text-lg text-title">
										{product.formattedValue}
									</h1>
									<div className="flex gap-4 mt-2">
										<div className="bg-text/5 py-1.5 px-2 rounded-lg flex items-center gap-2 select-none font-bold [&>svg]:cursor-pointer [&>svg]:text-principal [&>svg]:hover:text-light text-text">
											<PiPlus onClick={() => incrementItem(product.id)} />
											{product.quantity}
											<PiMinus onClick={() => decrementItem(product.id)} />
										</div>
										<button
											type="button"
											onClick={() => removeItem(product.id)}
											className="cursor-pointer font-bold text-principal hover:text-light transition-colors"
										>
											Remover
										</button>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
				<div className="space-y-6 min-h-max">
					<button
						type="button"
						onClick={() => clearCart()}
						className="cursor-pointer font-bold text-principal hover:text-light transition-colors"
					>
						Limpar carrinho
					</button>
					<ul className="space-y-2 text-title *:flex *:w-full *:justify-between">
						<li>
							Quantidade<span className="text-text">{cartCount} itens</span>
						</li>
						<li className="text-lg font-bold">
							Valor total<span>{formattedTotalPrice}</span>
						</li>
					</ul>
					<Button onClick={redirectToCheckout} className="w-full block">
						Finalizar compra
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
