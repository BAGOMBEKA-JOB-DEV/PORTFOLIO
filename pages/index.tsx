import type { GetStaticProps, NextPage } from "next";
import { AboutMe, Blog, Contact, Footer, Header, Projects, Skills, Testimonials } from "sections";
import { getArticles } from "services";
import type { Article } from "types/Sections";

export const getStaticProps: GetStaticProps = async () => {
  const articles = await getArticles();

  return { props: { articles }, revalidate: 3600 };
};

type Props = {
  articles: Article[];
};

const Home: NextPage<Props> = ({ articles }) => (
  <main className="w-11/12 max-w-5xl mx-auto">
    <Header />

    {/* min-w-0 on every grid child: grid items default to min-width:auto and
        refuse to shrink below their content's min-content width, so a single
        horizontally scrollable child (the project tabs) would otherwise widen
        the whole page past the viewport. */}
    <div className="grid gap-20 md:gap-28 py-20 md:py-28">
      <div data-reveal className="min-w-0">
        <Projects />
      </div>

      <div data-reveal className="min-w-0">
        <Testimonials />
      </div>

      <div data-reveal className="min-w-0">
        <Skills />
      </div>

      <div data-reveal className="min-w-0">
        <Blog articles={articles} />
      </div>

      <div data-reveal className="min-w-0">
        <AboutMe />
      </div>

      <div data-reveal className="min-w-0">
        <Contact />
      </div>
    </div>

    <Footer />
  </main>
);

export default Home;
