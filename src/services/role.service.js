import { request } from "@/src/utils/request";

export const apiGetAll = async (data) => {
  return request({
    url: '/console/role/list',
    data,
    method: 'get',
    endPointType: 'admin',
    auth: true
  })
}

export const apiGetAllRoles = async (data) => {
  return request({
    url: '/console/role',
    data,
    method: 'get',
    endPointType: 'admin',
    auth: true
  })
}
export const apiGetEventRoles = async (data) => {
  return request({
    url: '/console/list/role',
    data,
    method: 'get',
    endPointType: 'event',
    auth: true
  })
}