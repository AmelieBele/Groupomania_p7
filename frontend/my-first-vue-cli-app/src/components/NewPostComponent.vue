
<template>
  <div class="all">
    <div class="new-post">
      <div class="profil-post">
        <ProfilPostComponent :user="user"/>
      </div>  
      <div class="input-img">
        <input class="text" type="text" name="text" v-model="text" placeholder="Créer un nouveau post ..."/>
        <input  class ="file" type="file" name="image" @change="setFile"/>
      </div>
      <div>
        <button class="button" type="submit" name="publier" @click="post">Publier</button>
      </div>
    </div>
  </div>
</template>
 
<script>
import {API_URL} from "./../../common/utils"
import ProfilPostComponent from './ProfilPostComponent.vue'
export default {
  name: 'NewPostComponent',
  components: {
    ProfilPostComponent,
  },
  data(){
    return{
      text:"",
      image:"",
    }
  },
  computed: {
    user(){
      const lastname = localStorage.getItem('lastname')
      const firstname = localStorage.getItem('firstname')
      return {lastname: lastname,  firstname: firstname}
    }
  },
  methods : {
    async post(){   
      let formData = new FormData();
      const userId = localStorage.getItem("userId")
      formData.append('image', this.image);
      formData.append('userId', userId);
      const postText = formData.append('postText', this.text)
      const token = localStorage.getItem("token")
      if (postText != ''){
         try {
          await this.axios.post(`${API_URL}/post`, formData, {
          headers:{
            "Content-Type":"multipart/form-data",
            "Authorization": "Bearer "+ token
          }
        })
        this.text="", 
        this.image=""
      }catch (e){
        console.log(e)
      }
      this.$router.go()
      }   
    },
    
    setFile(event){
      if (event.target.files){
        this.image = event.target.files[0]
      }
    },
  }
}
</script>


<style lang="scss">

.all{
  display: flex;
  justify-content: center;


  .new-post{
    width: 50%;
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-color:#ebecf0; 
    border-radius : 10px;
    background-color: #ebecf0;
    margin-top: 15px;
    margin-bottom: 100px;

    .profil-post{
      display: flex;
      justify-content: space-between;

        p.points {
          font-size: 20p;
        }
    }

    .input-img{
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      
      input.text {
        font-size: 23px;
        display: flex;
        border: 1px solid;
        border-color:#bcbdc4;
        border-radius: 10px;
        margin-bottom: 10px;
        margin-left: 5px;
        margin-right: 5px;
      }

      input.file {
        margin-left: 5px; 
      }
    }

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
}
 
</style>