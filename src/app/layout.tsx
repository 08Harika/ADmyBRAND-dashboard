import "./globals.css";  // ✅ Correct import now
import { Inter } from "next/font/google";
import { DarkModeToggle } from "@/components/DarkModeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ADmyBRAND Insights",
  description: "AI-Powered Analytics Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="p-4 flex justify-end">
          <DarkModeToggle />
        </div>
        {children}
      </body>
    </html>
  );
}

