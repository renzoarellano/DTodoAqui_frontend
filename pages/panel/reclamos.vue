<template>
    <div class="container">
        <div class="row">
            <NavegadorAdministrador> </NavegadorAdministrador>

            <div class="col-12 DatosTotales">
                <div class="col-12 col-md-6">
                    Total de Reclamos: {{reports.length}}
                </div>
            </div>
            <div class="col-12 np espacioTabla">
                <div class="table-responsive">
                    <table class="table table-hover text-center">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Mensaje</th>
                            <th scope="col">ID del Creador</th>
                            <th scope="col">ID del Establecimiento</th>
                            <th scope="col">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="report in reports" :key="report.id">
                            <th scope="row">{{report.id}}</th>
                            <td> {{report.message}} </td>
                            <td> {{report.user_id}} </td>
                             <td> {{report.listing_id}} </td>
                            <td> <button class="btn btn-success" :value="report.id">Aceptar</button> </td>
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
<style>
.DatosTotales{
    margin-top:25px;
    margin-bottom: 25px;
    font-size: 20px;
    font-family: 'muli_semibold';
    
}
</style>
