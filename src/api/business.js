import request from '@/utils/request';

/**
 * @description  获取business数据
 */
//获得所有的任务
export function getBusiness(data) {
  return request.get('/api/queue_task_config/select_page', data);
}

export function updateBusiness(data) {
  // return request.get('/api/queue_task_config/select_page', data);
}

export function deleteBusiness(data) {
  // return request.get('/api/queue_task_config/select_page', data);
}

export function putBusiness(data) {
  // return request.get('/api/queue_task_config/select_page', data);
}
