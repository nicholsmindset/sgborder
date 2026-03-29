"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const NAME_MAP: Record<string, string> = {
  woodlands: "Woodlands",
  tuas: "Tuas",
  cameras: "Cameras",
  bus: "Buses",
  guides: "Guides",
  holidays: "Holidays",
  calculator: "Calculator",
  "rts-link": "RTS Link",
  telegram: "Telegram",
  live: "Live Traffic",
  about: "About",
  privacy: "Privacy",
  terms: "Terms",
};

function formatSegment(seg: string): string {
  return (
    NAME_MAP[seg] ||
    seg
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

interface BreadcrumbNavProps {
  items?: { label: string; href?: string }[];
}

export const BreadcrumbNav = ({ items }: BreadcrumbNavProps) => {
  const pathname = usePathname() ?? "/";

  // Don't render on homepage
  if (pathname === "/") return null;

  // Build breadcrumbs from items prop or auto-generate from path
  const crumbs: { label: string; href?: string }[] = [];

  if (items && items.length > 0) {
    crumbs.push(...items);
  } else {
    const segments = pathname.split("/").filter(Boolean);
    let accumulated = "";
    segments.forEach((seg, i) => {
      accumulated += `/${seg}`;
      crumbs.push({
        label: formatSegment(seg),
        href: i < segments.length - 1 ? accumulated : undefined,
      });
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="container py-2">
      <ol
        className="flex items-center gap-1 text-[12px] text-muted-foreground overflow-x-auto"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          className="flex items-center gap-1 shrink-0"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            href="/"
            className="hover:text-foreground transition-colors"
            itemProp="item"
          >
            <Home className="h-3 w-3" />
            <meta itemProp="name" content="Home" />
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {crumbs.map((crumb, i) => (
          <li
            key={i}
            className="flex items-center gap-1 shrink-0"
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            <ChevronRight className="h-3 w-3 text-muted-foreground/50" />
            {crumb.href ? (
              <Link
                href={crumb.href}
                className="hover:text-foreground transition-colors"
                itemProp="item"
              >
                <span itemProp="name">{crumb.label}</span>
              </Link>
            ) : (
              <span className="text-foreground font-medium" itemProp="name">
                {crumb.label}
              </span>
            )}
            <meta itemProp="position" content={String(i + 2)} />
          </li>
        ))}
      </ol>
    </nav>
  );
};
