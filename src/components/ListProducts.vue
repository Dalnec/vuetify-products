<template>
  <div class="d-flex flex-column mb-6 bg-grey-lighten-5">
    <v-card class="ma-1">
      <v-text-field
        :autofocus="true"
        clearable
        :loading="loading"
        density="compact"
        variant="solo"
        label="Buscar Productos"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        @click:append-inner="loadData"
        v-model="search"
        @update:modelValue="loadData"
      ></v-text-field>
    </v-card>
    <CardProduct v-for="(x, i) in data" :key="i" :data="x" />
  </div>
</template>

<script setup>
// import { store } from "../store/index";
import { useAppStore } from "../store/app.js";
import CardProduct from "../components/CardProduct.vue";
import { onMounted } from "vue";
import { ref } from "vue";
import { axiosInstance } from "./api";

const appStore = useAppStore();
const loading = ref(false);
const search = ref("");
const data = ref([]);

const loadData = async (s) => {
  loading.value = true;
  console.log(s);
  const res = await axiosInstance.get(`/products`);
  setTimeout(() => {
    loading.value = false;
  }, 1000);
  data.value = res.data;
};

onMounted(async () => {
  appStore.productDialog = loadData;
  await loadData();
});
</script>
<style>
input {
  text-transform: uppercase;
}
</style>
