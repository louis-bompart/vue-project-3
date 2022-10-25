<template>
  <section>
    <p v-if="state.hasResults" class="has-text-weight-bold">
      Results {{ state.firstResult }}-{{ state.lastResult }} of
      {{ state.total }} in {{ state.durationInSeconds }} seconds
    </p>
    <p v-else>No results for {{ state.query }}</p>
  </section>
</template>

<script lang="ts">
import { inject, reactive } from "vue";
import { buildQuerySummary, type SearchEngine } from "@coveo/headless";
import { HeadlessInjectionKey } from "@/headlessKey";
let engine: SearchEngine;
export default {
  name: "SearchSummary",
  async setup() {
    engine = engine ?? (await inject(HeadlessInjectionKey)!);
  },
  data() {
    const querySummary = buildQuerySummary(engine);
    const stateRef = reactive({ state: querySummary.state });
    return {
      querySummary: querySummary,
      stateRef,
      state: stateRef.state,
    };
  },
  created() {
    this.querySummary.subscribe(() => {
      this.stateRef.state = { ...this.querySummary.state };
    });
  },
};
</script>
