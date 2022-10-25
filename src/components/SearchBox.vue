<template>
  <!-- <v-autocomplete icon="magnify" placeholder="Search" :clearable="true" :data="suggestions" :open-on-focus="true"
    @typing="onTyping" @select="onSelect" @keydown.native="onKeyDown"></v-autocomplete> -->
  <v-autocomplete
    v-model="model"
    v-model:search="search"
    :items="suggestions"
    :loading="state.isLoadingSuggestions"
    @keydown="onKeyDown"
    return-object
  >
  </v-autocomplete>
</template>

<script lang="ts">
import {
  buildSearchBox,
  type Suggestion,
  type SearchEngine,
} from "@coveo/headless";
import { HeadlessInjectionKey } from "@/headlessKey";
import { inject, watch, computed, reactive, ref } from "vue";

let engine: SearchEngine;
export default {
  name: "SearchBox",
  async setup() {
    engine = engine ?? (await inject(HeadlessInjectionKey)!);
  },
  data() {
    const options = {
      numberOfSuggestions: 5,
    };
    const searchBox = buildSearchBox(engine, { options });
    const stateRef = reactive({ state: searchBox.state });
    const suggestions = computed(() => {
      return stateRef.state.suggestions.map((s: Suggestion) => s.rawValue);
    });
    const search = ref(stateRef.state.value);
    const selected = ref("");
    watch(search, async (current) => {
      searchBox.updateText(current);
    });
    watch(selected, searchBox.selectSuggestion);
    return {
      searchBox,
      stateRef,
      model: selected,
      search,
      suggestions,
      state: stateRef.state,
    };
  },
  created() {
    this.searchBox.subscribe(() => {
      this.stateRef.state = { ...this.searchBox.state };
    });
  },
  methods: {
    onTyping: function (v: string) {
      this.searchBox.updateText(v);
    },
    onKeyDown: function (e: KeyboardEvent) {
      if (e.key === "Enter") {
        this.searchBox.submit();
      }
    },
  },
};
</script>
