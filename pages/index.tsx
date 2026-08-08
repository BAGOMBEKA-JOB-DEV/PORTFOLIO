import type { GetStaticProps, NextPage } from "next";
import { AboutMe, Blog, Contact, Footer, Header, Projects, Skills } from "sections";
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

    <div className="grid gap-20 md:gap-28 py-20 md:py-28">
      <div data-reveal>
        <Projects />
      </div>

      <div data-reveal>
        <Skills />
      </div>

      <div data-reveal>
        <Blog articles={articles} />
      </div>

      <div data-reveal>
        <AboutMe />
      </div>

      <div data-reveal>
        <Contact />
      </div>
    </div>

    <Footer />
  </main>
);

export default Home;
