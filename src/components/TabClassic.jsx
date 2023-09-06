import clsx from "clsx";
import { createContext, useContext, useState } from "react";

function TabClassic({ children, onChange, initialIndex = 0 }) {
  const [tabIndex, setTabIndex] = useState(initialIndex)

  const onChangeTab = (index, value) => {
    setTabIndex(index)
    onChange(index, value)
  }

  return (
    <div className="flex text-sm">
      {Array.isArray(children)
        ? children?.map((item, key) => {
          return {
            ...item,
            props: {
              ...item.props,
              key: key,
              active: key === tabIndex,
              onChangeTab,
            },
          };
        }) : children}
    </div>
  )
}

TabClassic.Item = ({ children, key, value, className, active, onChangeTab }) => {
  return (
    <div
      onClick={() => onChangeTab(key, value)}
      className={clsx(
        className,
        "rounded cursor-pointer",
        key > 0 && "relative ml-5 pl-0.5",
        key > 0 && "before:content-['|'] before:w-[14px] before:h-[14px] before:absolute before:-left-[12px]"
      )}><span className={clsx(active && "font-medium text-primary")}>{children}</span></div>
  )
}

TabClassic.Item.displayName = 'TabItem'


export default TabClassic
