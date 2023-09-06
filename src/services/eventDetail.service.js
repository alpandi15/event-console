import { request } from "@/src/utils/request";

export const apiGetEventDetail = async (slug) => {
    return request({
        url: `/console/event/${slug}`,
        method: 'get',
        endPointType: 'event',
        auth: true
    })
}
