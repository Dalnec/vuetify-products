<template>
  <v-card
    v-for="(x, i) in props.data"
    :key="i"
    width="auto"
    style="margin: 5px"
  >
    <v-card-item style="padding: 10px 16px 0 16px">
      <v-card-title style="padding: 0">{{ x.description }}</v-card-title>
      <v-card-subtitle style="padding: 0">
        {{ x.brand_id }}Master/{{ x.category_id }}Olla
      </v-card-subtitle>
    </v-card-item>
    <v-card-text style="padding: 0">
      <v-spacer></v-spacer>
      <v-chip class="ma-2 text-h6" color="success" variant="outlined">
        <v-icon start icon="mdi-currency-usd"></v-icon>
        {{ x.price }}
      </v-chip>
      <v-chip class="ma-2" color="pink-accent-3" variant="outlined">
        <v-icon start icon="mdi-currency-usd"></v-icon>
        {{ x.minprice }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  data: Array,
});
</script>
