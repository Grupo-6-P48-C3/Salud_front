<template>
  <div class="welcome-container">

      <h1>¡Bienvenido! <span>{{email}}</span></h1>
      <p>Estamos felices de que estés aquí. Creamos Salud a tu lado porque queríamos crear un espacio confiable e inspirador con todo lo que necesitas.</p>
  </div>
</template>

<script>

export default {
    name:"Home",
    data:function(){
        return{
            email:localStorage.getItem('email') || "none"
            
        }
        alert(data)
    }
    
}
</script>

<style>
.welcome-container{
    display: flex;
    flex-direction: column;;
    justify-content: center;
    width: 60%;
    margin-top: 220px;
    position: absolute;
    
}
.welcome-container p{
    width: 100%;
    padding-left: 170px;
    padding-right: 170px;
    margin-top: 20px; 
    font-weight: bold;   
}
.welcome-container span{
    color:green;
    margin-left: 20px;
}
</style>