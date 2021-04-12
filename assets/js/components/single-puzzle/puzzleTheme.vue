<template>
  <div class="puzzle-theme-row">
    <label><i class="fa fa-adjust"> </i> Puzzle Theme:</label>
    <multiselect
        v-model="selected"
        :options="options"
        track-by="name"
        label="label"
        placeholder="Select one"
        :close-on-select="false"
        :clear-on-select="false"
        :multiple="true"
        @input="onChange"
    >
      <template slot="selection" slot-scope="{ values, search, isOpen }">
         <span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} options selected</span>
      </template>
    </multiselect>
  </div>
</template>

<script>
import store from '../../store/store.js';
import Multiselect from 'vue-multiselect'
import {themeDictionary} from "../../model/PuzzleThemeDictionary";

export default{
  components: { Multiselect },
  data: () => ({
    puzzleTheme: '',
    selected: null,
    options: themeDictionary
  }),
  methods: {
    onChange (value) {
      store.commit('changeSelectedThemes', this.selected);
    },
  },
}

</script>


