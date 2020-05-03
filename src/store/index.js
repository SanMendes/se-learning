import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

const vuexPersist = new VuexPersist({
  key: 'se-learning-storage',
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],

  state: {
    themes: [],

    contents: []
  },

  mutations: {
    addTheme: (state, theme) => {
      theme.id = state.themes.length + 1
      state.themes.push(theme)
    },

    addContent: (state, content) => {
      content.id = state.contents.length + 1
      state.contents.push(content)

      // calc and set counter_contents
      const themeId = content.themeId
      const contents = state.contents.filter(
        content => content.themeId == themeId
      )
      let theme = state.themes.find(theme => theme.id == themeId)
      theme.counter_contents = contents.length
    },

    removeTheme: (state, themeId) => {
      // remove contents associated with the themeId
      let index = 0
      while (index < state.contents.length) {
        if (state.contents[index].themeId == themeId) {
          state.contents.splice(index, 1)
        } else {
          index++
        }
      }
      // remove theme
      const indexToRemove = state.themes.findIndex(theme => theme.id == themeId)
      state.themes.splice(indexToRemove, 1)
    },

    removeContent: (state, contentId) => {
      const indexToRemove = state.contents.findIndex(
        content => content.id == contentId
      )
      state.contents.splice(indexToRemove, 1)
    }
  },

  getters: {
    themes: state => state.themes,

    contents: state => state.contents,

    getContentsByThemeId: state => themeId =>
      state.contents.filter(content => content.themeId == themeId)
  },

  actions: {
    addTheme: (context, theme_description) => {
      context.commit('addTheme', {
        description: theme_description,
        counter_contents: 0
      })
    },

    addContent: (context, content) => {
      context.commit('addContent', content)
    },

    removeTheme: (context, themeId) => {
      context.commit('removeTheme', themeId)
    },

    removeContent: (context, contentId) => {
      context.commit('removeContent', contentId)
    }
  },

  modules: {}
})
