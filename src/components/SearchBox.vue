<template>
  <v-autocomplete
    icon="magnify"
    placeholder="Search"
    :clearable="true"
    :data="suggestions"
    :open-on-focus="true"
    @typing="onTyping"
    @select="onSelect"
    @keydown.native="onKeyDown"
  ></v-autocomplete>
</template>

<script lang="ts">
import { inject, ref } from "vue";
import {
  buildSearchBox,
  type Suggestion,
  type SearchEngine,
} from "@coveo/headless";
import type { SearchBoxState, SearchBox } from "@coveo/headless";
import { HeadlessInjectionKey } from "@/headlessKey";

export interface ISearchBox {
  state: SearchBoxState;
  searchBox: SearchBox;
}

export default {
  name: "SearchBox",
  async setup() {
    const options = {
      numberOfSuggestions: 5,
    };
    const engine: SearchEngine = await inject(HeadlessInjectionKey)!;
    const searchBox = buildSearchBox(engine, { options });

    return {
      searchBox:ref(searchBox),
      state: ref(searchBox.state),
    };
  },
  methods: {
    onTyping: function (v: string) {
      this.searchBox.updateText(v);
    },
    onSelect: function (v: string) {
      this.searchBox.selectSuggestion(v);
    },
    onKeyDown: function (e: KeyboardEvent) {
      if (e.key === "Enter") {
        this.searchBox.submit();
      }
    },
  },
  computed: {
    suggestions: function (): string[] {
      return this.state.suggestions.map((s: Suggestion) => s.rawValue);
    },
  },
};
</script>
