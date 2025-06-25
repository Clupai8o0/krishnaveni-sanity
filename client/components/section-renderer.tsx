import { generateId } from "@/lib/utils";
import { PageSection } from "@/lib/types";

import Hero from "./hero";
import Contact from "./contact";
import AtAGlance from "./at-a-glance";
import FeatureCards from "./feature-cards";
import BentoGallery from "./bento-gallery";
import Testimonials from "./testimonials";
import TwoColLayout from "./two-col-layout";
import CenterLayout from "./center-layout";
import FAQs from "./faqs";

interface Props {
	content: PageSection[];
}

export const SectionRenderer = ({ content }: Props) => {
	return (
		<>
			{content.map((section: PageSection) => {
				switch (section._type) {
					case "heroSection":
						return <Hero key={generateId()} {...section} />;
					case "featureCards":
						return <FeatureCards key={generateId()} {...section} />;
					case "introduction":
						return <AtAGlance key={generateId()} {...section} />;
					case "bentoGallery":
						return <BentoGallery key={generateId()} {...section} />;
					case "testimonials":
						return <Testimonials key={generateId()} {...section} />;
					case "contact":
						return <Contact key={generateId()} {...section} />;
					case "twoColLayout":
						return <TwoColLayout key={generateId()} {...section} />;
					case "centerLayout":
						return <CenterLayout key={generateId()} {...section} />;
					case "faq":
						return <FAQs key={generateId()} {...section} />;
					default:
						return null;
				}
			})}
		</>
	);
};
