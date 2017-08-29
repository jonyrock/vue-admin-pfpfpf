<template>
  <div id="holder">
    <div id="positioner">
      <div id="ph">
        <VuesticPreLoader />
      </div>
    </div>
  </div>
</template>

<script>

  import VuesticPreLoader from 'components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue'
  import Modal from 'components/vuestic-components/vuestic-modal/VuesticModal'

  export default {
    components: {
      VuesticPreLoader,
      Modal
    }
  }

</script>

<style scoped>
  div {
    position: relative;
  }
  #holder {
    width: 100%;
    height: 100%;
  }
  #positioner {
    position: absolute;
    width: 0px;
    top: 50%;
    left: 50%;
  }
  
  #ph {
    width: 135px;
    height: 100px;
    left: -67px;
    top: -50px;
  }
</style>

