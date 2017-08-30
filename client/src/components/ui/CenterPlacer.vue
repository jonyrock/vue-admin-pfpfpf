<template>
  <div id="holder">
    <div id="positioner">
      <div id="ph" :style="style" :class="box ? 'box': ''">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import * as $ from 'jquery';
  
  const PADDING = 30;
  
  export default {
    props: {
      width: {
        type: String,
        default: 'inherit'
      },
      height: {
        type: String,
        default: 'inherit'
      },
      box: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      style() {
        return `width: ${this.width}; height: ${this.height}`;
      }
    },
    mounted() {
      var $ph = $(this.$el).find('#ph');
      var w = $ph.width();
      var h = $ph.height();
      if(this.box) {
        w += PADDING * 2;
        h += PADDING * 2;
        $ph.css('padding', PADDING + 'px');
      }
      
      $ph.css('left', -(w / 2) + 'px');
      $ph.css('top', -(h / 2) + 'px');
      
      $ph.css('width', w + 'px');
      $ph.css('height', h + 'px');
    },
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
  .box {
    background: white;
  }
</style>