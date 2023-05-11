import request from "../utils/request";
export function upload(action: string = `/common/upload`, formData: any) {
  console.log('actionaction',action);
  
  return request({
    url: action,
    method: "post",
    data: formData,
  });
}
