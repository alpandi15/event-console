import { request } from "@/src/utils/request";

export const apiAuth = async (data) => {
  return request({
    url: '/console/auth-event/',
    data,
    method: 'post',
    endPointType: 'auth',
    auth: false
  })
}