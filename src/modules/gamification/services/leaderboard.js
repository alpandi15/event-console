import { request, api } from "@/src/utils/request"

export const apiGetAll = async (data) => {
    return request({
        url: `/console/gamification-leaderboard`,
        data,
        method: 'get',
        endPointType: 'event',
        auth: true
    })
}

export const apiDetail = async (id) => {
    return request({
        url: `/console/gamification-leaderboard/${id}`,
        method: 'get',
        endPointType: 'event',
        auth: true
    })
}

export const apiResetData = (id) => {
    return api({ endPointType: 'event', type: 'json' }).post(`/console/gamification-leaderboard/${id}`, {}).then((data) => data)
}