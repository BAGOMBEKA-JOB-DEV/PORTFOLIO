# 🏗️ Hyper-Detailed System Architecture - Bagombeka Job Portfolio

## 1. System Design Philosophy

The portfolio is architected as a **Next.js 13 Single-Page Application (SPA)** utilizing **Server-Side Rendering (SSR)**.

### 1.1 Performance & SEO Strategy
*   **Initial Hydration**: The server delivers a fully populated HTML document, including dynamic data from DEV.to and Dribbble. This eliminates "loading flickers" for the main content.
*   **Atomic Design System**: The `components/` directory follows an atomic-inspired structure where primitives (`Button`, `Input`) are reused across all 18 content `sections/`.
*   **Font & Asset Optimization**: Google Fonts are loaded via `@font-face` equivalents in CSS, and images are managed by `next/image` for WebP serving and lazy loading.

---

## 2. Layered Architecture (Technical Depth)

The system is partitioned into strictly defined layers to ensure maintainability.

```mermaid
graph TD
    subgraph Presentation_Layer["🎨 Presentation (React/Next.js)"]
        Pages["pages/index.tsx (Root Container)"]
        S_Header["sections/Header.tsx (Full-screen Hero)"]
        S_Projects["sections/Projects.tsx (Grid Layout)"]
        C_Shared["components/Shared (Button, Input, Heading)"]
    end

    subgraph Logic_Layer["🧠 Logic & State (React Ecosystem)"]
        H_Window["hooks/useWindowDimensions (Breakpoint Listener)"]
        C_Theme["contexts/ThemeProvider (State Management)"]
        U_Utils["utils/index.tsx (Formatting & Heading Logic)"]
    end

    subgraph Access_Layer["💾 Data Access (TypeScript)"]
        Static["data/*.ts (Hardcoded Schema-based Objects)"]
        Fetchers["services/index.tsx (Fetch API Wrappers)"]
    end

    subgraph Infra_Layer["🌐 Infrastructure (Vercel Edge)"]
        Edge["Vercel Global Edge Network"]
        APIs["External APIs (DEV.to, Dribbble)"]
        FOR["Formspark (Backend-less Forms)"]
    end

    Presentation_Layer <--> Logic_Layer
    Presentation_Layer --> Access_Layer
    Access_Layer --> Infra_Layer
```

---

## 3. Component Hierarchy Tree

A visualization of the React mount lifecycle and component nesting depth.

```mermaid
graph TD
    App["_app.tsx (App Shell)"]
    Head["Head (Next.js Global Head)"]
    Theme["ThemeProvider (Context Provider)"]
    Script_Cal["Script (Calendly)"]
    Script_Tawk["Script (Tawk.to)"]
    
    Nav["Navigation (Fixed Component)"]
    NoSSR["NoSSR (Hydration Guard)"]
    T_Toggle["Theme Toggle Button"]

    Page["index.tsx (Main Layout)"]

    subgraph Content_Sections["18-Section Content Stack"]
        S1["Header"]
        S1_Photo["PhotoWall"]
        S1_Ing["Ingredients (Typewriter)"]
        S1_Prof["Profiles"]
        
        S2["AboutMe"]
        S3["WorkExperience (Timeline)"]
        S4["Education (Timeline)"]
        S5["Skills (Grid)"]
        S6["Projects (Cards)"]
        S7["Blog (API data)"]
        S_Etc["... Remaining 11 Sections"]
    end

    App --> Head & Theme & Script_Cal & Script_Tawk
    Theme --> Nav & Page
    Nav --> NoSSR --> Nav_Icons & T_Toggle
    Page --> Content_Sections
    S1 --> S1_Photo & S1_Ing & S1_Prof
```

---

## 4. Navigation & Smooth Scroll Architecture

The site uses `react-scroll` to manage navigation across the single-page layout.

