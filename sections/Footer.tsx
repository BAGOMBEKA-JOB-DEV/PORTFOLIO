import { format } from "date-fns";

const Footer = () => (
  <div id="footer" className="mb-16 text-xs leading-loose opacity-50">
    Please Ensure to give me credit incase you fork or clone this project on <strong>GITHUB</strong>.Thank You!
    <br />
    Copyright {format(Date.now(), "yyyy")} Bagombeka Job
  </div>
);

export default Footer;
