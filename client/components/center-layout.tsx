import { CenterLayoutProps } from "@/lib/types";
import { PortableText } from "next-sanity";
import { PortableTable } from "./portable-table";

const CenterLayout = ({ title, content }: CenterLayoutProps) => {
	return (
		<section className="parent-container">
			<div className="container max-w-3xl flex flex-col">
				<h2 className="heading">{title}</h2>
				<div className="opacity-80"></div>
				<div className="opacity-80">
					<PortableText
						value={content}
						components={{
							types: {
								table: PortableTable,
							},
						}}
					/>
				</div>
			</div>
		</section>
	);
};

export default CenterLayout;
