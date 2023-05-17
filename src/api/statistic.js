import request from '@/utils/request';
// 操作概况 月 和违规记录 月
export function getReportMonthData(data) {
  return request.get('/api/report/month', data);
}
// 昵称处理 日
export function getReportDayData(data) {
  return request.get('/api/report/daily', data);
}
// ai报表
export function getShortTextData(data) {
  return request.get('/api/report/short_text', data);
}
// 云文档操作概况 月
export function getReportSummaryData(data) {
  return request.get('/api/report/summary', data);
}
// 云文档操作概况 日
export function getReportSummaryHourData(data) {
  return request.get('/api/report/summary_hour', data);
}
//时效
export function getReportDelayHourData(data) {
  return request.get('/api/report/delay_hour', data);
}


