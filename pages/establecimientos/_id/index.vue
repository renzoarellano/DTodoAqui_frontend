<template>
    <div>
        <Header/>


    
        <div class="container" style="padding-top:100px;">
        <div class="row">
          <div v-if="showError" class="col-12 col-md-11 col-lg-7 np position-alert text-center">
    
            <div class="alert alert-danger" role="alert">
                <p>
                    <b>Porfavor corriga los siguientes errores: </b>
    
                    <li v-for="error in errors" :key="error">{{ error }}</li>
                </p>
                <button class="btnCerrarErrores" @click="showError = false">
    
                    Cerrar ❌
    
                </button>
    
            
    
        </div>
        </div>

        <div class="container">
        <div class="row">
        <div v-if="showDenuncia" class="col-12 col-md-11 col-lg-7 np position-denuncia text-center">
            
            <div class="alert alert-danger" role="alert">
                <div class="col-12 np text-right">
                <button class="btnCerrarErrores" @click="showDenuncia = false">
    
                    Cerrar ❌
    
                </button>
            </div>
                <form @submit="enviarDenuncia">
                     <div class="group">
                            
                            <label for="registroDireccionEstablecimiento" class="label">Describa el motivo por lo cual esta denunciando a este establecimiento</label>
                            <textarea @change="getdescripcionDenuncia" id="registroDescripcionEstablecimiento" cols="30" rows="5" class="input" placeholder="Explicación en menos de 250 carácteres"></textarea>
                    </div>
                    <div class="col-12 np text-center group">
                        <button type="submit" class="button">Registrar denuncia</button>
                    </div>
                </form>
                
            </div>
         </div>
         </div> 
         </div>  
        
        </div>
        
        <div class="row">
            <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
               <button v-if="showEditar" class="btn btn-success" @click="editarEstablecimiento">Editar</button>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-right">
               <button  class="btn btn-danger" @click="denunciarEstablecimiento">Denunciar</button>
            </div>
            <div class="col-12 text-center">
                <h1 class="tituloEstablecimiento">
                    {{datos.name}}
                </h1>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 text-center">
                <img class="tamLogoEstablecimiento" :src="`https://dtodoaqui.xyz/`+datos.slug" >
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                <GmapMap
                :center="{lat: parseFloat(datos.latitude), lng:parseFloat(datos.longitude)}"
                :zoom="16"
                style="width: 100%; max-height: 450px; min-height: 400px; border: 2px solid black"
                >
                    
                <gmap-marker
                :key="index"
                v-for="(m, index) in markers"
                :position="m.position"
                :clickable="true"
                :draggable="true"
                @click="center=m.position"
                ></gmap-marker>
                </GmapMap>
            </div>

            <div class="col-12 espacioDatosEstablecimiento">
                <div class="row">
                <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                    <p class="datoEstablecimiento">Dirección: <span class="resulDatoEstablecimiento">{{datos.address}}</span></p> 
                    <p class="datoEstablecimiento">Categoría: <span class="resulDatoEstablecimiento">{{categoria}}</span></p> 
                    <p class="datoEstablecimiento">Distrito: <span class="resulDatoEstablecimiento">{{location}}</span></p> 
                    <p class="datoEstablecimiento">Horario de atención: <span class="resulDatoEstablecimiento">{{datos.opening_hours}}</span></p> 
                </div>
                <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6 ">
                    <p class="datoEstablecimiento">Descripción:<br><span class="resulDatoEstablecimiento">{{datos.description}}</span></p> 
                </div>
                </div>

            </div>
        </div>
        <div class="row espacioReseña">
            <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div class="col-12 np">
                    <h2 class="h2Resena">Reseñas</h2>
                </div>
               <div class="resenaEspace col-12 " v-for="resena in resenaPuestas" :key="resena.id">
                   <p class="datoEstablecimiento">Usuario: <span class="resulDatoEstablecimiento">{{resena.username}}</span></p> 
                   <p class="datoEstablecimiento">Titulo: <span class="resulDatoEstablecimiento">{{resena.name  }}</span></p> 
                   <div class="col-12">
                       <p class="datoEstablecimiento">Reseña: <span class="resulDatoEstablecimiento">{{resena.description}}</span></p> 
                   </div>
               </div>
            </div>
            <div class="col-12 col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <form @submit="formResena" enctype="multipart/form-data" autocomplete="off">
                    <div class="col np">
                        <label for="">Ingrese su reseña</label>
                    </div>
                    <label for="registroMotivo" class="label">Título:</label>
                    <input id="tituloResena" v-model="tituloResena" type="text" class="inputTitulo" placeholder="Ingrese un título">
                    <textarea @change="getResena" v-model="resenaEstablecimiento"  id="registroDescripcionEstablecimiento"  class="input" placeholder="Ingrese hasta 250 carácteres"></textarea>
                <div class="col text-center" style="margin-top:15px; margin-bottom:15px;">
                     <button type="submit" class="button">Ingresar Reseña</button>
                </div>
                </form>
            </div>
        </div>
        
    </div>
    <Footer/>
    </div>
