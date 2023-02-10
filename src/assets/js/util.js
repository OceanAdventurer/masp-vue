// import { Message } from 'element-ui'

export default {
  dataTableEditAuthority: false, // 数据的编辑权限
  paramOneEditAuthority: false, // 工程参数的编辑权限
  UserData: [],
  CHART_TYPE_OBJ: { // 常量图表类型对应字符串
    bar: 'bar', // 柱状图
    pie: 'pie', // 饼状图
    line: 'line', // 折线图
    barStack: 'barStack', // 堆叠图
    scatter: 'scatter', // 散点图
    boxplot: 'boxplot', // 蜡烛图
    bar3D: 'bar3D', // 3D柱状图
    scatter3D: 'scatter3D', // 3D散点图
    barYCategory: 'barYCategory', // 反转轴
    oppositeDirection: 'oppositeDirection' // 反方向
  },
  isDefine (value) { // 判断传入的值是否为空
    if (value == null || value === '' || value === 'undefined' || value === undefined || value === 'null' || value === '(null)' || value === 'NULL' || typeof (value) === 'undefined') {
      return false
    }
    return true
  },
  isEmptyObject (obj) { // 对象为空
    if (typeof obj !== 'object' || obj === {} || obj === '{}') {
      return true
    } else {
      for (var name in obj) {
        return false
      }
      return true
    }
  },
  isNotEmptyObject (obj) { // 对象不为空
    return !this.isEmptyObject(obj)
  },
  parentNode: null, // 父节点信息，递归时使用
  treeNode: null, // 整个树节点信息，递归时使用
  /**
   * 获取树节点信息
   * @param {整个树节点数据} treeNode
   * @param {当前树节点编号} currNodeId
   */
  getTreeNode (treeNode, currNodeId) {
    this.parentNode = null // 清空上次操作
    this.treeNode = null // 清空上次操作
    var searchTreeNode = this.searchTreeNode(treeNode, currNodeId, null) // 执行递归操作树节点信息
    if (!searchTreeNode.parentNode) { // 当前树节点不存在父节点
      searchTreeNode.parentNode = {
        ID: null,
        NAME: null,
        CHILDREN: treeNode
      }
    }
    return searchTreeNode
  },
  /**
   * @param {树节点数据} treeNode
   * @param {当前树节点编号} currNodeId
   * @param {父节点信息} parentNode
   */
  searchTreeNode (treeNode, currNodeId, parentNode) {
    for (var i = 0; i < treeNode.length; i++) {
      if (this.treeNode) { // 整个树节点信息不存在
        break
      }

      var nodeObj = treeNode[i]
      if (!nodeObj || !nodeObj.ID) {
        continue
      }

      if (nodeObj.ID === currNodeId) {
        this.treeNode = nodeObj
        this.parentNode = parentNode
        break
      } else {
        if (nodeObj.CHILDREN && nodeObj.CHILDREN.length > 0) {
          this.searchTreeNode(nodeObj.CHILDREN, currNodeId, nodeObj)
        } else {
          continue
        }
      }
    }
    return { parentNode: this.parentNode, treeNode: this.treeNode }
  },
  generateUUID () {
    var d = new Date().getTime()
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0
      d = Math.floor(d / 16)
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })
    return uuid
  },
  getTabNameValue (enName, zhName, tabArr) { // 通过中文和英文名字获取tab标签的值
    if (tabArr.length > 0) {
      var tabIndexValue = 0
      tabArr.forEach(item => {
        if (item.title === enName && item.content === zhName) {
          tabIndexValue = item.name
          return false
        }
      })
      return tabIndexValue
    }
  },
  getTabValue (enName, parent, tabArr) { // 通过英文名字和父节点名字获取tab标签的值
    if (tabArr.length > 0) {
      var tabIndexValue = 0
      tabArr.forEach(item => {
        if (item.enName === enName && item.parent === parent) {
          tabIndexValue = item.name
          return false
        }
      })
      return tabIndexValue
    }
  },
  distinctArray (arr) {
    var ret = []
    for (var i = 0, len = arr.length; i < len; i++) {
      if (ret.indexOf(arr[i]) === -1) {
        ret.push(arr[i])
      }
    }
    return ret
  },
  dealInputNumValue (value) {
    let tempValue = 0
    if (parseFloat(value).toString() !== 'NaN') { // 判断是否是数字
      let str = parseFloat(value).toString()
      if (str.indexOf('.') > -1) { // 小数
        let strArr = str.split('.')
        if (strArr[1].length > 10) { // 保留小数点后十位
          tempValue = parseFloat(value).toFixed(10)
        } else {
          tempValue = parseFloat(value)
        }
      } else { // 整数
        tempValue = parseFloat(value)
      }
    }
    return tempValue
  },
  // 图片转换格式的方法
  dataURLToBlob (dataurl) {
    let arr = dataurl.split(',')
    let mime = arr[0].match(/:(.*?);/)[1]
    let bstr = atob(arr[1])
    let n = bstr.length
    let u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  },
  logBackIn (data) {
    const that = this
    // if (!window.tipLock) {
      if (this.isNotEmptyObject(data)) {
        window.location.href = data.result.data
      } else if (this.isDefine(data)) {
        that.$router.push({ path: '/' }) // 跳转登录界面
      } else {
        that.$router.push({ path: '/' }) // 跳转登录界面
      }
    // } else {
    //   if (this.isNotEmptyObject(data)) {
    //     // alert(data.message)
    //     Message.error(data.message)
    //     window.tipLock = false
    //     window.location.href = data.result.data
    //   } else if (this.isDefine(data)) {
    //     // alert(data)
    //     Message.error(data)
    //     window.tipLock = false
    //     that.$router.push({ path: '/' }) // 跳转登录界面
    //   } else {
    //     // alert('登录信息异常！')
    //     Message.error('登录信息异常！')
    //     window.tipLock = false
    //     that.$router.push({ path: '/' }) // 跳转登录界面
    //   }
    // }
  },
  csvJSON (csv) {
    var lines = csv.split('\n')
    var result = []
    var headers = lines[0].split(',')
    for (var i = 1; i < lines.length; i++) {
      var obj = {}
      var currentline = lines[i].split(',')
      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j]
      }
      result.push(obj)
    }
    //return result; //JavaScript object
    return JSON.stringify(result) //JSON
  },
  compare (property) {
  return function (a, b) {
    var value1 = a[property]
    var value2 = b[property]
    return value1 - value2
  }
}
}
