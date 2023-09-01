<template>
  <v-card
    v-for="(x, i) in props.data"
    :key="i"
    width="auto"
    style="margin: 5px"
  >
    <v-card-item style="padding: 10px 16px 0 16px">
      <v-card-subtitle style="padding: 0">{{ x.code }}</v-card-subtitle>
      <v-card-title style="padding: 0">{{ x.description }}</v-card-title>
      <v-card-subtitle style="padding: 0" class="text-subtitle-1">
        {{ x.brand.description }} / {{ x.category.description }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-text style="padding: 0">
      <v-spacer></v-spacer>
      <v-chip class="ma-2 text-subtitle-1" color="success" variant="outlined">
        <v-icon start icon="mdi-currency-usd"></v-icon>
        {{ x.price.toFixed(2) }}
      </v-chip>
      <v-chip
        class="ma-2 text-subtitle-1"
        color="pink-accent-3"
        variant="outlined"
      >
        <v-icon start icon="mdi-currency-usd"></v-icon>
        {{ x.minprice.toFixed(2) }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  data: Array,
});
</script>
