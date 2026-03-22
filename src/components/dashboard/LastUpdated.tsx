import { useEffect, useState } from "react";
import { useTranslation } from "@/lib/i18n";

export const LastUpdated = ({ timestamp }: { timestamp: string }) => {
  const [diffMin, setDiffMin] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const update = () => {
      setDiffMin(Math.floor((Date.now() - new Date(timestamp).getTime()) / 60000));
    };
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, [timestamp]);

  const stale = diffMin > 10;
  const label = diffMin < 1 ? t("updated") : `${diffMin} ${t("min_ago")}`;

  return (
    <span className={`text-label-sm ${stale ? "text-destructive font-medium" : "text-muted-foreground"}`}>
      {stale && "\u26A0 "}{t("updated")} {diffMin < 1 ? "" : label}
    </span>
  );
};
