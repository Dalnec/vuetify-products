<template>
  <v-dialog
    v-model="props.data.show"
    fullscreen
    :scrim="false"
    transition="slide-x-transition"
  >
    <v-card width="auto" style="">
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
        <v-card-title style="padding: 0">{{
          props.data.values.description
        }}</v-card-title>
        <v-card-subtitle style="padding: 0" class="text-subtitle-1">
          {{ props.data.values.brand.description }} /
          {{ props.data.values.category.description }}
        </v-card-subtitle>
      </v-card-item>
      <v-card-text class="pa-0 d-flex justify-space-between">
        <v-chip class="ma-1 text-subtitle-1" color="success" variant="text">
          <v-icon start icon="mdi-currency-usd"></v-icon>
          {{
            props.data.values.price ? props.data.values.price.toFixed(2) : 0.0
          }}
        </v-chip>
        <v-chip
          class="ma-1 text-subtitle-1"
          color="pink-accent-3"
          variant="text"
        >
          <v-icon start icon="mdi-currency-usd"></v-icon>
          {{
            props.data.values.minprice
              ? props.data.values.minprice.toFixed(2)
              : 0.0
          }}
        </v-chip>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" dark @click="props.data.show = false">
          Cerrar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
const props = defineProps({ data: Object });
</script>

<style>
.dialog-bottom-transition-enter-active,
.dialog-bottom-transition-leave-active {
  transition: transform 0.2s ease-in-out;
}
</style>
