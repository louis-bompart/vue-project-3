<template>
  <section>
    <h4 class="text-h5">Refine By</h4>
    <div class="p-1">
      <CoveoFacet field="objecttype" title="Object Type" />
      <CoveoFacet field="filetype" title="File Type" />
      <CoveoFacet field="author" title="Author" />
    </div>
  </section>
</template>

<script lang="ts">
import CoveoFacet from "./Facet.vue";

export default {
  name: "CoveoFacets",
  components: { CoveoFacet },
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
