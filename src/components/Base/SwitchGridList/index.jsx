import { Console } from "ems-component"
import { useState } from "react"
import clsx from "clsx"

const SwitchGridList = ({onChange, defaultIndex = 0}) => {
  const [index, setIndex] = useState(defaultIndex)

  const onChangeIndex = (index) => {
    setIndex(index)
    onChange(index)
  }

  return (
    <div className={clsx("flex items-center bg-white rounded border", "relative transition duration-200 ease-in-out w-full text-sm border border-slate-200 shadow-sm")}>
      <div onClick={() => onChangeIndex(0)} className={clsx(["cursor-pointer p-2 flex items-center justify-center", {'bg-secondary': index == 0}])}>
        <Console.Lucide
          icon="List"
          className="w-5 h-5" />
      </div>
      <div onClick={() => onChangeIndex(1)} className={clsx(["cursor-pointer p-2 flex items-center justify-center", {'bg-secondary': index == 1}])}>
        <Console.Lucide
          icon="LayoutGrid"
          className="w-5 h-5" />
      </div>
    </div>
  )
}

export default SwitchGridList
