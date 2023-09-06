import { api } from "@/src/utils/request"

export default {
    get: () => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup').then(({ data }) => data),
    update: (req) => api({ endPointType: 'event', type: 'form-data' }).patch('/console/event-setup/contact', req).then(({ data }) => data)
}
