<template>
  <li>
    <v-checkbox
      :native-value="facetValue.state === 'selected'"
      @change.native="onChange"
      >{{ facetValue.value }} ({{ facetValue.numberOfResults }})</v-checkbox
    >
  </li>
</template>
<script lang="ts">
export default {
  name: "FacetValue",
  props: ["facetValue"],
  methods: {
    onChange: function () {
      this.$emit("toggle", this.facetValue);
    },
  },
};
</script>
<style scoped>
li {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}
</style>
