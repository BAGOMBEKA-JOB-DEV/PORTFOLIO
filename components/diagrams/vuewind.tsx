import { Boundary, Edge, External, Legend, Node, Store } from "components/diagrams/primitives";

/**
 * Vuewind — C4 Component diagram.
 *
 * Drawn from the repository rather than its README:
 *   - one API record per component, and the declarations generated from it:
 *     src/docs/content/*.js, scripts/generate-types.mjs (--check mode)
 *   - the contract test that parses defineEmits out of each SFC and compares
 *     it to the documented events: tests/catalog.test.mjs
 *   - tarball installed offline and all 60 examples compiled through ESM, CJS,
 *     SSR and tsc, with an empty dependency list asserted:
 *     scripts/test-package.mjs
 *   - manual dispatch-only publishing, version and release-notes validation,
 *     dry-run and 2FA staging modes: .github/workflows/publish.yml
 *   - the pipeline that runs all of it: .github/workflows/ci.yml
 *
 * The claim the picture makes is that the documented contract cannot disagree
 * with the implementation, because the two paths out of the record meet again
 * at a gate. The teal elements are the ones that fail a build.
 */

const vuewind = {
  label:
    "Vuewind component diagram: one API record per component generates the documentation table and the TypeScript declarations, and a contract test compares them back against the implementation, so documentation drift fails the build",
  title: "Vuewind — Component diagram, scope: how a component's contract stays true",
  desc: "Component diagram of Vuewind, an open-source library of 60 Vue 3 components. Three files are written by hand for each component: an API record holding its props, events, notes and keyboard contract, the single-file component itself, and a runnable example. Two artefacts are generated from the record and never written twice — the TypeScript declarations and the documentation API table. Two gates then close the loop: a check mode that regenerates the declarations and fails if the committed file differs, and a contract test that parses the defineEmits call out of each single-file component and asserts the documented events match the implementation exactly. Documentation drift is therefore a build failure rather than a stale page. The release gate proves the published artefact instead of the working tree: it builds the real tarball, installs it into a temporary directory with no network access, compiles all 60 examples through both ESM and CommonJS, server-renders them, type-checks them against the generated declarations, and asserts the dependency list is empty so the documentation tree never reaches a consumer. Publishing is a manual workflow dispatch that refuses to run unless the version matches package.json and version-specific release notes exist, and it offers a dry run and a staged mode awaiting account approval with two-factor authentication. Version 1.0.0 is cut and awaiting npm account approval.",
  viewBox: "0 0 880 880",
  minWidth: 860,
  body: (
    <>
      {/* ---------- what a person writes ---------- */}
      <Boundary x={16} y={20} w={848} h={150} label="authored by hand — three files per component" />

      <Store x={40} y={54} w={250} h={80} name="API record" tech="props · events · keyboard" />

      <Node
        x={312}
        y={58}
        w={250}
        h={74}
        name="Vw*.vue"
        kind="Component"
        tech="Vue 3 single-file"
        note="60 components"
      />

      <Node x={584} y={58} w={256} h={74} name="Example" kind="Component" tech="docs/examples" note="60 runnable" />

      {/* ---------- generated, then checked back ---------- */}
      <Edge d="M 120 138 L 120 202" label="" lx={120} ly={150} />
      <Edge d="M 220 138 L 690 202" label="the documented events" lx={230} ly={166} anchor="start" />
      <Edge d="M 437 136 L 752 202" label="defineEmits parsed out" lx={560} ly={186} anchor="start" />

      <Boundary x={16} y={206} w={424} h={128} label="generated — never written twice" accent />

      <Node x={40} y={242} w={180} h={72} name="index.d.ts" kind="Generated" tech="from the record" accent />

      <Node x={236} y={242} w={184} h={72} name="API table" kind="Generated" tech="docs site" />

      <Boundary x={456} y={206} w={408} h={128} label="gates — drift is a build failure" accent />

      <Node x={480} y={242} w={180} h={72} name="types:check" kind="Gate" tech="regenerate, diff" accent />

      <Node x={676} y={242} w={172} h={72} name="catalog test" kind="Gate" tech="record vs code" accent />

      <Edge d="M 444 278 L 472 278" label="" lx={458} ly={270} />

      {/* ---------- the tarball, not the working tree ---------- */}
      <Edge d="M 440 338 L 440 372" label="" lx={440} ly={356} />

      <Boundary
        x={16}
        y={376}
        w={848}
        h={166}
        label="proved as a consumer receives it — not as it exists in the repository"
      />

      <Node x={40} y={412} w={190} h={72} name="Tarball" kind="Artifact" tech="npm pack" />

      <External x={254} y={414} w={190} h={68} name="Temp consumer" note="installed offline" />

      <Node x={468} y={412} w={190} h={72} name="Compile 60" kind="Check" tech="ESM · CJS · SSR · tsc" />

      <Node x={682} y={412} w={166} h={72} name="Zero deps" kind="Assert" tech="asserted empty" accent />

      <Edge d="M 234 448 L 250 448" label="" lx={242} ly={440} />
      <Edge d="M 448 448 L 464 448" label="" lx={456} ly={440} />

      <text x={40} y={516} className="fill-neutral-500 dark:fill-neutral-500 text-[10.5px]">
        the documentation tree — charts, spreadsheets, maps — never reaches a consumer
      </text>

      {/* ---------- release ---------- */}
      <Edge d="M 440 546 L 440 582" label="" lx={440} ly={566} />

      <Boundary
        x={16}
        y={586}
        w={848}
        h={142}
        label="release — manual dispatch only, never on a push or pull request"
      />

      <Node
        x={40}
        y={622}
        w={230}
        h={74}
        name="Publish workflow"
        kind="Gate"
        tech="workflow_dispatch"
        note="version + notes checked"
        accent
      />

      <Node x={294} y={622} w={200} h={74} name="Dry run" kind="Mode" tech="verify, publish nothing" />

      <Node x={518} y={622} w={200} h={74} name="Stage" kind="Mode" tech="awaits 2FA approval" />

      <External x={742} y={624} w={106} h={70} name="npm" note="pending" />

      <Edge d="M 722 659 L 738 659" label="" lx={730} ly={651} />

      <text x={40} y={716} className="fill-teal-700 dark:fill-teal-400 text-[10.5px] font-semibold">
        no token in the repository can publish on its own — v1.0.0 is cut and awaiting account approval
      </text>

      {/* ---------- key ---------- */}
      <Legend
        x={16}
        y={772}
        items={[
          { shape: "teal fill", means: "the things that fail a build: the generated declarations and the two gates" },
          { shape: "cylinder", means: "the API record — the single source of truth for one component" },
          { shape: "stadium", means: "outside the library: the offline test consumer, and the registry" },
          { shape: "dashed box", means: "stage of the pipeline" },
          { shape: "types:check", means: "regenerates the declarations and fails if the committed file differs" },
          { shape: "catalog test", means: "parses defineEmits from each component and compares it to the record" },
        ]}
      />
    </>
  ),
};

export default vuewind;
