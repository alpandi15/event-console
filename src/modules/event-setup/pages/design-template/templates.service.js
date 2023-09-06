import { request } from "@/src/utils/request";

export const apiGetAll = async (data) => {
  return request({
    url: '/console/event-type',
    data,
    method: 'get',
    endPointType: 'admin',
    auth: true
  })
}