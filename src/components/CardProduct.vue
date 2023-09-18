<template>
  <v-card width="auto" style="margin: 5px">
    <v-card-item style="padding: 10px 16px 0 16px">
      <v-card-subtitle class="pa-0 d-flex align-center justify-space-between">
        <div class="text-subtitle-1">{{ Data.code }}</div>
        <v-btn
          density="compact"
          size="small"
          color="cyan-darken-2"
          variant="text"
          icon="mdi-pencil"
          @click="
            () => {
              $emit('openDialog', Data);
            }
          "
        />
      </v-card-subtitle>
      <v-card-title
        style="padding: 0"
        @click="
          viewDialog.show = true;
          viewDialog.values = props.data;
        "
        >{{ Data.description }}</v-card-title
      >
      <v-card-subtitle
        style="padding: 0"
        class="text-subtitle-1"
        @click="
          viewDialog.show = true;
          viewDialog.values = props.data;
        "
      >
        {{ Data.brand.description }} / {{ Data.category.description }}
      </v-card-subtitle>
    </v-card-item>
    <v-card-text class="pa-0 d-flex justify-space-between">
      <v-chip class="ma-1 text-subtitle-1" color="success" variant="text">
        <v-icon start icon="mdi-currency-usd"></v-icon>
        {{ Data.price ? Data.price.toFixed(2) : 0.0 }}
      </v-chip>
      <v-chip
        v-show="showMinPrice"
        class="ma-1 text-subtitle-1"
        color="pink-accent-3"
        variant="text"
      >
        <v-icon start icon="mdi-currency-usd"></v-icon>
        {{ Data.minprice ? Data.minprice.toFixed(2) : 0.0 }}
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
    <!-- <div>
      <v-btn
        class="w-full"
        size="small"
        color="primary"
        dark
        @click="
          viewDialog.show = true;
          viewDialog.values = props.data;
        "
      >
        Mostrar informacion
      </v-btn>
    </div> -->
  </v-card>

  <view-dialog-product :data="viewDialog" />
</template>

<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import ViewDialogProduct from "./ViewDialogProduct.vue";

const emit = defineEmits(["openDialog"]);
const props = defineProps({
  data: Object,
});
const showMinPrice = ref(false);
const viewDialog = ref({ show: false, values: {} });
const Data = ref(props.data);

const getCardPrices = () => {
  const cardprices = Data.value.prices.find((p) => p.measure_id == 1);
  console.log(cardprices);
  if (cardprices) {
    Data.value.price = cardprices.price;
    Data.value.minprice = cardprices.minprice;
  }
};
onMounted(() => {
  getCardPrices();
});
</script>
