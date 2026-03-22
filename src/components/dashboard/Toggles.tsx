import { useTranslation } from "@/lib/i18n";

interface SegmentedToggleProps {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  variant?: "light" | "dark";
}

export const SegmentedToggle = ({ value, onChange, options, variant = "light" }: SegmentedToggleProps) => {
  const isLight = variant === "light";

  return (
    <div className={`inline-flex rounded-lg p-0.5 ${
      isLight ? "bg-muted" : "bg-primary-foreground/10"
    }`}>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`rounded-md px-3.5 py-1.5 text-label font-medium transition-all duration-200 ${
              active
                ? isLight
                  ? "bg-card text-foreground shadow-sm"
                  : "bg-primary-foreground/20 text-primary-foreground shadow-sm"
                : isLight
                  ? "text-muted-foreground hover:text-foreground"
                  : "text-primary-foreground/50 hover:text-primary-foreground/80"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
};

export const CheckpointToggle = ({
  value,
  onChange,
  variant = "light",
}: {
  value: string;
  onChange: (v: string) => void;
  variant?: "light" | "dark";
}) => {
  const { t } = useTranslation();
  return (
    <SegmentedToggle
      value={value}
      onChange={onChange}
      variant={variant}
      options={[
        { value: "all", label: t("toggle_both") },
        { value: "woodlands", label: t("checkpoint_woodlands") },
        { value: "tuas", label: t("checkpoint_tuas") },
      ]}
    />
  );
};

export const DirectionToggle = ({
  value,
  onChange,
  variant = "light",
}: {
  value: string;
  onChange: (v: string) => void;
  variant?: "light" | "dark";
}) => {
  const { t } = useTranslation();
  return (
    <SegmentedToggle
      value={value}
      onChange={onChange}
      variant={variant}
      options={[
        { value: "sg_to_jb", label: t("toggle_sg_to_jb") },
        { value: "jb_to_sg", label: t("toggle_jb_to_sg") },
      ]}
    />
  );
};
