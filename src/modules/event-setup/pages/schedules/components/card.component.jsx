import { Console } from "ems-component"
import moment from "moment"
import Router, { useRouter } from 'next/router'

const Item = ({ data }) => {
  const { asPath } = useRouter()

  return (
    <div className="col-span-12 md:!col-span-6 lg:!col-span-4 xl:!col-span-3 2xl:!col-span-2">
      <div className="border border-slate-200 shadow-xl box rounded-lg">
        <div className="p-5">
          <div className="mt-3 text-center lg:text-left lg:mt-0">
            <div className="font-medium">
              {data?.name}
            </div>
            <div className="mt-1">
              <div className="font-medium text-slate-500">
                Noah Monochrome
              </div>
              <div className="mt-0.5">
                <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                  Season 1
                </span>
              </div>
            </div>
            <div className="text-slate-500 text-xs mt-2">
              {moment().format('dddd, MMMM DD, YYYY')}
            </div>
            <div className="grid grid-cols-12 gap-2 mt-2">
              <div className="col-span-8 text-slate-500 text-xs">
              </div>
              <div className="col-span-8">
                <div className="text-slate-600 text-xs">Times</div>
                <div className="text-slate-500 text-xs">
                  {`${moment().format('HH:mm A')} - ${moment().add('hours', 5).format('HH:mm A')}`}
                </div>
              </div>
              <div className="col-span-4">
                <div className="text-slate-600 text-xs">Duraton</div>
                <div className="text-slate-500 text-xs">5h</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end p-2 border-t border-slate-200/60 dark:border-darkmode-400">
          <div className="">
            <Console.Button
              type="button"
              variant="outline-dark"
              size="sm"
            >
              Highlight to Home
            </Console.Button>
          </div>
        </div>
      </div>
    </div>
  )
}


const CardComponent = ({ lists = [] }) => {
  return (
    <>
      <div className="grid grid-cols-12 gap-4 mt-5">
        {
          lists?.map((data, key) => {
            return <Item data={data} key={key} />
          })
        }
      </div>
    </>
  )
}

export default CardComponent