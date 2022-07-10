import request from '@/utils/request'

const api_name = '/vod/teacher'

export default {
    // 条件查询分页
    pageList(current, limit, searchObj) {
        return request({
            url: `${api_name}/findPage/${current}/${limit}`,
            method: 'post',
            data: searchObj
        })
    },
    removeById(id) {
        return request({
            url: `${api_name}/remove/${id}`,
            method: 'delete'
        })
    },
    save(teacher) {
        return request({
            url: `${api_name}/save`,
            method: 'post',
            data: teacher
        }) 
    },
    findById(id) {
        return request({
            url: `${api_name}/findById/${id}`,
            method: 'get'
        }) 
    },
    update(teacher) {
        return request({
            url: `${api_name}/update`,
            method: 'post',
            data: teacher
        }) 
    },
    batchRemove(idList) {
        return request({
            url: `${api_name}/batchDelete`,
            method: 'delete',
            data: idList
        })
    },
    list() {
        return request({
            url: `${api_name}/findAll`,
            method: 'get'
        }) 
    },
}
