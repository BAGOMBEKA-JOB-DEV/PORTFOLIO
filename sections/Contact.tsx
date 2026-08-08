import { useFormspark } from "@formspark/use-formspark";
import Button from "components/Button";
import Input from "components/Input";
import links from "data/links";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaPaperPlane, FaRegCalendarAlt } from "react-icons/fa";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

type FormData = {
  name: string;
  email: string;
  company: string;
  intent: string;
  message: string;
  website: string; // honeypot — real users never fill this
};

const INTENT_OPTIONS = [
  "Full-time remote role",
  "Contract engagement",
  "Enterprise consultation",
  "Other",
];

const openCalendly = () => {
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({ url: links.calendly });
    return;
  }

  window.open(links.calendly, "_blank", "noopener,noreferrer");
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isSubmitted, setSubmitted] = useState(false);

  const [submit, submitting] = useFormspark({ formId: "8EaFSFubh" });

  const onSubmit = handleSubmit(async (data) => {
    if (data.website) return; // honeypot tripped

    await submit(data);
    setSubmitted(true);
  });

  if (isSubmitted) {
    return (
      <div id={Section.Contact}>
        {getSectionHeading(Section.Contact)}

        <p className="text-base md:text-lg leading-relaxed">
          Thank you for your message. I will respond within one business day.
        </p>
      </div>
    );
  }

  return (
    <div id={Section.Contact}>
      {getSectionHeading(Section.Contact)}

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Let&apos;s build something reliable.</h3>

          <p className="mt-4 text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            Whether you need an engineer embedded in an international remote product team, or an architect to scale a
            local enterprise platform, I would like to hear about it.
          </p>

          <p className="mt-6 text-sm text-neutral-600 dark:text-neutral-400">
            Available for full-time remote roles, contract engagements, and enterprise consultation.
          </p>

          <div className="mt-8 grid gap-3">
            <button
              type="button"
              onClick={openCalendly}
              className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-sm md:text-base font-semibold transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-neutral-900"
            >
              <FaRegCalendarAlt />
              Book a Technical Consultation
            </button>

            <a
              href={`mailto:${links.email}`}
              className="text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline underline-offset-4 w-fit focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
            >
              {links.email}
            </a>
          </div>
        </div>

        <form onSubmit={onSubmit} className="grid gap-6">
          <Input
            type="text"
            label="Full name"
            hasError={!!errors.name}
            placeholder="Your name"
            description={errors.name?.message || ""}
            {...register("name", { required: { value: true, message: "This is a required field" } })}
          />

          <Input
            type="email"
            label="Work email"
            hasError={!!errors.email}
            placeholder="you@company.com"
            description={errors.email?.message || ""}
            {...register("email", {
              required: { value: true, message: "This is a required field" },
              pattern: { value: /^\S+@\S+\.\S+$/, message: "Please enter a valid email address" },
            })}
          />

          <Input
            type="text"
            label="Company"
            hasError={!!errors.company}
            placeholder="Company or organisation"
            description={errors.company?.message || ""}
            {...register("company", { required: { value: true, message: "This is a required field" } })}
          />

          <Input
            type="select"
            label="What do you need?"
            options={INTENT_OPTIONS}
            hasError={!!errors.intent}
            placeholder="Select one"
            description={errors.intent?.message || ""}
            {...register("intent", { required: { value: true, message: "This is a required field" } })}
          />

          <Input
            type="textarea"
            label="Details"
            hasError={!!errors.message}
            placeholder="Tell me about the role or project"
            description={errors.message?.message || ""}
            {...register("message", {
              required: { value: true, message: "This is a required field" },
              minLength: { value: 20, message: "Please give me at least 20 characters of context" },
            })}
          />

          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
            {...register("website")}
          />

          <Button icon={FaPaperPlane} type="submit" disabled={submitting}>
            {submitting ? "Sending…" : "Send message"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
