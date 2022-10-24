<script lang="ts">
import ResultList from "./ResultList.vue";
import SearchBox from "./SearchBox.vue";
import Facets from "./Facets.vue";
import Summary from "./Summary.vue";
import Pager from "./Pager.vue";
import { inject } from "vue";
import type { SearchEngine } from "@coveo/headless";
import { HeadlessInjectionKey } from "@/headlessKey";
export default {
  components: {
    ResultList,
    SearchBox,
    Facets,
    Summary,
    Pager,
  },
  async setup() {
    const engine: SearchEngine = await inject(HeadlessInjectionKey)!;
    engine.executeFirstSearch();
  },
};
</script>
<template>
  <div id="search-page" class="has-text-left container">
    <link
      rel="stylesheet"
      href="https://cdn.materialdesignicons.com/5.3.45/css/materialdesignicons.min.css"
    />
    <section class="my-6">
      <div class="columns is-centered">
        <div class="column is-three-fifths">
          <SearchBox />
        </div>
      </div>
    </section>

    <section class="my-3">
      <div class="columns">
        <div class="column is-one-quarter">
          <Suspense>
              <Facets />
          </Suspense>
        </div>
        <div class="column is-two-quarters pl-5">
          <div class="column mb-5 p-0">
            <Suspense>
                <Summary />
            </Suspense>
          </div>
          <Suspense>
            <ResultList />
          </Suspense>
          <Suspense><Pager /></Suspense>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss"></style>
