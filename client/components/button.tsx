import clsx from "clsx";
import Link from "next/link";
import React from "react";

interface Props {
	label: string;
	href?: string;
	externalLink?: string;
	internalPage?: {
		slug: string;
	};
	style?: "primary" | "secondary" | "outline" | "none";
	className?: string;
}

const Button = ({
	label,
	href,
	externalLink,
	internalPage,
	style,
	className,
}: Props) => {
	return (
		<Link
			className={clsx(
				"btn text-white",
				style === "primary" && "btn-primary",
				style === "secondary" && "btn-secondary",
				style === "outline" && "btn-outline",
				style === "none" && "btn-none",
				className
			)}
			href={href || externalLink || internalPage?.slug || ""}
			target={externalLink ? "_blank" : "_self"}
		>
			{label}
		</Link>
	);
};

export default Button;
