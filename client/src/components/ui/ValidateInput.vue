<template>
  <div :class="{ 'form-group': true, 'has-error': errors.has(name) }">
    <div class="input-group">
      <input
        :name="name"
        :type="type"
        v-on:focus="firstFocus = true"
        v-on:blur="firstFocus = false"
        v-on:input="updateValue($event.target.value)"
        v-validate="fullRule"
        v-bind:value="value"
        required="required"
      />
      <label v-if="label" class="control-label" :for="name">{{ label }}</label>
      <i class="bar"></i>
      <div class="errors" v-if="showError">
        {{ errors.first(name) }}
      </div>
    </div>
  </div>
</template>

<script>
  
  import { resolveComplexRule } from 'src/validation';

  export default {
    inject: ['$validator'],
    props: {
      name: {
        type: String,
        required: true
      },
      type: {
        type: String,
        default: 'input'
      },
      value: {
        type: String,
        required: true
      },
      rule: {
        type: String,
        default: 'required'
      },
      label: {
        type: String
      }
    },
    data() {
      return {
        firstFocus: false
      }
    },
    computed: {
      fullRule() {
        return resolveComplexRule(this.rule);
      },
      showError() {
        var res = !this.firstFocus && this.errors.has(this.name);
        return !this.firstFocus && this.errors.has(this.name);
      }
    },
    methods: {
      updateValue(value) {
        this.firstFocus = false;
        this.$emit('input', value);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form-group {
    position: relative;
    .errors {
      position: absolute;
      background: white;
      border: 1px solid gray;
      padding: 5px;
      color: red;
      top: 0px;
      left: 100%;
      min-width: 250px;
      z-index: 3;
    }
  }
</style>

