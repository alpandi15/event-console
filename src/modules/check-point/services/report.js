import { api, baseURL } from "@/src/utils/request"

export default {
    getEntrances: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/entrance-checkpoint/report', { params: params }).then(({ data }) => data),
    getExites: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/exit-checkpoint/report', { params: params }).then(({ data }) => data),
    findArea: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/area/list', { params: params }).then(({ data }) => data),
    findTicket: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/ticket/list', { params: params }).then(({ data }) => data),
    exportEntance: () => `${baseURL({ endPointType: 'event' }).endPoint}/console/entrance-checkpoint/report/export?token=bearer-${baseURL({ endPointType: 'event' }).token}`,
    exportExit: () => `${baseURL({ endPointType: 'event' }).endPoint}/console/exit-checkpoint/report/export?token=bearer-${baseURL({ endPointType: 'event' }).token}`
}