### 4.1 Scroll Mechanism
*   **Fixed Sidebar**: On desktop, the `Navigation` component is `fixed inset-y-0`.
*   **Scroll Intercept**: Clicking a nav item triggers `scroller.scrollTo(sectionId, { duration: 500, smooth: true })`.
*   **Hydration Warning**: Wrapped in `NoSSR` to ensure the sidebar only renders when the `window` object is available for dimension calculations.

### 4.2 User Interaction Sequence
```mermaid
sequenceDiagram
    participant U as User
    participant N as Navigation.tsx
    participant RS as react-scroll (scroller)
    participant D as DOM (Section Element)

    Note over U, N: Desktop View (Sidebar)
    U->>N: Click "Projects" Icon
    N->>RS: scrollTo("projects", { smooth: true })
    RS->>D: Find element with id="projects"
    RS->>D: Calculate vertical offset
    RS->>U: Animate scroll to offset (500ms)
    Note over D: User is at Projects Section
```

---

## 5. Data Architecture (TypeScript Data Layer)

The project utilizes a strictly typed, file-based data layer. This replaces a database or CMS.

### 5.1 Type Hierarchy & Relationships
```mermaid
classDiagram
    class Section {
        <<enumeration>>
        AboutMe
        WorkExperience
        Skills
        Projects
        ... 14 others
    }

    class SectionMetadata {
        +IconType icon
        +string title
    }

    class Project {
        +number id
        +string image
        +string name
        +string summary
        +string[] tags
        +Link link
    }

    class Experience {
        +number id
        +string logo
        +string name
        +Period period
        +string position
        +string location
        +string[] keyFocus
    }

    SectionMap -- Section : keys
    SectionMap -- SectionMetadata : values
    Project -- Section : belongs to
    Experience -- Section : belongs to
```

---

## 6. SSR Request/Response Pipeline

Detailed flow from the moment the user hits the URL to the full render.

```mermaid
sequenceDiagram
    participant B as Browser
    participant V as Vercel (Next.js Node.js Runtime)
    participant G as getServerSideProps
    participant S as Services (Fetch)
    participant A as External API (DEV.to/Dribbble)

    B->>V: HTTP GET /
    V->>G: Execute getServerSideProps()
    G->>S: getArticles() & getDribbbleShots()
    par Parallel Fetching
        S->>A: fetch(dev.to)
        S->>A: fetch(dribbble.com)
    end
    A-->>S: JSON Data
    S-->>G: Articles[] + Shots[]
    G-->>V: Return { props: { articles, shots } }
    V->>V: React.renderToString(Index, props)
    V-->>B: Deliver 200 OK + Hydrated HTML/CSS
    Note over B: First Contentful Paint (FCP)
```

---

## 7. Responsive Layout & Breakpoint Engine

The site uses a custom hook `useWindowDimensions` linked to a `Breakpoints` enum.

### 7.1 Breakpoint Logic Flow
```mermaid
flowchart TD
    Start(["🔄 Hook Init"]) --> Listener["addEventListener('resize')"]
    Listener --> GetDim["getWindowDimensions()"]
    GetDim --> Width{"Width Value?"}

    Width -->|"> 992px"| Desktop["💻 Render Desktop Sidebar\nPhotoWall: 384px"]
    Width -->|"> 576px"| Tablet["📱 Render Mobile Topbar\nPhotoWall: 256px"]
    Width --Default--> Mobile["📱 Render Mobile Topbar\nPhotoWall: 128px"]

    Desktop & Tablet & Mobile --> UpdateState["setWindowDimensions(state)"]
    UpdateState --> UI["Component Re-renders (Tailwind breakpoints pick up)"]
```

---

## 8. Third-Party Integration Architecture

### 8.1 Initialization Lifecycle
1.  **Tawk.to**: Injected via inline script in `<Head>` within `_app.tsx`. Logic is wrapped in a self-executing function.
2.  **Calendly**: Injected via `<Script strategy="afterInteractive">`. The `onLoad` callback initializes the `initBadgeWidget` with specific hex colors and meeting URLs.
3.  **Formspark**: Managed by the `@formspark/use-formspark` hook within `Contact.tsx`. Handles the POST request to `https://submit-form.com/{formId}`.

