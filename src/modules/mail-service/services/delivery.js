import { api } from "@/src/utils/request"

export default {
    getLogs: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/email-recipient', { params: params }).then(({ data }) => data),
    apiCreate: (req) => api({ endPointType: 'event', type: 'form-data' }).post('/console/email-recipient', req).then(({ data }) => data),
    uploadFile: (req, config) => api({ endPointType: 'event', type: 'form-data' }).post(`/console/email-recipient/upload`, req, config).then(({ data }) => data),
    apiDelete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/email-template/${id}`).then(({ data }) => data)
}