# Testimonial drafts — awaiting approval

**Not imported by the site.** This file is documentation only, so nothing here
reaches the browser. Drafts must stay out of `data/testimonials.ts` until the
person named has approved the wording, because anything in that file is compiled
into the client bundle and readable by anyone.

Each draft below is grounded in what that referee actually witnessed, per the CV.

## How to use

1. Send the draft to the person. Suggested message:

   > I'm adding testimonials to my site. Would you be comfortable with something
   > like this — edited however you like, or rewritten entirely if you prefer?

2. If they reword it, **use their version verbatim**. An edited real quote beats
   a polished invented one.
3. Once approved, add an entry to `data/testimonials.ts`:

   ```ts
   {
     id: 1,
     approved: true,
     quote: "…their approved wording…",
     name: "Steven Tendo",
     role: "Founder",
     company: "Eloi Ministries Inc.",
     companyUrl: "https://eloiafrica.org",
   }
   ```

   The section and its nav entry appear automatically once the array is non-empty.
4. **Never add their phone number or personal email.** Those were given for
   private reference checks.

Worth asking for in the same message: a **LinkedIn recommendation**. It is
publicly verifiable in a way a quote on your own site can never be.

---

## Draft 1 — Steven Tendo, Founder, Eloi Ministries Inc. (eloiafrica.org)

Basis: line-managed the Eloi engagement — 99.9% uptime on SQL servers, 70%+
reduction in recurring defects, 40% improvement in delivery while leading the team.

> Job took ownership of our database infrastructure and kept it running without
> interruption. He had a habit of tracing problems to the actual cause instead of
> patching symptoms, and recurring issues simply stopped coming back. He also led
> our engineering team through a major delivery on time and on budget.

## Draft 2 — Clinton, Senior Software Engineer, SMS ONE (U) Limited (smsone.co.ug)

Basis: colleague on EMIS — the learners module, NIRA and UNEB integrations, and
the 1,000+ table schema.

> Job built core parts of the national EMIS platform, including the integrations
> with NIRA and UNEB that validate records at the point of entry. He is careful
> with data at a scale where mistakes are expensive, and he documents his work so
> the rest of the team can rely on it.

## Draft 3 — Taqee Ahmed, Senior Software Engineer, Sai Pali Institute of Technology & Science

Basis: taught the Diploma in Software Engineering, Sep 2020 – Sep 2022.

> Job was among the strongest engineers I taught. He went well past the syllabus
> into architecture and system design, and he was already building complete
> production systems before he graduated.
