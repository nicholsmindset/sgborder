import type { Metadata } from "next";
import TelegramClient from "@/page-components/TelegramPage";

export const metadata: Metadata = {
  title: "Telegram Bot — Real-Time Causeway Traffic Alerts",
  description:
    "Get real-time causeway traffic alerts on Telegram. Free status checks, bus arrivals, and premium features including AI predictions and daily digests.",
  alternates: { canonical: "/telegram" },
};

export default function TelegramPage() {
  return (
    <>
      <div className="sr-only">
        <h2>SG Border Live Telegram Bot</h2>
        <p>Get real-time Singapore-JB causeway traffic updates directly on Telegram. Free commands include /status, /bus, /woodlands, and /tuas. Premium features include AI-powered predictions and real-time alerts.</p>
      </div>
      <TelegramClient />
    </>
  );
}
