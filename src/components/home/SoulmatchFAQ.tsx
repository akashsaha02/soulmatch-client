"use client";

import { useState } from "react";
import SectionTitleHome from "../shared/SectionTitleHome";

const faqData = [
  {
    question: "What is Soulmatch?",
    answer:
      "Soulmatch is a matrimonial platform designed to help you find your perfect match based on shared values, interests, and life goals.",
  },
  {
    question: "How do I create an account?",
    answer:
      "Simply click the 'Sign Up' button and fill out the registration form with your details. It's quick and free to join!",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes, we use advanced security measures and encryption to ensure that your personal information remains safe and private.",
  },
  {
    question: "How does the matching process work?",
    answer:
      "Our matching algorithm uses your profile details and preferences to connect you with compatible partners, increasing the chance of a meaningful match.",
  },
  {
    question: "Can I upgrade my membership?",
    answer:
      "Absolutely! We offer premium membership options that provide additional features such as enhanced visibility and advanced match insights.",
  },
];

export default function SoulmatchFAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4">
        <SectionTitleHome heading="Frequently Asked Questions" subHeading="Get Answers to Common Queries" />
        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-4 bg-white hover:bg-gray-100 focus:outline-none"
              >
                <span className="text-lg font-medium text-gray-700">{faq.question}</span>
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeIndex === index && (
                <div className="p-4 bg-gray-100">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
