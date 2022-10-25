<template>
  <v-checkbox
    v-model="checkbox"
    density="compact"
    :label="label"
    class="facet-label"
  >
  </v-checkbox>
</template>
<script lang="ts">
import { computed, ref, watch, type Ref } from "vue";

let checkbox: Ref<boolean>;
export default {
  name: "CoveoFacetValue",
  props: ["facetValue"],
  setup(props) {
    checkbox = ref(props.facetValue!.state);
  },
  data() {
    watch(checkbox, () => this.$emit("toggle", this.$props.facetValue));
    return {
      checkbox,
      label: computed(
        () => `${this.facetValue.value} (${this.facetValue.numberOfResults})`
      ),
    };
  },
};
</script>
<style scoped>
.facet-label {
  width: 100%;
}
.facet-label label {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}
</style>
