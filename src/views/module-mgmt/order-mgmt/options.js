import { genOptionList } from '@/utils'

export const orderStatus = {
  ALL: '',
  WAIT_PAID: 0,
  PAID: 1,
  PICKING_COMPLETE: 2,
  SHIPPED_OUT_COMPLETE: 3,
  TRANSACTION_COMPLETE: 4,
  MANUALLY_CLOSE: -1,
  TIMEOUT_CLOSE: -2,
  BUSINESS_CLOSE: -3,
}

export const orderStatusMap = {
  [orderStatus.ALL]: '全部',
  [orderStatus.WAIT_PAID]: '待支付',
  [orderStatus.PAID]: '已支付',
  [orderStatus.PICKING_COMPLETE]: '配货完成',
  [orderStatus.SHIPPED_OUT_COMPLETE]: '出库成功',
  [orderStatus.TRANSACTION_COMPLETE]: '交易成功',
  [orderStatus.MANUALLY_CLOSE]: '手动关闭',
  [orderStatus.TIMEOUT_CLOSE]: '超时关闭',
  [orderStatus.BUSINESS_CLOSE]: '商家关闭',
}

export const orderStatusOptions = genOptionList(orderStatus, orderStatusMap)

export const payWay = {
  WECHAT: 1,
  ALIPAY: 2
}

export const payWayMap = {
  [payWay.WECHAT]: '微信支付',
  [payWay.ALIPAY]: '支付宝支付',
}

export const payWayOptions = genOptionList(payWay, payWayMap)
