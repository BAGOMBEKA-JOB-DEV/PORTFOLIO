import type { GetServerSideProps, NextPage } from "next";
import {
  AboutMe,
  AboutRotW,
  Achievements,
  Blog,
  Certifications,
  Contact,
  Designs,
  Education,
  Footer,
  Header,
  Languages,
  Music,
  Philantrophy,
  Photography,
  Projects,
  Resume,
  Skills,
  WorkExperience,
} from "sections";
import { getArticles, getDribbbleShots } from "services";
import type { Article, DribbbleShot } from "types/Sections";

export const getServerSideProps: GetServerSideProps = async () => {
  const articles = await getArticles();
  const dribbbleShots = await getDribbbleShots();


  return { props: { articles, dribbbleShots } };
};

type Props = {
  articles: Article[];
  dribbbleShots: DribbbleShot[];

};

const Home: NextPage<Props> = ({ articles, dribbbleShots }) => (
  <div className="w-5/6 mx-auto md:container grid gap-24">
    <Header />

    <AboutMe />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <WorkExperience />
      <Education />
    </div>

    <Skills />
    <Projects />
    <Blog articles={articles} />
    <Languages />

    <div className="grid lg:grid-cols-3 gap-12">
      <Achievements />
      <Certifications />
      <Philantrophy />
    </div>

    <Photography  />
    <Music />
    <Designs dribbbleShots={dribbbleShots} />
    <Resume />
    <Contact />
    <AboutRotW />
    <Footer />
  </div>
);

export default Home;
