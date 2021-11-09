export default {
  setPoint: `
  {
      points: [
        {
          points: [102.822104, 24.882738],
          type: 'p1',
          color: '#f9a22a',
          size: [39, 54]
        },
        {
          points: [102.827104, 24.882738],
          type: 'p2',
          color: '#f9a22a',
          size: [39, 54]
        }
      ],
      ifClearArea: true,
      callback: (item, marker) => {
        this.rightShow = true
        let $node = new MapRectTip().$mount()
        $node.$on('close', (res) => {
          console.log('res', res)
          clearInfoWindow()
        })
        setInfoWindow($node.$el, marker)
      }
   }`,
  setCluster: `
    {
      points: [
        {
          points: [102.812104, 24.882738],
          size: [39, 54]
        },
        {
          points: [102.807104, 24.882738],
          size: [39, 54]
        }
      ],
      type: 'p1',
      ifClearArea: true,
      callback(item) {
        console.log(item)
      }
    }`,
  setArea: `{
    area: [
      {
        points: [
          [102.822104, 24.882738],
          [102.834104, 24.874738],
          [102.826104, 24.855738]
        ],
        type: 'area1',
        strokeColor: '#6f9ff1',
        color: '#f9a22a'
      },
      {
        points: [
          [102.821104, 24.895738],
          [102.823104, 24.925738],
          [102.828104, 24.885738]
        ],
        type: 'area2',
        id: 12,
        color: '#74e538'
      }
    ],
    clearCluster: 'test',
    clearPoint: {
      id: 2
    },
    ifClearArea: true,
    ifClearInfoWindow: false,
    ifClearAll: false,
    callback(item) {
      console.log(item)
    }
  }`,
  clearClusterType:`字符串'type'||数组['type']`,
  clearPointTypeId:`
    {
      type:['a'],//可以为数组或者字符串
      id:1//可以为数组或者字符串
    }`,
  clearAreaTypeId:`
    {
      type:['a'],//可以为数组或者字符串
      id:1//可以为数组或者字符串
    }`
}
