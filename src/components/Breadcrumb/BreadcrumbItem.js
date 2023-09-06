import Link from "next/link";
import { Console } from "ems-component";

const BreadcrumbItem = ({ children, href, isCurrent, ...props }) => {
  return (
    <Console.Breadcrumb.Link to={href} className="text-sm" active={isCurrent}>
      {children}
    </Console.Breadcrumb.Link>
  );
};

export default BreadcrumbItem;