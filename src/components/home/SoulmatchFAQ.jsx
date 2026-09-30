import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import SectionHeading from "../shared/SectionHeading";
import Reveal from "../shared/Reveal";

const faqData = [
  {
    question: "What is SoulMatch?",
    answer:
      "SoulMatch is a matrimonial platform designed to help you find your perfect match based on shared values, interests, and life goals.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Click “Join free” and fill out the registration form, or continue with Google. It's quick and free to join!",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes. Contact details are only shared with premium members or approved requests, and we use industry-standard security to keep your data private.",
  },
  {
    question: "How does the matching process work?",
    answer:
      "Browse profiles and filter by age, gender, division and more. Save the ones you like to your favourites and request contact details when you're ready.",
  },
  {
    question: "Can I upgrade my membership?",
    answer:
      "Absolutely! Request premium from your dashboard for enhanced visibility and a featured spot on the home page.",
  },
];

const SoulmatchFAQ = () => {
  return (
    <section id="faq" className="section container-page scroll-mt-20">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <SectionHeading
          align="left"
          eyebrow="FAQ"
          title="Questions, answered"
          lead="Can't find what you're looking for? Our team is happy to help."
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <Link to="/contact" className="mt-2 font-semibold text-primary underline-offset-4 hover:underline">
            Contact support →
          </Link>
        </SectionHeading>

        <Reveal>
          <Accordion type="single" collapsible defaultValue="item-0" className="border-t">
            {faqData.map((faq, index) => (
              <AccordionItem key={faq.question} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
};

export default SoulmatchFAQ;
