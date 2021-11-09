<template>
  <div v-if="loaded" class="information">
      <h2>Listado de Citas</h2>
      <div class="table">
          <table>
              <tbody>
                  <tr>
                      <td><strong>Nombre del Paciente</strong></td>
                      <td><strong>Teléfono del Paciente</strong></td>
                      <td><strong>Fecha de la Cita del Paciente</strong></td>
                      <td><strong>Hora de la Cita del Paciente</strong></td>
                      <td><strong>Area Consulta</strong></td>
                  </tr>
                  <tr v-for="todo in todos" :key="todo.id">
                      <td>{{todo.user.name}}</td>
                      <td>{{todo.user.telephone}}</td>
                      <td>{{todo.fechaCita}}</td>
                      <td>{{todo.horaCita}}</td>
                      <td>{{todo.areaConsulta}}</td>
                  </tr>
              </tbody>
          </table>
      </div>



  </div>
</template>

<script>
import jwt_decode from "jwt-decode";
import axios from "axios";

export default {
    name:"GestionCitas",
    data:function(){
        return{
            todos:null,
            loaded:false,
        }
    },
    methods:{
        getData:async function(){
            if(localStorage.getItem("token_access")===null || localStorage.getItem("token_refresh")==null){
                this.$emit('logOut');
                return;
            }
            await this.verifyToken();
            let token=localStorage.getItem("token_access")
            let userId=jwt_decode(token).user_id.toString();

            axios.get(`https://salud648p.herokuapp.com/api/gestioncitas/list/${userId}/`,
            {headers:{'Authorization':`Bearer ${token}`}})
            .then((result)=>{
                this.todos=result.data
                this.loaded=true;
                console.log(result)
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
        this.getData()
    }
}
</script>

<style>
.information{
    padding-top: 100px;
}

table{
    border-collapse: collapse;
    border:2px solid black;
    width: 60%;
    position: absolute;    
}
td{
    border:2px solid black;
    padding:7px;
}
.table{
    padding-left: 55px;
    padding-top: 30px;
}
.information h2{
    padding-right: 1050px;
}

</style>