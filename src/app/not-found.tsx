import { Link } from "@/components/link";

import { TbError404 } from "react-icons/tb";

export default function NotFound() {
	return (
		<main className="mx-auto container h-screen flex flex-col justify-center items-center gap-5">
			<TbError404 className="text-9xl text-title" />
			<h1 className="text-5xl text-title font-bold -mt-11">Não encontrado</h1>
			<Link href="/">Voltar para a página inicial</Link>
		</main>
	);
}
