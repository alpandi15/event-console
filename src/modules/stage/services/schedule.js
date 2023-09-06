import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/schedule', { params: params }).then(({ data }) => data),
    apiGetDetail: (id) => api({ endPointType: 'event', type: 'json' }).get(`/console/schedule/${id}`).then(({ data }) => data),
    apiGetSpeakers: (params) => api({ endPointType: 'event', type: 'json' }).get(`/console/speaker/search`, { params: params }).then(({ data }) => data),
    apiGetSessions: (params) => api({ endPointType: 'event', type: 'json' }).get(`/console/session`, { params: params }).then(({ data }) => data),
    apiCreate: (req) => api({ endPointType: 'event', type: 'form-data' }).post(`/console/schedule`, req).then(({ data }) => data),
    apiUpdate: (id, req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/schedule/${id}`, req).then(({ data }) => data),
    apiDelete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/schedule/${id}`).then(({ data }) => data)
}