import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Cart } from "./cart";

export function Header({
	cartVisible = true,
	className,
	...props
}: React.ComponentProps<"header"> & { cartVisible?: boolean }) {
	return (
		<header
			className={cn(
				"flex justify-between w-full",
				{
					"justify-center": !cartVisible,
				},
				className,
			)}
			{...props}
		>
			<Link href="/">
				<Image src="/logo.svg" alt="Ignite Shop" width={129.74} height={52} />
			</Link>
			{cartVisible && <Cart />}
		</header>
	);
}
