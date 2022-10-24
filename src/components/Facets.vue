<template>
  <section>
    <h4 class="subtitle is-size-4 has-text-weight-bold">Refine By</h4>
    <div class="p-1">
      <Facet field="objecttype" title="Object Type" />
      <Facet field="filetype" title="File Type" />
      <Facet field="author" title="Author" />
    </div>
  </section>
</template>

<script lang="ts">
import Facet from "./Facet.vue";

export default {
  name: "Facets",
  components: { Facet },
  data: function () {
    return {
      open: false,
    };
  },
  methods: {
    onClick: function () {
      this.open = true;
    },
  },
};
</script>
