import { redirect } from 'next/navigation'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Redirect() {
  const { query, push } = useRouter()
  // redirect('')
  useEffect(() => {
    console.log('QUERY ', query)
    if (query?.eventId) {
      return Router.push(`/${query?.eventId}/mail-service/pages/templates`)
    }
  }, [push, query])

  return <>Redirecting...</>
}