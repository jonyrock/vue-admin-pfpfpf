<template>
  <div id="holder">
    <div id="positioner">
      <div id="ph" :class="box ? 'box': ''">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import * as $ from 'jquery';

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
      padding: {
        type: Number,
        default: 30
      },
      box: {
        type: Boolean,
        default: false
      }
    },
    computed: {
    },
    methods: {
      updateStyles() {
        if(!this.$el) {
          return;
        }
        var $ph = $(this.$el).find('#ph');
        var $holder = $(this.$el);
        
        $ph.attr(
          'style', `width: ${this.width}; height: ${this.height}`
        );
        
        var w = $ph.width();
        var h = $ph.height();
        if(this.box) {
          w += this.padding * 2;
          h += this.padding * 2;
          $ph.css('padding', this.padding + 'px');
        }
        
        $ph.css('left', -(w / 2) + 'px');
        $ph.css('top', -(h / 2) + 'px');
        
        $ph.css('width', w + 'px');
        $ph.css('height', h + 'px');
        
        $holder.css('min-width', w + 'px');
        $holder.css('min-height', h + 'px');
      }
    },
    mounted() {
      this.updateStyles();
    },
    updated() {
      this.updateStyles();
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
    overflow: hidden;
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