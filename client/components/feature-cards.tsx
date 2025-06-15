import { DynamicIcon, IconName } from "lucide-react/dynamic";

interface CardProps {
	_key: string;
	color: string;
	description: string;
	icon: IconName;
	title: string;
}

interface Props {
	cards: CardProps[];
}

const FeatureCard = ({ title, description, icon, color }: CardProps) => {
	return (
		<div className="px-8 py-12 flex flex-col items-center justify-center gap-2" style={{ backgroundColor: `#${color}`}}>
			<div className="flex items-center justify-center w-10 h-10 rounded-full">
				<DynamicIcon name={icon} color="white" size={30} />
			</div>
			<h3 className="text-lg md:text-xl font-medium text-white text-center text-balance font-serif leading-tight">{title}</h3>
			<p className="text-sm md:text-base text-center text-pretty text-white opacity-80">{description}</p>
		</div>
	);
};

function FeatureCards({ cards }: Props) {
	return (
		<div className="max-w-7xl mx-auto px-4 relative z-[12]">
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative -top-10 shadow-md rounded-lg overflow-hidden">
				{cards.map((card) => (
					<FeatureCard key={card._key} {...card} />
				))}
			</div>
		</div>
	);
}

export default FeatureCards;
