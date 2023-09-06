/* eslint-disable import/no-anonymous-default-export */
import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/ticket', { params: params }).then(({ data }) => data),
    apiGetDetail: (id) => api({ endPointType: 'event', type: 'json' }).get(`/console/ticket/${id}`).then(({ data }) => data),
    apiCreate: (req) => api({ endPointType: 'event', type: 'json' }).post('/console/ticket', req).then(({ data }) => data),
    apiUpdate: (id, req) => api({ endPointType: 'event', type: 'json' }).patch(`/console/ticket/${id}`, req).then(({ data }) => data),
    apiSearch: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/ticket/list', { params: params }).then(({ data }) => data),
    apiUpdateStatus: (id, req) => api({ endPointType: 'event', type: 'json' }).patch(`/console/ticket/status/${id}`, req).then(({ data }) => data)
}