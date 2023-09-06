/* eslint-disable import/no-anonymous-default-export */


import { api } from "@/src/utils/request"

export default {
    apiGetCategories: () => api({ endPointType: 'event', type: 'json' }).get(`/console/channel-payment-event/category`).then(({ data }) => data),
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/channel-payment-event', { params: params }).then(({ data }) => data),
    apiUpdateStatus: (id, req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/channel-payment-event/${id}`, req).then(({ data }) => data)
}