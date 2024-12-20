
import { ClerkProvider } from "@clerk/nextjs";
import { ConvexClientProvider } from "./ConvexClientProvider";
import "./globals.css";
import {Outfit} from "next/font/google"
import { Toaster } from "@/components/ui/sonner"



const outfit = Outfit({subsets:['latin']})
export const metadata = {
  title: "AI NoteBook",
  description: "An AI based Notes app that fetch answers from the givn pdf",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>

    <html lang="en">
      <body
        className={outfit.className}
        >
        <ConvexClientProvider>

        {children}
        <Toaster/>
        </ConvexClientProvider>
      </body>
    </html>
        </ClerkProvider>
  );
}
