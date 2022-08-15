<template>    
   <PostComponent v-for="(post, key) in this.publications" :key="key" :publication="post"/>
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
    }
  }, 
  async created() {
        const token = localStorage.getItem("token")
        const userId = "62ea7bc4455eb00e513be2b3"
        await this.axios.get(`${API_URL}/user/${userId}`, {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
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


  