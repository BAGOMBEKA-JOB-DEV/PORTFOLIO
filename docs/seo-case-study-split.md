# The Case Study Split

**Information architecture — bagombekajob.com**

Seven projects share a single address. Five of them have enough substance to rank on their own — but only if they stop competing with the page they live on.

| | |
|---|---|
| **Assessed** | 4 September 2026 |
| **Stack** | Next.js 13.4.19, Pages Router |
| **Effort** | ~1 day |

---

## 1. What is actually wrong

| Figure | Meaning |
|---:|---|
| **2** | indexable URLs on the whole site |
| **7** | projects sharing one of them |
| **3,200** | words of project copy at that one address |

The site has exactly two addresses a search engine can return: `/` and `/how-i-work-remotely`. Everything else is a fragment — `/#case-studies`, `/#stack`, `/#writing`. A fragment is not an address. Google indexes the document, not the anchor inside it, so all seven projects are filed under a single URL whose title and description are about *you*, not about EMIS or skyl or a bulk-SMS platform.

The consequence is specific. Someone searching for *national EMIS learner registration Uganda*, or *Go library for switching between AI model providers*, has nothing to land on. The relevant 900 words exist and are server-rendered correctly — they simply have no address of their own to be returned as.

This is not a content problem. The writing is already there, already good, and already crawlable. It is an addressing problem.

---

## 2. The shape of the fix

Standard hub and spoke. The homepage stops being the document that contains every case study and becomes the index that points at them. Each substantial project gets a real route that can hold its own title, description, canonical, social card and structured data.

```
NOW                                  PROPOSED

┌─────────────────────────┐          ┌────────┐  links to   ┌──────────────────────┐
│ /                       │          │ /      │ ──────────► │ /work/emis       948 │
│  ├ EMIS ............948 │          │ hub    │ ──────────► │ /work/ovrin      531 │
│  ├ ovrin ...........531 │          └────────┘ ──────────► │ /work/impala-... 495 │
│  ├ IMPALA LITE2 ....495 │                     ──────────► │ /work/skyl       463 │
│  ├ skyl ............463 │          KEPT INLINE──────────► │ /work/parliam... 381 │
│  ├ Parliament SMS ..381 │          ┌────────┐             └──────────────────────┘
│  ├ Cullo ...........213 │          │ Cullo  │
│  └ Agriculture .....169 │          │ Agric. │
│                         │          └────────┘
│  7 subjects, 1 address  │          7 subjects · 6 addresses
└─────────────────────────┘
```

The change is not that content moves — it is that five subjects gain an address of their own, and the homepage gains five internal links pointing at them. The two thinnest projects deliberately stay where they are.

---

## 3. Which projects earn a page

Not all seven. A page carrying only 170 words of unique body copy is a thin-content page: it dilutes the site rather than adding to it, and Google is explicit about treating near-empty pages as a quality signal against the domain. Word counts are measured from the prose in `data/projects.ts`.

| Project | Words | Route | Verdict |
|---|---:|---|---|
| National EMIS | 948 | `/work/emis` | Own page |
| ovrin | 531 | `/work/ovrin` | Own page |
| IMPALA LITE2 | 495 | `/work/impala-lite2` | Own page |
| skyl | 463 | `/work/skyl` | Own page |
| Parliament Bulk SMS | 381 | `/work/parliament-sms` | Own page |
| Cullo | 213 | — | Stays inline |
| Agricultural Marketplace | 169 | — | Stays inline |

Every one of the five already has a diagram in `components/CaseStudyDiagram.tsx` with a real `<title>` and `<desc>`, so each page arrives with a crawlable illustration attached — no extra work, and a genuine differentiator against the average engineer's portfolio.

---

## 4. The trap that ruins this

> **Read this before writing any code.**
>
> If the full narrative stays on the homepage *and* also appears at `/work/emis`, you have created two URLs carrying identical text. They compete with each other, Google picks one — often the wrong one — and you have spent a day of work to end up ranking worse than you do now.

Splitting the routes is the easy half. Deciding what the homepage keeps is the half that determines whether this works. Three options:

**A. Move the narrative to the spoke — recommended.**
The homepage card keeps the name, subtitle, role, tags and the result line, then links out. The Situation / Task / Action prose lives at one address only. No duplication anywhere.

**B. Keep both, canonical to the spoke.**
Legal, and safer if you are nervous. But the homepage still renders text that is explicitly telling Google to ignore it — you carry the page weight and get none of the credit.

**C. Keep both, no canonical.**
Self-competition, on purpose. This is the outcome to avoid.

