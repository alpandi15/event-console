import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/area', { params: params }).then(({ data }) => data),
    apiCreate: (req) => api({ endPointType: 'event', type: 'form-data' }).post('/console/area', req).then(({ data }) => data),
    apiUpdate: (id, req) => api({ endPointType: 'event', type: 'json' }).patch(`/console/area/${id}`, req).then(({ data }) => data),
    apiDelete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/area/${id}`).then(({ data }) => data)
}