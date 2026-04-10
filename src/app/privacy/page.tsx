import type { Metadata } from "next";
import PrivacyClient from "@/page-components/PrivacyPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for SG Border Live (sgborder.live). Learn how we collect data, use cookies, and work with Google AdSense and Analytics.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
