import { api } from "@/src/utils/request"

export default {
  get: () => api({ endPointType: 'event', type: 'json' }).get('/console/event-setup/ticket').then(({ data }) => data),
  update: (req) => api({ endPointType: 'event', type: 'form-data' }).patch(`/console/event-setup/ticket`, req).then(({ data }) => data)
}
