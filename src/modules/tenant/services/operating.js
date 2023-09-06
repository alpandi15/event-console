import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/fnb-event/operating', { params: params }).then(({ data }) => data),
    apiUpdateStatus: (id, req) => api({ endPointType: 'event', type: 'json' }).patch(`/console/fnb-event/operating/${id}`, req).then(({ data }) => data),
}