import Image from "next/image";
import React from "react";

//todo: JSON-LD

const Hero = () => {
	return (
		<section
			id="hero"
			className="w-full h-auto overflow-hidden rounded-b-[4em] py-40 relative"
		> 
			<div className="container relative z-10 text-white flex flex-col items-center justify-center px-4">
				<h1 className="font-serif text-5xl font-bold text-balance text-center">Affordable, Values-Driven Education in Peerzadiguda</h1>
				<h2 className="text-2xl text-center text-balance leading-tight mt-3 mb-6 opacity-80">
					Empowering Future-Ready Students with Strong Academics & Life Skills
				</h2>
				<div className="flex flex-col md:flex-row gap-4">
					<button className="bg-primary text-white px-6 py-3 rounded-full font-medium">Apply Now</button>
					<button className="bg-secondary text-black px-6 py-3 rounded-full font-medium">Book a School Tour</button>
				</div>
				<p className="text-lg text-center mt-4">
					Krishnaveni School in Peerzadiguda offers affordable, English-medium
					education rooted in local values and life skills
				</p>
			</div>

      <div className="absolute bg-black opacity-70 w-full h-full z-[2] top-0 left-0"></div>
      <Image src="/hero-bg.jpg" alt="Hero Background" fill className="object-cover absolute w-full h-full z-[1]" />
		</section>
	);
};

export default Hero;
