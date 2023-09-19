<template>
  <v-list lines="one">
    <v-list-item class="w-100 pa-1">
      <v-list-item-title>
        <v-card width="w-100">
          <v-card-item style="padding: 10px 16px 0 16px">
            <v-card-subtitle
              class="pa-0 d-flex align-center justify-space-between"
            >
              <div class="text-subtitle-1">Código: {{ props.data.code }}</div>
            </v-card-subtitle>
            <v-card-title style="padding: 0">
              {{ props.data.description }}
            </v-card-title>
            <view-card-prices
              v-for="(price, i) in props.data.prices"
              :key="i"
              :data="price"
            />
          </v-card-item>
        </v-card>
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>
<script setup>
import ViewCardPrices from "./ViewCardPrices.vue";

const props = defineProps({ data: Object });
console.log(props.data);

const colorMeasure = (id) => {
  switch (id) {
    case 1:
      return "#039BE5";
    case 2:
      return "#D500F9";
    case 3:
      return "#7B1FA2";
    case 4:
      return "#EF6C00";
    default:
      return "";
  }
};
</script>
