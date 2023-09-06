import { Transition } from "react-transition-group";
import {
  useState,
  useEffect,
  createRef,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import clsx from "clsx";
import SimpleBar from "simplebar";
import Link from 'next/link'
import { useRouter } from 'next/router'
import { selectSideMenu } from '@/src/stores/sideMenuSlice'
import { useAppSelector } from '@/src/stores/hooks'
import { linkTo, nestedMenu, enter, leave } from '@/src/components/LayoutsEvent/SideMenu/side-menu'
// import SideMenuTooltip from '@/src/components/SideMenuTooltip'
import { toRaw } from "@/src/utils/helper";
import { Console } from 'ems-component'

function Main() {
    const location = useRouter()
    const [formattedMenu, setFormattedMenu] = useState([]);
    const sideMenuStore = useAppSelector(selectSideMenu);
    const mobileMenu = useCallback(() => nestedMenu(toRaw(sideMenuStore), location), [location, sideMenuStore]);
    const [activeMobileMenu, setActiveMobileMenu] = useState(false);
    const scrollableRef = createRef();
  
    useEffect(() => {
      if (scrollableRef.current) {
        new SimpleBar(scrollableRef.current);
      }
    }, [scrollableRef]);

    useEffect(() => {
      setFormattedMenu(mobileMenu());
    }, [mobileMenu]);
  
    return (
      <>
        {/* BEGIN: Mobile Menu */}
        <div
          className={clsx([
            "w-full fixed bg-primary/90 z-[60] border-b border-white/[0.08] left-0 top-0 dark:bg-darkmode-800/90 md:hidden",
            "before:content-[''] before:w-full before:h-screen before:z-10 before:fixed before:inset-x-0 before:bg-black/90 before:transition-opacity before:duration-200 before:ease-in-out",
            !activeMobileMenu && "before:invisible before:opacity-0",
            activeMobileMenu && "before:visible before:opacity-100",
          ])}
        >
          <div className="h-[70px] px-3 sm:!px-8 flex items-center">
            <a href="" className="flex mr-auto">
              <Console.Image
                alt="logo-itrex"
                className="w-6"
                src="/assets/images/logo.svg"
              />
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <Console.Lucide
                icon="BarChart2"
                className="w-8 h-8 text-white transform -rotate-90"
                onClick={() => {
                  setActiveMobileMenu(!activeMobileMenu);
                }}
              />
            </a>
          </div>
          <div
            ref={scrollableRef}
            className={clsx([
              "h-screen z-20 top-0 left-0 w-[270px] -ml-[100%] bg-primary transition-all duration-300 ease-in-out dark:bg-darkmode-800",
              "[&[data-simplebar]]:fixed [&_.simplebar-scrollbar]:before:bg-black/50",
              activeMobileMenu && "ml-0",
            ])}
          >
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className={clsx([
                "fixed top-0 right-0 mt-4 mr-4 transition-opacity duration-200 ease-in-out",
                !activeMobileMenu && "invisible opacity-0",
                activeMobileMenu && "visible opacity-100",
              ])}
            >
              <Console.Lucide
                icon="XCircle"
                className="w-8 h-8 text-white transform -rotate-90"
                onClick={() => {
                  setActiveMobileMenu(!activeMobileMenu);
                }}
              />
            </a>
            <ul className="py-2">
              {/* BEGIN: First Child */}
              {formattedMenu.map((menu, menuKey) =>
                menu == "divider" ? (
                  <Divider as="li" className="my-6" key={menuKey}></Divider>
                ) : (
                  <li key={menuKey}>
                    <Menu
                      menu={menu}
                      formattedMenuState={[formattedMenu, setFormattedMenu]}
                      level="first"
                      setActiveMobileMenu={setActiveMobileMenu}
                    ></Menu>
                    {/* BEGIN: Second Child */}
                    {menu.subMenu && (
                      <Transition
                        in={menu.activeDropdown}
                        onEnter={enter}
                        onExit={leave}
                        timeout={300}
                      >
                        <ul
                          className={clsx([
                            "bg-black/10 rounded-lg mx-4 my-1 dark:bg-darkmode-700",
                            !menu.activeDropdown && "hidden",
                            menu.activeDropdown && "block",
                          ])}
                        >
                          {menu.subMenu.map((subMenu, subMenuKey) => (
                            <li
                              className="max-w-[1280px] w-full mx-auto"
                              key={subMenuKey}
                            >
                              <Menu
                                menu={subMenu}
                                formattedMenuState={[
                                  formattedMenu,
                                  setFormattedMenu,
                                ]}
                                level="second"
                                setActiveMobileMenu={setActiveMobileMenu}
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
                                      "bg-black/10 rounded-lg my-1 dark:bg-darkmode-600",
                                      !subMenu.activeDropdown && "hidden",
                                      subMenu.activeDropdown && "block",
                                    ])}
                                  >
                                    {subMenu.subMenu.map(
                                      (lastSubMenu, lastSubMenuKey) => (
                                        <li
                                          className="max-w-[1280px] w-full mx-auto"
                                          key={lastSubMenuKey}
                                        >
                                          <Menu
                                            menu={lastSubMenu}
                                            formattedMenuState={[
                                              formattedMenu,
                                              setFormattedMenu,
                                            ]}
                                            level="third"
                                            setActiveMobileMenu={
                                              setActiveMobileMenu
                                            }
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
          </div>
        </div>
        {/* END: Mobile Menu */}
      </>
    );
  }

  function Menu(props) {
    const {push} = useRouter();
    const [formattedMenu, setFormattedMenu] = props.formattedMenuState;
  
    return (
      <a
        href={props.menu.subMenu ? "#" : props.menu.pathname}
        className={clsx([
          "h-[50px] flex items-center text-white",
          props.level == "first" && "px-6",
          props.level != "first" && "px-4",
        ])}
        onClick={(event) => {
          event.preventDefault();
          linkTo(props.menu, push, props.setActiveMobileMenu);
          setFormattedMenu(toRaw(formattedMenu));
        }}
      >
        {props?.menu?.icon ? (
          <div>
            <Console.Lucide icon={props?.menu?.icon !== 'Web' ? props?.menu?.icon : 'Globe'} />
          </div>
        ) : null}
        <div className="flex items-center w-full ml-3">
          {props.menu.title}
          {props.menu.subMenu && (
            <div
              className={clsx([
                "transition ease-in duration-100 ml-auto",
                props.menu.activeDropdown && "transform rotate-180",
              ])}
            >
              <Console.Lucide icon="ChevronDown" className="w-5 h-5" />
            </div>
          )}
        </div>
      </a>
    );
  }
  

function Divider(props) {
    const { className, ...computedProps } = props;
    const Component = props.as || "div";
  
    return (
      <Component
        {...computedProps}
        className={clsx([
          props.className,
          "w-full h-px bg-white/[0.08] relative",
        ])}
      ></Component>
    );
  }
  
  export default Main;