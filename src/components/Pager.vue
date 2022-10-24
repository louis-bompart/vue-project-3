<template>
  <v-pagination :value="state.currentPage" :length="total" :total-visible="7" @input="onChange" />
</template>
<script lang="ts">
import { inject, ref } from "vue";
import { buildPager, type SearchEngine } from "@coveo/headless";
import type { Pager, PagerState as HeadlessPagerState } from "@coveo/headless";
import { HeadlessInjectionKey } from "@/headlessKey";

export interface PagerState extends HeadlessPagerState {
  total: number;
}
export interface IPager {
  state: PagerState;
  pager: Pager;
}

export default {
  name: "Pager",
  async setup() {
    const engine: SearchEngine = await inject(HeadlessInjectionKey)!;
    const pager = buildPager(engine);
    const total = ref(engine.state.search.response.totalCountFiltered);
    return {
      pager: ref(pager),
      state: ref(pager.state),
      total
    };
  },
  methods: {
    onChange: function (n: number) {
      this.pager.selectPage(n);
    },
  },
};
</script>
