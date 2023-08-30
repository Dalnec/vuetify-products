<template>
  <div class="d-flex flex-column mb-6 bg-grey-lighten-5">
    <v-card v-for="(x, i) in lista" :key="i" width="auto" style="margin: 5px">
      <v-card-item style="padding: 10px 16px 0 16px">
        <v-card-title style="padding: 0">Juego de Ollas</v-card-title>
        <v-card-subtitle style="padding: 0">Master</v-card-subtitle>
      </v-card-item>
      <v-card-text style="padding: 0">
        <v-spacer></v-spacer>
        <v-btn
          size="small"
          color="surface-variant"
          variant="text"
          icon="mdi-currency-usd"
        />{{ x.toFixed(2) }}

        <v-btn
          size="small"
          color="surface-variant"
          variant="text"
          icon="mdi-currency-usd"
        />{{ x.toFixed(2) }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from "vue";

const lista = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
</script>
