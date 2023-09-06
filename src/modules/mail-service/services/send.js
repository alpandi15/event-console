import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/email-send', { params: params }).then(({ data }) => data),
    apiCreate: (req) => api({ endPointType: 'event', type: 'form-data' }).post('/console/email-send', req).then(({ data }) => data),
    getRecipients: (params) => api({ endPointType: 'event', type: 'json' }).get(`/console/email-send/recipient`, { params: params }).then(({ data }) => data),
    getTemplates: (params) => api({ endPointType: 'event', type: 'json' }).get(`/console/email-send/template`, { params: params }).then(({ data }) => data),
    getReports: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/email-send/report', { params: params }).then(({ data }) => data),
    getLogs: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/email-send/logs', { params: params }).then(({ data }) => data)
}