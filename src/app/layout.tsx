import "./globals.css";
import { Montserrat } from "next/font/google";

import { Sidebar } from "../components";
import SupabaseProvider from "../providers/SupabaseProvider";
import UserContextProvider from "../providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";

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
        <ToasterProvider />
        <SupabaseProvider>
          <UserContextProvider>
            <ModalProvider />
            <Sidebar>{children}</Sidebar>
          </UserContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
