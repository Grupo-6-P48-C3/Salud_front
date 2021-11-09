<template>
  <div class="register_user">
      <div class="container_register_user">
          <div class="container_register">
            <h2 class="sesion_title">Registrarse</h2>
            <p>Ingresa los campos para poder registrarte.</p>
          </div>
          <form v-on:submit.prevent="processSingUp">
              <label for="Name">Nombres Y Apellidos</label>
              <input name="Name" type="text" v-model="user.name" placeholder="Digite su Nombre y Apellido">
              <label for="Email">Email</label>
              <input name="Email" type="email" v-model="user.email" placeholder="Digite Correo Electrónico">
              <label for="Telefono">Teléfono</label>
              <input name="Telefono" type="number" v-model="user.telephone" placeholder="Digite su Teléfono">
              <label for="Password">Contraseña</label>
              <input name="Password" type="password" v-model="user.password" placeholder="Digite Contraseña">
              <button type="submit">Registrarse</button>
          </form>
      </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
    name:"SingUp",
    data:function(){
        return{
            user:{
                email:"",   
                name:"",
                password:"",
                telephone:"",
                              
                
            }
        }
    },

    methods:{
        processSingUp:function(){
            axios.post(
                "https://salud648p.herokuapp.com/api/user/create/",
                this.user,
                {headers:{
                   
                }})
                .then((result) => {
                    let dataSingUp={
                        email:  this.user.email,
                        token_access:   result.data.access,
                        token_refresh:  result.data.refresh,
                    }
                    this.$emit('completedSingUp',dataSingUp)
                })
                .catch((error)=>{
                    if(error.response.status=="401" || error.response.status=="400")
                        Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: '¡No fué posible el Registro!',
                                })
                })
        }
    },
}
</script>

<style>
.container_register{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 50px;
    padding-top: 100px;
}
.container_register p{
    color:#807A7A;
    font-size: 12px;
    font-weight: bold;
}

</style>