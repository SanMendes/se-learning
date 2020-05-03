<!-- eslint-disable prettier/prettier -->
<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Adicione um novo tema</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-text-field v-model="theme" :rules="rules" label="Tema" outlined shaped></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="$router.back()" color="primary" style="font-size: 12px">Voltar</v-btn>
                <v-btn color="primary" style="font-size: 12px" @click="addTheme">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data: () => {
    return {
      theme: '',
      rules: [value => !!value || 'Preencha o tema.']
    }
  },

  methods: {
    addTheme: function() {
      if (this.theme.trim()) {
        this.$store.dispatch('addTheme', this.theme)
        this.theme = ''
        this.$router.push({ path: '/' })
      } else {
        alert('Tema vazio!')
      }
    }
  }
}
</script>
