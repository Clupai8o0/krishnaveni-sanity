import { TestimonialsProps } from '@/lib/types';
import { generateId } from '@/lib/utils';

import HeroVideoDialog from './magicui/hero-video-dialog';

function Testimonials({ title, testimonials }: TestimonialsProps) {
  return (
		<section className="w-full h-auto overflow-hidden py-10 mb-10 relative px-4 md:px-8">
			<div className="w-full max-w-7xl mx-auto h-auto overflow-hidden relative flex flex-col">
				<h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-balance text-center">
					{title}
				</h1>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
					{testimonials.map(({ video, thumbnail, author, authorTitle }) => (
						<div className="flex flex-col" key={generateId()}>
							<HeroVideoDialog
								className="block h-full object-cover"
								animationStyle="from-center"
								videoSrc={video}
								thumbnailSrc={thumbnail}
							/>
							<div className="mt-2">
								<p className="text-xl font-bold font-serif">{author}</p>
								<span className="text-slate-400">{authorTitle}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default Testimonials