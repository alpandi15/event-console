import { Console } from "ems-component"
import clsx from "clsx"

const Item = ({ data, active }) => {
  return (
    <div className={
      clsx([
        "group relative overflow-hidden col-span-4 box flex items-center justify-center cursor-pointer",
        "hover:shadow-xl hover:outline hover:outline-primary"
      ], {
        "shadow-2xl outline outline-primary": active
      })
    }>
      <div className="flex-1 p-4">
        <div className="w-full h-[250px] overflow-hidden">
          <Console.Image
            alt={data?.name}
            src={data?.image}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="mt-6 flex items-center justify-between">
          <div className="text-medium">{data?.name}</div>
        </div>
      </div>
      <div className="hidden group-hover:block transition-all absolute top-0 left-0 right-0 bottom-0 backdrop-blur">
        <div className="w-full h-full flex items-center justify-center">
          <Console.Button variant="primary" className="px-8">
            Select
          </Console.Button>
        </div>
      </div>
    </div>
  )
}

export default function CardComponent ({ lists = [] }) {
  return (
    <div className="mt-8 grid grid-cols-12 gap-4">
      {
        lists?.map((data, key) => {
          return <Item key={key} data={data} active={key === 1} />
        })
      }
    </div>
  )
}