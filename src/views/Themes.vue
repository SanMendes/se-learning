<!-- eslint-disable prettier/prettier-->
<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <div v-for="theme in themes" style="padding-bottom: 5px">
          <v-card color="white">
            <v-card-title class="headline">{{ theme.description }}</v-card-title>

            <v-card-subtitle>Este tema possui {{ theme.counter_contents }} conteúdo(s)</v-card-subtitle>

            <div align="right">
              <v-btn class="ma-2" @click="toContents(theme.id)" outlined fab small color="primary">
                <v-icon>mdi-format-list-bulleted-square</v-icon>
              </v-btn>

              <v-btn class="ma-2" outlined small fab color="primary">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn
                class="mx-2"
                @click="removeTheme(theme.id)"
                outlined
                fab
                dark
                small
                color="red"
              >
                <v-icon dark>mdi-minus</v-icon>
              </v-btn>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-btn class="ma-2" to="/addtheme" style="font-size: 12px" color="primary" dark>+ NOVO TEMA</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['themes'])
  },

  methods: {
    toContents: function(paramThemeId) {
      this.$router.push({ name: 'Contents', params: { themeId: paramThemeId } })
    },

    removeTheme: function(themeId) {
      navigator.vibrate(50)
      this.$store.dispatch('removeTheme', themeId)
    }
  }
}
</script>
