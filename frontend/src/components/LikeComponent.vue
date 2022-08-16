<template>
  <div>
    <button @click="likePost" aria-label="bouton j'aime" type="button" class="likeButton"><i :class="{liked : internalIsLiked}" class="fa-solid fa-heart"></i></button>
    {{ internalLikeCount }}
  </div>
</template>

<script>
import {API_URL} from "./../../common/utils"
export default {
  name: 'LikeComponent',
  data(){
     return {
        like: [],
        liked: null ,
        internalLikeCount: null,
        internalIsLiked: null,
      }
  },
  props: [
    'likeCount',
    'isLiked', 
    'postId',
  ],
  created(){
    this.internalLikeCount=this.likeCount
    this.internalIsLiked=this.isLiked
  },
 
  methods: {

    likePost(){
      const token = localStorage.getItem("token")
      const userId = localStorage.getItem("userId")
      const data = {
        like: !this.internalIsLiked, userId: userId
      }
      if(!this.internalIsLiked){
        this.axios.post(`${API_URL}/post/${this.postId}/like`,data,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },        
        })
          .then(data => {
            this.like.push(data)
            this.internalIsLiked = true 
            this.internalLikeCount ++
            })
          .catch(error => console.log(error))
          
      }else{ 
        this.axios.post(`${API_URL}/post/${this.postId}/like`,data, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },

        })
          .then(data => {
            this.like.push(data)
            this.internalIsLiked= false
            this.internalLikeCount --
            })
          .catch(error => console.log(error))
        
      }
    }
  }
}
</script>


<style lang="scss" scoped>
  div{

    .liked{
    color:red;
  }
    .likeButton{
      border: 0.5px solid;
      border-radius: 10px;
      border-color: #bcbdc4;
      background-color: white;
            padding: 8px;
            margin: 5px;
        

        &:hover{
            background-color: #4e5166; 
            color: white;
        }
    }
  }
</style>