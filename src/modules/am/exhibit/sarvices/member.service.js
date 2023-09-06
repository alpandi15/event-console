import { api, request } from "@/src/utils/request";
import { apiGetCity, apiGetProvince, apiGetCountry } from '@/src/services/area.service'

export const apiGetAll = async (data) => {
  return request({
    url: '/console/exhibitor',
    data,
    method: 'get',
    endPointType: 'event',
    auth: true,
  })
}


export const apiGetDetail = async (id) => {
  return api({ endPointType: 'event', type: 'json' }).get(`/console/exhibitor/${id}`).then((data) => data.data)
}

export const fetchCountry = async (inputValue) => {
  const res = await apiGetCountry({ name: inputValue ?? undefined })
  if (!res?.success) return []
  return res?.data?.map(d => ({
    value: d?.id,
    label: d?.name
  })
  )
}
export const fetchProvince = async (inputValue, countrys_id) => {
  const res = await apiGetProvince({ search: inputValue ?? undefined, countrys_id })
  if (!res?.success) return []
  return res?.data?.map(d => ({
    value: d?.id,
    label: d?.name
  })
  )
}
export const fetchCity = async (inputValue, provinces_id) => {
  const res = await apiGetCity({ search: inputValue ?? undefined, provinces_id })
  if (!res?.success) return []
  return res?.data?.map(d => ({
    value: d?.id,
    label: d?.name
  })
  )
}
export const apiInvite = async (data) => {
  return request({
    url: '/console/exhibitor',
    data,
    method: 'post',
    endPointType: 'event',
    auth: true,
    type: 'form-data'
  })
}

export const apiDelete = (id) => {
  return api({ endPointType: 'event' }).delete(`/console/exhibitor/${id}`).then((res) => res.data)
}

export const apiBusinessCategories = async (data) => {
  return request({
    url: `/console/list/business-category`,
    data,
    method: 'get',
    endPointType: 'event',
    auth: true,
    type: 'json'
  })
}