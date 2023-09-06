import { api } from "@/src/utils/request"

export default {
    getFilters: () => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup/schedule').then(({ data }) => data),
    getAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup/schedule/speakers', { params: params }).then(({ data }) => data),
    setHighlight: (id, req) => api({ endPointType: 'event', type: 'form-data' }).post(`/console/event-setup/schedule/${id}`, req).then(({ data }) => data)
}
