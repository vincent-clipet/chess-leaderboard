<script setup lang="ts">
import PlayerData from "@/components/PlayerData.vue";
</script>

<template>
  <h1 id="header">Leaderboard échecs A2SI</h1>
  <hr class="text-orange-500">

  <Suspense>
    <PlayerData></PlayerData>
  </Suspense>

</template>

<style scoped>
#header {
  text-align: center;
  margin-top: 30px;
  font-weight: bold;
  font-size: 1.6rem;
}
</style>
