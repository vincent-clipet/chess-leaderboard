<script setup lang="ts">
import Chart from 'primevue/chart';
import Game from "@/types/Game.ts";
import type PlayerStats from "@/types/PlayerStats.ts";

const props = defineProps<{
  playerStats: PlayerStats,
}>();

const current_month = ((new Date()).getMonth() + 1).toString().padStart(2, '0');
const current_year = (new Date()).getFullYear();

let api_data: any = null;
let api_error_code: number = 0;
let games: Game[] = [];
let chartData_rating = {};
let chartOptions_rating = {};
let chartData_accuracy = {};
let chartOptions_accuracy = {};
let chartData_mode = {};
let chartOptions_mode = {};
let chartData_endings_lose = {};
let chartData_endings_draw = {};
let chartOptions_endings = {};


try {
  const response = await fetch(`https://api.chess.com/pub/player/${props.playerStats.account}/games/${current_year}/${current_month}`);
  api_error_code = response.status;
  if (response.ok) {
    api_data = await response.json();
    console.debug("games :", api_data);
  }
} catch (error: any) {
  api_error_code = -1;
  console.error('Fetch error:', error.message);
}

if (api_data && api_error_code > 0) {
  games = api_data.games.filter(e => e.rated === true).slice(-100).map(e => {
    if (e.white.username === props.playerStats.account) {
      return new Game(e.time_class, e.time_control, e.white.rating, e.white.result, e.accuracies?.white ?? 0);
    } else if (e.black.username === props.playerStats.account) {
      return new Game(e.time_class, e.time_control, e.black.rating, e.black.result, e.accuracies?.black ?? 0);
    }
  });

  const rating_min = Math.min(...(games.map(e => e.rating)));
  const rating_max = Math.max(...(games.map(e => e.rating)));

  chartData_rating = {
    labels: (new Array(games.length)).fill(""),
    datasets: [
      {
        label: 'Rating',
        borderColor: "cyan",
        data: games.map(e => e.rating),
        tension: 0.0
      },
    ]
  };

  chartData_accuracy = {
    labels: (new Array(games.filter(e => e.accuracy > 0).length)).fill(""),
    datasets: [
      {
        label: 'Précision',
        borderColor: "gold",
        data: games.filter(e => e.accuracy > 0).map(e => e.accuracy),
        tension: 0.0
      },
    ]
  };

  chartData_mode = {
    labels: ['Rapid', 'Bullet', 'Blitz'],
    datasets: [
      {
        data: [
          games.filter(e => e.mode === "rapid").length,
          games.filter(e => e.mode === "bullet").length,
          games.filter(e => e.mode === "blitz").length,
        ],
      }
    ]
  }

  const tmp_endings_lose = [
    ['Echec et mat', games.filter(e => e.result === "checkmated").length],
    ['Fin du temps', games.filter(e => e.result === "timeout").length],
    ['Capitulation', games.filter(e => e.result === "resigned").length],
    ['Perdu', games.filter(e => e.result === "lose").length],
    ['Pas assez de pièces', games.filter(e => e.result === "insufficient").length],
    ['Rage-quit / déconnexion', games.filter(e => e.result === "abandoned").length],
  ].filter(e => e[1] > 0);

  chartData_endings_lose = {
    labels: tmp_endings_lose.map(e => e[0]),
    datasets: [
      {
        data: tmp_endings_lose.map(e => e[1])
      }
    ]
  }

  const tmp_endings_draw = [
    ['Proposition', games.filter(e => e.result === "agreed").length],
    ['Répétition', games.filter(e => e.result === "repetition").length],
    ['Stalemate', games.filter(e => e.result === "stalemate").length],
    ['Règle 50 mouvements', games.filter(e => e.result === "50move").length],
    ['Pas assez de pièces + fin du temps', games.filter(e => e.result === "timevsinsufficient").length],
  ].filter(e => e[1] > 0);

  chartData_endings_draw = {
    labels:  tmp_endings_draw.map(e => e[0]),
    datasets: [
      {
        data: tmp_endings_draw.map(e => e[1])
      }
    ]
  }

  chartOptions_rating = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltips: {
        mode: 'index',
        intersect: false
      },
      legend: {
        labels: {
          color: "white"
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        position: 'left',
        ticks: {
          color: "cyan",
          stepSize: 20,
        },
        grid: {
          color: "#aaaaaaa0"
        },
        min: rating_min - rating_min % 20,
        max: rating_max - rating_max % 20 + 20,
      },
    }
  }

  chartOptions_accuracy = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      tooltips: {
        mode: 'index',
        intersect: false
      },
      legend: {
        labels: {
          color: "white"
        }
      }
    },
    scales: {
      y: {
        type: 'linear',
        position: 'left',
        ticks: {
          color: "gold",
          stepSize: 20,
        },
        grid: {
          color: "#aaaaaaa0"
        },
        min: 0,
        max: 100,
      }
    }
  }

  chartOptions_mode = {
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: "white"
        }
      }
    }
  }

  chartOptions_endings = {
    responsive: false,
    maintainAspectRatio: true,
    aspectRatio: 0.8,
    plugins: {
      legend: {
        labels: {
          cutout: '60%',
          color: "white"
        }
      }
    }
  }
}


</script>

<template>
  <div class="flexbox" v-if="api_data !== null">
      <Chart type="line" :data="chartData_rating" :options="chartOptions_rating"/>
      <Chart type="line" :data="chartData_accuracy" :options="chartOptions_accuracy"/>
      <Chart type="doughnut" :data="chartData_endings_lose" :options="chartOptions_endings"/>
      <Chart type="doughnut" :data="chartData_endings_draw" :options="chartOptions_endings"/>
  </div>

</template>

<style scoped>
.flexbox {
  display: flex;
  flex-direction: row;
}
.flexbox > * {
  width: 24%;
  height: 80%;
}
</style>