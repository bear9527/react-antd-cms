import request from "../utils/request";
export interface ILoginInfo {
  username: string;
  passwrod: string;
}
export function getAllCategory() {
  return request({
    url: `/article/getAllCategory`,
    method: "get",
  });
}

export function addCategory(body: any) {
  return request({
    url: `/article/addCategory`,
    method: "post",
    data: body,
  });
}

export function editCategory(body: any) {
  return request({
    url: `/article/editCategory`,
    method: "post",
    data: body,
  });
}

export function deleteCategory(id: string) {
  return request({
    url: `/article/deleteCategory`,
    method: "get",
    params: { id: id },
  });
}

export function batchDeleteCategory(body: { ids: React.Key[] }) {
  return request({
    url: `/article/batchDeleteCategory`,
    method: "post",
    data: body,
  });
}

// getAllCategory
