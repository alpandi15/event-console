import { slideUp, slideDown } from "@/src/utils/helper"

// Setup side menu
const findActiveMenu = (subMenu, location) => {
  let match = false;
  subMenu.forEach((data) => {
    const item = {
      title: data?.menu_name,
      pathname: data?.link,
      subMenu: data?.sub_menu,
    };
    const arrPath = location?.asPath?.split('/')
    const arrPathSub = item?.pathname?.split('/')

    // console.log('PART ', arrPath, arrPathSub)
    // get parent path
    // untuk detail ambil index ke 2 karena yg pertama null
    const parentPath = arrPath?.length > 1 ? arrPath[1] : null
    const parentPathSub = arrPathSub?.length > 1 ? arrPathSub[1] : null

    if (
      ((item.pathname === location.pathname) || (parentPath === parentPathSub)) &&
      !item.ignore
    ) {
      match = true;
    } else if (!match && item.subMenu) {
      // match = findActiveMenu(item.subMenu, location);
    }
  });
  return match;
};

const nestedMenu = (menu, location) => {
  // console.log('NESTED MENU ', location)
  const formattedMenu = [];
  menu.forEach((item) => {
    if (typeof item !== "string") {
      const menuItem = {
        id: item?.id,
        icon: item.icon,
        title: item.menu_name,
        pathname: item?.link,
        subMenu: item.sub_menu,
        ignore: item.ignore,
        parent: item.parent_id
      };

      menuItem.active =
        ((menuItem.pathname === location.asPath) || (menuItem.subMenu && findActiveMenu(menuItem.subMenu, location)))
        && !menuItem.ignore;

      // menuItem.active = parentPath == parentPathSub
      // console.log('DROPDOWN ', menuItem)

      if (menuItem.subMenu) {
        if (window.innerWidth > 768) {
          menuItem.activeDropdown = findActiveMenu(menuItem.subMenu, location);
        }
        // menuItem.activeDropdown = menuItem.active
        // menuItem.activeDropdown = parentPath == parentPathSub
        // console.log('DROPDOWN 2', menuItem)

        // Nested menu
        const subMenu = [];
        nestedMenu(menuItem.subMenu, location).map(
          (menu) => typeof menu !== "string" && subMenu.push(menu)
        );
        menuItem.subMenu = subMenu;
      }
      // console.log('ITEM MENU ', menuItem)
      formattedMenu.push(menuItem);
    } else {
      formattedMenu.push(item);
    }
  });
  // console.log('FINAL MEU ', formattedMenu)
  return formattedMenu;
};

const linkTo = (menu, navigate) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown;
  } else {
    if (menu.pathname !== undefined) {
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

const leaveOnChild = (el) => {
  if (window.innerWidth <= 768) {
    const target = el.target.parentElement.parentElement.parentElement
    slideUp(target, 300);
  }
};

export { nestedMenu, linkTo, enter, leave, leaveOnChild };
