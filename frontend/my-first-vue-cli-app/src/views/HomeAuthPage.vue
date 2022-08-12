<template>
<div class="quot-form">
    <div class="quote">
      <QuoteComponent></QuoteComponent>
    </div>
    <p v-if="showSuccess">Inscription réussie !</p>
    <div class="form">
        <button type="button" @click="changeComponent('signin')" class="signin-button button">Se connecter</button>
        <button type="button" @click="changeComponent('signup')" class="signup-button button">S'inscrire</button>
        
         <SignInComponent v-if = "component == 'signin'"></SignInComponent>
         <SignUpComponent v-else @switch="switchTab"></SignUpComponent>
    </div>
</div>  
  <FooterComponent/>
</template>

<script>
import QuoteComponent from "../components/QuoteComponent.vue"
import SignInComponent from "../components/SignInComponent.vue"
import SignUpComponent from "../components/SignUpComponent.vue"
import FooterComponent from "../components/FooterComponent.vue"

export default {
  name: 'HomeAuthPage',
  components: {
    SignUpComponent,
    SignInComponent,
    QuoteComponent, 
    FooterComponent
  },
  data(){
    return {
        component : "signin",
        showSuccess: false,
      
    }
  },
  methods: {
    changeComponent(paramComponent){
        this.component = paramComponent
    },
    switchTab(){
      this.changeComponent("signin")
      this.showSuccess = true
      setTimeout(()=> this.showSuccess=false, 5000)
    }
  }
}
</script>


<style lang="scss" scoped>

.quot-form {

  background-color: #FFD7D7;
  padding-top: 40px;
  padding-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
 


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

  .form{
    background-color: white;
    padding: 40px 40px;
    border-radius: 10px;
    box-shadow: 10px 10px 10px  grey;
  }
  

}

@media only screen and (max-width: 1024px){
  .quot-form{
    display: flex;
    flex-direction: column;
  }
}

</style>
