<template>
  <v-dialog
    v-model="props.data.show"
    fullscreen
    :scrim="false"
    transition="slide-x-transition"
  >
    <v-card width="w-100">
      <v-card-item style="padding: 10px 16px 0 16px">
        <v-card-subtitle class="pa-0 d-flex align-center justify-space-between">
          <div class="text-subtitle-1">
            Código: {{ props.data.values.code }}
          </div>
          <v-btn
            style="padding: 0px"
            density="compact"
            size="large"
            variant="text"
            dark
            @click="
              () => {
                props.data.show = false;
              }
            "
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-subtitle>
        <v-card-title style="padding: 0">
          {{ props.data.values.description }}
        </v-card-title>
        <v-card-subtitle style="padding: 0" class="text-subtitle-1">
          {{ props.data.values.brand.description }} /
          {{ props.data.values.category.description }}
        </v-card-subtitle>
      </v-card-item>
      <v-card-text class="pa-0">
        <view-card-prices
          v-for="(price, i) in props.data.values.prices"
          :key="i"
          :data="price"
        />
        <view-sub-products
          v-for="(product, i) in subProducts"
          :key="i"
          :data="product"
        />
      </v-card-text>
      <v-card-actions>
        <v-btn
          class="w-100"
          color="primary"
          dark
          @click="props.data.show = false"
          variant="outlined"
        >
          Cerrar
        </v-btn>
      </v-card-actions>
      <!-- <pre>{{ JSON.stringify(props.data.values, 0, 2) }}</pre> -->
    </v-card>
  </v-dialog>
</template>

<script setup>
import { onMounted } from "vue";
import ViewCardPrices from "./ViewCardPrices.vue";
import ViewSubProducts from "./ViewSubProducts.vue";
import { axiosInstance } from "./api";
import { ref } from "vue";

const props = defineProps({ data: Object });
const subProducts = ref([]);

const loadSubProducts = async (ID) => {
  const res = await axiosInstance.get(`/products-associations/${ID}`);
  if (res.data.products.length > 0) {
    subProducts.value = res.data.products;
  }
};

onMounted(async () => {
  console.log(props.data);
  await loadSubProducts(props.data.values.ID);
});
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
