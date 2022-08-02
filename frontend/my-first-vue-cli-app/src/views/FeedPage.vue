<template>
<div class="container">
  <button type="button" @click="Logout()" class="déconnexion button">Me déconnecter</button>
  <div class="newPost">
      <NewPostComponent></NewPostComponent>
  </div>
  <div class="listPost">
      <ListPostComponent></ListPostComponent>
  </div>

</div>  
</template>

<script>

import NewPostComponent from '../components/NewPostComponent.vue'
import ListPostComponent from '../components/ListPostComponent.vue'
export default {
  name: 'FeedPage',
  components: {
    NewPostComponent,
    ListPostComponent,
  },
  data(){
    return {
       
    }
  },
  methods: {
     Logout() {
      localStorage.clear();
      this.$router.push("/");
    },
    }
  
}
</script>


<style lang="scss">
.container {
  background-color: #d5d6db;

   .button {
      font-size: 20px;
      padding:5px 10px;
      margin-bottom: 10px;
      border: 0.5px solid;
      border-radius: 10px;
      border-color:#bcbdc4; 
      color: #fd2d01;
      background-color:white;
      
    }
    :hover.button {
      background-color: #4e5166; 
      color: white;
    }
  
}
</style>
