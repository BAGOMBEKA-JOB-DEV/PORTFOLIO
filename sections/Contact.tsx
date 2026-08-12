import { useFormspark } from "@formspark/use-formspark";
import Button from "components/Button";
import Input from "components/Input";
import links from "data/links";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaPaperPlane, FaPhone, FaRegCalendarAlt } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { Section } from "types/Sections";
import { getSectionHeading } from "utils";

type FormData = {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot — hidden, real users never fill this
};

const openCalendly = () => {
  if (typeof window !== "undefined" && window.Calendly) {
    window.Calendly.initPopupWidget({ url: links.calendly });
    return;
  }

  window.open(links.calendly, "_blank", "noopener,noreferrer");
};

const Contact = () => {
  const {
    reset,
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

  const sendAnother = () => {
    reset();
    setSubmitted(false);
  };

  return (
    <div id={Section.Contact}>
      {getSectionHeading(Section.Contact)}

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Tell me what you&apos;re building</h3>

          <p className="mt-4 text-base md:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
            My best work has been on systems that have to stay correct under load — records that cannot duplicate,
            ledgers that have to balance, messages that have to arrive. Send me a few lines about the role or the system
            and I will get back to you within a day. A rough outline is plenty; I would rather hear about the problem
            than read a finished spec.
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

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a
                href={`mailto:${links.email}`}
                className="inline-flex items-center min-h-[44px] gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
              >
                <FaEnvelope />
                {links.email}
              </a>

              <a
                href={`tel:${links.phone}`}
                className="inline-flex items-center min-h-[44px] gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
              >
                <FaPhone />
                +256 778 480 981
              </a>

              <a
                href={links.resume}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center min-h-[44px] gap-2 text-sm font-semibold text-teal-600 dark:text-teal-400 hover:underline underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded"
              >
                <FiDownload />
                Download CV
              </a>
            </div>
          </div>
        </div>

        {isSubmitted ? (
          <div
            role="status"
            className="h-fit p-6 md:p-8 rounded-xl border border-neutral-900/10 dark:border-neutral-50/10"
          >
            <h4 className="text-lg font-bold tracking-tight">Message sent</h4>

            <p className="mt-2 text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              Thank you for getting in touch. I will respond within one business day.
            </p>

            <Button icon={FaPaperPlane} className="mt-6" onClick={sendAnother}>
              Send another message
            </Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-6">
            <Input
              type="text"
              label="Full Name"
              hasError={!!errors.name}
              placeholder="Your name"
              description={errors.name?.message || ""}
              {...register("name", { required: { value: true, message: "This is a required field" } })}
            />

            <Input
              type="email"
              label="Email Address"
              hasError={!!errors.email}
              placeholder="you@company.com"
              description={errors.email?.message || ""}
              {...register("email", {
                required: { value: true, message: "This is a required field" },
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Please enter a valid email address" },
              })}
            />

            <Input
              type="textarea"
              label="Message"
              hasError={!!errors.message}
              placeholder="Tell me about the role or project"
              description={errors.message?.message || ""}
              {...register("message", {
                required: { value: true, message: "This is a required field" },
                minLength: { value: 10, message: "Your message must be at least 10 characters long" },
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
        )}
      </div>
    </div>
  );
};

export default Contact;
