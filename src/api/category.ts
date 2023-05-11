import request from "../utils/request"
export interface ILoginInfo{
  username: string;
  passwrod: string;
}
export function getAllCategory(){
  return request({
    url: `/article/getAllCategory`,
    method: 'get'
  })
}



// getAllCategory