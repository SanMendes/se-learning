<!-- eslint-disable prettier/prettier-->
<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <!-- eslint-disable-next-line vue/require-v-for-key -->
        <div
          v-for="content in getContentsByThemeId($route.params.themeId)"
          style="padding-bottom: 5px"
        >
          <v-card color="white">
            <v-card-title class="headline">{{ content.question }}</v-card-title>

            <v-card-subtitle>Resposta: {{ content.answer }}</v-card-subtitle>
            <v-card-subtitle>Dica: {{ content.tip }}</v-card-subtitle>

            <div align="right">
              <v-btn class="ma-2" outlined small fab color="primary">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn
                class="mx-2"
                @click="removeContent(content.id)"
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
      <v-btn
        class="ma-2"
        @click="toAddContents($route.params.themeId)"
        style="font-size: 12px"
        color="primary"
        dark
      >+ NOVO CONTEÚDO</v-btn>
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      getContentsByThemeId: 'getContentsByThemeId'
    })
  },

  methods: {
    toAddContents: function(paramThemeId) {
      this.$router.push({
        name: 'AddContent',
        params: { themeId: paramThemeId }
      })
    },

    removeContent: function(contentId) {
      navigator.vibrate(50)
      this.$store.dispatch('removeContent', contentId)
    }
  }
}
</script>
