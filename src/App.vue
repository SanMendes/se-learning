<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="@/assets/logo_se-learning.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="@/assets/logoname_se-learning.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <!-- eslint-disable-next-line prettier/prettier -->
      <v-btn href="https://github.com/SanMendes" target="_blank" text>
        <span class="mr-2">Desenvolvedor</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
const requestPermission = function() {
  if (!('Notification' in window)) {
    alert('Notification API not supported!')
    return
  }

  Notification.requestPermission(function(result) {
    console.log(result)
  })
}

const requestPush = function() {
  navigator.serviceWorker
    .getRegistration()
    .then(function(serviceWorkerRegistration) {
      serviceWorkerRegistration.pushManager.subscribe()
    })
}

requestPermission()
requestPush()
</script>
