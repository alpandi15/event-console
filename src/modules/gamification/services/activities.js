import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/gamification-task-activity', { params: params }).then(({ data }) => data),
    apiDetail: (id) => api({ endPointType: 'event', type: 'json' }).get(`/console/gamification-task-activity/${id}`).then(({ data }) => data),
    apiParticipants: (id, params) => api({ endPointType: 'event', type: 'json' }).get(`/console/gamification-task-activity/${id}/participant`, { params: params }).then(({ data }) => data),
    apiCreate: (req) => api({ endPointType: 'event', type: 'json' }).post('/console/gamification-task-activity', req).then(({ data }) => data),
    apiUpdate: (id, req) => api({ endPointType: 'event', type: 'json' }).patch(`/console/gamification-task-activity/${id}`, req).then(({ data }) => data),
    apiGetTicket: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/ticket/list', { params: params }).then(({ data }) => data),
    apiGetVisits: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/gamification-task-activity/list', { params: params }).then(({ data }) => data),
    apiGetParticipants: (id, params) => api({ endPointType: 'event', type: 'json' }).get(`/console/gamification-task-activity/${id}/participant`, { params: params }).then(({ data }) => data),
}