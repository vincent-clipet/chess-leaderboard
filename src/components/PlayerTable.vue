<script setup lang="ts">
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import type PlayerStats from "@/types/PlayerStats.ts";

defineProps<{
  table_data: PlayerStats[],
}>();

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
      <TableRow v-for="player in table_data" class="text-lg">
        <TableCell class="text-center">{{ player.rank }}</TableCell>
        <TableCell class="text-center text-blue-400">
          <a :href="`https://www.chess.com/member/${player.account}`" target="_blank">
            {{ player.name }}
          </a>
        </TableCell>
        <TableCell class="text-center font-bold text-orange-400">{{ player.current_rating }}</TableCell>
        <TableCell class="text-center">
          <span> {{ player.best_rating }}</span>
          (<span v-if="player.current_rating < player.best_rating"
                 class="text-red-500">{{ player.current_rating - player.best_rating }}</span>
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
