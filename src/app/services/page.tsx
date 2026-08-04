import type { Metadata } from "next";
import { ServicesClient } from "./services-client";

export const metadata: Metadata = {
  title: "আমাদের সেবাসমূহ",
  description: "শিফা আল কুরআন এ আমরা কী কী রোগের চিকিৎসা প্রদান করি তার বিস্তারিত বিবরণ।",
};

export default function ServicesPage() {
  return <ServicesClient />;
}
