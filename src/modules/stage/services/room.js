/* eslint-disable import/no-anonymous-default-export */
import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/room', { params: params }).then(({ data }) => data),
    apiGetDetail: (id) => api({ endPointType: 'event', type: 'json' }).get(`/console/room/${id}`).then(({ data }) => data),
    fetchAreas: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/area/list', { params: params }).then(({ data }) => data),
    apiCreate: (req) => api({ endPointType: 'event', type: 'form-data' }).post(`/console/room`, req).then(({ data }) => data),
    apiUpdate: (id, req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/room/${id}`, req).then(({ data }) => data),
    apiDelete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/room/${id}`).then(({ data }) => data)
}