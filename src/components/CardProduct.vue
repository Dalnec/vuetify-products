<template>
  <v-card width="auto" style="margin: 5px">
    <v-card-item style="padding: 10px 16px 0 16px">
      <v-card-subtitle class="pa-0 d-flex align-center justify-space-between">
        <div class="text-subtitle-1">{{ data.code }}</div>
        <v-btn
          density="compact"
          size="small"
          color="cyan-darken-2"
          variant="text"
          icon="mdi-pencil"
          @click="
            () => {
              $emit('openDialog', data);
            }
          "
        />
      </v-card-subtitle>
      <v-card-title style="padding: 0">{{ data.description }}</v-card-title>
      <v-card-subtitle style="padding: 0" class="text-subtitle-1">
        {{ data.brand.description }} / {{ data.category.description }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-text class="pa-0 d-flex justify-space-between">
      <v-chip class="ma-1 text-subtitle-1" color="success" variant="text">
        <v-icon start icon="mdi-currency-usd"></v-icon>
        {{ data.price.toFixed(2) }}
      </v-chip>
      <v-chip
        v-show="showMinPrice"
        class="ma-1 text-subtitle-1"
        color="pink-accent-3"
        variant="text"
      >
        <v-icon start icon="mdi-currency-usd"></v-icon>
        {{ data.minprice.toFixed(2) }}
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
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["openDialog"]);
const props = defineProps({
  data: Object,
});
const showMinPrice = ref(false);
</script>
