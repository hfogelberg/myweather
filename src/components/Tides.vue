<template>
  <div class='tides-container'>
    <h1 class="primary-header">
      Tides in {{city}}
    </h1>

    <div class="horizontal-slide">
      <ul class="horizontal-slide__wrapper">
        <li v-for="tide in tides">
          <tide-card :tide="tide" />
        </li>
      </ul>
    </div>
  
  </div>
</template>

<script>
</script>

<style lang="scss">
@import "../sass/main.scss";

.tides-container {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
}

ul {
  list-style: none;
}
</style>

<script>
import {mapGetters} from "vuex";
import TideCard from "./TideCard";

export default {
  components: {
    "tide-card": TideCard
  },
  computed: {
    ...mapGetters(["tides", "city"])
  },
}
</script>