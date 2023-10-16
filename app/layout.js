import "./globals.css";
import { Fugaz_One, Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const fugaz = Fugaz_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fugaz",
});

export const metadata = {
  title: "Grovyo",
  description: "Grow your venture on your own",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${inter.className} ${fugaz.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
