import React, { useRef, useEffect } from "react";
import {Console} from 'ems-component'
// import {Console} from '../../../../ems_component/dist/cjs'

const toggleTooltip = (el) => {
  if (window.innerWidth <= 1260) {
    el._tippy?.enable();
  } else {
    el._tippy?.disable();
  }
};

const initTooltipEvent = (tippyRef) => {
  window.addEventListener("resize", () => {
    toggleTooltip(tippyRef);
  });
};

const Main =(props) => {
  const tippyRef = useRef();
  const Component = props.as || "a";

  useEffect(() => {
    if (tippyRef.current !== undefined) {
      toggleTooltip(tippyRef.current);
      initTooltipEvent(tippyRef.current);
    }
  }, []);

  const { as, ...computedProps } = props;
  return (
    <Console.Tippy
      {...computedProps}
      as={Component}
      content={props.content}
      options={{
        placement: "left",
      }}
      getRef={(el) => {
        if (el !== null) {
          tippyRef.current = el;
        }
      }}
    >
      {props.children}
    </Console.Tippy>
  );
};

export default Main;
