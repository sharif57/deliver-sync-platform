import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/shareUi/footer";
import HeaderRole from "@/components/shareUi/HeaderRole";
import Providers from "@/Provider/Providers";
import { Toaster } from "@/components/ui/sonner";
import AutoLocationTracker from "@/tracker/tracker";

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
        <Providers>
          <HeaderRole mode="online" useSwitch={true} />
          <AutoLocationTracker />
          <div className="container mx-auto p-6 space-y-6 min-h-[calc(100vh-200px)]">
            {children}
          </div>
          <Toaster position="top-right" richColors />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
