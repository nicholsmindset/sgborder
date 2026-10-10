import { ChevronDown } from "lucide-react";

interface FAQ {
  question: string;
  answer: string;
}

/** Native disclosure keeps every answer in server HTML and works without JavaScript. */
export const FAQAccordion = ({ faqs }: { faqs: FAQ[] }) => (
  <div className="space-y-2">
    {faqs.map((faq) => (
      <details key={faq.question} className="group rounded-xl border border-border bg-card shadow-card overflow-hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between p-4 text-left transition-colors hover:bg-muted/50 [&::-webkit-details-marker]:hidden">
          <span className="text-sm font-semibold text-foreground pr-4">{faq.question}</span>
          <ChevronDown aria-hidden="true" className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
        </summary>
        <div className="px-4 pb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
        </div>
      </details>
    ))}
  </div>
);
