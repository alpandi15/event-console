import { api } from "@/src/utils/request"

export default {
    apiGetAll: (params) => api({ endPointType: 'event', type: 'json' }).get('/console/ticket/transaction', { params: params }).then(({ data }) => data),
}