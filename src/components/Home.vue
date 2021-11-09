<template>
  <div class="welcome-container">
      <h1>¡Bienvenido! <span>{{name}}</span></h1>
  </div>
</template>

<script>
export default {
    name:"Home",
    data:function(){
        return{
            name:localStorage.getItem('name') || "none"
        }
    }
}
</script>

<style>

</style>