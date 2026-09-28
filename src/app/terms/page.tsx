import { TermsClient } from "./terms-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "শর্তাবলি | শিফা আল কুরআন",
};

export default function TermsPage() {
  return <TermsClient />;
}
