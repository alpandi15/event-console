import clsx from "clsx"
import { Console } from "ems-component"
import { useDetectClickOutside } from 'react-detect-click-outside';

const ButtonSwitcher = ({ icon, label, children, variant, show = false, setShow }) => {
    const toggleSwitch = () => {
        if (show) {
            setShow(false)
        } else {
            setShow(true)
        }
    }
    const closeDropdown = () => {
        if (show) {
            setShow(false)
        }
    }
    const ref = useDetectClickOutside({ onTriggered: closeDropdown });

    return (
        <div className="relative" ref={ref}>
            <Console.Button
                variant={variant}
                type="button"
                className="px-4 shadow-md"
                onClick={() => toggleSwitch()}>
                <Console.Lucide icon={icon} className="mr-2 w-4 h-4" />
                {label}
            </Console.Button>
            <div className={clsx(
                "absolute rounded-md shadow-md z-50 mt-1 bg-white overflow-hidden cursor-pointer",
                show ? "flex" : "hidden"
            )}>
                {children}
            </div>
        </div>
    )
}
export default ButtonSwitcher