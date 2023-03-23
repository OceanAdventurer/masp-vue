<template>
  <div class="cesium-container">
    <div id="cesiumContainer"
        class="height-map"
        @click.stop.prevent
        @mousedown.stop.prevent
        @mouseup.stop.prevent
        @mouseover.stop.prevent
        @mousewheel.stop.prevent></div>
  </div>
</template>
<script>
  // import Cesium from 'cesium/Cesium'
  // import  from 'cesium/'
  // 导入Cesium源码中的Viewer组件，注意这里是用的Viewer组件的方式加载，而不是加载整个Cesium
  import Viewer from 'cesium/Widgets/Viewer/Viewer'
  import ProviderViewModel from 'cesium/Widgets/BaseLayerPicker/ProviderViewModel'

  import EllipsoidTerrainProvider from 'cesium/Core/EllipsoidTerrainProvider'
  import CesiumTerrainProvider from 'cesium/Core/CesiumTerrainProvider'
  // import CreateWorldTerrain from 'cesium/Core/createWorldTerrain'
  import IonResource from 'cesium/Core/IonResource'
  import Cartesian3 from 'cesium/Core/Cartesian3'
  import Ellipsoid from 'cesium/Core/Ellipsoid'
  import Rectangle from 'cesium/Core/Rectangle'
  import Color from 'cesium/Core/Color'
  import Ion from 'cesium/Core/Ion'

  import ArcGisMapServerImageryProvider from 'cesium/Scene/ArcGisMapServerImageryProvider'
  import UrlTemplateImageryProvider from 'cesium/Scene/UrlTemplateImageryProvider'
  import SceneMode from 'cesium/Scene/SceneMode'
  import Camera from 'cesium/Scene/Camera'

  // 导入必须的样式表
  import 'cesium/Widgets/widgets.css'

  export default {
    name: 'AnalysisHeightMap',
    data () {
      return {
        viewer: {},
        pickID: '',
        imageryLayers: {}
      }
    },
    created () {
      this.$store.commit('SHOW_LOADING', '加载中...')
    },
    mounted () {
      const that = this

      const extend = Rectangle.fromDegrees(100, 10, 120, 70) // Rectangle(west, south, east, north) | 115.25, 39.26, 115.25, 41.03
      Camera.DEFAULT_VIEW_RECTANGLE = extend
      Camera.DEFAULT_VIEW_FACTOR = 0.5
      Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5MjkyODhmNC03MzAyLTRlNDctODY3NC00NjY5MjJhMTU1NTYiLCJpZCI6NzY3NSwic2NvcGVzIjpbImFzbCIsImFzciIsImdjIl0sImlhdCI6MTU4NTcwNTMxN30.jCIj2VPuL1--t0Wc2QthDLX3ppOVrUlJKrdNV6yVxJ0'
      this.$nextTick(() => {
        that.viewer = new Viewer('cesiumContainer', {
          animation: false, // 动画小窗口
          baseLayerPicker: true, // 图层选择控件
          creditsDisplay: false, // 版权显示
          fullscreenButton: false, // 全屏
          geocoder: false, // 右上角查询地名控件
          homeButton: true, // home按钮
          infoBox: false, // 是否显示点击要素之后显示的信息
          navigationHelpButton: false, // 帮助信息控件
          // sceneMode: SceneMode.SCENE2D, // 初始场景模式 为二维
          sceneModePicker: true, // 投影方式控件, 视角的模式 3D、2D、哥伦布视图
          selectionIndicator: false,
          timeline: false, // 时间轴

          // mapMode2D : Cesium.MapMode2D.ROTATE,
          // terrainProvider: CreateWorldTerrain({
          //   requestWaterMask: true,
          //   requestVertexNormals: true
          // }),

          imageryProviderViewModels: this.getImageryProviderArr(), // 获取或设置可用于图像选择的ProviderViewModel实例数组。这个属性是可观察的。
          terrainProviderViewModels: [], // this.getTerrainProviderViewModelsArr(), // 获取或设置可用于地形选择的ProviderViewModel实例数组。这个属性是可观察的。

          vrButton: false // vr按钮
        })
        // that.viewer.scene.skyBox.show = false // 屏蔽天空盒
        // that.viewer.scene.backgroundColor = new Color(0.0, 0.0, 0.0, 0.0) // 设置背景透明
        that.viewer._cesiumWidget._creditContainer.style.display = 'none' // 去掉logo
        that.viewer.sceneModePicker.viewModel.duration = 0.0 // 去掉二三维切换动画效果
        that.imageryLayers = that.viewer.imageryLayers

        console.log('cesium - viewer ######: ', that.viewer)
        console.log('cesium - imageryLayers ######: ', that.imageryLayers)

        let minPitch = -Math.PI_OVER_TWO
        let maxPitch = 0
        let minHeight = 200
        this.viewer.camera.changed.addEventListener(() => {
          console.log('camera.changed.addEventListener')
          if (this.viewer.camera._suspendTerrainAdjustment && this.viewer.scene.mode === SceneMode.SCENE3D) {
            this.viewer.camera._suspendTerrainAdjustment = false
            this.viewer.camera._adjustHeightForTerrain()
          }
          // Keep camera in a reasonable pitch range
          var pitch = this.viewer.camera.pitch

          if (pitch > maxPitch || pitch < minPitch) {
            this.viewer.scene.screenSpaceCameraController.enableTilt = false
            // clamp the pitch
            if (pitch > maxPitch) {
              pitch = maxPitch
            } else if (pitch < minPitch) {
              pitch = minPitch
            }
            var destination = Cartesian3.fromRadians(
              this.viewer.camera.positionCartographic.longitude,
              this.viewer.camera.positionCartographic.latitude,
              Math.max(this.viewer.camera.positionCartographic.height, minHeight))

            this.viewer.camera.setView({
              destination: destination,
              orientation: { pitch: pitch }
            })
            this.viewer.scene.screenSpaceCameraController.enableTilt = true
          }
          // if (this.viewer.camera._suspendTerrainAdjustment && this.viewer.scene.mode === SceneMode.SCENE3D) {
          //   console.log('camera.changed.addEventListener +++++++')
          //   this.viewer.camera._suspendTerrainAdjustment = false
          //   this.viewer.camera._adjustHeightForTerrain()
          // }
        })

        this.$store.commit('HIDE_LOADING', '拼命加载中')
      })
    },
    methods: {
      setPointList (shortname, eventData) {
        this.viewer.entities.removeAll()

        // TODO: 点
        if (this.$util.isNotEmptyObject(eventData)) {
          eventData.forEach((item, index) => {
            if (this.$util.isDefine(item.LONG) && this.$util.isDefine(item.LAT)) {
              // console.log(parseFloat(item.LONG), '   ', parseFloat(item.LAT))
              this.addPoint(shortname, parseFloat(item.LONG), parseFloat(item.LAT))
            }
          })
        }
      },
      getImageryProvider () {
        // return new ArcGisMapServerImageryProvider({
        //   url: '//services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
        // })
        // return UrlTemplateImageryProvider({
        //   url: 'http://localhost:8080/dsap/static/satellite_en/{z}/{x}/{y}.jpg',
        //   fileExtension: 'jpg'
        // })
      },
      // 图层
      getImageryProviderArr () {
        return [
          // google影像底图
          new ProviderViewModel({
            name: 'Google', // 图层的名称。
            tooltip: 'Google(无偏移)', // 显示项目被隐藏的工具提示。
            iconUrl: 'static/cesium/Widgets/Images/ImageryProviders/blueMarble.png', // 代表图层的图标。
            creationFunction: function () { // 一个函数或命令，用于创建一个或多个提供程序，这些提供程序将在选择此项目时添加到地球仪中。
              return new UrlTemplateImageryProvider({
                url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali'
              })
            }
          }),

          // ArcGIS在线街道底图
          new ProviderViewModel({
            name: 'ArcGIS', // 图层的名称。
            tooltip: 'ArcGIS在线街道底图（在全国范围内为英文注记，等放大的省市区县则为中文注记。(无偏移)）', // 显示项目被隐藏的工具提示。
            iconUrl: 'static/cesium/Widgets/Images/ImageryProviders/mapboxSatellite.png', // 代表图层的图标。
            creationFunction: function () { // 一个函数或命令，用于创建一个或多个提供程序，这些提供程序将在选择此项目时添加到地球仪中。
              return new ArcGisMapServerImageryProvider({
                url: '//server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
              })
            }
          }),

          // 高德影像底图
          new ProviderViewModel({
            name: '高德', // 图层的名称。
            tooltip: '高德', // 显示项目被隐藏的工具提示。
            iconUrl: 'static/cesium/Widgets/Images/ImageryProviders/blueMarble.png', // 代表图层的图标。
            creationFunction: function () { // 一个函数或命令，用于创建一个或多个提供程序，这些提供程序将在选择此项目时添加到地球仪中。
              return new UrlTemplateImageryProvider({
                url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}'
                // layer: 'tdtVecBasicLayer',
                // style: 'default',
                // format: 'image/png',
                // tileMatrixSetID: 'GoogleMapsCompatible',
                // show: false
              })
            }
          }),

          // 高德街道底图
          new ProviderViewModel({
            name: '高德', // 图层的名称。
            tooltip: '高德(街道)', // 显示项目被隐藏的工具提示。
            iconUrl: 'static/cesium/Widgets/Images/ImageryProviders/mapQuestOpenStreetMap.png', // 代表图层的图标。
            creationFunction: function () { // 一个函数或命令，用于创建一个或多个提供程序，这些提供程序将在选择此项目时添加到地球仪中。
              return new UrlTemplateImageryProvider({
                url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}'
                // layer: 'tdtVecBasicLayer',
                // style: 'default',
                // format: 'image/png',
                // tileMatrixSetID: 'GoogleMapsCompatible',
                // show: false
              })
            }
          })
        ]
      },
      // 地形
      getTerrainProviderViewModelsArr () {
        return [
          new ProviderViewModel({
            name: '无地形',
            tooltip: 'WGS84标准球体',
            iconUrl: 'static/cesium/Widgets/Images/TerrainProviders/Ellipsoid.png',
            creationFunction: function () {
              return new EllipsoidTerrainProvider({
                ellipsoid: Ellipsoid.WGS84
              })
            }
          }),
          new ProviderViewModel({
            name: '地形',
            tooltip: 'STK在线地形',
            iconUrl: 'static/cesium/Widgets/Images/TerrainProviders/CesiumWorldTerrain.png',
            creationFunction: function () {
              return new CesiumTerrainProvider({
                url: IonResource.fromAssetId(1),
                requestWaterMask: !0,
                requestVertexNormals: !0
              })
            }
          })
        ]
      },

      /**
       * 添加点
       * @param longitude 经度
       * @param latitude 纬度
       */
      addPoint (name, longitude, latitude) {
        // Sandcastle.declare(addPoint)
        this.viewer.entities.add({
          // position: Cartesian3.fromDegrees(-75.59777, 40.03883),
          name: name,
          position: Cartesian3.fromDegrees(longitude, latitude),
          point: {
            show: true, // default
            pixelSize: 20, // default: 1
            color: Color.YELLOW // default: WHITE | color : Color.YELLOW | SKYBLUE
            // outlineColor: Color.YELLOW, // default: BLACK
            // outlineWidth: 3 // default: 0
          }
        })
      }
    }
  }
</script>

<style scoped>
  .cesium-container,
  .height-map {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
</style>
