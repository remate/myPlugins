import tips from './tips'
import {searchByPoint} from "./deGeocode";

let MAP = null//this.map
let that = null//this
let markers = []//普通点位
let cluster = {}//聚合点位对象
let clusterMarkers = {}//聚合点位合集
let currentLnglat = []//当前点位
let isLeaflet = false
let initMAP = function (_that, search) {
  MAP = _that.map
  that = _that
  if(MAP.hasOwnProperty('_leaflet_id')){//是否为leaflet
    isLeaflet = true
  }
  if (!isLeaflet && search) {
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
  if (args === 'test') {
    console.log(tips.setPoint)
    return
  }
  if (isLeaflet) {
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
  } else {
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
}
let setCluster = function (args) {
  if (args === 'test') {
    console.log(tips.setCluster)
    return
  }
  if (isLeaflet) {
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
  } else {
    const {points, type, callback} = args
    if (!type) {
      console.error('setCluster缺少type参数')
    }
    initClear(args)
    clusterMarkers[type] = []
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
}
let setArea = function (args) {
  if (args === 'test') {
    console.log(tips.setArea)
    return
  }
  if (isLeaflet) {
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
  } else {
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
}
let setInfoWindow = function ($node, marker) {
  if (isLeaflet) {
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
  } else {
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
}
let setCenter = function (center) {
  MAP.panTo(center); //设置地图中心点
}
let setZoom = function (zoom) {
  // console.log('setZoom')
  MAP.setZoom(zoom); //设置地图层级
}
let setFitView = function (points,zoom) {
  if (isLeaflet) {
    // markers = markers.filter(function (el) {
    //   return el != null;
    // });
    // if(markers.length>0){
    //   var group = L.featureGroup(markers); //add markers array to featureGroup
    //   MAP.fitBounds(group.getBounds());
    // }
    MAP.setView(points,zoom?zoom:MAP.getZoom())
  } else {
    MAP.setFitView();
  }
}
let clearAll = function () {
  if (isLeaflet) {
    clearArea()
    clearPoint()
  } else {
    markers = []
    MAP.clearMap();
  }
}
let clearInfoWindow = function () {
  if (isLeaflet) {
    MAP.closePopup();
  } else {
    MAP.clearInfoWindow();
  }
}
let clearPoint = function () {
  if (isLeaflet) {
    markers.map((item, index) => {
      MAP.removeLayer(item);
    })
    markers = []
    clearCluster()
  } else {
    let overlays = MAP.getAllOverlays("marker");
    MAP.remove(overlays);
    markers = []
    clearCluster()
  }
}
let clearCluster = function () {
  if (isLeaflet) {
    Object.keys(clusterMarkers).map(item => {
      if (cluster[item]) {
        clusterMarkers[item].map(items => {
          cluster[item].removeLayer(items);
        })
      }
      delete cluster[item]
      delete clusterMarkers[item]
    })
  } else {
    Object.keys(clusterMarkers).map(item => {
      if (cluster[item]) {
        cluster[item].setMap(null);
      }
      delete clusterMarkers[item]
    })
  }
}
let clearArea = function () {
  if (isLeaflet) {
    areas.map((item, index) => {
      MAP.removeLayer(item);
    })
  } else {
    let overlays = MAP.getAllOverlays('polygon')
    MAP.remove(overlays);
  }
}
let clearClusterType = function (type) {
  if (type === 'test') {
    console.log(tips.clearClusterType)
    return
  }
  if (isLeaflet) {
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
  } else {
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
}
let clearPointTypeId = function (typeId = {}) {
  if (typeId === 'test') {
    console.log(tips.clearPointTypeId)
    return
  }
  if (isLeaflet) {
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
  } else {
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
}
let clearAreaTypeId = function (typeId = {}) {
  if (typeId === 'test') {
    console.log(tips.clearAreaTypeId)
    return
  }
  if (isLeaflet) {
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
  } else {
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
}
let dblclick = function (callback) {
  if (isLeaflet) {
    MAP.on('dblclick', (e) => {
      // currentLnglat = [e.latlng.lng,e.latlng.lat ]
      currentLnglat = [e.latlng.lat,e.latlng.lng]
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
  } else {
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
}
let getAddress = function (p) {
  if (isLeaflet) {
    return new Promise((resolve, reject) => {
      if (!p) {
        alert('传入具体经纬度')
        return
      }
      let params = {
        "1": p.reverse().join(',')
      }
      searchByPoint(params).then(res => {
        if (res && res[1]) {
          resolve(res[1].fullName)
        } else {
          reject('根据点位查询地址失败')
        }
      })
    })
  } else {
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
}
//自动获取当前地址//leaflet没写
let autoAddress = function () {
  return new Promise((resolve, reject) => {
    AMap.plugin('AMap.Geolocation', function () {
      var geolocation = new AMap.Geolocation({
        // 是否使用高精度定位，默认：true
        enableHighAccuracy: true,
        // 设置定位超时时间，默认：无穷大
        timeout: 5000,
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
