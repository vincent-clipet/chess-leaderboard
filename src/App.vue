<script setup lang="ts">
import PlayerData from "@/components/PlayerData.vue";
import 'primeicons/primeicons.css';
</script>

<template>
  <div id="header">
    <h2>Leaderboard échecs A2SI
      <hr>
    </h2>
  </div>


  <Suspense>
    <PlayerData></PlayerData>
  </Suspense>

</template>

<style scoped>
#header {
  text-align: left;
  font-weight: bold;
  color: var(--p-primary-color);
  border-color: var(--p-primary-color);
}

hr {
  background-color: var(--p-primary-color);
  height: 1px;
  border: 0;
}
</style>
