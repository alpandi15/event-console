import { api, request } from "@/src/utils/request"

export const apiGetAll = (params) => {
    return api({ endPointType: 'event', type: 'json' }).get('/console/survey-exhibitor', { params: params }).then(({ data }) => data)
}

export const apiDetail = (id) => {
    return api({ endPointType: 'event', type: 'json' }).get(`/console/survey-exhibitor/${id}`).then(({ data }) => data)
}

export const apiCreate = (data) => {
    return api({ endPointType: 'event', type: 'json' }).post('/console/survey-exhibitor', data).then(({ data }) => data)
}

export const apiUpdate = (id, data) => {
    return api({ endPointType: 'event', type: 'json' }).patch(`/console/survey-exhibitor/${id}`, data).then(({ data }) => data)
}

export const apiParticipants = (id, params) => {
    return api({ endPointType: 'event', type: 'json' }).get(`/console/survey-exhibitor/participants/${id}`, { params: params }).then(({ data }) => data)
}

export const apiCompanies = async (params) => {
    return api({ endPointType: 'event', type: 'json' }).get(`/console/list/company`, { params: params }).then(({ data }) => data)
}