import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'
import actions from '../store/actions'

export default () => {
  const router = useRouter()
  useEffect(() => {
    const lang = localStorage.getItem("lang")
    const currency = localStorage.getItem("currency")
    if (!currency) {
      setCookie(this, actions.GET_USER_CURRENCY, "usd", {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      localStorage.setItem("currency", "usd")
    }
    router.push({
      pathname: '/[lang]',
      query: { lang: lang ? lang : "en", currency: currency ? currency : "usd" },
    })

  })

  return (
    <>
    </>
  )
}
