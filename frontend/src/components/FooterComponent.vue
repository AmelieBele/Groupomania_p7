<template>
<div class="footer">
  <p>Groupomania © 2022</p>
  <a class="contact" href="#">Nous contacter</a>
</div>  
</template>

<script>

export default {
  name: 'FooterComponent',
}
</script>

<style lang="scss" scoped>
  .footer{
    padding-top: 50px;
    padding-bottom:50px;
    border-top: solid 1px white ;

    p{
      margin-bottom: 10px;
    }
    .contact{
      color:black;
      text-decoration: none;
      
    }
    :hover.contact{
      color: #fd2d01;
    }

  }
</style>