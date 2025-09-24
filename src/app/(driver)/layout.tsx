import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/shareUi/footer";
import HeaderRole from "@/components/shareUi/HeaderRole";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-roleBg`}
      >
        <HeaderRole mode="online" useSwitch={true} />
        <div className="container mx-auto p-6 space-y-6 min-h-[calc(100vh-200px)]">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
