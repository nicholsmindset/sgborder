import { Link } from "react-router-dom";
import { type Guide, getCategoryColor } from "@/data/guides";
import { Clock } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

export const GuideCard = ({ guide }: { guide: Guide }) => {
  const { t } = useTranslation();
  return (
  <Link
    to={`/guides/${guide.slug}`}
    className="group flex flex-col rounded-xl border border-border bg-card shadow-card transition-all hover:shadow-card-hover active:scale-[0.98]"
  >
    {/* Color bar top */}
    <div className={`h-1.5 rounded-t-xl ${getCategoryColor(guide.category).split(" ")[0]}`} />
    <div className="flex flex-1 flex-col p-4">
      <span className={`self-start rounded-full px-2 py-0.5 text-label-sm font-semibold capitalize ${getCategoryColor(guide.category)}`}>
        {guide.category.replace("-", " ")}
      </span>
      <h3 className="mt-2 font-heading text-sm font-bold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
        {guide.title}
      </h3>
      <p className="mt-1 text-label-sm text-muted-foreground line-clamp-2 flex-1">
        {guide.description}
      </p>
      <div className="mt-3 flex items-center gap-1 text-label-sm text-muted-foreground">
        <Clock className="h-3 w-3" />
        {guide.readTime} {t("guide_min_read")}
      </div>
    </div>
  </Link>
  );
};
