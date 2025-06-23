import { ContactProps } from "@/lib/types";
import { Mail } from "lucide-react";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import Link from "next/link";

const ContactLink = ({
	href,
	content,
	icon,
}: {
	href: string;
	content: string;
	icon: IconName;
}) => (
	<Link href={href} className="group flex gap-2">
		<DynamicIcon name={icon} />
		<span className="group-hover:underline">{content}</span>
	</Link>
);

const Contact = ({
	transport,
	workingHours,
	contact,
	address,
}: ContactProps) => {
	return (
		<section className="parent-container">
			<div className="container flex flex-col gap-10">
				<div className="contact-section">
					<h2 className="heading">School Address</h2>
					<p className="opacity-80">{address.subtext}</p>
					<p className="font-bold">{address.address}</p>
					<iframe
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50260804.070813!2d103.3194165631587!3d3.006131546229591!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9efcda041387%3A0xf6d6e640790d1d31!2sKrishnaveni%20School!5e0!3m2!1sen!2sau!4v1750594531558!5m2!1sen!2sau"
						style={{ border: 0 }}
						allowFullScreen
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						className="w-full h-[400px]"
					></iframe>
				</div>

				<div className="flex flex-col gap-4">
					<div className="contact-section">
						<h2 className="heading">Contact Information</h2>
						<p className="opacity-80">
							Call us at the number above or use the form below to schedule a
							school tour or admission consultation. Let us know how we can help
							— we’ll get back to you shortly.
						</p>

						<ContactLink
							href={`mailto:${contact.email}`}
							content={contact.email}
							icon="mail"
						/>
						<ContactLink
							href={`tel:${contact.phone}`}
							content={contact.phone}
							icon="phone"
						/>
						<ContactLink
							href={contact.whatsapp}
							content="WhatsApp"
							icon="message-circle"
						/>
						<ContactLink
							href={contact.facebook}
							content="Facebook"
							icon="facebook"
						/>
					</div>

					<div className="contact-section">
						<h2 className="heading">Working Hours</h2>
						<p className="opacity-80">
							Feel free to visit during working hours or call ahead to schedule
							an appointment.
						</p>
						<p>
							<span className="font-semibold">Monday to Friday:</span>{" "}
							{workingHours.monFri}
						</p>
						<p>
							<span className="font-semibold">Saturday:</span>{" "}
							{workingHours.sat}
						</p>
						<p>
							<span className="font-semibold">Sunday:</span> {workingHours.sun}
						</p>
					</div>

					<div className="contact-section">
						<h2 className="heading">Transport</h2>
						<p className="opacity-80">{transport}</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
