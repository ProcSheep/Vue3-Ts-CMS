import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
export function formatUTC(utcDate: string, format: string = 'YYYY-MM-DD HH:mm:ss'){
  // 格式化时间记得时区(北京+8h)
  const resultTime = dayjs.utc(utcDate).utcOffset(8).format(format)
  return resultTime
}

