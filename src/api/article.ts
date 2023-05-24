import request from "../utils/request";

export function addArticle(body: any) {
  return request({
    url: `/article/addArticle`,
    method: "post",
    data: body,
  });
}


export function getAllCategory(params = {}) {
  return request({
    url: `/article/getAllCategory`,
    method: "get",
    params: params,
  });
}

export function getArticleList(params = {}) {
  return request({
    url: `/article/getArticleList`,
    method: "get",
    params: params,
  });
}
export function editArticle(data = {}) {
  return request({
    url: `/article/editArticle`,
    method: "post",
    data: data,
  });
}