</template>

<script>
import axios from 'axios';
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import componentMap from '@/components/componentMap.vue';

export default {
    components:{
        Header,
        componentMap,
        Footer,
    },
data(){
    return{
        datos:{},
        categoria:'',
        location:'',
        idEstablecimiento: '',
        resenaEstablecimiento: '',
        descripcionDenuncia :'',
        resenaPuestas:{},
        showError:false,
        userCreador:'',
        showDenuncia:false,
        showEditar:false,
        tituloResena: '',
        markers: [
        {position: { lng: 10.2, lat: 10 }}
        ],
             
        errors:[],
    }
},
mounted(){
    
    this.idEstablecimiento = this.$route.params.id;
    this.$axios.$get('https://dtodoaqui.xyz/api/listings/'+this.idEstablecimiento).then((response) => {
        this.datos = response.data;
        console.log(this.datos);
        this.markers[0].position.lat = this.datos.latitude;
        this.markers[0].position.lng = this.datos.longitude;
        this.userCreador = this.datos.user_id;
        var storeData = this.$store.getters.loggeIn;
        console.log(this.userCreador);
        this.$axios.$get('https://dtodoaqui.xyz/api/categories/'+this.datos.category_id).then((response) => {
            this.categoria = response.data.name;
            }).catch((error) => {
            console.log(error);
            });

            this.$axios.$get('https://dtodoaqui.xyz/api/location/'+this.datos.location_id).then((response) => {
            this.location = response.data.name;
            }).catch((error) => {
            console.log(error);
            });
        //console.log(storeData);
        if(storeData.id == parseInt(this.userCreador) && storeData != null){
            this.showEditar = true;
        }else{
            this.showEditar = false;
            
        }
        //console.log(this.markers[0].position.lat);
        
           
        }).catch((error) => {
        
        console.log(error);
        });

         

     this.$axios.$get('https://dtodoaqui.xyz/api/listings/'+this.idEstablecimiento+'/reviews').then((response) => {
        this.resenaPuestas = response.data;
        //console.log(this.resenaPuestas);
        }).catch((error) => {
        console.log(error);
        });   
},
methods:{
    getResena(event) {
            this.resenaEstablecimiento = event.target.value
            //console.log(this.resenaEstablecimiento);
        },
    formResena(e){
        e.preventDefault();
        this.errors=[];
        if(!this.tituloResena){
            this.errors.push('Ingrese un título para su reseña porfavor');
            this.showError = true;
        }
        if(this.resenaEstablecimiento.length > 250){
            this.errors.push('La reseña es muy larga, tiene que tener un maximo de 250 carácteres');
            this.showError = true;
        }else if(!this.resenaEstablecimiento ){
            this.errors.push('Ingrese una reseña porfavor!');
            this.showError = true;
        }else{
            var storeData = this.$store.getters.loggeIn;
            if(storeData == null){
                this.errors.push('¡Usuario no registrado!');
                this.showError = true;
            }else{
                let resenas = JSON.stringify ({
                review: {
                'description': this.resenaEstablecimiento,
                'is_published': true,
                'listing_id': parseInt(this.idEstablecimiento),
                'name': this.tituloResena,
                'user_id': parseInt(storeData.id)
                }
            });
            this.$axios.$post('https://dtodoaqui.xyz/api/reviews', resenas,{
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
            } 
        }
    },
    editarEstablecimiento(){
       $nuxt.$router.push('/establecimientos/'+this.idEstablecimiento+'/edicion');
    },
    denunciarEstablecimiento(){
        this.showDenuncia = true;
    },
    getdescripcionDenuncia(){
        this.descripcionDenuncia = event.target.value
    },
    enviarDenuncia(e){
        e.preventDefault();
        this.errors =[];
        e.preventDefault();
        this.errors=[];
            if(this.descripcionDenuncia.length > 250){
                this.errors.push('Su denuncia tiene que ser concisa y menor a 250 carácteres');
                this.showError = true;
            }
            if(!this.descripcionDenuncia){
                this.errors.push('Ingrese su denuncia');
                this.showError = true;
            }else{
                var storeData = this.$store.getters.loggeIn;

            let denuncia = JSON.stringify ({
                report: {
                'message': this.descripcionDenuncia,
                'is_approved': false,
                'listing_id': parseInt(this.idEstablecimiento),
                'user_id': parseInt(storeData.id)
            }
            });
             this.$axios.$post('https://dtodoaqui.xyz/api/reports', denuncia,{
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
            }
    }
    },
    
}
</script>

<style>
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

.modal {
    width: 500px;
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
    top: 10%;
}
.position-denuncia {
    position: fixed;
    margin: auto;
    z-index: 996;
    top: 10%;
}

.button{
    color:rgba(255,29,71,1);
    font-family: 'muli_bold';
    font-size: 18px;
    transition: 0.4s all;
    background-color: white;
    border:1px solid black;
    transition: 0.4s all;
    padding: 5px 10px 5px 10px;
    border-radius:20px;
}
.button:hover{
    color:white;
    font-family: 'muli_bold';
    font-size: 18px;
    transition: 0.4s all;
    background-color: rgba(255,29,71,1);
    border:1px solid black;
    transition: 0.4s all;
    padding: 5px 10px 5px 10px;
    border-radius:20px;
    outline:none;
}
#registroDescripcionEstablecimiento{
    width:100%;
    height:100px;
    border:1px solid black;
    font-family:'muli_semibold';
    font-size:15px;
    border-radius:20px;
    outline:none;
    padding: 5px 10px 5px 10px;
}
.tamLogoEstablecimiento{
    width: 100%;
    max-height: 450px;
    min-height: 250px;
}
.mapGoogle{
    width:100%;
    max-height: 450px;
    min-height: 400px;
}
.tituloEstablecimiento{
    font-family: 'muli_bold';
    margin-bottom: 20px;
}
.espacioDatosEstablecimiento{
    border:2px solid rgba(255,29,71,1);
    padding: 25px 15px 25px 15px;
    margin-top:25px;
}
.datoEstablecimiento{
    color:rgba(255,29,71,1);
    font-size: 15px;
    text-transform: capitalize;
    font-family: 'muli_semibold';
}
.resulDatoEstablecimiento{
    color:#232323;
    font-family: 'muli_bold';
}
.espacioReseña{
    margin-top:25px;
}
.resenaEspace{
    border:1px solid #232323;
    padding: 10px 2px 10px 2px;
    margin-bottom: 20px;
}
.h2Resena{
    color:#232323;
    font-family: 'muli_bold';
}
.inputTitulo{
    border:1px solid #232323;
    width:100%;
    padding: 5px;
    border-radius:25px;
    margin-bottom: 15px;
    outline: none;
}

</style>
