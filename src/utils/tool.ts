// 递归查询任意一级对应的数组
export const deepQuery = (tree: any, name: any, key:string = 'id') => {
  var isGet = false;
  var retNode = null;
  function deepSearch(tree: any, name: any) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i].children && tree[i].children.length > 0) {
        deepSearch(tree[i].children, name);
      }
      if (name === tree[i][key] || isGet) {
        isGet || (retNode = tree[i]);
        isGet = true;
        break;
      }
    }
  }
  deepSearch(tree, name);
  return retNode;
};
