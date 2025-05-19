<script setup lang="ts">
import Player from "../types/Player.ts"
import PlayerTable from "@/components/PlayerTable.vue";

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';

const players: Player[] = [];
const player_names = [
  ["totoalamer", "Mathieu"],
  ["vince_f4e", "Vincent"],
  ["TROUDUCCHESS", "Maxime"],
  ["xabroa2", "Xavier"],
  ["THOMAS-CALOIN", "Thomas"],
  ["felixscout", "Félix"],
  ["Constaaaaaaant", "Constant"],
  ["lucas59176800", "Lucas"],
];

for (const p of player_names) {
  const account = p[0];
  const name = p[1];
  const api_data = await (await fetch(`https://api.chess.com/pub/player/${account}/stats`)).json();
  players.push(new Player(name, account, api_data));
}

// Sorting for Rapid mode
const players_rapid = [...players].filter(e => e.rapid.win !== 0 || e.rapid.lose !== 0 || e.rapid.draw !== 0);
players_rapid.sort((a, b) => b.rapid.current_rating - a.rapid.current_rating);
for (let rank = 1; rank <= players_rapid.length; rank++) {
  players_rapid[rank - 1].rapid.rank = rank;
}

// Sorting for Bullet mode
const players_bullet = [...players].filter(e => e.bullet.win !== 0 || e.bullet.lose !== 0 || e.bullet.draw !== 0);
players_bullet.sort((a, b) => b.bullet.current_rating - a.bullet.current_rating);
for (let rank = 1; rank <= players_bullet.length; rank++) {
  players_bullet[rank - 1].bullet.rank = rank;
}

// Sorting for Blitz mode
const players_blitz = [...players].filter(e => e.blitz.win !== 0 || e.blitz.lose !== 0 || e.blitz.draw !== 0);
players_blitz.sort((a, b) => b.blitz.current_rating - a.blitz.current_rating);
for (let rank = 1; rank <= players_blitz.length; rank++) {
  players_blitz[rank - 1].blitz.rank = rank;
}

// Sorting for Best overall
const players_best = [...players].filter(e => e.best.win !== 0 || e.best.lose !== 0 || e.best.draw !== 0);
players_best.sort((a, b) => b.best.current_rating - a.best.current_rating);
for (let rank = 1; rank <= players_best.length; rank++) {
  players_best[rank - 1].best.rank = rank;
}

</script>

<template>

  <Tabs value="0" id="tabs_list">
    <TabList>
      <Tab value="0">Global</Tab>
      <Tab value="1">Rapid</Tab>
      <Tab value="2">Bullet</Tab>
      <Tab value="3">Blitz</Tab>
    </TabList>
    <TabPanels class="players_table">
      <TabPanel value="0">
        <PlayerTable :table_data="players_best.map(e => e.best)"></PlayerTable>
      </TabPanel>
      <TabPanel value="1">
        <PlayerTable :table_data="players_rapid.map(e => e.rapid)"></PlayerTable>
      </TabPanel>
      <TabPanel value="2">
        <PlayerTable :table_data="players_bullet.map(e => e.bullet)"></PlayerTable>
      </TabPanel>
      <TabPanel value="3">
        <PlayerTable :table_data="players_blitz.map(e => e.blitz)"></PlayerTable>
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>

<style scoped>
#tabs_list {
  margin-top: 40px;
}

.players_table {
  margin-top: 10px;
  padding: 0;
}
</style>