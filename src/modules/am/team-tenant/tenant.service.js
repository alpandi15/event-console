/* eslint-disable import/no-anonymous-default-export */
import { api } from "@/src/utils/request"

export default {
  apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/tenant/member', { params: params }).then(({ data }) => data),
  apiCreate: (req) => api({ endPointType: 'event', type: 'form-data' }).post('/console/area', req).then(({ data }) => data),
  apiDelete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/tenant/member/${id}`).then(({ data }) => data),
  apiGetDetail: (id) => api({ endPointType: 'event', type: 'json' }).get(`/console/tenant/member/${id}`).then(({ data }) => data),
}