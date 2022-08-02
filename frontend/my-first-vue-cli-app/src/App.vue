<template>
<div>
  <HeaderComponent></HeaderComponent>
  <div class="container">
    <router-view/>   
  </div>

</div>  
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue"
export default {
  name: 'App',
  components: {
    HeaderComponent
  }
}
</script>


<style lang="scss">
*{
    margin: 0;
}
#app {
  font-family: 'Lato', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
