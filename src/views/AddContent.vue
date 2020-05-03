<!-- eslint-disable prettier/prettier -->
<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Adicione um novo conteúdo</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-text-field v-model="question" label="Pergunta" outlined shaped></v-text-field>
                <v-text-field v-model="answer" label="Resposta" outlined shaped></v-text-field>
                <v-text-field v-model="tip" label="Dica" outlined shaped></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="$router.back()" color="primary" style="font-size: 12px">Voltar</v-btn>
                <v-btn color="primary" style="font-size: 12px" @click="addContent">Salvar</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <!-- <div class="text-center">
          <v-btn
            class="ma-2"
            @click="notificationTest()"
            style="font-size: 12px"
            color="primary"
            dark
          >Testa Notificação (10s)</v-btn>
        </div>-->
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
function scheduleNotification(content) {
  let bodyContent = ''
  if (content.question.trim() && content.answer.trim()) {
    bodyContent =
      'Questão: ' + content.question + '\n' + 'Resposta: ' + content.answer
  } else {
    bodyContent = 'Dica: ' + content.tip
  }
  Notification.requestPermission()
    .then(() => {
      if (Notification.permission !== 'granted') {
        throw 'Notification permission is not granted'
      }
    })
    .then(() => navigator.serviceWorker.getRegistration())
    .then(reg => {
      let count = 1
      let secondsModifier = 10
      while (count <= 4) {
        if (count > 1) {
          if (secondsModifier == 10) {
            secondsModifier = 120
          } else {
            secondsModifier = 1200 * count // 86400 * 3
          }
        }
        let timeToTrigger = new Date().getTime() + secondsModifier * 1000
        reg
          .showNotification('Hora de aprender!', {
            tag: timeToTrigger, // a unique ID
            body: bodyContent, // content of the notification
            // eslint-disable-next-line no-undef
            showTrigger: new TimestampTrigger(timeToTrigger),
            data: {
              url: window.location.href // pass the current url to the notification
            },
            badge: '/logo.png',
            icon: '/favicon.ico',
            actions: [
              {
                action: 'open',
                title: 'Ver meus temas'
              },
              {
                action: 'close',
                title: 'Fechar'
              }
            ]
          })
          .catch(err => {
            alert('Notification Trigger API error: ' + err)
          })
        count++
      }
    })
}

function testNotificationFunc() {
  Notification.requestPermission()
    .then(() => {
      if (Notification.permission !== 'granted') {
        throw 'Notification permission is not granted'
      }
    })
    .then(() => navigator.serviceWorker.getRegistration())
    .then(reg => {
      let timeToTrigger = new Date().getTime() + 10 * 1000
      reg
        .showNotification('Hora de aprender!', {
          tag: timeToTrigger, // a unique ID
          body: 'Exemplo de notificação', // content of the notification
          // eslint-disable-next-line no-undef
          showTrigger: new TimestampTrigger(timeToTrigger),
          data: {
            url: window.location.href // pass the current url to the notification
          },
          badge: '/logo.png',
          icon: '/favicon.ico',
          actions: [
            {
              action: 'open',
              title: 'Ver meus temas'
            },
            {
              action: 'close',
              title: 'Fechar'
            }
          ]
        })
        .catch(err => {
          alert('Notification Trigger API error: ' + err)
        })
    })
}

export default {
  data: () => {
    return {
      question: '',
      answer: '',
      tip: ''
    }
  },

  methods: {
    addContent: function() {
      if ((this.question.trim() && this.answer.trim()) || this.tip.trim()) {
        const content = {
          themeId: this.$route.params.themeId,
          question: this.question,
          answer: this.answer,
          tip: this.tip
        }
        //persist the data
        this.$store.dispatch('addContent', content)
        //schedule notification about the content created
        scheduleNotification(content)
        //clear 'page' data
        this.question = ''
        this.answer = ''
        this.tip = ''
        this.$router.back()
      } else {
        alert('Preencha a Pergunta e Resposta, ou a Dica!')
      }
    },

    notificationTest: function() {
      testNotificationFunc()
    }
  }
}
</script>