Under option A the homepage drops roughly 2,800 words. That sounds alarming and is not: the homepage's job is to rank for *your name*, which it does on identity signals — the `<h1>`, the Person schema, the `sameAs` profiles — not on case-study volume. The spokes take over the topical ranking. This is the trade the whole restructure is buying.

**Worth stating plainly:** this moves your existing copy, it does not rewrite it. The only new prose required is one meta description per page — five short sentences, flagged as a decision in §7.

---

## 5. How it gets built

Ordered because each step depends on the one above it — the route cannot be generated before the slugs exist, and the sitemap cannot list routes that are not yet generated.

1. **Add a slug to the project model.**
   One `slug` field on the `Project` type in `types/Sections.ts`, and a value on each of the seven entries in `data/projects.ts`. Slugs must be stable forever — changing one later means a redirect.

2. **Create `pages/work/[slug].tsx`.**
   `getStaticPaths` over the five page-worthy projects with `fallback: false`, so an unknown slug renders the existing 404 rather than a blank page. `getStaticProps` hands the project through.

3. **Extract the card body into a shared component.**
   `ProjectCard` in `sections/Projects.tsx` already renders the STAR blocks, diagram, result panel, tags and links. Split it so the hub renders the summary half and the spoke renders the full half from one source — never two copies of the same markup drifting apart.

4. **Reduce the hub cards and link out.**
   Each of the five cards on `/` becomes name, subtitle, role, tags, result line, and a link to its page. This is the step that removes the duplication, so it ships together with step 2 — not after.

5. **Per-page metadata and structured data.**
   Title, description, canonical, `og:*` overrides, plus a `CreativeWork` and a `BreadcrumbList` per page. The builders in `data/seo.ts` already do exactly this shape — `pageSchema()` takes a path, name and description and is reusable as-is.

6. **Teach the sitemap about dynamic routes.**
   `scripts/generate-sitemap.mjs` currently skips any filename beginning with `[`, because a dynamic segment is a template rather than an address. It needs the five slugs expanded. It is an `.mjs` script and cannot import a TypeScript module, so the pragmatic route is a regex over `data/projects.ts` — noted because it is the one genuinely inelegant piece of this plan.

7. **Wire the internal links.**
   Breadcrumb back to `/#case-studies`, and previous/next links between sibling case studies. New URLs have no external authority; internal links are the only signal telling Google they exist and matter. Use `next/link` — the buttons-with-`onClick` pattern that made `/how-i-work-remotely` a crawler orphan is the mistake to not repeat.

---

## 6. What it costs, and what could go wrong

**Ranking flux.** Restructuring a site's internal linking causes a re-evaluation period. Expect a few weeks of unstable positions before things settle, and settle higher. If anything time-sensitive is riding on current rankings, wait until after it.

**The spokes start from zero.** Five brand-new URLs have no history and no backlinks. They will take longer to earn position than the homepage did. Linking them from the hub, the sitemap and each other is what accelerates that, which is why step 7 is not optional garnish.

**Search Console becomes genuinely necessary here.** Without it you cannot see whether the new URLs were indexed, whether Google honoured the canonicals, or whether the homepage lost anything it should not have. Doing this restructure blind is the one version of it I would argue against.

**Reversible.** If it goes badly, the fix is to restore full text on the hub and redirect the spokes back to the fragments. Nothing here is one-way.

---

## 7. Decisions that need you

**Route prefix.**
`/work/`, `/case-studies/`, or `/projects/`. *Recommend `/work/`* — shortest, and neutral across all three project kinds, whereas `/case-studies/` reads oddly on an open-source library. The keyword value of the prefix itself is negligible; consistency matters more.

**Do the two personal projects get pages?**
*Recommend no.* At 169 and 213 words they would be thin pages. If they should have their own addresses, the honest answer is to write them up to roughly 400 words first — a content decision, not a routing one.

**Who writes the five meta descriptions?**
Each page needs one, around 150 characters. They can be derived mechanically from `subtitle`, but `"Ministry of Education & Sports, Uganda"` is too thin to earn a click. *Recommend you write these five* — it is the only new copy the whole project requires, and it is the copy that decides whether anyone clicks.

**Does the hub keep the tabbed UI?**
The Case Studies / Open Source / Personal tabs still work as an index once the cards are shorter, and all panels stay server-rendered. *Recommend keeping it* — it costs nothing in crawlability and the shorter cards will make it read better than it does now.

---

*Word counts measured from `data/projects.ts`. Route structure verified against Next.js 13.4.19 Pages Router. Prerequisite: Google Search Console, so the restructure can be measured rather than assumed.*
