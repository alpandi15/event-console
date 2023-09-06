import { Children } from "react";
import { Fragment } from "react";
import { Console } from "ems-component";

const Breadcrumb = ({ children }) => {
  const childrenArray = Children.toArray(children);

  const childrenWtihSeperator = childrenArray.map((child, index) => {
    if (index !== childrenArray.length - 1) {
      return (
        <Fragment key={index}>
          {child}
          <span className="px-1">/</span>
        </Fragment>
      );
    }
    return child;
  });

  return (
    <Console.Breadcrumb className="hidden mr-auto -intro-x sm:flex">
      {childrenWtihSeperator}
    </Console.Breadcrumb>
  );
};

export default Breadcrumb;