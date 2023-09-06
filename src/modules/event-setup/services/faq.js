/* eslint-disable import/no-anonymous-default-export */

import { api } from "@/src/utils/request"

export default {
  get: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup/faq', { params: params }).then(({ data }) => data),
  create: (req) => api({ endPointType: 'event', type: 'form-data' }).post(`/console/event-setup/faq`, req).then(({ data }) => data),
  update: (id, req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/event-setup/faq/${id}`, req).then(({ data }) => data),
  delete: (id) => api({ endPointType: 'event', type: 'json' }).delete(`/console/event-setup/faq/${id}`).then(({ data }) => data)
}
