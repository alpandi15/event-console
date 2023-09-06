import { useController } from 'react-hook-form'
import { Console } from 'ems-component'
import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

const PinInput = ({ name, control, validate, error = false }) => {
  const {
    field
  } = useController({
    name,
    control
  });
  const [pin1, setPin1] = useState('')
  const [pin2, setPin2] = useState('')
  const [pin3, setPin3] = useState('')
  const [pin4, setPin4] = useState('')

  const refpin1 = useRef()
  const refpin2 = useRef()
  const refpin3 = useRef()
  const refpin4 = useRef()

  useEffect(() => {
    if (pin1) {
      refpin2.current.focus()
    }
    setValue()
  }, [pin1])

  useEffect(() => {
    if (pin2) {
      refpin3.current.focus()
    } else if (pin1 && pin2 == '') {
      refpin1.current.focus()
    }
    setValue()
  }, [pin2])

  useEffect(() => {
    if (pin3) {
      refpin4.current.focus()
    } else if (pin2 && pin3 == '') {
      refpin2.current.focus()
    }
    setValue()
  }, [pin3])

  useEffect(() => {
    if (pin3 && pin4 == '') {
      refpin3.current.focus()
    }
    setValue()
  }, [pin4])

  const backspace = (e, id) => {
    if (e.keyCode == 8) {
      if (id == 4) {
        if (!pin4) {
          refpin3.current.focus()
        }
      } else if (id == 3) {
        if (!pin3) {
          refpin2.current.focus()
        }
      } else if (id == 2) {
        if (!pin2) {
          refpin1.current.focus()
        }
      }
    }
  }

  const setValue = () => {
    const value = `${pin1}${pin2}${pin3}${pin4}`
    if (value) {
      field.onChange(value)
    }
  }

  return (
    <div className='flex gap-2'>
      <Console.FormInput
        ref={refpin1}
        type="password"
        maxLength={1}
        onInput={(e) => setPin1(e.target.value)}
        className={clsx([
          "aspect-square !w-10 text-center",
          { "!border-danger": error }
        ])}
        autoComplete="off"
      />
      <Console.FormInput
        ref={refpin2}
        type="password"
        onInput={(e) => setPin2(e.target.value)}
        maxLength={1}
        onKeyDown={(e) => backspace(e, 2)}
        className={clsx([
          "aspect-square !w-10 text-center",
          { "!border-danger": error }
        ])}
        autoComplete="off"
      />
      <Console.FormInput
        ref={refpin3}
        type="password"
        onInput={(e) => setPin3(e.target.value)}
        maxLength={1}
        onKeyDown={(e) => backspace(e, 3)}
        className={clsx([
          "aspect-square !w-10 text-center",
          { "!border-danger": error }
        ])}
        autoComplete="off"
      />
      <Console.FormInput
        ref={refpin4}
        type="password"
        onInput={(e) => setPin4(e.target.value)}
        maxLength={1}
        onKeyDown={(e) => backspace(e, 4)}
        className={clsx([
          "aspect-square !w-10 text-center",
          { "!border-danger": error }
        ])}
        autoComplete="off"
      />
    </div>
  )
}

export default PinInput
