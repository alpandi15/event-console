import { api } from "@/src/utils/request"

export default {
    getDisplayContent: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/display-content-event', { params: params }).then(({ data }) => data),
    updateStatusDisplayContent: (id, req) => api({ endPointType: 'event', type: 'json' }).patch(`/console/display-content-event/${id}`, req).then(({ data }) => data),
    getProductList: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/exhibit-event', { params: params }).then(({ data }) => data),
    updateStatusProductList: (id, req) => api({ endPointType: 'event', type: 'json' }).patch(`/console/exhibit-event/status/${id}`, req).then(({ data }) => data),
    searchProducts: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/exhibit-event/list', { params: params }).then(({ data }) => data),
    addProduct: (req) => api({ endPointType: 'event', type: 'json' }).post('/console/exhibit-event/add-product', req).then(({ data }) => data)
}