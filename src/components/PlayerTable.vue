<script setup lang="ts">
import type PlayerStats from "@/types/PlayerStats.ts";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import 'primeicons/primeicons.css';
import Drawer from "primevue/drawer";
import {type Ref, ref} from "vue";
import GraphMonth from "@/components/GraphMonth.vue";

defineProps<{
  table_data: PlayerStats[],
}>();

const visibleBottom = ref(false);
const selectedPlayer: Ref<PlayerStats | null> = ref(null);

function openDrawer(player: any) {
  console.log("player:", player);
  selectedPlayer.value = player;
  if (selectedPlayer.value !== null)
    visibleBottom.value = true;
}

</script>


<template>
  <DataTable :value="table_data" sortField="current_rating" striped-rows :sortOrder="-1">
    <!--    <Column field="rank" header="Rang"></Column>-->
    <Column field="name" header="Nom">
      <template #body="slotProps">
        <a :href="`https://www.chess.com/member/${slotProps.data.account}`" target="_blank">
          {{ slotProps.data.name }}
        </a>
      </template>
    </Column>
    <Column field="current_rating" header="Rating" sortable>
      <template #body="slotProps">
        <span class="bold">{{ slotProps.data.current_rating }}</span>
      </template>
    </Column>
    <Column field="best_rating" header="Top Rating" sortable>
      <template #body="slotProps">
        <span> {{ slotProps.data.best_rating }}&nbsp;</span>
        <span v-if="slotProps.data.current_rating < slotProps.data.best_rating">(<span
            class="red">+{{ Math.abs(slotProps.data.current_rating - slotProps.data.best_rating) }}</span>)</span>
        <span v-else class="gold pi pi-star-fill"></span>
      </template>
    </Column>
    <Column field="win" header="Gagnés" sortable></Column>
    <Column field="lose" header="Perdus" sortable></Column>
    <Column field="draw" header="Draws" sortable></Column>
    <Column field="ratio_wl" header="Ratio W/L" sortable>
      <template #body="slotProps">
        <span :class="slotProps.data.ratio_wl < 50 ? 'red' : 'green'">{{
            slotProps.data.ratio_wl
          }}%</span>
      </template>
    </Column>
    <Column header="Stats du mois">
      <template #body="slotProps">
        <div class="flex gap-2 justify-center">
          <span id="link_to_graph" class="pi pi-chart-line" @click="openDrawer(slotProps.data)"></span>
        </div>
      </template>
    </Column>
  </DataTable>

  <Drawer v-if="selectedPlayer" v-model:visible="visibleBottom" :header="'Stats Mensuelles - ' + selectedPlayer.name" position="bottom" id="drawer" style="height: auto">
    <GraphMonth :playerStats="selectedPlayer"></GraphMonth>
  </Drawer>
</template>


<style scoped>
#link_to_graph {
  cursor: pointer;
}
</style>
