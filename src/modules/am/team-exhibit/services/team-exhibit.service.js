import { request } from "@/src/utils/request";
import { getCookies } from "@/src/utils/storage";
import { TOKEN_CONSOLE } from "@/src/constant";

export const apiGetAll = async (data) => {
  // const TOKEN = await getCookies(TOKEN_CONSOLE)
  // console.log('TOKEN CONSOLE ', TOKEN)
  // // let url = `/${eventId}/exhibitor`
  // // if (type === 'admins') {
  // //   url = `${url}/member`
  // // }
  // // if (type === 'teams') {
  // //   url = `${url}/team/member`
  // // }

  return request({
    url: '/console/exhibitor/member',
    data,
    method: 'get',
    endPointType: 'event',
    auth: true,
    // token: TOKEN
  })
}

export const apiCreate = async (data) => {
  return request({
    url: '/exhibitor/${type}/member',
    data,
    method: 'post',
    endPointType: 'event',
    auth: true,
    type: 'form-data'
  })
}

export const apiEdit = async (id, data) => {
  return request({
    url: `/exhibitor/${type}/member/${id}`,
    data,
    method: 'patch',
    endPointType: 'event',
    auth: true,
    type: 'form-data'
  })
}

export const apiShow = async (id) => {
  return request({
    url: `/console/exhibitor/${id}`,
    method: 'get',
    endPointType: 'event',
    auth: true
  })
}
export const addMember = async (data) => {
  return request({
    url: '/console/exhibitor/member',
    data,
    method: 'post',
    endPointType: 'event',
    auth: true,
  })
}

export const fetchUsers = async (data) => {
  return request({
    url: '/console/exhibitor/list',
    data,
    method: 'get',
    endPointType: 'event',
    auth: true,
  })
}

export const fetchCompanys = async (data) => {
  return request({
    url: '/console/list/company',
    data,
    method: 'get',
    endPointType: 'event',
    auth: true,
  })
}
export const removeAccess = async (id) => {
  return request({
    url: '/console/exhibitor/member/' + id,
    method: 'delete',
    endPointType: 'event',
    auth: true,
  })
}
