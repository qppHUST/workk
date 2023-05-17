import request from '@/utils/request';

/**
 * @description  获取task_queue数据
 * @param {string} name
 * @param {string} status
 * @param {string} page
 * @param {string} size
 * @returns {Object}
 */

export function getTasks(data) {
  return request.get('/api/queue_task_config/select_page', data);
}
