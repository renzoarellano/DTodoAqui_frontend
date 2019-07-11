<template>

    <div class="container">
        <div class="row">
            <NavegadorAdministrador> </NavegadorAdministrador>

            <div class="col-12 DatosTotales">
                <div class="col-12 col-md-6">
                    Total de Establecimientos: 
                </div>
            </div>
            <div class="col-12 np espacioTabla">
                <div class="table-responsive">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Creador</th>
                            <th scope="col">Rating</th>
                            <th scope="col">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                            <td>@mdo</td>
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
            nameAdministrador :'',
            establecimientos:{},
        }
    },
    created(){
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

    }
}
</script>
<style scoped>
.DatosTotales{
    margin-top:25px;
}
</style>

