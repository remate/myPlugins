import tips from './tips'
import {searchByPoint} from './deGeocode'

let MAP = null//this.map
let that = null//this
let markers = []//普通点位
let areas = []//普通区域
let cluster = {}//聚合点位对象
let clusterMarkers = {}//聚合点位合集
let currentLnglat = []//当前点位
let initMAP = function (_that, search) {
  MAP = _that.map
  that = _that
  if (search) {
    that.autoComplete = L.Autocomplete({
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
}//ok
let setPoint = function (args) {
  if (args === 'test') {
    console.log(tips.setPoint)
    return
  }
  const {points, callback} = args
  initClear(args)
  points.map(item => {
    let myIcon = L.icon({
      // 图标尺寸
      iconSize: item.size ? item.size : [48, 48],
      // 图标的取图地址
      iconUrl: item.icon
        ? item.icon
        : require('@/assets/img/position.png')
    });
    var marker = L.marker(item.points, {
      icon: myIcon,
      extData: {
        type: item.type,//type用来删除所有type的点时用
        id: item.id,//id用来删除某个id的点时用
        detail: item
      }
    }).addTo(MAP)
    markers.push(marker);
    marker.on("click", e => {
      // let details = e.target.options;
      // console.log(details)
      callback(item, marker)
      console.warn('callback用箭头函数获取this')
    });
  });
}//ok
let setCluster = function (args) {
  if (args === 'test') {
    console.log(tips.setCluster)
    return
  }
  const {points, type, callback} = args
  if (!type) {
    console.error('setCluster缺少type参数')
  }
  initClear(args)
  if (points.length > 0) {
    clusterMarkers[type] = []
    cluster[type] = new L.MarkerClusterGroup();
    points.map(item => {
      let myIcon = L.icon({
        // 图标尺寸
        iconSize: item.size ? item.size : [48, 48],
        // 图标的取图地址
        iconUrl: item.icon
          ? item.icon
          : require('@/assets/img/position.png')
      });
      var marker = L.marker(item.points, {
        icon: myIcon,
        extData: {
          type: item.type,//type用来删除所有type的点时用
          id: item.id,//id用来删除某个id的点时用
          detail: item
        }
      })
      clusterMarkers[type].push(marker);
      cluster[type].addLayer(marker)
      marker.on("click", e => {
        // let details = e.target.getExtData().detail;
        callback(item, marker)
        console.warn('callback用箭头函数获取this')
      });
    });
    MAP.addLayer(cluster[type])
  }
}//ok
let setArea = function (args) {
  if (args === 'test') {
    console.log(tips.setArea)
    return
  }
  const {area, callback} = args
  initClear(args)
  area.map(item => {
    let polygon = L.polygon(item.points, {
      color: item.strokeColor || "#FF33FF", //线颜色
      weight: 3,    //线宽
      fillColor: item.color || '#74e538',//
      fillOpacity: 0.35,//填充透明度//
      extData: {
        type: item.type,//type用来删除时用
        id: item.id,//id用来删除某个id的点时用
        detail: item
      }
    }).addTo(MAP);
    areas.push(polygon)
    polygon.on('click', e => {
      // let details = e.target.options.extData;
      callback(item)
      console.warn('callback用箭头函数获取this')
    });
    polygon.on('mouseover', e => {
      polygon.setStyle({
        fillOpacity: 0.65,
      })
    });
    polygon.on('mouseout', () => {
      polygon.setStyle({
        fillOpacity: 0.35,
      })
    })
  })
}//ok
let setInfoWindow = function ($node, marker) {
  let infoWindow = L.popup({
    autoClose: true,
    className: "",
    closeButton: false,
    closeOnClick: false,
    offset: [0, -10]
  });
  let position = null
  if (marker instanceof Array) {
    position = marker
  } else {
    position = [marker._latlng.lat, marker._latlng.lng]
  }
  infoWindow
    .setLatLng(position)
    .setContent($node)
    .openOn(MAP);
}//ok
let setCenter = function (center) {
  MAP.panTo(center); //设置地图中心点
}//ok
let setZoom = function (zoom) {
  MAP.setZoom(zoom); //设置地图层级
}//ok
let setFitView = function (points,zoom) {
  MAP.setView(points,zoom?zoom:MAP.getZoom())
}//ok
let clearAll = function () {
  clearArea()
  clearPoint()
}//ok
let clearInfoWindow = function () {
  // console.log('clearInfoWindow')
  MAP.closePopup();
}//ok
let clearPoint = function () {
  markers.map((item, index) => {
    MAP.removeLayer(item);
  })
  markers = []
  clearCluster()
}//ok
let clearCluster = function () {
  Object.keys(clusterMarkers).map(item => {
    if (cluster[item]) {
      clusterMarkers[item].map(items => {
        cluster[item].removeLayer(items);
      })
    }
    delete cluster[item]
    delete clusterMarkers[item]
  })
}//ok
let clearArea = function () {
  areas.map((item, index) => {
    MAP.removeLayer(item);
  })
}//ok
let clearClusterType = function (type) {
  if (type === 'test') {
    console.log(tips.clearClusterType)
    return
  }
  //只通过type
  let mid = null
  if (type instanceof Array) {
    mid = type
  } else {
    mid = [type]
  }
  mid.map(item => {
    if (cluster[item]) {
      clusterMarkers[item].map(items => {
        cluster[item].removeLayer(items);
      })
    }
    delete cluster[item]
    delete clusterMarkers[item]
  })
}  //ok
let clearPointTypeId = function (typeId = {}) {
  if (typeId === 'test') {
    console.log(tips.clearPointTypeId)
    return
  }
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
      markers.map((_item, index) => {
        if (_item.options.extData[item] == m) {
          delete markers[index];
          MAP.removeLayer(_item);
        }
      })
    })
  })
}  //ok
let clearAreaTypeId = function (typeId = {}) {
  if (typeId === 'test') {
    console.log(tips.clearAreaTypeId)
    return
  }
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
      areas.map((_item, index) => {
        if (_item.options.extData[item] == m) {
          delete areas[index];
          MAP.removeLayer(_item);
        }
      })
    })
  })
}//ok
let dblclick = function (callback) {
  MAP.on('dblclick', (e) => {
    currentLnglat = [e.latlng.lat,e.latlng.lng ]
    clearPointTypeId({type: 'self'})
    let myIcon = L.icon({
      iconSize: [39, 54],
      iconUrl: require('@/assets/img/toilet.png'),
    });
    that.locationMarker = L.marker(currentLnglat, {
      icon: myIcon,
      extData: {
        type: 'self'
      }
    }).addTo(MAP)
    markers.push(that.locationMarker)
    callback(currentLnglat)
  })
}//ok
let getAddress = function (p) {
  return new Promise((resolve,reject) => {
    if (!p) {
      alert('传入具体经纬度')
      return
    }
    let params = {
      "1": p.reverse().join(',')
    }
    searchByPoint(params).then(res => {
      if(res&&res[1]){
        resolve(res[1].fullName)
      } else {
        reject('根据点位查询地址失败')
      }
    })
  })
}
//自动获取当前地址
let autoAddress = function () {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.Geolocation', function () {
      var geolocation = L.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 5000,
        // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
        buttonOffset: L.Pixel(10, 20),
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
          reject('高德定位失败')
        }
      });
    });
  })
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
  autoAddress
}
