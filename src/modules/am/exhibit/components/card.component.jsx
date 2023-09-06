import { Console } from "ems-component"
import Router, { useRouter } from 'next/router'

const Item = ({ data }) => {
  const { asPath } = useRouter()

  return (
    <div className="col-span-12 md:!col-span-6 lg:!col-span-4 xl:!col-span-3 2xl:!col-span-2">
      <div className="border border-slate-200 shadow-xl">
        <div className="flex items-start px-5 pt-5">
          <div className="flex flex-col items-center w-full lg:flex-row">
            <div className="w-16 h-16 image-fit">
              <Console.Image
                className="rounded-full"
              />
            </div>
            <div className="mt-3 text-center lg:ml-4 lg:text-left lg:mt-0">
              <a href="" className="font-medium">
                {data?.name}
              </a>
              <div className="text-slate-500 text-xs mt-0.5">
                {data?.email}
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 text-center lg:!text-left">
          {/* <div className="flex items-center justify-center mt-1 lg:!justify-start text-slate-500">
            <Console.Lucide icon="Mail" className="w-3 h-3 mr-2" />
            {data?.email}
          </div> */}
          <div className="flex items-center justify-center mt-1 lg:!justify-start text-slate-500">
            <Console.Lucide icon="Phone" className="w-3 h-3 mr-2" />
            081237346433
          </div>
          <div className="flex items-center justify-center mt-1 lg:!justify-start text-slate-500">
            <Console.Lucide icon="Key" className="w-3 h-3 mr-2" />
            <div className="text-white text-xs bg-success px-2 py-1 rounded-xl">Role Team 1</div>
          </div>
          <div className="mt-5 pb-2 w-full relative overflow-hidden">
            <div className="font-medium text-sm text-slate-700">Event Access:</div>
            <div className="mt-2">
              <div>
                <div className="p-2 border border-slate-200">
                  <div className="text-sm text-slate-700 truncate">Pesta Rakyat 30 Tahun Dewa Berkarya</div>
                  <span className="text-xs rounded-xl">Role: Admin</span>
                </div>
                <div className="p-2 border border-slate-200">
                  <div className="text-sm text-slate-700">Karnaval 2023 Medan</div>
                  <span className="text-xs rounded-xl">Role: Scheduler</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end p-2 border-t border-slate-200/60 dark:border-darkmode-400">
          <div className="">
            <Console.Button
              type="button"
              variant="dark"
              size="sm"
              onClick={() => Router.push(`${asPath}/edit/${data?.id}`)}
            >
              <Console.Lucide icon="Edit" className="w-4 h-4" />{' '}
              Edit
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