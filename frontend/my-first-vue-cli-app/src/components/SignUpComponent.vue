<!-- Incription -->
<template>
<div>
  
  <form method="post" class="form-signup">

    <div class="form-last-name">
        <input type="text" name="last-name" placeholder="Nom" v-model="lastname" required @change="validLastName">
        <p class="error">{{ errLastName }}</p>
    </div>

    <div class="form-first-name">
      <input type="text" name="first-name" placeholder="Prénom" v-model="firstname" required @change="validFirstName">
      <p class="error">{{ errFirstName }}</p>
    </div>

    <div class="form-email">
      <input type="email" name="email" placeholder="Adresse email" v-model="email" required @change="validEmail">
      <p class="error">{{ errEmail }}</p>
    </div> 

    <div class="form-password">
      <input type="password" name="password" placeholder="Mot de passe" v-model="password" required @change="validPassword">
      <p class="error">{{ errPassword }}</p>
      
    </div>

    <button class="button" type="submit" @click.prevent="submit">Valider l'inscription</button>

  </form>


</div>  
</template>

<script>

import {API_URL} from "./../../common/utils"
export default {
  name: 'SignUpComponent',
  components: {

  },
  data(){
    return{
      lastname:"",
      firstname:"",
      email:"",
      password:"",
      errLastName:"",
      errFirstName:"",
      errPassword:"",
      errEmail:"",
    }
  },
  methods: {
    
    validLastName() {
      const lastNameRegExp = new RegExp("^[a-zA-Zéèêï-]+$");
      const testLastName = lastNameRegExp.test(this.lastname)
    
      if (testLastName == false) {
        this.errLastName = "Nom Invalide";
        return false;
      } else {
        this.errLastName= "";
        return true;
      }
    },

    validFirstName() {
      const firstNameRegExp = new RegExp("^[a-zA-Zéèêï-]+$");
      const testFirstName = firstNameRegExp.test(this.firstname);

      if (testFirstName == false) {
        this.errFirstName= "Prénom Invalide";
        return false;
      } else {
        this.errFirstName = "";
        return true;
      }
    },

    validEmail() {
      const emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
      const testEmail = emailRegExp.test(this.email);
      
      if (testEmail == false) {
        this.errEmail = "Email Invalide : (exemple@email.com) ";
        return false;
      } else {
        this.errEmail = "";
        return true;
      }
    },

     validPassword() {
      const passwordRegExp = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
      const testPassword = passwordRegExp.test(this.password);

      if (testPassword == false) {
        this.errPassword = "Mot de passe : au moins 8 caractères + 1 minuscule min + 1 maj min + 1 caractère spécial";
        return false;
      } else {
        this.errPassword = "";
        return true;
      }
    },



    async submit (){
      {
        try {
            await fetch(`${API_URL}/user/signup`, {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({lastname:this.lastname, firstname:this.firstname, email:this.email, password:this.password}),
          })
          this.lastname = "";
          this.firstname="";
          this.email = "";
          this.password = "";
          this.$emit("switch")
          
          

        }catch (e){
          console.log(e)
        }
      }
      
    }
  },


}
</script>


<style lang="scss" scoped>
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
