import { hyRequest } from "..";


export function getEntireRoles(){
  return hyRequest.post({
    url: '/role/list' // 不写data(offset/size)默认全部返回
  })
}

export function getEntireDepartments(){
  return hyRequest.post({
    url: '/department/list'
  })
}