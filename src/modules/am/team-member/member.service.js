import { api, request } from "@/src/utils/request";
export const fetchUsers = async (data) => {
  return request({
    url: '/console/team-member/list',
    data,
    method: 'get',
    endPointType: 'event',
    auth: true,
  })
}
export const apiGetAll = async (data) => {
  return request({
    url: '/console/team-member',
    data,
    method: 'get',
    endPointType: 'event',
    auth: true,
  })
}

export const apiDetail = (id) => {
  return api({ endPointType: 'event', type: 'json' }).get(`/console/team-member/${id}`).then((data) => data.data)
}

export const addMember = async (data) => {
  return request({
    url: '/console/team-member',
    data,
    method: 'post',
    endPointType: 'event',
    auth: true,
  })
}

export const deleteAccess = (id) => {
  return api({ endPointType: 'event' }).delete(`/console/team-member/${id}`).then((res) => res.data)
}