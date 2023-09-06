import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/gamification-api-key', { params: params }).then(({ data }) => data),
    apiGetCompanies: (params) => api({ endPointType: 'event', type: 'json' }).get(`/console/gamification-api-key/list`, { params: params }).then(({ data }) => data),
    apiCreate: (req) => api({ endPointType: 'event', type: 'json' }).post('/console/gamification-api-key', req).then(({ data }) => data),
    apiDelete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/gamification-api-key/${id}`).then(({ data }) => data),
}
