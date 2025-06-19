import Image from "next/image";
import React from "react";
import Button from "./button";
import { Paintbrush } from "lucide-react";

const UnderConstruction = () => {
	return (
		<div className="parent-container flex items-center justify-center bg-black h-[70vh]">
			<Image
				src="/bg-desktop-construction.jpg"
				alt="under-construction"
				fill
				className="object-cover hidden md:block opacity-20"
			/>
			<Image
				src="/bg-mobile-construction.jpg"
				alt="under-construction"
				fill
				className="object-cover block md:hidden opacity-20"
			/>

			<div className="flex flex-col items-center justify-center container z-10 text-white text-center gap-2">
				<Paintbrush className="w-20 h-20 mb-4" color="white" />
				<h1 className="text-4xl font-semibold font-serif mb-4">
					Under Construction
				</h1>

				<p className="text-lg opacity-80">
					This page is being built. Please check back later.
				</p>
				<p className="text-lg opacity-80">
					यह पेज बनाया जा रहा है। कृपया बाद में फिर से देखें।
				</p>
				<p className="text-lg opacity-80">
					ఈ పేజీ నిర్మించబడుతోంది. దయచేసి తర్వాత తనిఖీ చేయండి.
				</p>

				<div className="flex flex-col md:flex-row gap-3 mt-4">
					<Button label="Go Home" href="/en" style="primary" />
					<Button label="घर जाओ" href="/hi" style="primary" />
					<Button label="హోమ్ కి వెళ్ళు" href="/te" style="primary" />
				</div>
			</div>
		</div>
	);
};

export default UnderConstruction;
