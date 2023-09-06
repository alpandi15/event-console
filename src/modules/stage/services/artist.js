import { request } from "@/src/utils/request"

import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/speaker', { params: params }).then(({ data }) => data),
    apiGetDetail: (id) => api({ endPointType: 'event', type: 'json' }).get(`/console/speaker/${id}`).then(({ data }) => data),
    apiCreate: (req) => api({ endPointType: 'event', type: 'form-data' }).post('/console/speaker', req).then(({ data }) => data),
    apiUpdate: (id, req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/speaker/${id}`, req).then(({ data }) => data),
    apiDelete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/speaker/${id}`).then(({ data }) => data)
}