<template>
  <div class="puzzle-theme-row top-margin">
    <label><i class="fa fa-adjust"> </i> Board Theme:</label>
    <multiselect
        v-model="selected"
        :options="options"
        track-by="name"
        label="label"
        placeholder="Select one"
        @input="onChange"
    >
    </multiselect>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import store from "../../store/store";
import {boardThemeDictionary} from "../../model/BoardThemeDictionary";

export default{
  components: { Multiselect },
  data: () => ({
    selected: boardThemeDictionary[0],
    options: boardThemeDictionary
  }),
  methods: {
    onChange (theme) {
      store.dispatch('changeBoardColor', theme);
    },
  },
}

</script>
