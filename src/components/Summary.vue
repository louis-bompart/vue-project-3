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
import { inject, ref } from "vue";
import { buildQuerySummary, type SearchEngine } from "@coveo/headless";
import type { QuerySummary, QuerySummaryState } from "@coveo/headless";
import { HeadlessInjectionKey } from "@/headlessKey";

export interface ISummary {
  state: QuerySummaryState;
  querySummary: QuerySummary;
}
export default {
  name: "Summary",
  async setup() {
    const engine: SearchEngine = await inject(HeadlessInjectionKey)!;

    const querySummary = buildQuerySummary(engine);

    return {
      querySummary: ref(querySummary),
      state: ref(querySummary.state),
    };
  },
};
</script>
