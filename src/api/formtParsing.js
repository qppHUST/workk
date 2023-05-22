import request from '@/utils/request';

/**
 * @description  获取formatParsing数据
 */
//获得所有的任务
export function getFormatParsing(data) {
  return request.get('/api/queue_task_config/select_page', data);
}

export function updateFormatParsing(data) {
  // return request.get('/api/queue_task_config/select_page', data);
}

export function deleteFormatParsing(data) {
  // return request.get('/api/queue_task_config/select_page', data);
}

export function putFormatParsing(data) {
  // return request.get('/api/queue_task_config/select_page', data);
}