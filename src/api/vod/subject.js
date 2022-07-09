import request from '@/utils/request'

const api_name = '/vod/subject'

export default {
  getChildList(id) {
    return request({
      url: `${api_name}/subjectList/${id}`,
      method: 'get'
    })
  }
}