import Cookie from "js-cookie";

const tokenKey = 'myToken'
export function getToken(){
  return Cookie.get(tokenKey)
}

export function setToken(token: string){
  return Cookie.set(tokenKey, token)
}

export function removeToken(){
  return Cookie.remove(tokenKey)
}