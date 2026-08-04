import { ContactClient } from "./contact-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "যোগাযোগ | শিফা আল কুরআন",
  description: "শিফা আল কুরআন এর সাথে যোগাযোগ করুন।",
};

export default function ContactPage() {
  return <ContactClient />;
}
