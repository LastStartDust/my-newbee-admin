import { genOptionList } from '@/utils/index'

// 角色
export const roleStatus = {
  ADMIN: 1,
  EDITOR: 2
}

export const roleStatusMap = {
  [roleStatus.ADMIN]: 'admin',
  [roleStatus.EDITOR]: 'editor'
}

export const roleStatusOptions = genOptionList(roleStatus, roleStatusMap)
