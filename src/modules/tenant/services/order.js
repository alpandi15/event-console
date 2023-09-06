import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/fnb-event/order', { params: params }).then(({ data }) => data),
    apiGetDetail: (id, params) => api({ endPointType: 'event', type: 'json' }).get(`/console/fnb-event/order/${id}`, { params: params }).then(({ data }) => data)
}