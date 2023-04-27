<template>
  <div v-if="showType === 'airRoute_track'">
    <FlightTrack></FlightTrack>
  </div>
  <div v-else></div>
</template>
<script>
const FlightTrack = () => import('components/edgeComputing/FlightTrack')

export default {
  data () {
    return {
      showType: ''
    }
  },
  components: {
    FlightTrack
  },
  created () {
  },
  mounted () {
    this.$bus.$on('airRouteMenu', (obj) => {
      this.showType = 'airRoute_track'
    })
  },
  props: [
    'menuListObj'
  ],
  methods: {}
}
</script>
