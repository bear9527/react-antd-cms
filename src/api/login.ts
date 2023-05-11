import request from "../utils/request"
export interface ILoginInfo{
  username: string;
  passwrod: string;
}
export function login(data: ILoginInfo){
  return request({
    url: `/user/login`,
    method: 'post',
    data
  })
}
