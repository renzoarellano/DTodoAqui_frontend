<template>
    <div class="espacioUser">
        <div class="container">
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
                <div class="backTopProfile col-12">
                    <div class="row">
                        <div class="pictureUser col-12 col-md-6">
                            <div class="col-xs-12 np">
                                <img class="tamPicture" v-bind:src="'https://dtodoaqui.xyz/'+slug" alt="">
                            <input style="display:none" id="fotoPerfil" type="file" class="input" @change="onFotoPerfilFile" ref="subirFotoPerfil">
    
                            <button class="estiloSubirFotoProfile" @click="$refs.subirFotoPerfil.click()">
    
                                Actualizar Logo
    
                            </button>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="col-12">
                                <h2 class="nameUser text-center">
                                    {{name}}
                                </h2>
                            </div>
                            <div class="col-12 text-center">
                                <a target="_blank" class="iconRedes" v-bind:href="linkFacebook">
                                    <img src="~/assets/facebook.png" alt="Facebook - DtodoAqui">
                                </a>
                            </div>
                            <div class="col-12 text-justify posDescripcion">
                                <div class="col-12 np">
                                    <h5 class="subtituloDescp">
                                        Descripción:
                                    </h5>
                                </div>
                                <p class="descriptionUser">
                                    {{descripcion}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 posDatosTotales">
                    <h1 class="titDatos">
                        Información del establecimiento:
                    </h1>
                </div>
                <div class="col-12 col-md-4 text-left">
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
                <div class="col-12 col-md-8 text-left">
                    <div class="col-12 np">
                        <div class="row">
                            <div class="col-12 col-md-6">
                                <button @click="cambiarDatos" class="btnModificarDatos">
                                        Modificar Datos
                                    </button>
                            </div>
                            <div v-if="changeDatos" class="col-12 col-md-6 text-right">
                                <button @click="cancelarDatos" class="btnCancelarDatos">
                                        Cancelar
                                    </button>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 posLoginNames">
                        <form @submit="formDatos" autocomplete="off">
                            <div class="form-group">
                                <label for="firstName"><i class="fab fa-galactic-senate"></i> Nombre del Establecimiento: </label>
                                <input type="text" v-model="name" class="inputProfile" aria-describedby="nameHelp" placeholder="Nombre del establecimiento" :disabled="!changeDatos">
                                <small id="nameHelp" class="form-text text-muted">Este campo es obligatorio!.</small>
                            </div>
                            <div class="form-group">
                                <label for="lastName"><i class="fas fa-dice-d20"></i> Dirección del establecimiento: </label>
                                <input type="text" v-model="address" class="inputProfile" aria-describedby="apellidoHelp" placeholder="Dirección" :disabled="!changeDatos">
                                <small id="apellidoHelp" class="form-text text-muted">Este campo es obligatorio!.</small>
                            </div>
                            <div class="form-group">
                                <label for="phoneUser"><i class="fas fa-phone-square"></i> Horario de atención: </label>
                                <input type="text" v-model="openingHours" class="inputProfile" aria-describedby="telefonoHelp" placeholder="Horario de atención" :disabled="!changeDatos">
                                <small id="nameHelp" class="form-text text-muted">Este campo es obligatorio!.</small>
                            </div>
                            <div class="col-12 np" v-if="!changeDatos">
                            <div class="form-group">
                                <label for="phoneUser"><i class="fas fa-phone-square"></i> Categoría: </label>
                                <input type="text" v-model="categoria" class="inputProfile" aria-describedby="telefonoHelp" placeholder="" :disabled="!changeDatos">
                                <small id="nameHelp" class="form-text text-muted">Este campo es obligatorio!.</small>
                            </div>
                            <div class="form-group">
                                <label for="phoneUser"><i class="fas fa-phone-square"></i> Distrito: </label>
                                <input type="text" v-model="location" class="inputProfile" aria-describedby="telefonoHelp" placeholder="" :disabled="!changeDatos">
                                <small id="nameHelp" class="form-text text-muted">Este campo es obligatorio!.</small>
                            </div>
                            </div>
                            
                            <div v-if="changeDatos" class="col-12 np">
                                <div class="group" style="margin-top:20px">
    
                            <label for="registroDireccionEstablecimiento" class="label">Ingrese distrito (Obligatorio)</label>
                            <select id="listaCategoriase" v-model="location_id" >
                            <option disabled selected  value="">Seleccione un distrito</option>
                            <option v-for="distrito in distritos"  :value="distrito.id" :key="distrito.id">{{distrito.name}}</option>
                            </select>
    
                            <!--region-select class="form-control" v-model="region" :country="country" /-->
                            </div>
                            <div class="group" style="margin-top:20px">
    
                            <label for="registroDireccionEstablecimiento" class="label">Seleccione una categoría (Obligatorio)</label>
                            <select id="listaCategoriase" v-model="categoria_id" >
                            <option disabled selected  value="">Seleccione una categoria</option>
                            <option v-for="categoria in categorias"  :value="categoria.id" :key="categoria.id">{{categoria.name}}</option>
                            </select>
                            <!--region-select class="form-control" v-model="region" :country="country" /-->
                            </div>
                                <div class="form-group">
                                <label for="phoneUser"><i class="fas fa-phone-square"></i> Nuevo Link de Google Map: </label>
                                <input type="text" v-model="linkGoogle" class="inputProfile" aria-describedby="telefonoHelp" placeholder="Ingrese link válido" :disabled="!changeDatos">
                                <small id="nameHelp" class="form-text text-muted">Este campo es obligatorio!.</small>
                                </div>
                           
                                <div class="form-group">
                                    <label for="paisUser"><i class="fas fa-grin-beam-sweat"></i>Nueva Descripción: </label>
                                    <textarea @change="descripcion"  class="inputProfile" rows="5" placeholder="Mi Descripción" v-bind:value="descripcion"></textarea>
                                    <small id="nameHelp" class="form-text text-muted">Opcional</small>
                                </div>
                                <div class="col-12 text-center">
                                    <button type="submit" class="btnActualizar">Actualizar Datos</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'

import vueCountryRegionSelect from 'vue-country-region-select'
Vue.use(vueCountryRegionSelect)
    export default {
        name: 'ProfileUser',
        data() {
            return {
                fotosFile: '',
                profileImage: '',
                nameProfileImage:'',
                imgSrc:'',
                datos:{},
                categoria:'',
                categorias:{},
                distrito:'',
                distritos:{},
                name:'',
                descripcion:'',
                slug:'',
                openingHours:'',
                linkFacebook:'',
                location:'',
                idEstablecimiento: '',
                linkGoogle:'',
                getID:'',
                address:'',
                categoria_id:'',
                location_id:'',
                resenaPuestas:{},
                imgProfile: '',
                markers: [
                {position: { lng: 10.2, lat: 10 }}
                ],
                changePass: false,
                changeDatos: false,
                errors: [],
                showError: false
            }
        },
        methods: {
            setImage(foto) {
            const file = foto
            //console.log(file)

            if (!file.type.includes('image/')) {
                alert('Please select an image file')
                return
            }
            if (typeof FileReader === 'function') {
                const reader = new FileReader()

                reader.onload = (event) => {
                    this.imgSrc = event.target.result
                    this.fotosFile = this.imgSrc;
                    console.log(this.fotosFile);
                    let imageToken = this.$store.getters.loggeIn;
                    let images = JSON.stringify ({
                            image: {
                            'image_name': this.nameProfileImage,
                            'image_base64': this.fotosFile,
                            'entity_id': imageToken.id,
                            'entity_name': 'establecimiento',
                            }
                    })
                    console.log(images);
                    this.$axios.$post('https://dtodoaqui.xyz/api/upload_image',images, {
                        headers:{
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + imageToken.accessToken
                        }
                    }).then((response) => {
                        console.log(response);
                        if(response){
                        var storeData = this.$store.getters.loggeIn;
                        let establecimientoIMG = JSON.stringify ({
                            //user_id': parseInt(UserId.id),
                            listing:{
                            'name': this.name,
                            'address': this.address,
                            'category_id':parseInt(this.categoria_id),
                            'location_id':parseInt(this.location_id),
                            'slug': response.data.image_name,
                            'description':this.descripcion,
                            'latitude': this.markers[0].position.lat,
                            'longitude': this.markers[0].position.lng,
                            'video_youtube': this.linkFacebook,
                            'opening_hours':this.openingHours,
                            'user_id': storeData.id
                            }
                        });
                        console.log(establecimientoIMG);
                        let Tokenimage = this.$store.getters.loggeIn;
                        this.$axios.$put('https://dtodoaqui.xyz/api/listings/'+this.getID,establecimientoIMG, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        }).then((response) => {
                            if(response != null){
                                //alert('Sin errores');
                                window.location.reload(true)
                            }
                        })
                        .catch((error) => {
                            if(error){
                                alert(error);
                            }
                        });
                        }
                    })
                    .catch((error) =>{
                        if(error){
                            alert(error);
                        }
                    });
                }
                reader.readAsDataURL(file)
            } else {
                alert('Sorry, FileReader API not supported')
            }
        },
        onFotoPerfilFile(event) {
            this.fotosFile = event.target.files[0];
            console.log();
            var arrayDeCadenas = this.fotosFile.name.split('.');
            if(arrayDeCadenas[1] == 'png' || arrayDeCadenas[1] == 'jpg'  ){
                this.nameProfileImage = this.fotosFile.name;
                this.setImage(this.fotosFile);
            }else{
               this.errors.push('Seleccione una imagen con formato: JPG, PNG o GIF');
               this.showError = true;
            }
           //Activar esta funcion para pasar la imagen a database64 !importante
        },
        getLatandLong(url){
            var urld = url;
            var regex = new RegExp('@(.*),(.*),');
            var lon_lat_match = urld.match(regex);
            return lon_lat_match;
        },
            getdescripcionProfile(event) {
                this.descripcion = event.target.value
                //console.log(this.descripcionEstablecimiento);
            },
            cambiarContrasena() {
                this.changePass = true;
            },
            cambiarDatos() {
                this.changeDatos = true;
                console.log(this.pais);
            },
            cancelarDatos() {
                this.changeDatos = false;
            },
            cancelarPass() {
                this.changePass = false;
            },
            formDatos(e) {
                e.preventDefault();
                this.errors = [];
                let datosMap = this.getLatandLong(this.linkGoogle);
                var currentObjl = this;
                var storeData = this.$store.getters.loggeIn;
                if(this.slug && this.name && this.address && this.descripcion && this.categoria_id && this.location_id && this.linkGoogle){
                let listings = JSON.stringify ({
                    listing: {
                        'name': this.nombreEstablecimiento,
                        'address': this.direccionEstablecimiento,
                        'category_id':this.categoria_id,
                        'location_id':this.location_id,
                        'slug': this.slugEstablecimiento,
                        'description':this.descripcionEstablecimiento,
                        'latitude': parseFloat(datosMap[1]),
                        'longitude': parseFloat(datosMap[2]),
                        'video_youtube': this.videoYoutube,
                        'opening_hours':this.horarioEstablecimiento,
                        'user_id': storeData.id
                    } 
                });
                console.log(listings);
                console.log(datosMap);
                
                this.$axios.$put('http://35.226.8.87/api/listings/'+parseInt(this.getID), listings,{
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
                });
                
            }else{
                if(!this.slug){
                    this.errors.push('Imagen no encontrada.');
                }
                if(!this.name){
                    this.errors.push('Ingrese el nombre del establecimiento.');
                }
                if(!this.direccion){
                    this.errors.push('Ingrese la dirección del establecimiento.');
                }
                if(!this.descripcion){
                    this.errors.push('Ingrese la descripción del establecimiento.');
                }
                if(!this.categoria_id){
                    this.errors.push('Seleccione una categoría.');
                }
                if(!this.location_id){
                    this.errors.push('Seleccione un distrito.');
                }
                if(!this.linkGoogle){
                    this.errors.push('Ingrese un link válido.');
                }
                this.showError = true;

            }   
        }
        }, 
        created() {

            //Datos ID en string
    this.getID = this.$route.params.id;
    this.$axios.$get('https://dtodoaqui.xyz/api/listings/'+parseInt(this.getID)).then((response) => {
        this.datos = response.data;
        console.log(this.datos);
        this.markers[0].position.lat = this.datos.latitude;
        this.markers[0].position.lng = this.datos.longitude;
        this.userCreador = this.datos.user_id;
        this.name = this.datos.name;
        this.openingHours = this.datos.opening_hours;
        this.slug = this.datos.slug;
        this.address= this.datos.address;
        this.linkFacebook = this.datos.video_youtube;
        this.descripcion = this.datos.description;
        this.categoria_id = this.datos.category_id;
        this.location_id = this.datos.location_id;
        //console.log(this.markers[0].position.lat);
            this.$axios.$get('https://dtodoaqui.xyz/api/categories/'+this.datos.category_id).then((response) => {
            this.categoria = response.data.name;
            //console.log(this.categoria);
            }).catch((error) => {
            console.log(error);
            });

            this.$axios.$get('https://dtodoaqui.xyz/api/location/'+this.datos.location_id).then((response) => {
            this.location = response.data.name;
            //console.log(this.location);
            }).catch((error) => {
            console.log(error);
            });
        }).catch((error) => {
        
        console.log(error);
      });

          /*  let mytokenPromise = this.$store.getters.loggeIn;
            console.log(this.idEstablecimiento);
            Promise.all([mytokenPromise]).then((vals) => {
                this.$axios.$get('http://35.226.8.87/api/listings/'+this.getID, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(result => {
                    console.log(result);
                }).catch((error) => {
                        console.log(error);
                }); 
            });*/
    
        this.$axios.$get('https://dtodoaqui.xyz/api/location').then((response) => {
        this.distritos = response.data;
        console.log(this.distritos);
        }).catch((error) => {
        
        console.log(error);
        });

        this.$axios.$get('https://dtodoaqui.xyz/api/categories').then((response) => {
        this.categorias = response.data;
        console.log(this.distritos);
        }).catch((error) => {
        
        console.log(error);
        });
        },
    }
