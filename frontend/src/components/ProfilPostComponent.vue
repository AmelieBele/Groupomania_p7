<template>    
   <div>
    <img src="../assets/profil-picture-groupmania.png" class="profil-picture" alt="Photo de profil"/>
    <p class="user-name">{{ getUsername }} <br/></p>
   </div>
</template>

<script>

export default {
  name: 'PostProfilComponent',

  props: ['user'], 
  computed: {
    getUsername(){
      return this.user.lastname + ' ' + this.user.firstname
    }
  }
}
</script>

<style lang="scss" scoped>

div {
  display: flex;
  align-items: center;
  margin-left: 15px;
  margin-top:15px;
  .profil-picture {
    width:40px;
    height:40px;
    display: block;
    background: url(../assets/profil-picture-groupmania.png) no repeat;
  }

  .user-name{
    font-size :18px;
    margin-left: 10px;
    font-weight: 600;
    
    .date {
      font-size :.8125rem;
    }
  }
}
</style>


  