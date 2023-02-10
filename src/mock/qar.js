import Mock from 'mockjs'

function param2Obj (url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

const List = []
const count = 10
const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const imageUri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

const eventList = [
  {
    longitude: 119.916195,
    latitude: 32.474476,
    level: 3
  }, {
    longitude: 121.336236,
    latitude: 31.202329,
    level: 3
  }
]

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    'NAME': '@cname', //  生成中文名称
    'CREATETIME': '@date(yyyy-MM-dd HH:mm:ss)', //  生成日期 年月日时分秒
    CONTENT: {
      id: '@increment'
    },
    content: baseContent,
    imageUri
  }))
}

const treedata = [{
  ID: 1,
  NAME: '一级 1',
  CHILDREN: [{
    ID: 4,
    NAME: '二级 1-1',
    CHILDREN: [{
      ID: 9,
      NAME: '三级 1-1-1'
    }, {
      ID: 10,
      NAME: '三级 1-1-2'
    }]
  }]
}, {
  ID: 2,
  NAME: '一级 2',
  CHILDREN: [{
    ID: 5,
    NAME: '二级 2-1'
  }, {
    ID: 6,
    NAME: '二级 2-2'
  }]
}, {
  ID: 3,
  NAME: '一级 3',
  TYPE: '5',
  RESULT_COLUMN_INDEX: 3,
  RESULT_TABLE_INDEX: 3
}]

// const option = {
//  title : {
//    text: '某地区蒸发量和降水量',
//    subtext: '纯属虚构'
//  },
//  tooltip : {
//    trigger: 'axis'
//  },
//  legend: {
//    data:['蒸发量','降水量']
//  },
//  toolbox: {
//    show : true,
//    feature : {
//      dataView : {show: true, readOnly: false},
//      magicType : {show: true, type: ['line', 'bar']},
//      restore : {show: true},
//      saveAsImage : {show: true}
//    }
//  },
//  calculable : true,
//  xAxis : [
//    {
//      type : 'category',
//      data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
//    }
//  ],
//  yAxis : [
//    {
//      type : 'value'
//    }
//  ],
//  series : [
//    {
//      name:'蒸发量',
//      type:'bar',
//      data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
//      markPoint : {
//        data : [
//          {type : 'max', name: '最大值'},
//          {type : 'min', name: '最小值'}
//        ]
//      },
//      markLine : {
//        data : [
//          {type : 'average', name: '平均值'}
//        ]
//      }
//    },
//    {
//      name:'降水量',
//      type:'bar',
//      data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
//      markPoint : {
//        data : [
//          {name : '年最高', value : 182.2, xAxis: 7, yAxis: 183},
//          {name : '年最低', value : 2.3, xAxis: 11, yAxis: 3}
//        ]
//      },
//      markLine : {
//        data : [
//          {
//            name: 'Y 轴值为 100 的水平线',
//            yAxis: 100,
//            lineStyle: {
//              color: '#ccc'
//            }
//          },
//          {
//            name: 'Y 轴值为 200 的水平线',
//            yAxis: 200,
//            lineStyle: {
//              color: '#ccc'
//            }
//          },
//        ]
//      }
//    }
//  ]
// }

const bar = [{
  legendArr: ['系列1', '系列2', '系列3'],
  type: 'category', // 轴类型
  xName: '月份',
  yName: '数量',
  data: {
    xAsixData: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    seriesData: [
      [12.0, 24.9, 17.0, 13.2, 15.6, 26.7, 155.6, 122.2, 62.6, 30.0, 16.4, 13.3],
      [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      [22.0, 3.9, 9.0, 13.2, 15.6, 16.7, 15.6, 52.2, 22.6, 30.0, 3.4, 1.3]
    ],
    pieData: []
  },
  markLineData: {
    valAvg: 10,
    valMax: 20
  }
}]

export default {
  login: (config) => {
    return {
      status: '0'
    }
  },

  getRunningJobs: (config) => {
    let treeList = treedata
    return {
      status: '0',
      length: treeList.length,
      content: treeList
    }
  },

  queryAnalysisRecordCategory: (config) => {
    // const { page = 1, limit = 20, sort } = { sort: 0 }
    // const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)
    const { page = 1, limit = 20, sort } = param2Obj(config.url)
    //  const { username } = JSON.parse(config.body)

    //  let mockList = List.filter(item => {
    //  if (importance && item.importance !== +importance) return false
    //  if (type && item.type !== type) return false
    //  if (title && item.title.indexOf(title) < 0) return false
    //  return true
    //  })

    let mockList = List
    let treeList = treedata

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
    // console.log(mockList)

    return {
      status: '0',
      length: mockList.length,
      result: {
        data: treeList,
        pageList: pageList
      }
    }
  },

  queryAnalysisRecord: (config) => {
    let dataList = List
    return {
      status: '0',
      result: {
        data: dataList
      }
    }
  },

  submitAnalysis: (config) => {
    let optionList = bar
    return {
      status: '200',
      groupPlot: optionList,
      summary: 1
    }
  },

  getResultFlightTree: (config) => {
    let treeList = treedata
    return {
      status: '0',
      result: {
        data: {
          events: treeList,
          flight: treeList,
          navigation: treeList,
          operation: treeList,
          weather: treeList,
          measurements: treeList
        }
      }
    }
  },

  getDimentionById: (config) => {
    let dataList = eventList
    return {
      status: '0',
      result: {
        data: dataList
      }
    }
  },

  getToExplorerValue: (config) => {
    return {
      status: '0',
      result: {
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
      }
    }
  },

  getTree: (config) => {
    let treeList = treedata
    return {
      status: '0',
      result: {
        data: treeList
      }
    }
  },

  getProfileTree: (config) => {
    let treeList = treedata
    return treeList
  },

  getGpTree: (config) => {
    let treeList = treedata
    return treeList
  },

  save_manage: () => ({
    data: 'success'
  })
}
