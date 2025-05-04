import Link, { type LinkProps } from "next/link";

import { cn } from "@/lib/utils";

function LinkComponent({
	className,
	href,
	children,
	...props
}: React.ComponentProps<"a"> & LinkProps) {
	return (
		<Link
			href={href}
			className={cn(
				"font-bold text-principal hover:text-light transition-colors",
				className,
			)}
			{...props}
		>
			{children}
		</Link>
	);
}

export { LinkComponent as Link };
