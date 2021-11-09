<template>
  
  <div id="app" class="app">
    <div  iv class="background_body">
    </div>
    <div class="header">  
      <nav>
        <img class="logo" alt="logo del hospital" src="./assets/hospital.png">
        <div class="container_title">
        <h1 class="nav_title">Salud a tu lado</h1>
        </div>
          <div class="button_container">
            <button v-if="is_auth" v-on:click="loadHome">Inicio</button>
            <button v-if="is_auth" v-on:click="loadGestionCitas">Gestion Citas</button>           
            <button v-if="!is_auth" v-on:click="loadLogin">Iniciar Sesión</button>
            <button v-if="!is_auth" v-on:click="loadSingUp">Registrarse</button>
            <button v-if="is_auth" v-on:click="loadOut">Cerrar Sesión</button>
          </div>
      </nav>
      
    </div>

    <div class="main-component">
      <router-view 
        v-on:completedLogin="completedLogin"
        v-on:completedSingUp="completedSingUp"
        v-on:logOut="logOut"
      >  
      </router-view>
    </div>
    
    <div class="footer">
      <h1>Todos los derechos reservados @Team 6 - Grupo P48 C3</h1>
    </div>

  
  </div>
</template>

<script>

export default {
  name:"App",

  data:function(){
    return{
      is_auth:false
    }
  },
  components:{

  },

  methods:{
    verifyAuth:function(){
      this.is_auth=localStorage.getItem("isAuth") || false;
      if(this.is_auth==false)
        this.$router.push({name:"Login"}) 
      else
      this.$router.push({name:"Home"})
    },
    loadLogin:function(){
      this.$router.push({name:"Login"})
    },
    loadSingUp:function(){
      this.$router.push({name:"SingUp"})
    },
    loadHome:function(){
      this.$router.push({name:"Home"})
    },
    loadOut:function(){
      localStorage.clear();
      alert("Has Cerrado Sesión");
      this.verifyAuth();
      this.$router.push({name:"Login"})
    },
    loadGestionCitas:function(){
      this.$router.push({name:"GestionCitas"})
    },
    completedLogin:function(data){
      localStorage.setItem("isAuth",true);
      localStorage.setItem("email",data.email);
      localStorage.setItem("token_access",data.token_access);
      localStorage.setItem("token_refresh",data.token_refresh);
      alert("Verificación Exitosa");
      this.verifyAuth();
    },
    completedSingUp:function(data){
      alert("Registro Exitoso");
      this.completedLogin(data);
    },
  },

  created:function() {
    this.verifyAuth()
  },
}
</script>


<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header{
padding-top: 30px;
}
nav{
  display: flex;
  width: 70%;
  margin-right:50px;
  margin-left: 50px;
  position:absolute;
}
.logo{
  width: 50px;
}
.container_title{
  width: 250px;
}
.nav_title{
  margin-top: 10px;
}
.background_body{
background-image: url(./assets/background-login.png);
background-size: cover;
background-repeat: no-repeat;
width: 60vw;
height:850px;
float: right;
position: relative;
}

.footer{
  margin-top: 40px;
  font-size: 6px;
}

.button_container{
  display: flex;
  gap:5%;
}
.button_container button{
  width:  150px;
  height: 50px;
  background-color: #00CEC8;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}
</style>
