import { api } from "@/src/utils/request"

export default {
  apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/tenant', { params: params }).then(({ data }) => data),
  apiGetDetail: (id) => api({ endPointType: 'event', type: 'json' }).get(`/console/tenant/${id}`).then(({ data }) => data),
  apiDelete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/tenant/${id}`).then(({ data }) => data),
  apiInvite: (req) => api({ endPointType: 'event', type: 'json' }).post('/console/tenant', req).then(({ data }) => data),
}
