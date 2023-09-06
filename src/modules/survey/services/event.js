import { api, request } from "@/src/utils/request"

export const apiGetAll = (params) => {
    return api({ endPointType: 'event', type: 'json' }).get('/console/survey-event', { params: params }).then(({ data }) => data)
}

export const apiDetail = (id) => {
    return api({ endPointType: 'event', type: 'json' }).get(`/console/survey-event/${id}`).then(({ data }) => data)
}

export const apiCreate = (data) => {
    return api({ endPointType: 'event', type: 'json' }).post('/console/survey-event', data).then(({ data }) => data)
}

export const apiUpdate = (id, data) => {
    return api({ endPointType: 'event', type: 'json' }).patch(`/console/survey-event/${id}`, data).then(({ data }) => data)
}

export const apiParticipants = (id, params) => {
    return api({ endPointType: 'event', type: 'json' }).get(`/console/survey-event/participants/${id}`, { params: params }).then(({ data }) => data)
}