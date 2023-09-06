import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/badge', { params: params }).then(({ data }) => data),
    apiDetail: (id) => api({ endPointType: 'event', type: 'json' }).get(`/console/badge/${id}`).then(({ data }) => data),
    apiCreate: (req) => api({ endPointType: 'event', type: 'form-data' }).post('/console/badge', req).then(({ data }) => data),
    apiUpdate: (id, req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/badge/${id}`, req).then(({ data }) => data),
}