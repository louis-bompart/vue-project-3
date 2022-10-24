<template>
  <a
    @click="onSelect"
    @contextmenu="onSelect"
    @mousedown="onSelect"
    @mouseup="onSelect"
    @touchstart="beginDelayedSelect"
    @touchend="cancelPendingSelect"
    :href="filteredUri"
    >{{ result.title }}</a
  >
</template>

<script lang="ts">
import { inject, ref } from "vue";
import {
  buildInteractiveResult,
  type Result,
  type SearchEngine,
} from "@coveo/headless";
import { HeadlessInjectionKey } from "@/headlessKey";

export default {
  name: "ResultLink",
  props: ["result"],
  async setup(props) {
    const engine: SearchEngine = await inject(HeadlessInjectionKey)!;
    const interactiveResult = buildInteractiveResult(engine, {
      options: { result: props.result as Result },
    });

    return {
      interactiveResult: ref(interactiveResult),
    };
  },
  computed: {
    filteredUri: function () {
      const uri = this.result.clickUri;
      // Filters out dangerous URIs that can create XSS attacks such as `javascript:`.
      const isAbsolute = /^(https?|ftp|file|mailto|tel):/i.test(uri);
      const isRelative = /^(\/|\.\/|\.\.\/)/.test(uri);
      return isAbsolute || isRelative ? uri : "";
    },
  },
  methods: {
    onSelect: function () {
      this.interactiveResult.select();
    },
    beginDelayedSelect: function () {
      this.interactiveResult.beginDelayedSelect();
    },
    cancelPendingSelect: function () {
      this.interactiveResult.cancelPendingSelect();
    },
  },
};
</script>
