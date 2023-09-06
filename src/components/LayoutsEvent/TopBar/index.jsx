import React, { useState, Fragment, useEffect } from "react";
import { Console } from 'ems-component'
import _ from 'lodash';
import { Transition } from "@headlessui/react";
import { useSessionContext } from '@/src/stores/sessionContext'
import clsx from "clsx";
import { signOut } from "./topbar.service";
import Link from "next/link";
import Breadcrumb from "@/src/components/Breadcrumbs";
import { useAuth } from "@/src/stores/authContext";

const TopBar = () => {
  const [searchDropdown, setSearchDropdown] = useState(false);
  // const { session: { user } } = useSessionContext()
  const { user: { company, event, ...user } } = useAuth()

  const showSearchDropdown = () => {
    setSearchDropdown(true);
  };
  const hideSearchDropdown = () => {
    setSearchDropdown(false);
  };

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className="px-4 md:!px-8 flex items-center h-14 w-auto shadow fixed top-0 left-[85px] lg:left-64 right-0 z-50 bg-white border-b border-black/[0.08] text-dark mb-5">

        {/* BEGIN: Breadcrumb */}
        <div className="ml-4 mr-auto">
          {event.name}
        </div>
        {/* END: Breadcrumb */}
        {/* BEGIN: Notifications */}
        <span className="mr-4 text-xs">Timezone: <b>{event.timezone}</b></span>
        <Console.HeadlessPopover className="mr-auto intro-x sm:mr-6">
          <Console.HeadlessPopover.Button
            className="
              relative text-slate-600 outline-none block
              before:content-[''] before:w-[8px] before:h-[8px] before:rounded-full before:absolute before:top-[-2px] before:right-0 before:bg-danger
            "
          >
            <Console.Lucide icon="Bell" className="w-5 h-5 dark:text-slate-500" />
          </Console.HeadlessPopover.Button>
          <Console.HeadlessPopover.Panel className="w-[280px] sm:w-[350px] p-5 mt-2">
            <div className="mb-5 font-medium">Notifications</div>
            {/* {_.take(fakerData, 5).map((faker, fakerKey) => (
              <div
                key={fakerKey}
                className={clsx([
                  "cursor-pointer relative flex items-center",
                  { "mt-5": fakerKey },
                ])}
              >
                <div className="relative flex-none w-12 h-12 mr-1 image-fit">
                  <img
                    alt="Midone Tailwind HTML Admin Template"
                    className="rounded-full"
                    src={faker.photos[0]}
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full bg-success dark:border-darkmode-600"></div>
                </div>
                <div className="ml-2 overflow-hidden">
                  <div className="flex items-center">
                    <a href="" className="mr-5 font-medium truncate">
                      {faker.users[0].name}
                    </a>
                    <div className="ml-auto text-xs text-slate-400 whitespace-nowrap">
                      {faker.times[0]}
                    </div>
                  </div>
                  <div className="w-full truncate text-slate-500 mt-0.5">
                    {faker.news[0].shortContent}
                  </div>
                </div>
              </div>
            ))} */}
          </Console.HeadlessPopover.Panel>
        </Console.HeadlessPopover>
        {/* END: Notifications  */}
        {/* BEGIN: Account Menu */}
        <Console.HeadlessMenu>
          <Console.HeadlessMenu.Button className="block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x">
            <Console.Image
              key={user?.id}
              src={user?.photo}
              alt={user?.name}
              className="h-full w-full object-cover"
            />
          </Console.HeadlessMenu.Button>
          <Console.HeadlessMenu.Items className="w-56 mt-px shadow-md relative text-white bg-dark before:bg-black before:block before:absolute before:inset-0 before:rounded-md before:-z-[1]">
            <Console.HeadlessMenu.Header className="font-normal">
              <div className="font-medium">
                {`${user?.first_name ?? ''} ${user?.last_name ?? ''}`}
              </div>
              <div className="text-xs text-white mt-0.5 dark:text-slate-500">
                {user?.email}
              </div>
              <div className="mt-1">
                <span className="text-xs bg-primary text-dark font-medium capitalize mr-2 px-2.5 py-1 rounded">
                  {user?.account_type}
                </span>
              </div>
            </Console.HeadlessMenu.Header>
            {/* <Console.HeadlessMenu.Divider className="bg-white/[0.08]" /> */}
            {/* <Console.HeadlessMenu.Item className="hover:bg-white/5">
              <Console.Lucide icon="User" className="w-4 h-4 mr-2" />
              <Link href="/profile">Profile</Link>
            </Console.HeadlessMenu.Item> */}
            {/* <Console.HeadlessMenu.Item className="hover:bg-white/5">
              <Console.Lucide icon="Edit" className="w-4 h-4 mr-2" /> Change Company
            </Console.HeadlessMenu.Item>
            <Console.HeadlessMenu.Item className="hover:bg-white/5">
              <Console.Lucide icon="Edit" className="w-4 h-4 mr-2" /> Change Profile
            </Console.HeadlessMenu.Item>
            <Console.HeadlessMenu.Item className="hover:bg-white/5">
              <Console.Lucide icon="Lock" className="w-4 h-4 mr-2" /> Change Password
            </Console.HeadlessMenu.Item> */}
            {/* <Console.HeadlessMenu.Divider className="bg-white/[0.08]" />
            <Console.HeadlessMenu.Item className="hover:bg-white/5" onClick={signOut}>
              <Console.Lucide icon="ToggleRight" className="w-4 h-4 mr-2" /> Logout
            </Console.HeadlessMenu.Item> */}
          </Console.HeadlessMenu.Items>
        </Console.HeadlessMenu>
      </div>
      {/* END: Top Bar */}
    </>
  )
}

export default TopBar