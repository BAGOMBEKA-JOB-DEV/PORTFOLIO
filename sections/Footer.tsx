import { format } from "date-fns";

const Footer = () => (
  <div id="footer" className="mb-16 text-xs leading-loose opacity-70">
    Follow me on  <strong>GITHUB</strong>.Thank You!
    <br />
    Copyright {format(Date.now(), "yyyy")} Bagombeka Job
  </div>
);

export default Footer;
