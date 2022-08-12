
<!-- Connexion -->
<template>
<div>
    <form method="post" >

      <div class="form-email" >
        <input type="email" name="email" placeholder="Adresse email" v-model="email">
      </div> 

      <div class="form-password">
 
       <input type="password" name="password" placeholder="Mot de passe" v-model="password">


      </div>
      <p>{{ errMsg }}</p>

      <button class="button" type="submit" @click.prevent="connexion" >Connexion</button>

  </form>

</div>  
</template>

<script>

import {API_URL} from "./../../common/utils"
export default {
  name: 'SignInComponent',
  components: {
   
  },
  data(){
     return{
      email:"",
      password:"",
      errMsg: "",
    }
  }, 
  methods: {
    

    async connexion (){

      
      try {
        const response = await fetch(`${API_URL}/user/login`,{
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email:this.email, password:this.password}),
        })
        const responseMiseEnForme = await response.json();
        
        localStorage.setItem("token", (responseMiseEnForme.token))
        localStorage.setItem("userId", responseMiseEnForme.userId)
        localStorage.setItem("lastname",(responseMiseEnForme.lastname))
        localStorage.setItem("firstname",(responseMiseEnForme.firstname))

        this.routerRedirection()
      }

      catch (error){
        alert(" Email ou mot de passe incorrect !")
        console.log(error)
      } 
    },

      routerRedirection(){
        const userId = localStorage.getItem("userId"); //__ Je recup l'id de mon localstorage

        if(userId != 'undefined'){ //__ Si il est different de undefined (donc il existe)
          this.$router.push(`feed/${userId}`) //__ Je redirige vers la home de mon site
         }
        //__ donc ici tu fais rien et il se passera rien ! 
        },

       
     
  
  } 
}
</script>


<style lang="scss" scoped>
  button{
    margin-top: 10px;
    padding : 10px;
    padding-left:70px;
    padding-right:70px;
    border-radius : 10px 10px 10px 10px ;
    border-color : grey;
  }
   input {
    font-size : 15px;
    padding: 10px 5px;
    margin-top: 10px;
    border-radius: 10px;
    border-color: lightgrey;
  }

    .button{
    border: 0.5px solid;
    border-radius: 10px;
    border-color: #bcbdc4;
    background-color: white;
    color: #fd2d01;
    padding: 8px;
    margin: 5px;
  }

    :hover.button{
            background-color: #4e5166; 
            color: white;
        }
</style>
