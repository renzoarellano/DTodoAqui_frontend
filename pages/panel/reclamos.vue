<template>
    <div class="container">
        <div class="row">
            <NavegadorAdministrador> </NavegadorAdministrador>

            <div class="col-12 DatosTotales">
                <div class="col-12 col-md-6">
                    Total de Establecimientos: {{establecimientos.length}}
                </div>
            </div>
            <div class="col-12 np espacioTabla">
                <div class="table-responsive">
                    <table class="table table-hover text-center">
                        <thead>
                            <tr>
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
                            <td> <button class="btn btn-success" :value="establecimiento.id">Revisar</button> </td>
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
            reports :{}
        }
    },
    created(){
        this.$axios.$get('https://dtodoaqui.xyz/api/reports/').then((response) => {
        this.reports = response.data;
        console.log(this.reports);
        }).catch((error) => {
        
        console.log(error);
        });

    }
}
</script>
