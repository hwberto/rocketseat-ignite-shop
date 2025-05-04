import { cn } from "@/lib/utils";

export function Button({
	className,
	type,
	children,
	...props
}: React.ComponentProps<"button">) {
	return (
		<button
			className={cn(
				"px-8 py-5 rounded-lg font-bold bg-principal text-white cursor-pointer hover:bg-light transition-colors",
				className,
			)}
			type={type}
			{...props}
		>
			{children}
		</button>
	);
}
