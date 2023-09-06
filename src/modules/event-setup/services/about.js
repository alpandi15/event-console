import { api } from "@/src/utils/request"

export default {
    getDetails: () => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup/about').then(({ data }) => data),
    banner: {
        get: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup/about/slider', { params: params }).then(({ data }) => data),
        upload: (req) => api({ endPointType: 'event', type: 'form-data' }).post(`/console/event-setup/slider/upload`, req).then(({ data }) => data),
        update: (id, req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/event-setup/slider/${id}`, req).then(({ data }) => data),
        delete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/event-setup/slider/${id}`).then(({ data }) => data)
    },
    updateDescription: (req) => api({ endPointType: 'event', type: 'form-data' }).patch('console/event-setup/about/description', req).then(({ data }) => data),
    section2: {
        upload: (req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/event-setup/about/image-a`, req).then(({ data }) => data),
        delete: (req) => api({ endPointType: 'event', type: 'form-data' }).delete(`/console/event-setup/about/image-a`, { data: req }).then(({ data }) => data)
    },
    section3: {
        upload: (req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/event-setup/about/image-b`, req).then(({ data }) => data),
        delete: (req) => api({ endPointType: 'event', type: 'form-data' }).delete(`/console/event-setup/about/image-b`, { data: req }).then(({ data }) => data)
    },
    footer: {
        get: () => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup/home-layout-footer').then(({ data }) => data),
        update: (req) => api({ endPointType: 'event', type: 'form-data' }).patch('console/event-setup/home-layout-footer', req).then(({ data }) => data),
    }
}
