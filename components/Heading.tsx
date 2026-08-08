import type { IconType } from "react-icons";

type Props = {
  icon?: IconType;
  children: React.ReactNode;
};

const Heading: React.FC<Props> = ({ icon: Icon, children }) => (
  <h2 className="flex items-center gap-2.5 mb-8 text-2xl md:text-3xl font-bold tracking-tight">
    {Icon && <Icon size={20} className="text-teal-600 dark:text-teal-400 flex-shrink-0" />}

    <span>{children}</span>
  </h2>
);

export default Heading;
