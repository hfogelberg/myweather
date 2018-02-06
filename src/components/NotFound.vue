<template>
  <div class="not-found">
    <ul class="menu-bar">
      <li class="menu-bar__item">
        <router-link to="/" class="menu-bar__item--link">
          <h3 class="tertiary-header gradient-text">MyWeather</h3>
        </router-link>
      </li>
      <li>
        <a href="#"></a>
      </li>
    </ul>

    <div class='not-found-container'>
      <h2 class="secondary-header">
        Wooops! I couldn't find that page ....
      </h2>

      <p class="paragraph">
        Just head back to the <router-link to="/" class="index-link">index page</router-link> and try again.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("reset");
  }
}
</script>

<style lang="scss" scoped>
@import "../sass/main.scss";
.not-found-container {
  margin-top: 5rem;
  margin-bottom: 8rem;
}

.secondary-header {
  color: $warning-color;
}

.paragraph {
  color: $primary-color-dark;
  margin-top: 8rem;
  tex-align: center;
  font-size: 3rem;
  font-weight: 400;
}

.index-link {
  color: $secondary-blue-color;
  font-weight: 700;
}
</style>