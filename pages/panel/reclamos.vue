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
                    <button class="btnAceptar" @click="aceptarDenuncia">
                        Confirmar ❌
                        </button>
                    </div>  
                </div>       
            </div>
            </div>
      

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
                            <tr v-for="report in reports" :key="report.id" class="" v-bind:class="{'table-success': report.is_approved, 'table-danger': !report.is_approved}">
                            <th scope="row">{{report.id}}</th>
                            <td> {{report.message}} </td>
                            <td> {{report.user_id}} </td>
                             <td> {{report.listing_id}} </td>
                            <td> <button @click="getIDReclamo" class="btn btn-success" :value="report.id" :disabled="report.is_approved">Aceptar Reclamo</button> </td>
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
            reports :{},
            showConfirmacion:false,
            idReclamo : '',
            cambioReport : {}
        }
    },
    created(){
        this.$axios.$get('https://dtodoaqui.xyz/api/reports/').then((response) => {
        this.reports = response.data;
        console.log(this.reports);
        }).catch((error) => {
        
        console.log(error);
        });

    },
    methods:{
        getIDReclamo(e) {
            this.idReclamo = e.target.value;
            this.showConfirmacion = true;
        },
        aceptarDenuncia(){
            console.log(this.idReclamo);
            this.$axios.$get('https://dtodoaqui.xyz/api/reports/'+this.idReclamo).then((response) => {
                this.cambioReport = response.data;
                let denuncia = JSON.stringify ({
                report: {
                'message': this.cambioReport.message,
                'is_approved': true,
                'listing_id': parseInt(this.cambioReport.listing_id),
                'user_id': parseInt(this.cambioReport.user_id)
                }
                });

                this.$axios.$put('https://dtodoaqui.xyz/api/reports/'+this.idReclamo, denuncia,{
                    headers: {
                        'Content-Type': 'application/json'      
                    },
                })
                .then((response) => { 
                    location.reload();
                    //console.log(this.errors);
                })
                .catch((error) => {
                    this.errors.push('¡Usuario no registrado!');
                    this.showError = true;
                    //currentObjl.output = error.response;
                    console.log(currentObjl.output);
                });
                }).catch((error) => {
                
                console.log(error);
                });
            
             
        },
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

/*Confirmación*/
.np{
    padding-left: 0px;
    padding-right: 0px;
}
.btnCerrarErrores {
    background-color: transparent;
    outline: none;
    border: 1px solid rgba(255, 29, 71, 1);
    font-family: 'muli_bold';
    padding: 10px 10px 10px 10px;
    font-size: 15px;
    color: rgba(255, 29, 71, 1);
    border-radius: 20px;
}

.btnAceptar {
    background-color: transparent;
    outline: none;
    border: 1px solid green;
    font-family: 'muli_bold';
    padding: 10px 10px 10px 10px;
    font-size: 15px;
    color: gren;
    border-radius: 20px;
}


.modal {
    width: 500px;
    height: 500px;
    margin: 0px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px 3px;
    z-index: 999;
    transition: all 0.2s ease-in;
    font-family: Helvetica, Arial, sans-serif;
}
.position-alert {
    position: fixed;
    margin: auto;
    z-index: 9999;
    
    top: 25%;
}
</style>
