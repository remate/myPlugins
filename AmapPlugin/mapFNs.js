import tips from './tips'
let MAP = null//this.map
let that = null//this
let markers = []//普通点位
let cluster = {}//聚合点位对象
let clusterMarkers = {}//聚合点位合集
let currentLnglat = []//当前点位
let initMAP = function (_that,search) {
  MAP = _that.map
  that = _that
  if(search){
    that.autoComplete = new AMap.Autocomplete({
      city: '宁波市'
    })
  }
}
let initClear = function (args) {
  const {deleteCluster, deletePoints, deleteArea, ifClearPoints, ifClearCluster, ifClearArea, ifClearInfoWindow, ifClearAll} = args
  if (ifClearPoints) {
    clearPoint()
  }
  if (ifClearCluster) {
    clearCluster()
  }
  if (ifClearArea) {
    clearArea()
  }
  if (ifClearAll) {
    clearAll()
  }
  if (ifClearInfoWindow) {
    clearInfoWindow()
  }
  clearClusterType(deleteCluster)
  clearPointTypeId(deletePoints)
  clearAreaTypeId(deleteArea)
}
let setPoint = function (args) {
  if(args==='test'){
    console.log(tips.setPoint)
    return
  }
  // console.log('setPoint')
  const {points, callback} = args
  initClear(args)
  points.map(item => {
    let myIcon = new AMap.Icon({
      // 图标尺寸
      size: item.size ? new AMap.Size(...item.size) : new AMap.Size(48, 48),
      // 图标的取图地址
      image: item.icon
        ? item.icon
        : require('@/assets/img/position.png'),
      // 图标所用图片大小
      imageSize: item.size ? new AMap.Size(...item.size) : new AMap.Size(48, 48),
      // // 图标取图偏移量
      // imageOffset: new AMap.Pixel(-9, -3)
    });
    var marker = new AMap.Marker({
      position: item.points, //位置
      icon: myIcon,
      // content: `<div>${index}</div>`,
      offset: new AMap.Pixel(item.offsetX ? item.offsetX : 0, item.offsetY ? item.offsetY : -20),
      extData: {
        type: item.type,//type用来删除所有type的点时用
        id: item.id,//id用来删除某个id的点时用
        detail: item
      }
    });

    MAP.add(marker); //添加到地图
    markers.push(marker);
    marker.on("click", e => {
      callback(item, marker)
      console.warn('callback用箭头函数获取this')
    });
  });
}
let setCluster = function (args) {
  if(args==='test'){
    console.log(tips.setCluster)
    return
  }
  // console.log('setCluster')
  const {points, type, callback} = args
  if (!type) {
    console.error('setCluster缺少type参数')
  }
  initClear(args)
  clusterMarkers[type] = []
  points.map(item => {
    let myIcon = new AMap.Icon({
      // 图标尺寸
      size: item.size ? new AMap.Size(...item.size) : new AMap.Size(48,48),
      // 图标的取图地址
      image: item.icon
        ? item.icon
        : require('@/assets/img/position.png'),
      // 图标所用图片大小
      imageSize: item.size ? new AMap.Size(...item.size) : new AMap.Size(48,48),
      // // 图标取图偏移量
      // imageOffset: new AMap.Pixel(-9, -3)
    });
    var marker = new AMap.Marker({
      position: item.points, //位置
      icon: myIcon,
      // content: `<div>${index}</div>`,
      offset: new AMap.Pixel(0, -20),
      extData: {
        type: item.type,//type用来删除所有type的点时用
        id: item.id,
        detail: item
      }
    });
    clusterMarkers[type].push(marker);
    marker.on("click", e => {
      // let details = e.target.getExtData().detail;
      callback(item, marker)
      console.warn('callback用箭头函数获取this')
    });
  });
  cluster[type] = new AMap.MarkerClusterer(MAP, clusterMarkers[type], {
    gridSize: 80,
    minClusterSize: 20,
    maxZoom: 18
  });
}
let setArea = function (args) {
  if(args==='test'){
    console.log(tips.setArea)
    return
  }
  // console.log('setArea')
  const {area, callback} = args
  initClear(args)
  area.map(item => {
    let polygon = new AMap.Polygon({
      map: MAP,
      path: item.points,//设置多边形边界路径
      strokeColor: item.strokeColor || "#FF33FF", //线颜色
      strokeOpacity: 0.2, //线透明度
      strokeWeight: 3,    //线宽
      fillColor: item.color || '#74e538',
      fillOpacity: 0.35,//填充透明度
      extData: {
        type: item.type,//type用来删除时用
        id: item.id,//id用来删除某个id的点时用
        detail: item
      }
    });
    MAP.add([polygon])
    polygon.on('click', e => {
      // let details = e.target.getExtData();
      callback(item)
      console.warn('callback用箭头函数获取this')
    });
    polygon.on('mouseover', e => {
      polygon.setOptions({
        fillOpacity: 0.65,
      })
    });
    polygon.on('mouseout', () => {
      polygon.setOptions({
        fillOpacity: 0.35,
      })
    })
  })
}
let setInfoWindow = function ($node, marker) {
  let infoWindow = new AMap.InfoWindow({
    content: $node,//信息窗体的内容
    isCustom: true, //使用自定义窗体
    offset: new AMap.Pixel(13, -30)
  });
  let position = null
  if (marker instanceof Array) {
    position = new AMap.LngLat(marker[0], marker[1])
  } else {
    position = marker.getPosition()
  }
  infoWindow.open(MAP, position);
}
let setCenter = function (center) {
  // console.log('setCenter')
  MAP.panTo(center); //设置地图中心点
  //MAP.setCenter(center);
}
let setZoom = function (zoom) {
  // console.log('setZoom')
  MAP.setZoom(zoom); //设置地图层级
}
let setFitView = function (typeId) {
  // 自动适配到合适视野范围
  // 无参数，默认包括所有覆盖物的情况
  // {type:'p1'}
  if(typeId){
    let result=[];
    let overlays = MAP.getAllOverlays("marker");
    Object.keys(typeId).map(item => {
      //item为type或者id
      let mids = null
      if (typeId[item] instanceof Array) {
        mids = typeId[item]
      } else {
        mids = [typeId[item]]
      }
      //mid为具体id或type数组
      mids.map(m => {
        overlays.forEach((_item, index) => {
          if (_item.getExtData()[item] == m) {
            result.push(overlays[index]);
          }
        });
      })
    })
    MAP.setFitView(result);
  } else {
    MAP.setFitView();
  }
}
let clearAll = function () {
  // console.log('clearAll')
  markers = []
  MAP.clearMap();
}
let clearInfoWindow = function () {
  // console.log('clearInfoWindow')
  MAP.clearInfoWindow();
}
let clearPoint = function () {
  // console.log('clearPoint')
  let overlays = MAP.getAllOverlays("marker");
  MAP.remove(overlays);
  markers = []
  clearCluster()
}
let clearCluster = function () {
  // console.log('clearCluster')
  Object.keys(clusterMarkers).map(item => {
    if (cluster[item]) {
      cluster[item].setMap(null);
    }
    delete clusterMarkers[item]
  })
}
let clearArea = function () {
  // console.log('clearArea')
  let overlays = MAP.getAllOverlays('polygon')
  MAP.remove(overlays);
}
let clearClusterType = function (type) {
  if(type==='test'){
    console.log(tips.clearClusterType)
    return
  }
  // console.log('clearClusterType')
  //只通过type
  let mid = null
  if (type instanceof Array) {
    mid = type
  } else {
    mid = [type]
  }
  mid.map(item => {
    if (cluster[item]) {
      cluster[item].setMap(null);
    }
    delete clusterMarkers[item]
  })
}
let clearPointTypeId = function (typeId = {}) {
  if(typeId==='test'){
    console.log(tips.clearPointTypeId)
    return
  }
  // console.log('clearPointTypeId')
  let overlays = MAP.getAllOverlays("marker");
  Object.keys(typeId).map(item => {
    //item为type或者id
    let mids = null
    if (typeId[item] instanceof Array) {
      mids = typeId[item]
    } else {
      mids = [typeId[item]]
    }
    //mid为具体id或type数组
    mids.map(m => {
      overlays.forEach((_item, index) => {
        if (_item.getExtData()[item] == m) {
          MAP.remove(overlays[index]);
        }
      });
      markers.map((_item, index) => {
        if (_item.getExtData()[item] == m) {
          markers.splice(index, 1);
        }
      })
    })
  })
}
let clearAreaTypeId = function (typeId = {}) {
  if(typeId==='test'){
    console.log(tips.clearAreaTypeId)
    return
  }
  // console.log('clearAreaTypeId')
  let overlays = MAP.getAllOverlays('polygon')
  Object.keys(typeId).map(item => {
    //item为type或者id
    let mids = null
    if (typeId[item] instanceof Array) {
      mids = typeId[item]
    } else {
      mids = [typeId[item]]
    }
    //mid为具体id或type数组
    mids.map(m => {
      overlays.forEach((_item, index) => {
        if (_item.getExtData()[item] == m) {
          MAP.remove(overlays[index]);
        }
      });
    })
  })
}
let dblclick = function (callback) {
  MAP.on('dblclick', (e) => {
    currentLnglat = [e.lnglat.getLng(), e.lnglat.getLat()]
    if (that.locationMarker) {
      that.locationMarker.setPosition(currentLnglat)
    } else {
      clearPointTypeId({type: 'self'})
      let myIcon = new AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(39, 54),
        // 图标的取图地址
        image: require('@/assets/img/toilet.png'),
        imageSize: new AMap.Size(39, 54),
      });
      that.locationMarker = new AMap.Marker({
        map: MAP,
        position: currentLnglat,
        icon: myIcon,
      });
    }
    callback(currentLnglat)
  })
}
let getAddress = function (p) {
  return new Promise((resolve) => {
    if (!p) {
      console.log('传入具体经纬度')
      return
    }
    const geocoder = new AMap.Geocoder({
      city: "宁波市", // 城市设为北京，默认：“全国”
      radius: 1000 // 范围，默认：500
    })
    geocoder.getAddress(p, (status, result) => {
      if (status === 'complete' && result.regeocode) {
        resolve(result.regeocode.formattedAddress)
      } else {
        console.log('根据经纬度查询地址失败')
      }
    })
  })

}
//自动获取当前地址
let autoAddress = function () {
  return new Promise((resolve) => {
    AMap.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 10000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: new AMap.Pixel(10, 20),
        //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        zoomToAccuracy: true,
        //  定位按钮的排放位置,  RB表示右下
        buttonPosition: 'RB'
      })
      geolocation.getCurrentPosition(async function (status, result) {
        if (status == 'complete') {
          // console.log('高德: ', `${result.position.lat},${result.position.lng}`)
          let pos = [result.position.lng, result.position.lat]
          let detail = await getAddress(pos)
          resolve([pos, detail])
        } else {
          console.error('高德失败')
        }
      });
    });
  })
}
//用来执行el-autocomplete中的方法fetch-suggestions
let mapSearchSuggestion = function (keywords, cb) {
  // QuerySearchAddresss(keywords, cb) {
  //   mapSearchSuggestion(keywords, cb)
  // }
  that.autoComplete.search(keywords, function (status, result) {
    // 搜索成功时，result即是对应的匹配数据
    if (result.info === 'OK') {
      cb(result.tips)
    }
  })
}
//用来执行el-autocomplete中的方法select
let mapSearchSelect = function (val) {
  // handleSelectOptions(val) {
  //   let res = mapSearchSelect(val)
  //   this.$emit('showAddress', res.district + res.address, [res.location.getLng(),res.location.getLat()])
  // },
  if (that.locationMarker) {
    that.locationMarker.setPosition(val.location)
  } else {
    clearPointTypeId({type: 'self'})
    let myIcon = new AMap.Icon({
      // 图标尺寸
      size: new AMap.Size(38, 49),
      // 图标的取图地址
      image: require('@/assets/img/toilet.png'),
      imageSize: new AMap.Size(38, 49),
    });
    that.locationMarker = new AMap.Marker({
      map: MAP,
      position: val.location,
      icon: myIcon,
    });
  }
  MAP.setZoomAndCenter(MAP.getZoom(), val.location)
  return val
}
export {
  initMAP,
  setPoint,
  setCluster,
  setArea,
  setInfoWindow,
  setCenter,
  setZoom,
  setFitView,
  clearAll,
  clearInfoWindow,
  clearPoint,
  clearCluster,
  clearArea,
  clearClusterType,
  clearPointTypeId,
  clearAreaTypeId,
  dblclick,
  getAddress,
  autoAddress,
  mapSearchSuggestion,
  mapSearchSelect
}
