import { getCTAData, getNavigationData } from "@/lib/queries";
import CTA from "@/components/cta";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const navigation = await getNavigationData();
	const cta = await getCTAData();

	return (
		<>
			<Navbar navigation={navigation} />
			{children}
			<CTA cta={cta} />
			<Footer navigation={navigation} />
		</>
	);
}
