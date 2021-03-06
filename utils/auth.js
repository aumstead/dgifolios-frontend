import cookie from 'js-cookie'
import Router from 'next/router'

export function handleLogin(token) {
  cookie.set('token', token)
  Router.push('/explore')
}

export function handleLogout() {
  cookie.remove('token')
  window.localStorage.setItem("logout", Date.now())
  Router.push('/signin')
}

export function redirectUser(context, location) {
  if(context.req) {
    context.res.writeHead(302, { Location: location })
    context.res.end()
  } else {
    Router.push(location)
  }
}
