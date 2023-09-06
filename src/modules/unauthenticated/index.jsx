import {Console} from 'ems-component'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function PageUnauthenticated () {
  return (
    <>
      <div className="py-2 bg-primary">
        <div className="container">
          {/* BEGIN: Error Page */}
          <div className="flex flex-col items-center justify-center h-screen text-center error-page lg:flex-row lg:text-left">
            <div className="-intro-x lg:mr-20">
              <div className="relative w-[450px] h-48 lg:h-auto">
                <Image
                  // loader={sanityIoImageLoader}
                  src="/assets/images/error-illustration.svg"
                  alt="image-page-notfound"
                  className="!relative"
                  layout="fill"
                  quality={100}
                  objectFit="cover"
                  unoptimized={false}
                />
              </div>
            </div>
            <div className="mt-10 text-white lg:mt-0">
              <div className="font-medium intro-x text-8xl">401</div>
              <div className="mt-5 text-xl font-medium intro-x lg:text-3xl">
                No authorization found.
              </div>
              <div className="mt-3 text-lg intro-x">
                This page is not publically available. <br />
                To access it please access from console
              </div>
              {/* <Console.Button onClick={() => back} className="px-4 py-3 mt-10 text-white border-white intro-x dark:border-darkmode-400 dark:text-slate-200">
                Back to Console
              </Console.Button> */}
            </div>
          </div>
          {/* END: Error Page */}
        </div>
      </div>
    </>
  )
}