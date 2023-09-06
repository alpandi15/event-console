import { api } from "@/src/utils/request"

export default {
    banner: {
        get: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup/home-layout-banner', { params: params }).then(({ data }) => data),
        upload: (req) => api({ endPointType: 'event', type: 'form-data' }).post(`/console/event-setup/home-layout-banner`, req).then(({ data }) => data),
        update: (id, req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/event-setup/home-layout-banner/${id}`, req).then(({ data }) => data),
        delete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/event-setup/home-layout-banner/${id}`).then(({ data }) => data)
    },
    sponsor: {
        get: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup/sponsor', { params: params }).then(({ data }) => data),
        upload: (req) => api({ endPointType: 'event', type: 'form-data' }).post(`/console/event-setup/sponsor`, req).then(({ data }) => data),
        delete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/event-setup/sponsor/${id}`).then(({ data }) => data)
    },
    footer: {
        get: () => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup/home-layout-footer').then(({ data }) => data),
        update: (req) => api({ endPointType: 'event', type: 'form-data' }).patch('console/event-setup/home-layout-footer', req).then(({ data }) => data),
    }
}
