import request from '@/utils/request';

/**
 * @description  获取task_queue数据
 */
//获得所有的任务
export function getTasks(data) {
  return request.get('/api/queue_task_config/select_page', data);
}

export function updateTask(data) {
  return request.get('/api/queue_task_config/select_page', data);
}

export function deleteTasks(data) {
  return request.get('/api/queue_task_config/select_page', data);
}

export function putTasks(data) {
  return request.get('/api/queue_task_config/select_page', data);
}
