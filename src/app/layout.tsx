import "./globals.css";
import { Montserrat } from "next/font/google";

import { Sidebar } from "../components";
import SupabaseProvider from "../providers/SupabaseProvider";
import { UserContextProvider } from "@/hooks/useUser";

const font = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "Spotify Clone",
  description: "Spotify Clone built with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <UserContextProvider>
            <Sidebar>{children}</Sidebar>
          </UserContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
