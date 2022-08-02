<template>  
    <div class="conteneur">
        <div class="post">
            <ProfilPostComponent :username="getName"/>
            <p class="postText">{{ publication.postText }}</p>
            <img v-if="publication.imageUrl != '' " :src="publication.imageUrl"/>
            <p class="modif/supp">
                <button type="button" class="modif button">Modifier </button>
                <button type="button" v-if="isAdmin == true" @click="deletePost(publication._id)" class="supp button"> Supprimer</button>
                <LikeComponent class="button"/>
            </p>

            
        </div>
    </div>
</template>

<script>

import {API_URL} from "./../../common/utils"
import ProfilPostComponent from './ProfilPostComponent.vue'
import LikeComponent from "./LikeComponent.vue"

export default {
  name: 'PostComponent',
  components: {
    ProfilPostComponent,
    LikeComponent,
  },
  data(){ 
    return {
    }
  },
    props: [
        'publication'
    ],
    computed:  {

        getAuthor() {
            return this.publication.user[0]
        }, 
        getName() {
            const user = this.getAuthor

            return user.lastname + ' ' + user.firstname
        }, 
        getAuthorId(){
            return this.getAuthor._id
        }, 
        getConnectedUserId() {
            return localStorage.getItem('userId')
        },
    },
    async mounted() {
        const token = localStorage.getItem("token")
            const userId = this.getConnectedUserId
            const user = await this.axios.get(`${API_URL}/user/${userId}`, {
                    headers: {
                       "Authorization": "Bearer " + token
                    }
            })
            this.isAdmin = user['data']
    },
    methods: {
       
      deletePost() {
        const token = localStorage.getItem("token")
        const id = this.publication._id
        this.axios.delete(`${API_URL}/post/${id}`, 
        { headers: {'Authorization': 'Bearer ' + token }})
        .then(() => alert.success('Post supprimé !'))
        .catch ((error) => console.log(error.response));
        this.$router.go()
      },

        async getTextImg (){
        
            try{
                let formData = new FormData();
                const id = localStorage.getItem("userId")
                const token = localStorage.getItem("token")
                const recuperation = await this.axios.get(`${API_URL}/post/${id}`,formData, {
                    headers: {
                       "Authorization": "Bearer " + token
                    }
                })
                const textTransform = await recuperation.json()
                formData.append('image', this.image);
                formData.append('postText', this.text)
                console.log(textTransform)
            }catch(e){
                console.log(e)
            }
        }
    }

    }
</script>

<style lang="scss" scoped>
div.conteneur {
display: flex;
justify-content: center;

    div.post {
        width: 50%;
        border: 1px solid #ebecf0;
        border-radius: 10px;
        margin-bottom: 15px;
        margin-top: 15px;
        background-color:#ffd7d7;

        .postText {
            padding-bottom: 15px;
            padding-left: 15px;
            padding-top:10px;
            display: flex;

        }

        img{
            width: 50%;
            margin-bottom: 15px;
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
    }
}



</style>
