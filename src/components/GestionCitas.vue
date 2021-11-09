<template>
  <div v-if="loaded" class="information">
      <h1>Información de la Cita</h1>
      <h2>Nombre: <span>{{name}}</span></h2>
      <h2>Teléfono: <span>{{telephone}}</span></h2>
      <h2>Fecha: <span>{{fechaCita}}</span></h2>
      <h2>Hora: <span>{{horaCita}}</span></h2>
      <h2>Area de Consulta: <span>{{areaConsulta}}</span></h2>

  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
    name:"GestionCitas",
    data:function(){
        return{
            name:"",
            telephone:"",
            fechaCita:"",
            horaCita:"",
            areaConsulta:"",
            loaded:false,
        }
    },
    methods:{
        getData:async function(){
            if(localStorage.getItem("token_access")===null || localStorage.getItem("token_refresh")===null){
                this.$emit('logOut');
                return;
            }
            await this.verifyToken();
            let token=localStorage.getItem("token_access")
            let userId=jwt.jwt_decode(token).user_id.toString();

            axios.get(`https://salud648p.herokuapp.com/api/gestioncitas/list/${userId}/`,
            {headers:{'Authorization':`Bearer${token}`}})
            .then((result)=>{
                this.name=result.data.name;
                this.telehpone=result.data.telephone;
                this.fechaCita=result.data.fechaCita;
                this.horaCita=result.data.horaCita;
                this.areaConsulta=result.data.areaConsulta;
                this.loaded=true;
            })
            .catch(()=>{
                this.$emit('logOut');
            })
        },
        verifyToken:function(){
            return axios.post("https://salud648p.herokuapp.com/api/refresh/",
            {refresh:localStorage.getItem("token_refresh")},
            {headers:{}})
            .then((result)=>{
                localStorage.setItem("token_access",result.data.access)
            })
            .catch(()=>{
                this.$emit('logOut')
            })
        }
    },
    created:async function(){
        this.getData();
    }
}
</script>

<style>

</style>