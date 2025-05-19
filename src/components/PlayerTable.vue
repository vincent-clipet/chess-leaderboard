<script setup lang="ts">
import type PlayerStats from "@/types/PlayerStats.ts";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import 'primeicons/primeicons.css';

defineProps<{
  table_data: PlayerStats[],
}>();
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
        <span v-if="slotProps.data.current_rating < slotProps.data.best_rating">(<span class="red">+{{ Math.abs(slotProps.data.current_rating - slotProps.data.best_rating) }}</span>)</span>
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
  </DataTable>
</template>


<style scoped>
</style>
