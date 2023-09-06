import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Console } from 'ems-component'
// import { withRouter, Link } from 'react-router-dom'

// const toUpper = (text) => {
//   return text.charAt(0).toUpperCase() + text.slice(1)
// }

function titleCase (str) {
  let splitStr = str.toLowerCase().split(' ')
  for (let i = 0; i < splitStr.length; i += 1) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  return splitStr.join(' ')
}

const Breadcrumbs = (props) => {
  const { asPath } = useRouter()

  const pathnames = asPath.split('/').filter((x) => x)

  return (
    <Console.Breadcrumb light className="hidden mr-auto -intro-x sm:flex float-right">
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
        const isLast = index === pathnames.length - 1
        return isLast || (name === 'detail' || name === 'edit') ? (
          <Console.Breadcrumb.Link
            key={index}
            active={false}
            className="text-xs text-gray-500 before:invert"
          >
            {titleCase(name.replace('-', ' '))}
          </Console.Breadcrumb.Link>
        ) : (
          <Console.Breadcrumb.Link
            key={routeTo}
            to={routeTo}
            active={true}
            className="text-xs text-gray-500 before:invert"
          >
            {`${titleCase(name.replace('-', ' '))}`}
          </Console.Breadcrumb.Link>
        )
      })}
    </Console.Breadcrumb>
  )
}

export default Breadcrumbs
