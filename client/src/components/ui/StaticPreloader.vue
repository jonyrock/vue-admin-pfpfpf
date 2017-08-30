<template>
  <center-placer width="135px" height="100px">
    <vuestic-pre-loader />
  </center-placer>
</template>

<script>
  import VuesticPreLoader from 'components/vuestic-components/vuestic-preloader/VuesticPreLoader'
  import CenterPlacer from './CenterPlacer'
  export default {
    components: {
      CenterPlacer,
      VuesticPreLoader
    } 
  }
</script>


