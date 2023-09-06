import { slideUp, slideDown } from "@/src/utils/helper"

const linkTo = (
  menu,
  navigate,
  setActiveMobileMenu
) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    if (menu.pathname !== undefined) {
      setActiveMobileMenu(false);
      navigate(menu.pathname);
    }
  }
};

const enter = (el) => {
  slideDown(el, 300);
};

const leave = (el) => {
  slideUp(el, 300);
};

export { linkTo, enter, leave };
