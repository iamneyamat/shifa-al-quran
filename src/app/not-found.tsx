import { NotFoundClient } from "./not-found-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - পৃষ্ঠাটি পাওয়া যায়নি | শিফা আল কুরআন",
};

export default function NotFound() {
  return <NotFoundClient />;
}
