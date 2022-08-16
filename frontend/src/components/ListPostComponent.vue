<template>    
   <PostComponent :isAdmin='isAdmin' v-for="(post, key) in this.publications" :key="key" :publication="post"/>
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
      publications :[],
      isAdmin: false,
    }
  }, 
  async created() {
        const token = localStorage.getItem("token")
        const userId =localStorage.getItem("userId")
        const user = await this.axios.get(`${API_URL}/user/${userId}`, {
            headers: {
                "Authorization": "Bearer " + token
             }
        })
        this.isAdmin = user['data'].isAdmin
    },

  async mounted(){
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

.post{
  padding-bottom: 50px; 
  color : #fd2d01;
  font-size: 20px;
}

</style>


  