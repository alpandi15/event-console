import { api } from "@/src/utils/request"

export default {
  apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/gamification-task-visit', { params: params }).then(({ data }) => data),
  apiDetail: (id) => api({ endPointType: 'event', type: 'json' }).get(`/console/gamification-task-visit/${id}`).then(({ data }) => data),
  apiParticipants: (id, params) => api({ endPointType: 'event', type: 'json' }).get(`/console/gamification-task-visit/${id}/participant`, { params: params }).then(({ data }) => data),
  apiCreate: (req) => api({ endPointType: 'event', type: 'json' }).post('/console/gamification-task-visit', req).then(({ data }) => data),
  apiUpdate: (id, req) => api({ endPointType: 'event', type: 'json' }).patch(`/console/gamification-task-visit/${id}`, req).then(({ data }) => data),
  apiGetTicket: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/ticket/list', { params: params }).then(({ data }) => data),
  apiGetVisitCategorys: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/gamification-task-visit/categories', { params: params }).then(({ data }) => data),
  apiGetVisits: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/gamification-task-visit/list', { params: params }).then(({ data }) => data),
  apiGetActivityCategorys: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/gamification-task-activity/categories', { params: params }).then(({ data }) => data),
  apiGetActivities: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/gamification-task-activity/list', { params: params }).then(({ data }) => data),
  apiGetParticipants: (id, params) => api({ endPointType: 'event', type: 'json' }).get(`/console/gamification-task-visit/${id}/participant`, { params: params }).then(({ data }) => data),
}
