<script lang="ts">
import { inject, ref } from "vue";
import { buildFacet, type SearchEngine } from "@coveo/headless";

import type { FacetValue as HeadlessFacetValue } from "@coveo/headless";
import FacetValue from "./FacetValue.vue";
import { z } from "zod";
import { HeadlessInjectionKey } from "@/headlessKey";

const FacetProps = z.object({
  field: z.string(),
  title: z.string(),
});
export default {
  name: "Facet",
  props: {
    field: String,
    title: String,
  },
  components: {
    FacetValue,
  },
  async setup(props) {
    const parsedProps = FacetProps.parse(props);
    const engine = await inject<Promise<SearchEngine>>(HeadlessInjectionKey);
    const facet = buildFacet(engine!, {
      options: { field: parsedProps.field, facetId: parsedProps.field },
    });

    return { facet:ref(facet), state:ref(facet.state) };
  },

  methods: {
    onToggle: function (facetValue: HeadlessFacetValue) {
      this.facet.toggleSelect(facetValue);
    },
  },

  created() {
    this.facet.subscribe(() => {
      this.state = { ...this.facet.state };
    });
  },
};
</script>
<style scoped>
.content ul {
  list-style-type: none;
  margin: 0;
}
</style>
<template>
  <div class="mb-5">
    <p class="is-size-5 mb-4">{{ title }}</p>
    <div class="content">
      <ul v-on:toggle="onToggle">
        <FacetValue
          @toggle="onToggle"
          v-for="v in state.values"
          v-bind:key="v.value"
          v-bind:facetValue="v"
        />
      </ul>
    </div>
  </div>
</template>
