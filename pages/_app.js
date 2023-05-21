import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import MainLayout from "../layout/mainLayout";
import { Analytics } from '@vercel/analytics/react';


function MyApp({ Component, pageProps }) {
	return (
		<MainLayout>
			<Component {...pageProps} />
			<Analytics />
		</MainLayout>
	);
}

export default MyApp;
