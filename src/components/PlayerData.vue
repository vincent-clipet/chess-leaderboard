<script setup lang="ts">
import Player from "../types/Player.ts"
import config from "../../config.json"
import PlayerTable from "@/components/PlayerTable.vue";
import {Tabs, TabsContent, TabsList, TabsTrigger,} from '@/components/ui/tabs'

const players: Player[] = [];

for (const p of config.players_names) {
  const account = p[0];
  const name = p[1];
  const api_data = await (await fetch(`https://api.chess.com/pub/player/${account}/stats`)).json();
  players.push(new Player(name, api_data));
}

// Sorting for Rapid mode
const players_rapid = [...players];
players_rapid.sort((a, b) => b.rapid.current_rating - a.rapid.current_rating);
for (let rank = 1; rank <= players_rapid.length; rank++) {
  players_rapid[rank - 1].rapid.rank = rank;
}

// Sorting for Bullet mode
const players_bullet = [...players];
players_bullet.sort((a, b) => b.bullet.current_rating - a.bullet.current_rating);
for (let rank = 1; rank <= players_bullet.length; rank++) {
  players_bullet[rank - 1].bullet.rank = rank;
}

// Sorting for Best overall
const players_best = [...players];
players_best.sort((a, b) => b.best.current_rating - a.best.current_rating);
for (let rank = 1; rank <= players_best.length; rank++) {
  players_best[rank - 1].best.rank = rank;
}

</script>

<template>
  <Tabs default-value="best">

    <TabsList id="tabs_list" class="grid w-full grid-cols-3">
      <TabsTrigger value="best">Global</TabsTrigger>
      <TabsTrigger value="rapid">Rapid</TabsTrigger>
      <TabsTrigger value="bullet">Bullet</TabsTrigger>
    </TabsList>

    <TabsContent value="best">
      <div class="players_table">
        <PlayerTable :table_data="players_best.map(e => e.best)"></PlayerTable>
      </div>
    </TabsContent>
    <TabsContent value="rapid">
      <div class="players_table">
        <PlayerTable :table_data="players_rapid.map(e => e.rapid)"></PlayerTable>
      </div>
    </TabsContent>
    <TabsContent value="bullet">
      <div class="players_table">
        <PlayerTable :table_data="players_bullet.map(e => e.bullet)"></PlayerTable>
      </div>
    </TabsContent>

  </Tabs>
</template>

<style scoped>
#tabs_list {
  margin-top: 60px;
}

.players_table {
  margin-top: 20px;
}
</style>