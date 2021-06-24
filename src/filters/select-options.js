
export const SelectOptions = {
  // 消息类型
  messageType: [
    { label: '字符类型', value: 0 },
    { label: '数字类型', value: 1 },
    { label: '日期类型', value: 2 },
    { label: '其他类型', value: 9 },
  ],
  /** 所处环境 */
  evnType: [
    { label: '开发', value: 0 },
    { label: '测试', value: 1 },
    { label: '生产', value: 2 },
  ],

  /** 短信状态 */
  smsStatus: [
    { label: '虚拟短信', value: 0 },
    { label: '真实短信', value: 1 },
  ],

  /** 邮箱状态 */
  mailStatus: [
    { label: '虚拟邮箱', value: 0 },
    { label: '真实邮箱', value: 1 },
  ],

  /** 使用状态 */
  useStatus: [
    { label: '关闭', value: 0 },
    { label: '开启', value: 1 },
    { label: '删除', value: 9 },
  ],
}
