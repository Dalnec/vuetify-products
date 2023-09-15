<template>
  <v-card class="mx-auto">
    <v-card-text class="text-h5 py-2">
      <v-list lines="one">
        <v-list-item class="w-100 pa-1">
          <v-list-item-title>
            <v-chip
              size="small"
              variant="outlined"
              color="primary"
              class="px-3"
            >
              UNIDAD
            </v-chip>
          </v-list-item-title>

          <v-list-item-subtitle>
            <v-row>
              <v-col>
                <v-chip
                  class="ma-1 text-subtitle-1"
                  color="success"
                  variant="text"
                >
                  <v-icon start icon="mdi-currency-usd"></v-icon>
                  0.00
                </v-chip>
              </v-col>
              <v-col>
                <v-chip
                  class="ma-1 text-subtitle-1"
                  color="pink-accent-3"
                  variant="text"
                >
                  <v-icon start icon="mdi-currency-usd"></v-icon>
                  0.00
                </v-chip>
              </v-col>
            </v-row>
          </v-list-item-subtitle>
        </v-list-item>

        <v-list-item class="w-100 pa-1">
          <v-list-item-title>
            <v-chip
              size="small"
              variant="outlined"
              color="primary"
              class="px-3"
            >
              DOCENA
            </v-chip>
          </v-list-item-title>

          <v-list-item-subtitle>
            <v-row>
              <v-col>
                <v-chip
                  class="ma-1 text-subtitle-1"
                  color="success"
                  variant="text"
                >
                  <v-icon start icon="mdi-currency-usd"></v-icon>
                  0.00
                </v-chip>
              </v-col>
              <v-col>
                <v-chip
                  class="ma-1 text-subtitle-1"
                  color="pink-accent-3"
                  variant="text"
                >
                  <v-icon start icon="mdi-currency-usd"></v-icon>
                  0.00
                </v-chip>
              </v-col>
            </v-row>
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card-text>

    <!-- <v-card-actions>      
    </v-card-actions> -->
  </v-card>
</template>
