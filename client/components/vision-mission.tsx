import { VisionMissionProps } from "@/lib/types";

const VisionMission = ({ title, vision, mission }: VisionMissionProps) => {
	return (
		<section className="parent-container">
			<div className="container">
				<h2 className="heading">{title}</h2>

				<div className="flex flex-col md:flex-row overflow-hidden">
					<div className="flex flex-col md:w-1/2">
						<h3 className="text-xl mb-2 font-serif">{vision.title}</h3>
						<p className="text-lg opacity-80">{vision.content}</p>
					</div>
					<div className="my-4 border-t-2 border-black opacity-20 border-dashed w-full md:hidden" />
					<div className="mx-8 border-l-2 border-black opacity-20 border-dashed hidden md:block min-h-full" />
					<div className="flex flex-col md:w-1/2">
						<h3 className="text-xl mb-2 font-serif">{mission.title}</h3>
						<p className="text-lg opacity-80">{mission.content}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default VisionMission;
