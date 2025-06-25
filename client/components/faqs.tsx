import { FAQsProps } from "@/lib/types";
import { generateId } from "@/lib/utils";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const FAQs = ({ faqs }: FAQsProps) => {
	return (
		<section className="parent-container">
			<div className="container max-w-3xl">
				<h2 className="heading">FAQs</h2>
				<Accordion type="single" collapsible className="w-full">
					{faqs.map((faq) => (
						<AccordionItem value={generateId()} key={generateId()}>
							<AccordionTrigger className="text-lg font-medium">
								{faq.question}
							</AccordionTrigger>
							<AccordionContent className="text-balance opacity-80">
								{faq.answer}
							</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</section>
	);
};

export default FAQs;
