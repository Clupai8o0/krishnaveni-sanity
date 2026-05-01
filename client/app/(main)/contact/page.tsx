import Contact from "@/components/contact";
import Hero from "@/components/hero";

export async function generateMetadata() {
	return {
		title: "Contact Krishnaveni School – Peerzadiguda, Hyderabad | Call for Admissions",
		description:
			"Get in touch with Krishnaveni School in Peerzadiguda. Call for school admissions, schedule a visit, or ask about transport. Serving families from Uppal to Medipally.",
	};
}

export default function ContactPage() {
	return (
		<main className="flex flex-col gap-10 lg:gap-20">
			<Hero
				_key="contact-hero"
				_type="heroSection"
				title="We're Here to Help You Get Started"
				description="Visit us at Peerzadiguda, Hyderabad or call now to speak with our admissions team about enrollment for Nursery to Class 8"
				imageUrl={{
					desktop:
						"https://cdn.sanity.io/images/jzbduz09/production/d70d5b265bccd15413025d7373389ca376eba00f-1296x864.jpg",
					mobile:
						"https://cdn.sanity.io/images/jzbduz09/production/39a90caa7591aff18d2ae6e35cb2ecb1319fc8b9-435x731.jpg",
				}}
				ctaBtns={[
					{
						label: "Call Now",
						style: "primary",
						externalLink: "tel:+919963373679",
					},
					{
						label: "Visit School",
						style: "outline",
						externalLink:
							"https://wa.me/919963373679?text=Hello%20Krishnaveni%20School%2C%20I'd%20like%20to%20book%20a%20school%20tour%20for%20my%20child.",
					},
				]}
			/>
			<Contact
				_type="contact"
				address={{
					title: "School Address",
					address:
						"Krishnaveni School Peerzadiguda Main Road Hyderabad – 500098 Telangana, India",
					map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50260804.070813!2d103.3194165631587!3d3.006131546229591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9efcda041387%3A0xf6d6e640790d1d31!2sKrishnaveni%20School!5e0!3m2!1sen!2sau!4v1750594531558!5m2!1sen!2sau",
					subtext: "Located minutes from Uppal and Boduppal",
				}}
				contact={{
					title: "Contact Information",
					email: "ktspeerzadiguda97@gmail.com",
					facebook: "https://www.facebook.com/krishnaveni.peerzadiguda.7",
					phone: "+919963373679",
					subtext:
						"Call us at the number above or use the form below to schedule a school tour or admission consultation. Let us know how we can help. We'll get back to you shortly.",
					whatsapp:
						"https://wa.me/919963373679?text=Hello%20Krishnaveni%20School%2C%20I%E2%80%99d%20like%20to%20book%20a%20school%20tour%20for%20my%20child.",
				}}
				workingHours={{
					title: "Working Hours",
					subtext:
						"Feel free to visit during working hours or call ahead to schedule an appointment.",
					monFri: "8:30AM — 3:00PM",
					sat: "8:30AM — 12:30PM",
					sun: "Closed",
				}}
				transport={{
					title: "Transport",
					subtext:
						"We offer transportation services to nearby areas including Uppal, Boduppal, and Medipally. Ask about routes and pick-up points during your call or visit.",
				}}
			/>
		</main>
	);
}
