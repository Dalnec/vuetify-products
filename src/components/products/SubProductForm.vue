<template>
  <v-sheet
    elevation="0"
    rounded
    border
    class="ma-1 pt-1 px-2 mx-auto mb-3"
    color="#FFFFFF"
  >
    <v-form ref="SubformRef" :disabled="!dataPrice.ID ? false : !edit">
      <div class="d-flex align-center justify-space-between pa-1">
        <v-btn
          density="compact"
          size="x-small"
          color="red-accent-3"
          variant="text"
          prepend-icon="mdi-close-thick"
          @click="
            () => {
              $emit('removeSubProduct', index);
            }
          "
        >
          <template v-slot:prepend>
            <v-icon></v-icon>
          </template>
          Eliminar
        </v-btn>
        <v-chip size="x-small" variant="outlined" color="primary" class="px-3">
          UNIDAD {{ dataPrice.prices[0].equivalent }}
        </v-chip>
      </div>
      <v-row class="pa-2" align="center" justify="center">
        <v-col cols="12" class="pa-1">
          <v-text-field
            density="compact"
            label="Código"
            v-model="dataPrice.code"
            hint="Opcional"
            persistent-hint
            clearable
          ></v-text-field>
        </v-col>
        <!-- <v-col cols="8" class="pa-md-1 pb-0 px-1">
        <v-select
          density="compact"
          :items="measuresOptions"
          label="Unidad Medida"
          v-model="dataPrice.measure_id"
          required
          disabled
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
          disabled
        ></v-text-field>
      </v-col> -->
        <v-col cols="12" sm="12" class="pa-1">
          <v-textarea
            density="compact"
            label="Descripcion"
            v-model="dataPrice.description"
            required
            :rules="nameRules"
            clearable
            auto-grow
            rows="1"
          ></v-textarea>
        </v-col>
        <v-col cols="6" class="pa-1">
          <v-text-field
            density="compact"
            type="number"
            label="Precio (x menor)"
            v-model="dataPrice.prices[0].price"
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
            v-model="dataPrice.prices[0].minprice"
            required
            :rules="pricesRules"
            clearable
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
    <div
      v-if="dataPrice.ID"
      class="d-flex align-center justify-space-between pa-1"
    >
      <v-btn
        v-if="edit"
        density="compact"
        size="small"
        color="orange-darken-2"
        variant="text"
        @click="
          () => {
            edit = false;
          }
        "
      >
        Cancelar
      </v-btn>
      <v-btn
        v-if="!edit"
        density="compact"
        size="small"
        color="teal-accent-4"
        variant="text"
        prepend-icon="mdi-file-edit-outline"
        @click="
          () => {
            edit = true;
          }
        "
      >
        <template v-slot:prepend>
          <v-icon></v-icon>
        </template>
        Editar
      </v-btn>
      <v-btn
        v-else
        density="compact"
        size="small"
        color="teal-accent-4"
        variant="text"
        prepend-icon="mdi-content-save"
        @click="save"
      >
        <template v-slot:prepend>
          <v-icon></v-icon>
        </template>
        Guardar
      </v-btn>
    </div>
  </v-sheet>
</template>

<script setup>
import { ref } from "vue";
import { axiosInstance } from "../api/index";

const SubformRef = ref();
const loading = ref(false);
const emit = defineEmits([
  "removePrice",
  "openDialogFeature",
  "removeSubProduct",
]);
const props = defineProps({
  data: Object,
  index: Number,
});

const dataPrice = ref(props.data);
const edit = ref(false);

const nameRules = [
  (value) => {
    if (value) return true;
    return "Descripcion es requerido.";
  },
];

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

const save = async () => {
  // const { valid } = await SubformRef.value.validate();
  // if (valid) {
  loading.value = true;
  dataPrice.value.prices.forEach((e) => {
    e.equivalent = parseInt(e.equivalent);
    e.price = parseFloat(e.price);
    e.minprice = parseFloat(e.minprice);
  });
  await axiosInstance
    .post("products", {
      ...dataPrice.value,
    })
    .then((res) => {
      console.log(res);
    })
    .then(() => {
      edit.value = false;
      setTimeout(() => (loading.value = false), 1000);
    })
    .catch((err) => {
      console.log(err);
    });
  // }
};
</script>
