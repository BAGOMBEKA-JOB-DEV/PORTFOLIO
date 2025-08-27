import { format } from "date-fns";

const Footer = () => (
  <div id="footer" className="mb-16 text-xs leading-loose opacity-80 ">
    Thank you for visiting my website!
    <br />
    Follow me on{" "}
    <strong className="font-bold">
      <a className="text-blue-600 font-bold italic" href="https://www.github.com/BAGOMBEKA-JOB-DEV">
        {" "}
        GITHUB
      </a>
    </strong>{" "}
    to see my latest projects, updates, and open-source contributions. Your support and feedback mean a lot!
    <br />
    All content is © {format(Date.now(), "yyyy")} Bagombeka Job. <i className="text-green-500">See you soon!</i>.
  </div>
);

export default Footer;
