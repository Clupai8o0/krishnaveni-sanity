import { CenterLayoutProps } from "@/lib/types";
import { PortableText } from "next-sanity";

const CenterLayout = ({ title, content }: CenterLayoutProps) => {
	return (
		<section className="parent-container">
			<div className="container max-w-4xl flex flex-col lg:justify-center">
				<h2 className="heading">{title}</h2>
				<div className="opacity-80"></div>
				<div className="opacity-80 text-balance">
					<PortableText
						value={content}
						components={{
							
						}}
					/>
				</div>
			</div>
		</section>
	);
};

export default CenterLayout;
