<template>

    <div class="container">
        <div class="row">
            <NavegadorAdministrador> </NavegadorAdministrador>
            <div v-if="showConfirmacion" class="col-12 col-md-11 col-lg-7 np position-alert text-center">
    
            <div class="alert alert-success col-12 np" role="alert">
               <div class="row">
                    <div class="col-12 col-md-6 text-center">
                        <button class="btnCerrarErrores" @click="showConfirmacion = false">
                        Cerrar ❌
                        </button>
                    </div>
                    <div class="col-12 col-md-6 text-center">
                    <button class="btnAceptar" @click="eliminarEstablecimiento">
                        Confirmar ❌
                        </button>
                    </div>  
                </div>       
            </div>
            </div>

            <div class="col-12 DatosTotales">
                <div class="col-12 col-md-6">
                    Total de Establecimientos: {{establecimientos.length}}
                </div>
            </div>
            <div class="col-12 np espacioTabla">
                <div class="table-responsive">
                    <table class="table table-hover text-center">
                        <thead>
                            <tr >
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">ID del Creador</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="establecimiento in establecimientos" :key="establecimiento.id">
                            <th scope="row">{{establecimiento.id}}</th>
                            <td> {{establecimiento.name}} </td>
                            <td> {{establecimiento.id}} </td>
                            <td> {{establecimiento.rating}} </td>
                            <td> <button @click="getIDEstablecimiento" class="btn btn-danger" :value="establecimiento.id">Eliminar</button> </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import NavegadorAdministrador from "@/components/NavegadorAdministrador.vue";
export default {
    components:{
        NavegadorAdministrador,
    },
    data(){
        return{
            nameAdministrador :{},
            establecimientos:{},
            idEstablecimiento : '',
            showConfirmacion:false,
        }
    },
    created(){
        var storeData = this.$store.getters.loggeIn;
        if(storeData != null){
        this.$axios.$get('https://dtodoaqui.xyz/api/users/'+ storeData.id).then((response) => {
            this.nameAdministrador = response.data;
            if(this.nameAdministrador.roles != 'Administrador'){
                $nuxt.$router.push('/')
            }
        }).catch((error) => {
        
        console.log(error);
        });
        }
        this.$axios.$get('https://dtodoaqui.xyz/api/listings/').then((response) => {
        this.establecimientos = response.data;
        console.log(this.establecimientos);
          this.establecimientos.forEach((item) => {
            this.$axios.$get(`https://dtodoaqui.xyz/api/listings/`+item.id+`/rating`).then((response) => {
            item.rating = response.sum;
           //console.log(item.rating + '-' + item.id);
          }).catch((error) => {
          console.log(error);
          });
          });
        }).catch((error) => {
        
        console.log(error);
        });
    },
    methods:{
        getIDEstablecimiento(e) {
            this.idEstablecimiento = e.target.value;
            this.showConfirmacion = true;
        },
        eliminarEstablecimiento(){
            console.log(this.idEstablecimiento);
            this.$axios.$delete('https://dtodoaqui.xyz/api/listings/'+this.idEstablecimiento).then((response) => {
                location.reload();
                }).catch((error) => {
                
                console.log(error);
                });
        }
    }
}
</script>
<style scoped>
.DatosTotales{
    margin-top:25px;
    margin-bottom: 25px;
    font-size: 20px;
    font-family: 'muli_semibold';
    
}
</style>

