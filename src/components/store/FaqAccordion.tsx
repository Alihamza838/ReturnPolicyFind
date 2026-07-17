import { Accordion, AccordionItem } from "../ui/accordion";
import type { Faq } from "../../types";

export function FaqAccordion({ faqs }: { faqs: Faq[] }) {
  if (!faqs || faqs.length === 0) return null;
  return (
    <div className="bg-white rounded-lg border border-ink-100 p-6 shadow-xs">
      <h2 className="mb-4 font-display text-xl font-bold text-ink">Frequently Asked Questions</h2>
      <Accordion>
        {faqs.map((faq) => (
          <AccordionItem key={faq.question} title={faq.question}>
            <p className="text-sm text-ink-600 leading-relaxed pt-1">{faq.answer}</p>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
