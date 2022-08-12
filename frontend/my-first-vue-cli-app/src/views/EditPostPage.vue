
<template>
  <div class="all">
    <textarea v-model="text"></textarea>
    <img v-if="image" :src="imagePreview"/>
    <input  class ="file" type="file" name="image" @change="setFile"/>
    <button class="button" @click="modifyPost">Modifier ma publication !</button>
  </div>
</template>
 
<script>
import {API_URL} from "./../../common/utils"

export default {
  name: 'EditPostPage',
 
  data(){
    return{
      text:"",
      image:"",
      imagePreview:"",
    }
  
  },
async mounted() {
  
        const token = localStorage.getItem("token")
        const idPost = this.$route.params.idPost
        

   const publication = await this.axios.get(`${API_URL}/post/${idPost}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })

        this.text = publication['data'].postText
        this.imagePreview = publication['data'].imageUrl
        console.log(this.image)

},

  methods : {

    modifyPost() {
      const idPost = this.$route.params.idPost
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      let formData = new FormData();
      formData.append("image", this.image);
      formData.append("postText", this.text);
      formData.append('userId', userId);

      this.axios.put(`${API_URL}/post/${idPost}`, formData, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          this.$router.push({path: "/feed/" + userId})
        })
        .catch(error => (error));
    },
    setFile(event){
      if (event.target.files){
        this.image = event.target.files[0]
        this.imagePreview = URL.createObjectURL(this.image)
        console.log(event.target.files[0])
      }

    },

  }
}
</script>


<style lang="scss" scoped>
  .all{
    display: flex;
    flex-direction: column;
    align-items: center;

    textarea{
      margin: 15px;
      width:50%;
      font-family: 'Lato', Helvetica, Arial, sans-serif;
    }

    img{
      margin: 15px;
      width:50%;
      height:50%;
    }
    .button{
      width:15%;
      border: 0.5px solid;
      border-radius: 10px;
      border-color: #bcbdc4;
      background-color: white;
      color: #fd2d01;
      padding: 8px;
      margin: 15px;
    }

    :hover.button{
      background-color: #4e5166; 
      color: white;
    }
  }
  
</style>