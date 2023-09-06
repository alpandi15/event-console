/* eslint-disable import/no-anonymous-default-export */
import { api } from "@/src/utils/request"

export default {
    get: () => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup/form-register').then(({ data }) => data),
    update: (req) => api({ endPointType: 'event', type: 'json' }).patch('/console/event-setup/form-register', req).then(({ data }) => data)
}