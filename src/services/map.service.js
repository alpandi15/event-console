import { request } from "@/src/utils/request";

export const apiGetMapAddress = async ({lat, lng}) => {
  return request({
    fullUrl: true,
    url: `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
    method: 'get',
    auth: false
  })
}