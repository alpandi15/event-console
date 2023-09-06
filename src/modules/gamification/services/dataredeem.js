import { request } from "@/src/utils/request"

export const apiGetAll = async (data) => {
    return request({
        url: `/console/participant-redeem`,
        data,
        method: 'get',
        endPointType: 'event',
        auth: true
    })
}

export const apiGetGifts = async (data) => {
    return request({
        url: `/console/participant-redeem/gift/list`,
        data,
        method: 'get',
        endPointType: 'event',
        auth: true
    })
}