import { genOptionList } from '@/utils/index'

export const goodsSellStatus = {
    ON_SELL: 0,
    OFF_SELL: 1
}

export const goodsSellStatusMap = {
    [goodsSellStatus.ON_SELL]: '销售中',
    [goodsSellStatus.OFF_SELL]: '已下架',
}

export const goodsSellStatusOptions = genOptionList(goodsSellStatus, goodsSellStatusMap)
