<template>
  <v-dialog v-model="props.openfeatureDialog" width="300">
    <v-card>
      <v-card-title>
        {{ featureType == "brands" ? "Marca" : "Categoria" }}</v-card-title
      >
      <v-card-text>
        <v-form ref="formRef">
          <v-text-field
            label="Descripcion"
            v-model="formdata.description"
            required
            :rules="nameRules"
            clearable
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="pink"
          variant="text"
          @click="
            () => {
              formdata = defaultformdata;
              $emit('closeDialog');
            }
          "
        >
          Cerrar
        </v-btn>
        <v-btn
          color="blue-darken-1"
          variant="elevated"
          @click="save"
          :loading="loading"
        >
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { axiosInstance } from "../api/index";
import { ref } from "vue";

const formRef = ref();
const emit = defineEmits(["closeDialog"]);
const props = defineProps({
  openfeatureDialog: Boolean,
  featureType: String,
});
const loading = ref(false);
const defaultformdata = ref({
  description: "",
});
const formdata = ref({ ...defaultformdata.value });

const nameRules = [
  (value) => {
    if (value) return true;
    return "Descripcion es requerido.";
  },
];

const save = async () => {
  const { valid } = await formRef.value.validate();
  if (valid) {
    loading.value = true;
    const res = await axiosInstance.post(`/${props.featureType}`, {
      ...formdata.value,
    });
    console.log(res);
    emit("closeDialog");
  }
  setTimeout(() => (loading.value = false), 1000);
};
</script>
