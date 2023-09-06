import { useEffect } from 'react'

export function useOutsideAlerter (ref, onHandeleEvent) {
  useEffect(() => {
    function handleClickOutside (event) {
      if (ref.current && !ref.current?.contains(event.target)) {
        onHandeleEvent()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [onHandeleEvent, ref])
}