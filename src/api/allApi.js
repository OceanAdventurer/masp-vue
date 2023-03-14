import * as fetch from './config'

/**
 * 获取分析管理树节点数据
 */
export const getManagerTreeData = () => {
  return fetch.get('/api/analysisRecordCategory/queryAnalysisRecordCategory', {})
}
