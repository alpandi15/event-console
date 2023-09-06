import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/entrance-checkpoint', { params: params }).then(({ data }) => data),
    apiDetail: (id) => api({ endPointType: 'event', type: 'json' }).get(`/console/entrance-checkpoint/${id}`).then(({ data }) => data),
    apiGetArea: (params) => api({ endPointType: 'event', type: 'json' }).get(`/console/area/list`, { params: params }).then(({ data }) => data),
    apiGetTicket: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/ticket/list', { params: params }).then(({ data }) => data),
    apiCreate: (req) => api({ endPointType: 'event', type: 'form-data' }).post('/console/entrance-checkpoint', req).then(({ data }) => data),
    apiUpdate: (id, req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/entrance-checkpoint/${id}`, req).then(({ data }) => data)
}