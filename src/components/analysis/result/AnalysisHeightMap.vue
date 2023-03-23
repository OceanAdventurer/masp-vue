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
  // import ScreenSpaceEventHandler from 'cesium/Core/ScreenSpaceEventHandler'
  import CesiumTerrainProvider from 'cesium/Core/CesiumTerrainProvider'
  // import ScreenSpaceEventType from 'cesium/Core/ScreenSpaceEventType'
  // import CreateWorldTerrain from 'cesium/Core/createWorldTerrain'
  import IonResource from 'cesium/Core/IonResource'
  import Cartesian3 from 'cesium/Core/Cartesian3'
  import Ellipsoid from 'cesium/Core/Ellipsoid'
  import Rectangle from 'cesium/Core/Rectangle'
  // import cesiumDefined from 'cesium/Core/defined'
  import ArcType from 'cesium/Core/ArcType'
  import Color from 'cesium/Core/Color'
  // import Math from 'cesium/Core/Math'
  import Ion from 'cesium/Core/Ion'

  // import PolylineGlowMaterialProperty from 'cesium/DataSources/PolylineGlowMaterialProperty'
  // import PolylineArrowMaterialProperty from 'cesium/DataSources/PolylineArrowMaterialProperty'
  import PolylineOutlineMaterialProperty from 'cesium/DataSources/PolylineOutlineMaterialProperty'

  // import ArcGisMapServerImageryProvider from 'cesium/Scene/ArcGisMapServerImageryProvider'
  // import SingleTileImageryProvider from 'cesium/Scene/SingleTileImageryProvider'
  import UrlTemplateImageryProvider from 'cesium/Scene/UrlTemplateImageryProvider'
  // import IonImageryProvider from 'cesium/Scene/IonImageryProvider'
  // import MapMode2D from 'cesium/Scene/MapMode2D'
  import SceneMode from 'cesium/Scene/SceneMode'
  import Camera from 'cesium/Scene/Camera'

  // 导入必须的样式表
  import 'cesium/Widgets/widgets.css'

  export default {
    name: 'AnalysisHeightMap',
    props: {
      mapLatitudeAndLongitudeData: {
        type: Array,
        default: function () {
          // return [{coords: [[111.07, 39.05], [112.07, 39.05]]}]
          // return [{coords: []}]
          return []
        }
      }
    },
    data () {
      return {
        viewer: {},
        pickID: '',
        imageryLayers: {},
        mapLineDataArray: this.mapLatitudeAndLongitudeData
      }
    },
    computed: {
      mapLatitudeAndLongitudeDataObj: {
        get () {
          return this.mapLatitudeAndLongitudeData
        },
        set (val) {
          return this.$emit('mapLatitudeAndLongitudeData', val)
        }
      }
    },
    watch: {
      mapLatitudeAndLongitudeData () {
        this.mapLineDataArray = this.mapLatitudeAndLongitudeData
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
      Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI1YmY0YTlhNS01NDViLTQyNDAtYTJmMC03MzQ2MDc4YzYyN2EiLCJpZCI6NzY3NSwic2NvcGVzIjpbImFzciIsImdjIl0sImFzc2V0cyI6WzM5NTQsMiw0LDNdLCJpYXQiOjE1NjYyODU3MTV9.3hV8u2z6pYAELpbzbVcvLSencUgj5PY9p4-iU6x5dcc'
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

          imageryProviderViewModels: this.getImageryProviderArr(), // 获取或设置可用于图像选择的ProviderViewModel实例数组。这个属性是可观察的。
          terrainProviderViewModels: [], // this.getTerrainProviderViewModelsArr(), // 获取或设置可用于地形选择的ProviderViewModel实例数组。这个属性是可观察的。
          // imageryProvider: that.getImageryProvider(),
          // terrainProvider: new CesiumTerrainProvider({ // 加载火星在线地形
          //     url: '//data.marsgis.cn/terrain'
          // }),

          // orderIndependentTranslucency: false, // 设置渲染
          // contextOptions: { // 设置渲染
          //   webgl: {
          //     alpha: true
          //   }
          // },
          vrButton: false // vr按钮
        })
        // that.viewer.scene.skyBox.show = false // 屏蔽天空盒
        // that.viewer.scene.backgroundColor = new Color(0.0, 0.0, 0.0, 0.0) // 设置背景透明
        that.viewer._cesiumWidget._creditContainer.style.display = 'none' // 去掉logo
        that.viewer.sceneModePicker.viewModel.duration = 0.0 // 去掉二三维切换动画效果
        that.imageryLayers = that.viewer.imageryLayers

        // let terrainProvider = new CreateWorldTerrain({
        //   requestWaterMask: true,
        //   requestVertexNormals: true
        // })
        // let terrainProvider = new CesiumTerrainProvider({
        //   url: 'https://assets.agi.com/stk-terrain/v1/tilesets/world/tiles',
        //     // 请求水波纹效果
        //     requestWaterMask: true,
        //     // 请求照明
        //     requestVertexNormals: true
        // })
        // that.viewer.terrainProvider = terrainProvider //加入世界地形图
        // // 开启照明
        // that.viewer.scene.globe.enableLighting = true

        // 初始定位
        // var boundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(116.4, 39.9, 100), 15000)
        // // Override behavior of home button
        // viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function(commandInfo) {
        //     // Fly to custom position
        //     viewer.camera.flyToBoundingSphere(boundingSphere)
        //     // Tell the home button not to do anything
        //     commandInfo.cancel = true
        // })
        // // Set custom initial position
        // viewer.camera.flyToBoundingSphere(boundingSphere, {duration: 0})

        console.log('cesium - viewer ######: ', that.viewer)
        console.log('cesium - imageryLayers ######: ', that.imageryLayers)
        // console.log(this.mapLatitudeAndLongitudeDataObj)

        // const layers = that.viewer.imageryLayers

        // 添加图层 Sentinel-2
        // let imageryLayer = layers.addImageryProvider(
        //   new IonImageryProvider({ assetId: 3954 })
        // )
        // that.viewer.zoomTo(imageryLayer).otherwise(function (error) {
        //   console.log(error)
        // })

        // layers.addImageryProvider(new SingleTileImageryProvider({
        //   url: '../images/Cesium_Logo_overlay.png',
        //   rectangle: Rectangle.fromDegrees(-75.0, 28.0, -67.0, 29.75)
        // }))

        // that.setFlightLine(that.mapLatitudeAndLongitudeData)

        // that.viewer.trackedEntity = flightLine // 镜头追踪，将镜头固定在对象上

        // that.addPoint()

        // that.viewer.camera.setView({
        //   destination: Cartesian3.fromDegrees(111.07, 39.05, 10000),
        //   orientation: {
        //     heading: Math.toRadians(0),
        //     pitch: Math.toRadians(-90),
        //     roll: Math.toRadians(0)
        //   }
        // })

        // let scene = this.viewer.scene
        // // let globe = scene.globe
        // // let ellipsoid = globe.ellipsoid
        // // let cartesian = null
        // let handler = new ScreenSpaceEventHandler(scene.canvas)

        // // 监听鼠标悬浮事件
        // handler.setInputAction((movement) => {
        //   // cartesian = this.viewer.camera.pickEllipsoid(movement.endPosition, ellipsoid)
        //   // if (cartesian) {
        //   //   console.log('shijian: ' + cartesian)
        //   // }

        //   let pick = scene.pick(movement.endPosition) // 拾取鼠标所在区域的对象
        //   if (cesiumDefined(pick) && pick.id.id !== this.pickID) {
        //     this.pickID = pick.id.id
        //     console.log('pick: ' + pick.id.id, '  ', cesiumDefined(pick))
        //   }
        // }, ScreenSpaceEventType.MOUSE_MOVE)

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
      setFlightLine (params, eventData) {
        // let logituData = this.mapLineDataArray[0]['coords'].join(',').split(',').map(Number)
        this.viewer.entities.removeAll()

        // if (!this.$util.isNotEmptyObject(params) || params[0]['coords'].length < 1) {
        //   return false
        // }

        if (params.length < 1) {
          return false
        }
        // let logituData = params[0]['coords'].join(',').split(',').map(Number)
        // console.log(logituData)
        let flightLine = this.viewer.entities.add({
          name: 'FlightLine',
          polyline: {
            // positions: Cartesian3.fromDegreesArray([-75, 35, // 地表的红线
            //                                          -125, 35]),
            // positions: Cartesian3.fromDegreesArrayHeights([-75, 39, 250000, // 拥有高度的线
            //                                                -125, 39, 250000]),

            // positions: Cartesian3.fromDegreesArray(logituData),
            positions: Cartesian3.fromDegreesArrayHeights(params),
            // positions: Cartesian3.fromDegreesArrayHeights([-75, 43, 500000, -125, 43, 500000]),
            width: 2,
            arcType: ArcType.NONE,
            clipToGround: true,
            // material: new PolylineArrowMaterialProperty(Color.PURPLE)
            material: new PolylineOutlineMaterialProperty({
              color: Color.CYAN,
              outlineWidth: 2,
              outlineColor: Color.CYAN
            })

            // arcType: ArcType.RHUMB,
            // material: Color.RED,
            // material: new PolylineGlowMaterialProperty({ // 发光效果
            //   // glowPower: 0.2,
            //   // taperPower: 0.5,
            //   // outlineWidth: 2, // 5
            //   // outlineColor: Color.RED, // { 'rgba': [0, 255, 255, 255] },
            //   // color: Color.RED // { 'rgba': [255, 0, 255, 255] },
            //   color: Color.CYAN
            // }),
            // followSurface: false,
            // clampToGround: true // 是否贴着地表
          }
        })
        console.log(flightLine)

        // TODO: 事件点
        if (this.$util.isNotEmptyObject(eventData)) {
          eventData.forEach((item, index) => {
            if (this.$util.isDefine(item.longitude) && this.$util.isDefine(item.latitude)) {
              console.log(parseFloat(item.longitude), '   ', parseFloat(item.latitude))
              this.addPoint(item.shortname, parseFloat(item.longitude), parseFloat(item.latitude))
            }
          })
        }

        // 依据经纬度以及高度定位镜头， heading、pitch和roll就是镜头相对于xyz轴的角度，比如pitch为-90°而另外两个为0时，就是90°向下俯视地球
        // this.viewer.camera.setView({
        //   destination: Cartesian3.fromDegrees(logituData[0], logituData[1], 10000),
        //   orientation: {
        //     heading: Math.toRadians(0),
        //     pitch: Math.toRadians(-90),
        //     roll: Math.toRadians(0)
        //   }
        // })
        // 查看实体
        this.viewer.zoomTo(flightLine).otherwise(function (error) {
          console.log(error)
          this.$message.error('地图数据异常！')
        })
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
          // new ProviderViewModel({
          //   name: 'by', // 图层的名称。
          //   tooltip: 'by', // 显示项目被隐藏的工具提示。
          //   iconUrl: 'static/cesium/Widgets/Images/ImageryProviders/blueMarble.png', // 代表图层的图标。
          //   creationFunction: function () { // 一个函数或命令，用于创建一个或多个提供程序，这些提供程序将在选择此项目时添加到地球仪中。
          //     return new UrlTemplateImageryProvider({
          //       // url: 'https://elevation3d.arcgis.com/arcgis/rest/services/WorldElevation3D/Terrain3D/ImageServer'
          //       url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          //       subdomains: ['a', 'b', 'c']
          //     })
          //   }
          // }),
          // new ProviderViewModel({
          //   name: 'ArcGIS基础底图',
          //   tooltip: 'ArcGIS基础底图',
          //   iconUrl: './imgs/localtion.png',
          //   creationFunction: function () {
          //     var esri = new ArcGisMapServerImageryProvider({
          //       url: 'http://services.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer'
          //     })
          //     return esri
          //   }
          // }),
          // new ProviderViewModel({
          //   name: 'ArcGIS基础底图',
          //   tooltip: 'ArcGIS基础底图',
          //   iconUrl: './imgs/localtion.png',
          //   creationFunction: function () {
          //     var esri = new ArcGisMapServerImageryProvider({
          //       url: 'http://services.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer'
          //     })
          //     return esri
          //   }
          // }),

          // // google影像底图
          // new ProviderViewModel({
          //   name: 'Google', // 图层的名称。
          //   tooltip: 'Google(无偏移)', // 显示项目被隐藏的工具提示。
          //   iconUrl: 'static/cesium/Widgets/Images/ImageryProviders/blueMarble.png', // 代表图层的图标。
          //   creationFunction: function () { // 一个函数或命令，用于创建一个或多个提供程序，这些提供程序将在选择此项目时添加到地球仪中。
          //     return new UrlTemplateImageryProvider({
          //       url: 'http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali'
          //     })
          //   }
          // }),

          // // ArcGIS在线街道底图
          // new ProviderViewModel({
          //   name: 'ArcGIS', // 图层的名称。
          //   tooltip: 'ArcGIS在线街道底图（在全国范围内为英文注记，等放大的省市区县则为中文注记。(无偏移)）', // 显示项目被隐藏的工具提示。
          //   iconUrl: 'static/cesium/Widgets/Images/ImageryProviders/mapboxSatellite.png', // 代表图层的图标。
          //   creationFunction: function () { // 一个函数或命令，用于创建一个或多个提供程序，这些提供程序将在选择此项目时添加到地球仪中。
          //     return new ArcGisMapServerImageryProvider({
          //       url: '//server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer'
          //     })
          //   }
          // }),

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
