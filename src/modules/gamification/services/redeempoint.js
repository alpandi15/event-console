import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/redeem-point', { params: params }).then(({ data }) => data),
    apiDetail: (id) => api({ endPointType: 'event', type: 'json' }).get(`/console/redeem-point/${id}`).then(({ data }) => data),
    apiCreate: (req) => api({ endPointType: 'event', type: 'form-data' }).post('/console/redeem-point', req).then(({ data }) => data),
    apiUpdate: (id, req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/redeem-point/${id}`, req).then(({ data }) => data),
    apiSponsor: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/redeem-point/company/list', { params: params }).then(({ data }) => data),
}