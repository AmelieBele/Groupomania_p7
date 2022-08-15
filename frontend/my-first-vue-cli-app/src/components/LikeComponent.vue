<template>
  <button v-if="!liked" @click="likePost" type="button" class="likeButton"><i :class="{liked : isLiked}" class="fa-solid fa-heart"></i></button>
  {{ likeCount }}
</template>

<script>
import {API_URL} from "./../../common/utils"
export default {
  name: 'LikeComponent',
  data(){
     return {
        like: [],
        liked: null ,
      }
  },
  props: [
    'likeCount',
    'isLiked'
  ],
 
  methods: {

    async LikePostId(){
      const id = this.publication._id
      const like = await this.axios.post(`${API_URL}/post/${id}/like`)
      const likesJson = await like.json()
      likesJson.forEach(like => {
        like.userId == this.userId ? this.liked = true : this.like = false
      })
      return likesJson
    },

    likePost(){
      const data = {
        like: true,
        userId: this.$parent.getConnectedUserId,
        postId:this.$parent.publication._id
      }
      const token = localStorage.getItem("token")
      if(!this.isLiked){
        this.axios.post(`${API_URL}/post/${this.$parent.publication._id}/like`, {like: data.like, userId: data.userId}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(data)
        })
          .then(res => res.json())
          .then(data => this.like.push(data))
          .catch(error => console.log(error))
          this.liked = true 
          this.$router.go()
      }else{ 
        this.axios.post(`${API_URL}/post/${this.$parent.publication._id}/unlike`, {like: data.like, userId: data.userId}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          },
          body: JSON.stringify(data)
        })
        this.liked= false
        this.$router.go()
      }
    }
  }
}
</script>


<style lang="scss">
  .liked{
    color:red;
  }
</style>