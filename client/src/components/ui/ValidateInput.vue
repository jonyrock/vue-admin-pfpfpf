<template>
  <div :class="{ 'form-group': true, 'has-error': errors.has(name) }">
    <div class="input-group">
      <input
        type="text"
        ref="input"
        required="required"
        :name="name"
        v-validate="rule"
        v-bind:value="value"
        v-on:input="updateValue($event.target.value)"
      />
      <label v-if="label" class="control-label" :for="name">{{ label }}</label>
      <i class="bar"></i>
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
  methods: {
    updateValue(value) {
      this.$emit('input', value)
    }
  }
}
</script>
