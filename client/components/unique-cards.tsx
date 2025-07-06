import { UniqueCardsProps } from "@/lib/types";
import { generateId } from "@/lib/utils";
import { DynamicIcon } from "lucide-react/dynamic";

const UniqueCards = ({ title, cards }: UniqueCardsProps) => {
	return (
		<section className="parent-container">
			<div className="container">
				<h2 className="heading">{title}</h2>

				<div className="grid grid-cols-2 lg:grid-cols-4 gap-2 max-w-7xl mx-auto mt-12">
					{cards.map(({ color, description, icon, title }) => (
						<div
							key={generateId()}
							className="flex flex-col items-center justify-start gap-2 text-center p-2"
						>
							<div
								className="flex items-center justify-center p-6 rounded-full"
								style={{ border: `1px solid #${color}` }}
							>
								<DynamicIcon
									name={icon}
									className="w-8 h-8"
									color={`#${color}`}
								/>
							</div>
							<h2 className="font-serif text-lg font-medium text-pretty">
								{title}
							</h2>
							<p className="text-sm lg:text-base opacity-80 text-balance">
								{description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default UniqueCards;
