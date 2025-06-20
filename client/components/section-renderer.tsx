import { PageSection } from "@/lib/types";

import Hero from "./hero";
import FeatureCards from "./feature-cards";
import AtAGlance from "./at-a-glance";
import BentoGallery from "./bento-gallery";
import Testimonials from "./testimonials";

interface Props {
	content: PageSection[];
}

export const SectionRenderer = ({ content }: Props) => {
	return (
		<>
			{content.map((section: PageSection) => {
				switch (section._type) {
					case "heroSection":
						return <Hero key={section._key} {...section} />;
					case "featureCards":
						return <FeatureCards key={section._key} {...section} />;
					case "introduction":
						return <AtAGlance key={section._key} {...section} />;
					case "bentoGallery":
						return <BentoGallery key={section._key} {...section} />;
					case "testimonials":
						return <Testimonials key={section._key} {...section} />;
					default:
						return null;
				}
			})}
		</>
	);
};
