import { request } from "@/src/utils/request";

export const apiGetCity = async (data) => {
  return request({
    url: '/console/city',
    data,
    method: 'get',
    endPointType: 'admin',
    auth: true
  })
}

export const apiDetailCity = async (id) => {
  return request({
    url: `/console/city/${id}`,
    method: 'get',
    endPointType: 'admin',
    auth: true
  })
}

export const apiGetProvince = async (data) => {
  return request({
    url: '/console/province',
    data,
    method: 'get',
    endPointType: 'admin',
    auth: true
  })
}

export const apiDetailProvince = async (id) => {
  return request({
    url: `/console/province/${id}`,
    method: 'get',
    endPointType: 'admin',
    auth: true
  })
}

export const apiGetCountry = async (data) => {
  return request({
    url: '/console/country',
    data,
    method: 'get',
    endPointType: 'admin',
    auth: true
  })
}

export const apiDetailCountry = async (id) => {
  return request({
    url: `/console/country/${id}`,
    method: 'get',
    endPointType: 'admin',
    auth: true
  })
}
