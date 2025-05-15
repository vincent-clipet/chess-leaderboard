<script setup lang="ts">
import Player from "../types/Player.ts"
import config from "../../config.json"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";


const players: Player[] = [];

for (const p of config.players_names) {
  const account = p[0];
  const name = p[1];
  const api_data = await (await fetch(`https://api.chess.com/pub/player/${account}/stats`)).json();
  const current_rating = api_data.chess_rapid.last.rating;
  const best_rating = api_data.chess_rapid.best.rating;
  const win = api_data.chess_rapid.record.win;
  const lose = api_data.chess_rapid.record.loss;
  const draw = api_data.chess_rapid.record.draw;
  players.push(new Player(name, current_rating, best_rating, win, lose, draw));
}

players.sort((a, b) => b.current_rating - a.current_rating);
for (let rank = 1; rank <= players.length; rank++) {
  players[rank - 1].rank = rank;
}

console.log(players);

</script>


<template>
  <Table>
    <TableHeader>
      <TableRow class="text-xl">
        <TableHead class="text-center">Rang</TableHead>
        <TableHead class="text-center">Nom</TableHead>
        <TableHead class="text-center">Rating Actuel</TableHead>
        <TableHead class="text-center">Top Rating</TableHead>
        <TableHead class="text-center">Gagnés</TableHead>
        <TableHead class="text-center">Perdus</TableHead>
        <TableHead class="text-center">Draws</TableHead>
        <TableHead class="text-center">Ratio W/L</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>

      <TableRow v-for="player in players" class="text-lg">
        <TableCell class="text-center">{{ player.rank }}</TableCell>
        <TableCell class="text-center text-blue-400">{{ player.name }}</TableCell>
        <TableCell class="text-center font-bold text-orange-400">{{ player.current_rating }}</TableCell>
        <TableCell class="text-center">
          <span> {{ player.best_rating }}</span>
          (<span v-if="player.current_rating < player.best_rating" class="text-red-500">{{player.current_rating-player.best_rating}}</span>
          <span v-else class="text-green-500">=</span>)

        </TableCell>
        <TableCell class="text-center">{{ player.win }}</TableCell>
        <TableCell class="text-center">{{ player.lose }}</TableCell>
        <TableCell class="text-center">{{ player.draw }}</TableCell>
        <TableCell class="text-center">
          <span :class="player.ratio_wl < 50 ? 'text-red-500' : 'text-green-500'">{{ player.ratio_wl }}%</span>
        </TableCell>
      </TableRow>

    </TableBody>
  </Table>
</template>


<style scoped>
</style>
