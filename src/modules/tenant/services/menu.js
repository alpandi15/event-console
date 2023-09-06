import { api } from "@/src/utils/request"

export default {
    getDisplayMenus: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/display-content-event', { params: params }).then(({ data }) => data),
    updateStatusDisplayMenu: (id, req) => api({ endPointType: 'event', type: 'json' }).patch(`/console/display-content-event/${id}`, req).then(({ data }) => data),
    getMenuList: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/fnb-event', { params: params }).then(({ data }) => data),
    updateStatusMenuList: (id, req) => api({ endPointType: 'event', type: 'json' }).patch(`/console/fnb-event/status/${id}`, req).then(({ data }) => data),
    getCategories: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/fnb-event/category', { params: params }).then(({ data }) => data),
    searchMenus: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/fnb-event/list', { params: params }).then(({ data }) => data),
    addMenu: (req) => api({ endPointType: 'event', type: 'json' }).post('/console/fnb-event/add-menu', req).then(({ data }) => data)
}