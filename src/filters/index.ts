import { string2delta } from '@/utils/quill'
import Vue from 'vue'
export const formatTerm = (term: number) => {
  const termStr = term + ''
  const endYear = parseInt(termStr.substr(0, 4))
  const no = parseInt(termStr.substring(4))
  const startYear = endYear - 1
  return `${startYear}-${endYear} 第${no}学期`
}

export const formatPaperStatus = (status: number) => {
  switch (status) {
    case 0:
      return '未启用'
    case 1:
      return '启用'
    case 2:
      return '答题中'
    case 3:
      return '批改中'
    case 4:
      return '已批改'
  }
}
export const formatSubjectCategory = (status: number) => {
  switch (status) {
    case 1:
      return '单选'
    case 2:
      return '多选'
    case 3:
      return '判断'
    case 4:
      return '问答'
    case 5:
      return '计算'
  }
}

export const formatSubjectAnswer = (answer: string) => {
  switch (answer) {
    case 'true':
      return '正确'
    case 'false':
      return '错误'
    default:
      var t = answer
      t = t.replace('0', 'A')
      t = t.replace('1', 'B')
      t = t.replace('2', 'C')
      t = t.replace('3', 'D')
      return t
  }
}

Vue.filter('string2delta', (value: string) => {
  return string2delta(value)
})

export const formatClassroomCategory = (category: number) => {
  switch (category) {
    case 1:
      return '上课教室'
    case 2:
      return '会议室'
    case 3:
      return '实验室'
  }
  return ''
}

export const formatClassroomStatus = (status: number) => {
  switch (status) {
    case 0:
      return '未知'
    case 1:
      return '可用'
    case 2:
      return '不可用'
  }
  return ''
}

export const formatDate = (
  date: string | number | Date,
  formatString?: string
) => {
  if (!date) {
    return
  }

  if (!formatString) {
    formatString = 'yyyy-MM-dd HH:mm'
  }
  if (typeof date === 'number') {
    if (date.toString().length === 10) {
      date *= 1000
    }
  }
  let dateTemp: Date = new Date(date)
  interface dict {
    [yyyy: string]: string;
    M: string;
    d: string;
    H: string;
    m: string;
    s: string;
    MM: string;
    dd: string;
    HH: string;
    mm: string;
    ss: string;
  }
  const myDict: dict = {
    yyyy: dateTemp.getFullYear().toString(),
    M: (dateTemp.getMonth() + 1).toString(),
    d: dateTemp.getDate().toString(),
    H: dateTemp.getHours().toString(),
    m: dateTemp.getMinutes().toString(),
    s: dateTemp.getSeconds().toString(),
    MM: ('' + (dateTemp.getMonth() + 101)).substr(1),
    dd: ('' + (dateTemp.getDate() + 100)).substr(1),
    HH: ('' + (dateTemp.getHours() + 100)).substr(1),
    mm: ('' + (dateTemp.getMinutes() + 100)).substr(1),
    ss: ('' + (dateTemp.getSeconds() + 100)).substr(1)
  }
  return formatString.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
    return myDict[<string>arguments[0]]
  })
}
