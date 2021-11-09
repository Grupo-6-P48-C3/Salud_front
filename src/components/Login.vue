<template>
  <div class="login_user">
      <div class="container_login_user">
          <div class="container_sesion">
            <h2 class="sesion_title">Iniciar Sesión</h2>
            <p>Ingresa los campos para poder iniciar sesión.</p>
          </div>
          <form v-on:submit.prevent="processLoginUser">
              <label for="Email">Email</label>
              <input name="Email" type="text" v-model="user.email" placeholder="Digite Correo Electrónico">
              <label for="Password">Contraseña</label>
              <input name="Password" type="password" v-model="user.password" placeholder="Digite Contraseña">
              <button type="submit">Iniciar Sesión</button>
          </form>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name:"Login",
    data:function(){
        return{
            user:{
                email:"",
                password:"",
            }
        }
    },
    methods: {
        processLoginUser:function(){
            axios.post(
                "https://salud648p.herokuapp.com/api/login/",
                this.user,
                {headers:{
                   
                }})
                .then((result) => {
                    let dataLogin={
                        email:  this.user.email,
                        token_access:   result.data.access,
                        token_refresh:  result.data.refresh,
                    }
                    this.$emit('completedLogin',dataLogin)
                })
                .catch((error)=>{
                    if(error.response.status=="401")
                        Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: '¡Credenciales Incorrectas!',
                                })
                })
        }
    },
}
</script>

<style>
.container_sesion{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 50px;
    padding-top: 100px;

}
.container_sesion p{
    color:#807A7A;
    font-size: 12px;
    font-weight: bold;
}

form{
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding-left: 50px;
    margin-top: 60px;
}
form label{
    align-self: start;
    font-weight: bold;
}
form input{
    border: 2px solid #E5E5E5;
    width: 366px;
    height: 66px;
    border-radius: 5px;
    font-size: 20px;
    text-align: center;
}
form button{
    width: 366px;
    height: 66px;
    background-color: #00CEC8;
    border:none;
    border-radius: 5px;
    color:white;
    font-weight: bold;
    font-size: 20px;
    cursor: pointer;
}

form input:enabled{
    outline-color: #888686;
}

form button:hover{
    background-color: #03e4dc;
}
</style>