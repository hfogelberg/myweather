import Vue from "vue";
import { API_ROOT_URL } from "../../../config";
import axios from "axios";

const state = {
  chapters: [],
  chapter: {}
};

const getters = {
  chapters: state => {
    return state.chapters;
  },

  chapter: state => {
    return state.chapter;
  }
};

const mutations = {
  chapter: (state, chapter) => {
    state.chapter = chapter;
  },

  chapters: (state, chapters) => {
    console.log("Mutation called", chapters);
    state.chapters = chapters;
  }
};

const actions = {
  getChapterById({ commit }, id) {
    let url = `http://localhost:3000/api/chapters/${id}`;
    axios
      .get(url)
      .then(res => {
        commit("chapter", res.data.chapter);
      })
      .catch(err => {
        console.log(err);
      });
  },
  getChapters({ commit }) {
    console.log("Get chapters");
    let url = "http://localhost:3000/api/chapters";

    axios
      .get(url)
      .then(res => {
        console.log("Chapters returned", res.data.chapters);
        commit("chapters", res.data.chapters);
      })
      .catch(err => {
        console.log(err);
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
