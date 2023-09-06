import { useEffect, useState, memo } from 'react'
import clsx from 'clsx'
import { Transition } from 'react-transition-group'
import { useRouter } from 'next/router'
import { selectSideMenu } from '@/src/stores/sideMenuSlice'
import { useAppSelector } from '@/src/stores/hooks'
import { linkTo, nestedMenu, enter, leave, leaveOnChild } from '@/src/components/LayoutsEvent/SideMenu/side-menu'
import MobileMenu from '@/src/components/LayoutsEvent/MobileMenu'
import TopBar from '@/src/components/LayoutsEvent/TopBar'

import { Console } from 'ems-component'

import { useAppDispatch } from '@/src/stores/hooks'
import { setMenuReducer } from '@/src/stores/sideMenuSlice'
import { useAuth } from '@/src/stores/authContext'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Breadcrumb from '../Breadcrumbs'
// import { Console } from '../../../../ems_component/dist/cjs'

const MobileMenuMemo = memo(MobileMenu)
const Layout = ({ children }) => {
  const dispatch = useAppDispatch()
  const location = useRouter()
  // console.log('LOCATION ', location?.forceActiveMenu)
  const [formattedMenu, setFormattedMenu] = useState([]);
  const sideMenuStore = useAppSelector(selectSideMenu);
  // const sideMenu = useCallback(() => nestedMenu(sideMenuStore, location), [location, sideMenuStore]);
  const { menuPermissions } = useAuth()

  // console.log('SESSIONS ', session?.user?.menuList)
  useEffect(() => {
    if (menuPermissions?.length) {
      dispatch(setMenuReducer(menuPermissions));
    }
  }, [dispatch, location, menuPermissions])

  // console.log('MENU SESSION ', session)
  // console.log('SIDE MENU ', sideMenu)
  // console.log('LOCATION ', location)
  // console.log('formattedMenu ', formattedMenu)

  useEffect(() => {
    const menus = nestedMenu(sideMenuStore, location)
    // console.log('MENUS ', menus)
    setFormattedMenu(menus);
  }, [sideMenuStore, location.pathname, location])

  return (
    <div className="relative bg-white">
      <MobileMenuMemo />
      <div className="h-screen w-full overflow-x-hidden">
        {/* BEGIN: Side Menu */}
        <div>
          <nav className="side-nav bg-gray-950">
            <PerfectScrollbar>
              <div className="flex items-center justify-center pr-6 pt-4 pb-8">
                <Console.Image
                  alt="logo-itrex"
                  className="h-16"
                  src="/assets/images/logo.png"
                />
              </div>
              <ul>
                {/* BEGIN: First Child */}
                {formattedMenu.map((menu, menuKey) =>
                  menu == "divider" ? (
                    <Divider
                      type="li"
                      className={clsx([
                        "my-6",

                        // Animation
                        `opacity-0 animate-[0.4s_ease-in-out_0.1s_intro-divider] animate-fill-mode-forwards animate-delay-${(menuKey + 1) * 10
                        }`,
                      ])}
                      key={menuKey}
                    ></Divider>
                  ) : (
                    <li key={menuKey}>
                      <Menu
                        className={clsx({
                          // Animation
                          [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${(menuKey + 1) * 10
                            }`]: !menu.active,
                        })}
                        menu={menu}
                        formattedMenuState={[formattedMenu, setFormattedMenu]}
                        level="first"
                      ></Menu>
                      {/* BEGIN: Second Child */}
                      {menu.subMenu && (
                        <Transition
                          in={menu.activeDropdown}
                          onEnter={enter}
                          onExit={leave}
                          timeout={300}
                        >
                          <ul className="hidden">
                            {menu.subMenu.map((subMenu, subMenuKey) => (
                              <li key={subMenuKey}
                                onClick={leaveOnChild}
                                className={clsx(
                                  { "!bg-primary sub-active lg:!bg-primary/20": subMenu.active },
                                )}>
                                <Menu
                                  className={clsx({
                                    // Animation
                                    [`opacity-0 animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${(subMenuKey + 1) * 10
                                      }`]: !subMenu.active,
                                  })}
                                  menu={subMenu}
                                  formattedMenuState={[
                                    formattedMenu,
                                    setFormattedMenu,
                                  ]}
                                  level="second"
                                ></Menu>
                                {/* BEGIN: Third Child */}
                                {subMenu.subMenu && (
                                  <Transition
                                    in={subMenu.activeDropdown}
                                    onEnter={enter}
                                    onExit={leave}
                                    timeout={300}
                                  >
                                    <ul
                                      className={clsx([
                                        "bg-black/10 rounded-lg dark:bg-darkmode-900/30",
                                        {
                                          block: subMenu.activeDropdown,
                                        },
                                        { hidden: !subMenu.activeDropdown },
                                      ])}
                                    >
                                      {subMenu.subMenu.map(
                                        (lastSubMenu, lastSubMenuKey) => (
                                          <li key={lastSubMenuKey} className={clsx(
                                            { "bg-primary/20": lastSubMenu.active },
                                          )}>
                                            <Menu
                                              className={clsx({
                                                // Animation
                                                [`opacity-0 translate-x-[50px] animate-[0.4s_ease-in-out_0.1s_intro-menu] animate-fill-mode-forwards animate-delay-${(lastSubMenuKey + 1) * 10
                                                  }`]: !lastSubMenu.active,
                                              })}
                                              menu={lastSubMenu}
                                              formattedMenuState={[
                                                formattedMenu,
                                                setFormattedMenu,
                                              ]}
                                              level="third"
                                            ></Menu>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </Transition>
                                )}
                                {/* END: Third Child */}
                              </li>
                            ))}
                          </ul>
                        </Transition>
                      )}
                      {/* END: Second Child */}
                    </li>
                  )
                )}
                {/* END: First Child */}
              </ul>
            </PerfectScrollbar>
          </nav>
        </div>
        {/* END: Side Menu */}
        {/* BEGIN: Content */}

        <div className="content">
          <TopBar />
          {/* <Outlet /> */}
          <div className="py-6 px-12 3xl:px-32">
            <Breadcrumb />
            {children}
          </div>
        </div>
        {/* END: Content */}
      </div>
    </div>
  )
}

function Menu (props) {
  const { push } = useRouter();
  const [formattedMenu, setFormattedMenu] = props.formattedMenuState;

  return (
    <a
      href={props.menu.subMenu ? "#" : props.menu.pathname}
      className={clsx([
        "side-menu",
        {
          "dark:text-slate-300": props.menu.active && props.level != "first",
          "side-menu--active": !props.menu.active && props.level != "first",
          "side-menu--active": props.menu.active && props.level == "first",
        },
        props.className,
      ])}
      onClick={(event) => {
        event.preventDefault();

        if (props.menu.parent) {
          const find = formattedMenu.find(obj => obj.id == props.menu.parent)
          linkTo(props.menu, push, find);
        } else {
          linkTo(props.menu, push);
        }

        // console.log(formattedMenu)
        setFormattedMenu([...formattedMenu]);
      }}>
      <div
        className={clsx({
          "side-menu__icon": props.level == "first",
          "dark:text-slate-400": !props.menu.active && props.level == "first",
        })}>
        {props.menu.icon && (
          <Console.Lucide icon={props.menu.icon} className="h-5" />
        )}
      </div>
      <div
        className={clsx([
          "side-menu__title items-center w-full ml-3 text-sm",
          { "!ml-1": props.level != "first" },
          { "!hidden lg:!flex": props.level == "first" },
          { "font-medium": props.menu.active && props.level != "first" },
          {
            "dark:text-slate-400": !props.menu.active && props.level == "first",
          },
        ])}>
        {props.menu.title}
        {props.menu.subMenu && (
          <div
            className={clsx([
              "transition ease-in duration-100 ml-auto mr-5 hidden xl:block",
              { "transform rotate-180": props.menu.activeDropdown },
            ])}
          >
            <Console.Lucide className="w-4 h-4" icon="ChevronDown" />
          </div>
        )}
      </div>
    </a>
  );
}

function Divider (props) {
  const { className, ...computedProps } = props;
  const Component = props.as || "div";

  return (
    <Component
      {...computedProps}
      className={clsx([
        props.className,
        "w-full h-px bg-white/[0.08] z-10 relative dark:bg-white/[0.07]",
      ])}
    ></Component>
  );
}

export default Layout