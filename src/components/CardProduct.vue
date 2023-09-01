<template>
  <v-card width="auto" style="margin: 5px">
    <v-card-item style="padding: 10px 16px 0 16px">
      <v-card-subtitle style="padding: 0">{{ data.code }}</v-card-subtitle>
      <v-card-title style="padding: 0">{{ data.description }}</v-card-title>
      <v-card-subtitle style="padding: 0" class="text-subtitle-1">
        {{ data.brand.description }} / {{ data.category.description }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-text style="padding: 0">
      <v-chip class="ma-2 text-subtitle-1" color="success" variant="outlined">
        <v-icon start icon="mdi-currency-usd"></v-icon>
        {{ data.price.toFixed(2) }}
      </v-chip>
      <v-btn
        size="small"
        color="surface-variant"
        variant="text"
        :icon="showMinPrice ? 'mdi-eye' : 'mdi-eye-off'"
        @click="
          () => {
            showMinPrice = !showMinPrice;
          }
        "
      />
      <v-chip
        v-show="showMinPrice"
        class="ma-2 text-subtitle-1"
        color="pink-accent-3"
        variant="outlined"
      >
        <v-icon start icon="mdi-currency-usd"></v-icon>
        {{ data.minprice.toFixed(2) }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  data: Object,
});

const showMinPrice = ref(false);
</script>
