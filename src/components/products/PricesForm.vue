<template>
  <v-sheet
    elevation="0"
    rounded
    border
    class="ma-1 pa-3 mx-auto"
    color="#FFFFFF"
  >
    <div class="d-flex align-center justify-end">
      <v-btn
        density="compact"
        size="x-small"
        color="red-accent-3"
        variant="text"
        prepend-icon="mdi-close-thick"
        @click="
          () => {
            $emit('removePrice', index);
          }
        "
      >
        <template v-slot:prepend>
          <v-icon></v-icon>
        </template>
        Eliminar
      </v-btn>
    </div>
    <v-row class="pa-2" align="center" justify="center">
      <v-col cols="8" class="pa-md-1 pb-0 px-1">
        <v-select
          density="compact"
          :items="measuresOptions"
          label="Unidad Medida"
          v-model="dataPrice.measure_id"
          required
          clearable
          append-inner-icon="mdi-plus-thick"
          @click:append-inner="
            () => {
              openfeatureDialog = true;
              featureType = 'measures';
              $emit('openDialogFeature', { open: true, type: 'measures' });
            }
          "
        ></v-select>
      </v-col>
      <v-col cols="4" class="pa-md-1 pb-0 px-1">
        <v-text-field
          density="compact"
          type="number"
          label="Equivalencia"
          v-model="dataPrice.equivalent"
          required
          :rules="pricesRules"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="pa-1">
        <v-text-field
          density="compact"
          type="number"
          label="Precio (x menor)"
          v-model="dataPrice.price"
          required
          :rules="pricesRules"
          clearable
        ></v-text-field>
      </v-col>
      <v-col cols="6" class="pa-1">
        <v-text-field
          density="compact"
          type="number"
          label="Precio (x mayor)"
          v-model="dataPrice.minprice"
          required
          :rules="pricesRules"
          clearable
        ></v-text-field>
      </v-col>
      <!-- <v-col cols="12" class="pa-0">
        
      </v-col> -->
    </v-row>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["removePrice", "openDialogFeature"]);
const props = defineProps({
  data: {
    type: Object,
    default(rawProps) {
      console.log(rawProps);
      return { category_id: 1, equivalent: 1, price: 0, minprice: 0 };
    },
  },
  measuresOptions: Array,
  index: Number,
});

const dataPrice = ref(props.data);

const pricesRules = [
  (v) => !!v || "Precio es requerido",
  (v) => /^\d+(\.\d+)?$/.test(v) || "Solo numeros",
  (v) =>
    (v && v.toString().split(".")[0].length <= 5) ||
    "No mas de 5 digitos antes del punto decimal",
  (v) =>
    (v && v.toString().split(".").length < 2) ||
    (v && v.toString().split(".")[1].length <= 2) ||
    "No mas de 2 digitos despues del punto decimal",
];
</script>
