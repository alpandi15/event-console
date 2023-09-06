import Image from 'next/image'
import { useRouter } from 'next/router'
import { Console } from 'ems-component'

function Main() {
  const { back } = useRouter()

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
                  // width={200}
                  // height={200}
                  layout="fill"
                  quality={100}
                  objectFit="cover"
                  // loading="lazy"
                  unoptimized={false}
                // placeholder="blur"
                // className="profile-image"
                // onLoadingComplete={(imageDimension) => console.log(imageDimension)}
                // blurDataURL={placeholderImage}
                />
              </div>
              {/* <img
                alt="Midone Tailwind HTML Admin Template"
                className="w-[450px] h-48 lg:h-auto"
                src="/assets/images/error-illustration.svg"
              /> */}
            </div>
            <div className="mt-10 text-white lg:mt-0">
              <div className="font-medium intro-x text-8xl">404</div>
              <div className="mt-5 text-xl font-medium intro-x lg:text-3xl">
                Oops. This page has gone missing.
              </div>
              <div className="mt-3 text-lg intro-x">
                You may have mistyped the address or the page may have moved.
              </div>
              <Console.Button onClick={() => back} className="px-4 py-3 mt-10 text-white border-white intro-x dark:border-darkmode-400 dark:text-slate-200">
                Back to Home
              </Console.Button>
            </div>
          </div>
          {/* END: Error Page */}
        </div>
      </div>
    </>
  );
}

export default Main;
