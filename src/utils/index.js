// 导出环境变量对象
/**
 * @description 导出环境变量对象
 * @example 
 *  import { env } from '@/utils/index'
 *  // env对象内容如下：
    { 
      BASE_URL: "/", // 部署应用时的基本 URL。他由base 配置项决定
      MODE: "develop", // 当前运行的模式
      DEV: true, // 是否运行在开发环境
      PROD: false, // 是否运行在生产环境
      SSR: false, // 是否运行在服务端渲染模式
      VITE_XXX_YYY: 'xx' // 用户自定义变量
    }
 * @return {Object} 返回import.meta.env对象，对象内容有 
 */
export const env = import.meta.env

/**
 * @description 生成OptionList
 * @param { object } status 英文键名和值的映射对象
 * @param { object } statusMap 状态和中文的映射对象
 * @returns { array } tempOptionsList 根据status和statusMap，返回一个生成好的新数组
 * @example [{ value: 0, label: '正常' }, { value: 1, label: '保留' }, { value: 3, label: '删除' }]
 */
 export function genOptionList(status, statusMap) {
  const tempOptionsList = []
  for (const key in status) {
    const value = status[key]
    const label = statusMap[value]
    tempOptionsList.push({ value, label })
  }
  return tempOptionsList
}

// 空值
export function isEmpty(v) {
  if (v === '' || v === undefined || v === null) {
    return true
  }

  if (typeof v === 'object') {
    if (Array.isArray(v)) {
      return v.length === 0
    } else {
      return Object.keys(v).length === 0
    }
  }
  return false
}

/**
 * 
 * @param {String} url 文件的url
 * @returns 解析后的值
 */
export function parseImgUrl(url) {
  if (url && url.startsWith('http')) {
    // 当 url 以 http 开头时候，我们返回原路径
    return url
  } else {
    // 否则，我们给路径添加 host，如下
    url = `http://backend-api-02.newbee.ltd${url}`
    return url
  }
}

/**
 *
 * @description 获取选项的对应名称
 * @param {Array} options 选项列表
 * @param {Number} id 当前选项值
 * @param {String} keyName 键名
 * @param {String} labelName label属性名
 */
 export function getOptionNameById(options, id, keyName = 'value', labelName = 'label') {
  const item = !isEmpty(options) && Array.isArray(options) && options.find(item => item[keyName] === id)
  return isEmpty(item) ? '' : item[labelName]
}
