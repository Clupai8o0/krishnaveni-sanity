import { Image } from "next-sanity/image";
import { PortableText } from "next-sanity";
import { MessagePageData } from "@/lib/types";

const MessageLayout = ({ name, designation, imageUrl, content }: MessagePageData) => {
	return (
		<section className="parent-container py-10 lg:py-16">
			<div className="container flex flex-col items-center gap-10">
				{/* Photo and Name */}
				<div className="flex flex-col items-center gap-4">
					<div className="relative h-48 w-48 overflow-hidden rounded-full border-4 border-primary/20 md:h-64 md:w-64">
						<Image
							src={imageUrl}
							alt={name}
							fill
							className="object-cover"
						/>
					</div>
					<div className="text-center">
						<h1 className="heading">{name}</h1>
						<p className="text-lg text-muted-foreground font-medium">
							{designation}
						</p>
					</div>
				</div>

				{/* Message Content */}
				<div className="prose prose-lg max-w-3xl w-full">
					<div className="opacity-80 [&>p]:mb-4 [&>blockquote]:border-l-4 [&>blockquote]:border-primary/30 [&>blockquote]:pl-4 [&>blockquote]:italic [&>h2]:font-serif [&>h2]:text-2xl [&>h2]:mb-3 [&>h3]:font-serif [&>h3]:text-xl [&>h3]:mb-2 [&>ul]:list-disc [&>ul]:pl-6 [&>ol]:list-decimal [&>ol]:pl-6">
						<PortableText value={content} />
					</div>
				</div>
			</div>
		</section>
	);
};

export default MessageLayout;
