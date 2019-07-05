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
                                <img class="tamPicture" v-bind:src="'https://dtodoaqui.xyz/api/'+imgProfile" alt="">
                            <input style="display:none" id="fotoPerfil" type="file" class="input" @change="onFotoPerfilFile" ref="subirFotoPerfil">
    
                            <button class="estiloSubirFotoProfile" @click="$refs.subirFotoPerfil.click()">
    
                                Actualizar Foto
    
                            </button>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="col-12">
                                <h2 class="nameUser text-center">
                                    {{nombres}}
                                </h2>
                            </div>
                            <div class="col-12 text-center">
                                <a target="_blank" class="iconRedes" v-bind:href="facebook">
                                    <img src="~/assets/facebook.png" alt="Facebook - DtodoAqui">
                                </a>
                            </div>
                            <div class="col-12 text-justify posDescripcion">
                                <p class="descriptionUser">
                                    {{descripcion}}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 posDatosTotales">
                    <h1 class="titDatos">
                        Mi información:
                    </h1>
                </div>
                <div class="col-12 col-md-4 text-left">
                    <div class="col-12 np">
                        <button @click="cambiarContrasena" class="btnModificarPass" style="visibility:hidden;">
                            Modificar Contraseña
                        </button>
                    </div>
                    <div class="col-12 np posLoginNames">
                        <form autocomplete="off">
                            <div class="form-group">
                                <label for="firstName"><i class="fab fa-galactic-senate"></i> Nombre de Usuario: </label>
                                <input type="text" class="inputProfile" aria-describedby="nameHelp" v-model="username" disabled>
                            </div>
                            <div v-if="changePass" class="col-12 np">
                                <div class="form-group">
                                    <label for="firstName"><i class="fab fa-galactic-senate"></i>Nueva contraseña: </label>
                                    <input type="text" v-model="cpassword" class="inputProfile" aria-describedby="passHelp" placeholder="Mi Password">
                                </div>
                                <div class="form-group">
                                    <label for="firstName"><i class="fab fa-galactic-senate"></i>Vuelva a ingresar su nueva contraseña: </label>
                                    <input type="text" v-model="crepassword" class="inputProfile" aria-describedby="passHelp" placeholder="Mi Password">
                                </div>
                                <div class="col-12 text-center">
                                    <button type="submit" class="btnActualizar">Actualizar Password</button>
                                </div>
                                <div v-if="changePass" class="col-12 text-center" style="margin-top:25px;">
                                    <button @click="cancelarPass" class="btnCancelarDatos">
                                                    Cancelar
                                                </button>
                                </div>
                            </div>
                        </form>
                    </div>
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
                                <label for="firstName"><i class="fab fa-galactic-senate"></i> Nombres: </label>
                                <input type="text" v-model="nombres" class="inputProfile" aria-describedby="nameHelp" placeholder="Mi Nombre Completo" :disabled="!changeDatos">
                                <small id="nameHelp" class="form-text text-muted">Este campo es obligatorio!.</small>
                            </div>
                            <div class="form-group">
                                <label for="lastName"><i class="fas fa-dice-d20"></i> Apellidos: </label>
                                <input type="text" v-model="apellidos" class="inputProfile" aria-describedby="apellidoHelp" placeholder="Mi Apellido Completo" :disabled="!changeDatos">
                                <small id="apellidoHelp" class="form-text text-muted">Este campo es obligatorio!.</small>
                            </div>
                            <div class="form-group">
                                <label for="phoneUser"><i class="fas fa-phone-square"></i> Teléfono: </label>
                                <input type="text" v-model="telefono" class="inputProfile" aria-describedby="telefonoHelp" placeholder="Mi Teléfono" :disabled="!changeDatos">
                                <small id="nameHelp" class="form-text text-muted">Este campo es obligatorio!.</small>
                            </div>
                            <div v-if="!changeDatos" class="form-group">
                                <label for="paisUser"><i class="fas fa-grin-beam-sweat"></i> País: </label>
                                <input type="text" v-model="pais" class="inputProfile" aria-describedby="paisHelp" placeholder="Mi Pais" :disabled="!changeDatos">
                                <small id="nameHelp" class="form-text text-muted">Este campo es obligatorio!.</small>
                            </div>
                            <div class="form-group">
                                <label for="paisUser"><i class="fas fa-grin-beam-sweat"></i> Dirección: </label>
                                <input type="text" v-model="direccion" class="inputProfile" aria-describedby="direccionHelp" placeholder="Mi Dirección" :disabled="!changeDatos">
                                <small id="nameHelp" class="form-text text-muted">Este campo es obligatorio!.</small>
                            </div>
                            <div v-if="changeDatos" class="col-12 np">
                                <div class="form-group">
                                    <label for="paisUser"><i class="fas fa-globe"></i> País: </label>
                                    <country-select class="selectedStyle" v-model="country" :country="country" topCountry="" />
                                    <small id="nameHelp" class="form-text text-muted">Este campo es obligatorio!.</small>
                                </div>
                                <div class="form-group">
                                    <label for="facebookUser"><i class="fas fa-grin-beam-sweat"></i> Link facebook: </label>
                                    <input type="text" v-model="facebook" class="inputProfile" aria-describedby="facebook" placeholder="Mi link de Facebook">
                                    <small id="nameHelp" class="form-text text-muted">Opcional</small>
                                </div>
                                <div class="form-group">
                                    <label for="paisUser"><i class="fas fa-grin-beam-sweat"></i>Nueva Descripción: </label>
                                    <textarea @change="getdescripcionProfile"  class="inputProfile" rows="5" placeholder="Mi Descripción" v-bind:value="descripcion"></textarea>
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
                nameProfileImage: '',
                username: '',
                userID: '',
                cpassword: '',
                crepassword: '',
                nombres: '',
                apellidos: '',
                telefono: '',
                country: '',
                pais: '',
                facebook: '',
                direccion: '',
                descripcion: '',
                idprofile:'',
                imgProfile: '',
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
                    //console.log(this.fotosFile);
                    let images = JSON.stringify ({
                            image: {
                            'image_name': this.nameProfileImage,
                            'image_base64': this.fotosFile,
                            'entity_id': this.idprofile,
                            'entity_name': 'profile',
                            }
                        });
                        
                        let imageToken = this.$store.getters.loggeIn;
                    //console.log(images);
                    this.$axios.$post('https://dtodoaqui.xyz/api/upload_image',images, {
                        headers:{
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + imageToken.accessToken
                        }
                    }).then((response) => {
                        console.log(response);
                        if(response){
                        let profileImg = JSON.stringify ({
                            //user_id': parseInt(UserId.id),
                            profile:{
                            'avatar_name': response.data.image_name,
                            'first_name': this.nombres,
                            'last_name': this.apellidos,
                            'country': this.pais,
                            'address': this.direccion,
                            'description': this.descripcion,
                            'phone': this.telefono,
                            'website': 'prueba.web',
                            'facebook': this.facebook,
                            }
                            //'twitter': 'prueba.twit',
                            //'linkedin': 'prueba.link',
                            /*'created': '2019-10-29T20:12:30Z',
                            'modified': '2019-10-29T20:12:30Z',
                            'inserted_at': '2019-10-29T20:12:30Z',
                            'updated_at': '2019-10-29T20:12:30Z',*/
                        });
                        console.log(profileImg);
                        let Tokenimage = this.$store.getters.loggeIn;
                        this.$axios.$put('https://dtodoaqui.xyz/api/my_profile',profileImg, {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + Tokenimage.accessToken
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
                var UserId = this.$store.getters.loggeIn
                if(this.nombres && this.apellidos && this.telefono && this.pais && this.direccion){
                    let profile = JSON.stringify ({
                            //user_id': parseInt(UserId.id),
                            profile:{
                            'avatar_name': this.imgProfile,
                            'first_name': this.nombres,
                            'last_name': this.apellidos,
                            'country': this.country,
                            'address': this.direccion,
                            'description': this.descripcion,
                            'phone': this.telefono,
                            'website': 'prueba.web',
                            'facebook': this.facebook,
                            }
                        })
                    this.$axios.$put('https://dtodoaqui.xyz/api/my_profile',profile, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + UserId.accessToken
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
                }else{
                    if(!this.nombres){
                        this.errors.push('Nombres requeridos.');
                    }
                    if(!this.apellidos){
                        this.errors.push('Apellidos requeridos.');
                    }
                    if(!this.telefono){
                        this.errors.push('Teléfono requerido.');
                    }
                    if(!this.country){
                        //console.log(this.country);
                        this.errors.push('País requerido.');
                    }
                    if(!this.direccion){
                        this.errors.push('Dirección requerida.');
                    }
                    this.showError = true;
                }
            },
            
         
        },
        created() {
            let mytokenPromise = this.$store.getters.loggeIn;

            Promise.all([mytokenPromise]).then((vals) => {
                this.$axios.$get('https://dtodoaqui.xyz/api/my_user', {
                    withCredentials: false,
                    headers: {
                        'Authorization': 'Bearer ' + mytokenPromise.accessToken
                    }
                }).then(result => {
                    this.username = result.username
                    this.userID = result.id;
                });
            });
            Promise.all([mytokenPromise]).then((vals) => {
                console.log(mytokenPromise.accessToken);
                this.$axios.$get('https://dtodoaqui.xyz/api/my_profile', {
                    withCredentials: false,
                    headers: {
                        
                        'Authorization': 'Bearer ' + mytokenPromise.accessToken
                    }
                }).then(result => {
                    console.log(result);
                    if(result == ''){
                        console.log('jwt' + mytokenPromise.accessToken);
                        //alert('no hubo data');
                         let profile = JSON.stringify ({
                            profile: {
                            //'user_id': this.userID,
                            'avatar_name': 'images/empty.png',
                            'first_name': ' ',
                            'last_name': ' ',
                            'country': 'PE',
                            'address': ' ',
                            'description': '  ',
                            'phone': ' ',
                            'website': ' ',
                            'facebook': ' ',
                            //'twitter': 'prueba.twit',
                            //'linkedin': 'prueba.link',
                            /*'created': '2019-10-29T20:12:30Z',
                            'modified': '2019-10-29T20:12:30Z',
                            'inserted_at': '2019-10-29T20:12:30Z',
                            'updated_at': '2019-10-29T20:12:30Z',*/
                        }
                        })
                        this.$axios.$post('https://dtodoaqui.xyz/api/my_profile',profile, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + mytokenPromise.accessToken
                        },
                        
                    }).then((response) => {
                        window.location.reload(true)
                    })
                    .catch((error) => {
                        console.log(error);
                    }); 
                    }else{
                        this.direccion = result.address;
                        this.pais = result.country;
                        this.descripcion = result.description;
                        this.nombres = result.first_name;
                        this.apellidos = result.last_name;
                        this.facebook = result.facebook;
                        this.telefono = result.phone;
                        this.idprofile = result.id;
                        this.imgProfile = result.avatar_name;
                    }
                    /**/
                });
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
</style>
