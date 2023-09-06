import { api, baseURL } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/email-template', { params: params }).then(({ data }) => data),
    apiDetail: (id) => api({ endPointType: 'event', type: 'json' }).get(`/console/email-template/${id}`).then(({ data }) => data),
    apiCreate: (req) => api({ endPointType: 'event', type: 'form-data' }).post('/console/email-template', req).then(({ data }) => data),
    apiUpdate: (id, req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/email-template/${id}`, req).then(({ data }) => data),
    apiDelete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/email-template/${id}`).then(({ data }) => data),
    apiUpload: () => {
        return {
            endPoint: `${baseURL({ endPointType: 'event' }).endPoint}/console/email-template//upload`,
            token: baseURL({ endPointType: 'event' }).token
        }
    }
}