### 8.2 Third-Party Loading Order Sequence
```mermaid
sequenceDiagram
    participant H as Head (Next.js)
    participant D as DOM Ready
    participant T as Tawk.to Widget
    participant S as Script (next/script)
    participant C as Calendly Badge

    Note right of H: Immediate Loading
    H->>T: Execute Tawk Inline Script
    Note right of D: hydrationComplete
    D->>S: Load Calendly JS (afterInteractive)
    S-->>C: script.onLoad()
    C->>C: window.Calendly.initBadgeWidget()
    Note over T, C: Both Widgets Visible (Bottom Right)
```

---

## 9. Theme Integration Architecture

The site uses standard class-based theming. `isDarkMode` state is synchronized with the `<html>` element's class list via a `useEffect` hook.

```mermaid
flowchart LR
    subgraph Context_Layer["⚛️ Context Layer"]
        Toggle["Toggle Button"] --> Provider["ThemeProvider (state: true)"]
    end

    subgraph Effect_Layer["⚙️ Effect Layer"]
        Provider --> Effect["useEffect([isDarkMode])"]
    end

    subgraph DOM_Layer["🌐 DOM Layer"]
        Effect --> Add["classList.add('dark')"]
        Effect --> Rem["classList.remove('dark')"]
    end

    subgraph Tailwind_Layer["🎨 Style Layer"]
        Add --> Dark["Activate 'dark:' CSS rules"]
        Rem --> Light["Default CSS rules"]
    end
```

---

## 10. Form Validation & Submission Logic

### 10.1 Pipeline
1.  **`react-hook-form`**: Captures input and runs regex validations (email, minLength).
2.  **`animate.css`**: Triggers `shakeX` animation if validation fails.
3.  **`useFormspark`**: Processes the validated payload.

```mermaid
flowchart TD
    Init(["Submit Form"]) --> Valid{"react-hook-form\nValidation"}
    Valid -- Fail --> Shake["Trigger shakeX Animation\nDisplay errors"]
    Valid -- Pass --> Post["submit(data) via Formspark Hook"]
    Post --> Loading["Button disabled state = true"]
    Loading --> Res{Server Response}
    Res -- 200 --> Success["setSubmitted(true)\nShow Thank You UI"]
    Res -- Error --> Alert["Display fallback error"]
```

---

## 11. Build & Deployment Lifecycle

The journey from local development to the Vercel Global Edge Network.

```mermaid
flowchart TD
    subgraph Local_Dev["💻 Local Dev"]
        Code["npm run dev"] --> NextBuild[".next/ Cache"]
    end

    subgraph Build_Pipeline["🚀 Vercel Build Pipeline"]
        Push["git push origin main"] --> Hook["GitHub Webhook"]
        Hook --> Install["npm install"]
        Install --> Build["next build (SSR ready)"]
    end

    subgraph Production["🌍 Production Edge"]
        Build --> Deploy["Deploy to Production Environment"]
        Deploy --> Vars["Inject Production Env Vars (API Keys)"]
        Vars --> Live(["✅ Site Live at bagombekajob.com"])
    end
```

---

## 12. Technical Limitation Logic

A record of technical constraints that shape the current architecture.

1.  **Hydration Match**: `NoSSR` is required for components using `window` (Navigation, PhotoWall) to prevent `Text content did not match` errors during initial hydrate.
2.  **API Rate Limits**: DEV.to and Dribbble are fetched server-side; Vercel's caching layer handles high traffic to avoid hitting API limits on every user scroll.
3.  **Bundle Size**: Icons are imported from `@react-icons/all-files` (or pruned by Next.js tree-shaking) to keep the initial JS payload below 150kB.

---

*Hyper-Detailed Documentation | Current as of: March 2026 | Bagombeka Job*
