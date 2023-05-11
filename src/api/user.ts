import request from "../utils/request"

export function getUserInfo(){
  return request({
    url: `/my/userInfo`,
    method: 'get'
  })
}

