<template>
  <div :class="{ 'form-group': true, 'has-error': errors.has(name) }">
    <div class="input-group">
      <input
        v-on:focus="focused = true"
        v-on:blur="focused = false"
        :type="type"
        ref="input"
        required="required"
        :name="name"
        v-validate="rule"
        v-bind:value="value"
        v-on:input="updateValue($event.target.value)"
      />
      <label v-if="label" class="control-label" :for="name">{{ label }}</label>
      <i class="bar"></i>
      <div class="errors" v-if="!focused && errors.has(name)">
        {{ errors.first(name) }}
      </div>
    </div>
  </div>
</template>

<script>
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
      focused: false
    }
  },
  methods: {
    updateValue(value) {
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
      min-width: 200px;
    }
  }
</style>

