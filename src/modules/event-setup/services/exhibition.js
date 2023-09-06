/* eslint-disable import/no-anonymous-default-export */
import { api } from "@/src/utils/request"

export default {
  getDetails: () => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup/exhibitor').then(({ data }) => data),
  banner: {
    get: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup/exhibitor/slider', { params: params }).then(({ data }) => data),
    upload: (req) => api({ endPointType: 'event', type: 'form-data' }).post(`/console/event-setup/slider/upload`, req).then(({ data }) => data),
    update: (id, req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/event-setup/slider/${id}`, req).then(({ data }) => data),
    delete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/event-setup/slider/${id}`).then(({ data }) => data)
  },
  copywriting: {
    update: (req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/event-setup/exhibitor/update`, req).then(({ data }) => data),
    deleteImageA: {
      delete: (req) => api({ endPointType: 'event', type: 'form-data' }).delete(`/console/event-setup/exhibitor/image-a`, { data: req }).then(({ data }) => data)
    },
    deleteImageB: {
      delete: (req) => api({ endPointType: 'event', type: 'form-data' }).delete(`/console/event-setup/exhibitor/image-b`, { data: req }).then(({ data }) => data)
    }
  },
  brochure: {
    update: (req) => api({ endPointType: 'event', type: 'form-data' }).patch('/console/event-setup/exhibitor/marketing-file', req).then(({ data }) => data)
  },
  section2: {
    update: (req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/event-setup/exhibitor/self-regis`, req).then(({ data }) => data),
  }
}
