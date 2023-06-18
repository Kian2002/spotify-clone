import "./globals.css";
import { Montserrat } from "next/font/google";

import SupabaseProvider from "../providers/SupabaseProvider";
import UserContextProvider from "../providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import { Sidebar, Player } from "../components";

const font = Montserrat({
  subsets: ["latin"],
});

export const metadata = {
  title: "Spotify Clone",
  description: "Spotify Clone built with Next.js and Tailwind CSS",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserContextProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>{children}</Sidebar>
            <Player />
          </UserContextProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
