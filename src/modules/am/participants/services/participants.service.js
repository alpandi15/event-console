import { request } from "@/src/utils/request";

export const apiGetAll = async (data) => {
  return request({
    url: '/console/participant-event',
    data,
    method: 'get',
    endPointType: 'event',
    auth: true
  })
}

export const apiCreate = async (data) => {
  return request({
    url: '/console/participant-event',
    data,
    method: 'post',
    endPointType: 'event',
    auth: true,
    type: 'form-data'
  })
}

export const apiEdit = async (id, data) => {
  return request({
    url: `/console/participant-event/${id}`,
    data,
    method: 'patch',
    endPointType: 'event',
    auth: true,
    type: 'form-data'
  })
}

export const apiShow = async (id) => {
  return request({
    url: `/console/participant-event/${id}`,
    method: 'get',
    endPointType: 'event',
    auth: true
  })
}

export const apiDelete = async (id) => {
  return request({
    url: `/console/participant-event/${id}`,
    method: 'delete',
    endPointType: 'event',
    auth: true
  })
}
