<template>    
   <div>
    <img src="../assets/profil-picture-groupmania.png" class="profil-picture" alt="photo de profil"/>
    <p class="user-name">{{username}} <br/></p>

   </div>
</template>

<script>

export default {
  name: 'PostProfilComponent',
  component: {
    
  },
  props: ['username'],
  data(){
    return {
       


    }
  }, 
  methods: {


  },

  computed: {
    userName(){
      const lastname = localStorage.getItem('lastname')
      const firstname = localStorage.getItem('firstname')

      return lastname + ' ' + firstname
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


  