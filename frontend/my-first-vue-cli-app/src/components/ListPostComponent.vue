<template>    
   <PostComponent v-for="post in this.publications" :key="post" :publication="post">
   </PostComponent>
</template>

<script>

import {API_URL} from "./../../common/utils"
import PostComponent from "./PostComponent.vue"

export default {
  name: 'ListPostComponent',
  components: {
    PostComponent,
  },

  data(){
    return {
      publications :[]
    }
  }, 

  async created(){
    this.publications = await this.getAllPosts()
  },

  methods: {
    async getAllPosts(){

      try {
        const token = localStorage.getItem("token")
        const getPosts = await this.axios.get(`${API_URL}/post/`, {
        headers: {
          Authorization:"Bearer " + token
        }
        })

        const datas = getPosts['data'].posts

        if (datas.length > 0) {
          return datas.reverse()
        }

        return []
      }catch(e) {
        console.log(e)
      }
     
    }
  }

}
</script>

<style lang="scss" scoped>



</style>


  