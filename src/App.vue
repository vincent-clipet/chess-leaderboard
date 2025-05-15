<script setup lang="ts">
import PlayerTable from "@/components/PlayerTable.vue";
import config from "../config.json"
</script>

<template>
  <h1 id="header">{{ config.header_text }}</h1>
  <hr class="text-orange-500">

  <Suspense>
    <div id="players_table">
      <PlayerTable></PlayerTable>
    </div>
  </Suspense>

</template>

<style scoped>
#players_table {
  margin-top: 60px;
}

#header {
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
  font-size: 1.6rem;
}
</style>
