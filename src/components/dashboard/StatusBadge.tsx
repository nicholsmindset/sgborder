import type { TrafficStatus } from "@/lib/constants";
import { useTranslation } from "@/lib/i18n";

const CONFIG: Record<TrafficStatus, { key: "status_smooth" | "status_moderate" | "status_heavy" | "status_jammed"; bg: string; text: string; pulse?: boolean }> = {
  smooth: { key: "status_smooth", bg: "bg-status-smooth-tint", text: "text-status-smooth" },
  moderate: { key: "status_moderate", bg: "bg-status-moderate-tint", text: "text-status-moderate" },
  heavy: { key: "status_heavy", bg: "bg-status-heavy-tint", text: "text-status-heavy" },
  jammed: { key: "status_jammed", bg: "bg-status-jammed-tint", text: "text-status-jammed", pulse: true },
};

interface StatusBadgeProps {
  status: TrafficStatus;
  size?: "sm" | "md" | "lg";
}

export const StatusBadge = ({ status, size = "md" }: StatusBadgeProps) => {
  const { t } = useTranslation();
  const c = CONFIG[status];
  const sizeClasses = {
    sm: "px-2 py-0.5 text-label-sm",
    md: "px-2.5 py-1 text-label",
    lg: "px-3 py-1.5 text-sm",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-semibold ${c.bg} ${c.text} ${sizeClasses[size]} ${
        c.pulse ? "animate-jammed-pulse" : ""
      }`}
    >
      {t(c.key)}
    </span>
  );
};