</script>

<style>
    .np {
        padding-left: 0px;
        padding-right: 0px;
    }
    .tamPicture {
        width: 250px;
        border: 3px solid #ff1d47;
        border-radius: 20px;
        transition: 0.4s all;
    }
    .iconRedes i {
        font-size: 50px;
    }
    .descriptionUser {
        margin: 0;
        font-family: 'muli_regular';
        font-size: 14px;
    }
    .posDescripcion {
        margin-top: 15px;
    }
    .nameUser {
        font-family: 'muli_semibold';
    }
    .posDatosTotales {
        margin-top: 25px;
        border-bottom: 2px solid #ff1d47;
        margin-bottom: 25px;
    }
    .titDatos {
        font-family: 'muli_bold';
        text-align: left;
    }
    .inputProfile {
        border: 2px solid #232323;
        border-radius: 20px;
        padding: 10px;
        font-family: 'muli_semibold';
        font-size: 18px;
        width: 100%;
        margin-left: 5px;
        outline: none;
    }
    .selectedStyle {
        padding: 10px;
        border: 2px solid #232323;
        font-family: 'muli_semibold';
        font-size: 18px;
        border-radius: 20px;
        width: 100%;
        outline: none;
        background-color: white;
    }
    .form-group label i {
        font-size: 21px;
        color: #ff1d47;
    }
    .espacioUser {
        padding-top: 80px;
    }
    .btnModificarPass {
        background-color: transparent;
        border: 1px solid #ff1d47;
        border-radius: 20px;
        padding: 10px;
        font-family: 'muli_semibold';
        font-size: 18px;
        color: #ff1d47;
        transition: 0.4s all;
        outline: none;
    }
    .btnModificarPass:hover,
    .btnModificarPass:focus {
        background-color: #ff1d47;
        border: 1px solid #ff1d47;
        border-radius: 20px;
        padding: 10px;
        font-family: 'muli_semibold';
        font-size: 18px;
        color: white;
        transition: 0.4s all;
        outline: none;
    }
    .btnModificarDatos {
        background-color: transparent;
        border: 1px solid #ff1d47;
        border-radius: 20px;
        padding: 10px;
        font-family: 'muli_semibold';
        font-size: 18px;
        color: #ff1d47;
        transition: 0.4s all;
        outline: none;
    }
    .btnModificarDatos:hover,
    .btnModificarDatos:focus {
        background-color: #ff1d47;
        border: 1px solid #ff1d47;
        border-radius: 20px;
        padding: 10px;
        font-family: 'muli_semibold';
        font-size: 18px;
        color: white;
        transition: 0.4s all;
        outline: none;
    }
    .posLoginNames {
        margin-top: 25px;
        margin-bottom: 25px;
    }
    .btnActualizar {
        background-color: transparent;
        border: 1px solid #ff1d47;
        border-radius: 20px;
        padding: 10px;
        font-family: 'muli_semibold';
        font-size: 18px;
        color: #ff1d47;
        transition: 0.4s all;
        outline: none;
    }
    .btnActualizar:hover,
    .btnActualizar:focus {
        background-color: #ff1d47;
        border: 1px solid #ff1d47;
        border-radius: 20px;
        padding: 10px;
        font-family: 'muli_semibold';
        font-size: 18px;
        color: white;
        transition: 0.4s all;
        outline: none;
    }
    .btnCancelarDatos {
        background-color: transparent;
        border: 1px solid #2d572c;
        border-radius: 20px;
        padding: 10px;
        font-family: 'muli_semibold';
        font-size: 18px;
        color: green;
        transition: 0.4s all;
        outline: none;
    }
    .btnCancelarDatos:hover,
    .btnCancelarDatos:focus {
        background-color: #2d572c;
        border: 1px solid #2d572c;
        border-radius: 20px;
        padding: 10px;
        font-family: 'muli_semibold';
        font-size: 18px;
        color: white;
        transition: 0.4s all;
        outline: none;
    }

    .position-alert {
        position: fixed;
        margin: auto;
        z-index: 999;
        top: 40%;
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
    .estiloSubirFotoProfile{
    background-color: rgba(0,0, 0, 0.7);
    border:2px solid white;
    border-radius:20px;
    padding: 15px;
    color: white;
    font-family: 'muli_bold';
    font-size: 18px;
    outline: none;
    transition:0.4s all;
    position: absolute;
    bottom: 0;
    left: 57px;
}
.subtituloDescp{
    font-family: 'muli_bold';
    color:#232323;

}
#listaCategoriase{
    padding: 15px;
    width: 100%;
    text-align: center;
    border: 1px solid #232323;
    border-radius: 25px;
    color: #232323;
    outline:none;
}
</style>
