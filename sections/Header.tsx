import Ingredients from "components/Header/Ingredients";
import PhotoWall from "components/Header/PhotoWall";
import Profiles from "components/Header/Profiles";
import NoSSR from "components/NoSSR";
import useWindowDimensions, { Breakpoints } from "hooks/useWindowDimensions";
import Image from "next/image";

const Header: React.FC = () => {
  const { width } = useWindowDimensions();

  return (
    <div id="header" className="h-screen grid place-items-center place-content-center gap-4">
      <NoSSR>
        <PhotoWall size={width > Breakpoints.sm ? 384 : 256} />
      </NoSSR>

      <Image src="/images/logo.png" width={485} height={128} alt="Bagombeka Job" priority />

      <h1 className="sr-only">
        Bagombeka Job - My Portifolio Website
        <br />
        Designer, Developer, Photographer, Writer
        <br />
        Kampala, Uganda &amp; Nairobi, Kenya
      </h1>

      <Ingredients />

      <Profiles />
    </div>
  );
};

export default Header;
