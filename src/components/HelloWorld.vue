<template>
  <!-- <v-container class="fill-height">
    <div class="d-flex align-center flex-column">
      <v-card v-for="(x, i) in lista" :key="i" width="355">
        <v-card-item>
          <v-card-title>Juego de Ollas</v-card-title>
          <v-card-subtitle>Master</v-card-subtitle>
        </v-card-item>
        <v-card-text> This is content </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            size="small"
            color="surface-variant"
            variant="text"
            icon="mdi-heart"
          ></v-btn
          >{{ x }}

          <v-btn
            size="small"
            color="surface-variant"
            variant="text"
            icon="mdi-bookmark"
          ></v-btn>

          <v-btn
            size="small"
            color="surface-variant"
            variant="text"
            icon="mdi-share-variant"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-container> -->
  <v-container class="bg-grey-lighten-5">
    <v-row no-gutters>
      <v-col v-for="(x, i) in lista" :key="i">
        <v-card width="355" style="margin: 5px">
          <v-card-item style="padding: 10px 16px 0 16px">
            <v-card-title style="padding: 0">Juego de Ollas</v-card-title>
            <v-card-subtitle style="padding: 0">Master</v-card-subtitle>
          </v-card-item>
          <v-card-text style="padding: 0">
            <v-spacer></v-spacer>
            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-heart"
            ></v-btn
            >{{ x }}

            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-bookmark"
            ></v-btn>

            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-share-variant"
            ></v-btn
          ></v-card-text>
          <!-- <v-card-text style="padding: 0"> This is content </v-card-text> -->
          <!-- <v-card-actions style="padding: 0">
            <v-spacer></v-spacer>
            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-heart"
            ></v-btn
            >{{ x }}

            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-bookmark"
            ></v-btn>

            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-share-variant"
            ></v-btn>
          </v-card-actions> -->
        </v-card>
      </v-col>
      <!-- <v-col>
        
      </v-col>

      <v-responsive width="100%"></v-responsive>

      <v-col>
        
      </v-col>

      <v-col>
        
      </v-col> -->
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from "vue";

const lista = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
</script>
