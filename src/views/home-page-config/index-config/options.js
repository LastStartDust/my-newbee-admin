import { genOptionList } from '@/utils/index'

// 首页配置类型参数
export const configType = {
    HOT: 3, // 热销
    NEW: 4, // 新品
    RECOMMEND: 5, // 推荐
}

export const configTypeMap = {
    [configType.HOT]: '热销',
    [configType.NEW]: '新品',
    [configType.RECOMMEND]: '推荐',
}

export const configTypeOptions = genOptionList(configType, configTypeMap)
