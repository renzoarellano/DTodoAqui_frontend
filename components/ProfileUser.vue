<template>
    <div class="espacioUser">
        <div class="container">
            <div class="row">
                <div v-if="showError" class="col-12 col-md-11 col-lg-7 np position-alert text-center">
                    <div class="alert alert-danger" role="alert">
                        <p>
                            <b>Porfavor corriga los siguientes errores: </b>
                            <li v-for="error in errors">{{ error }}</li>
                        </p>
                        <button class="btnCerrarErrores" @click="showError = false">
                             Cerrar ❌
                        </button>
                    </div>
                </div>
                <div class="backTopProfile col-12">
                    <div class="row">
                        <div class="pictureUser col-12 col-md-6">
                            <img class="tamPicture" src="data:image/png;base64,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
                " alt="">
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
                username: '',
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
                changePass: false,
                changeDatos: false,
                errors: [],
                showError: false
            }
        },
        methods: {
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
                if(this.nombres && this.apellidos && this.telefono && this.country && this.direccion){
                    this.$axios.$put('https://dtodoaqui.xyz/api/profile'+'/'+this.idprofile, {
                        'profile': {
                            'user_id': UserId.id,
                            'avatar_name': 'prueba.jpg',
                            'first_name': this.nombres,
                            'last_name': this.apellidos,
                            'country': this.country,
                            'address': this.direccion,
                            'description': this.descripcion,
                            'phone': this.telefono,
                            'website': 'prueba.web',
                            'facebook': this.facebook,
                            'twitter': 'prueba.twit',
                            'linkedin': 'prueba.link',
                            /*'created': '2019-10-29T20:12:30Z',
                            'modified': '2019-10-29T20:12:30Z',
                            'inserted_at': '2019-10-29T20:12:30Z',
                            'updated_at': '2019-10-29T20:12:30Z',*/
                        }
                    }).then(function(response) {
                        if(response != null){
                            //alert('Sin errores');
                             window.location.reload(true)
                        }
                    })
                    .catch(function(error) {
                        if(error){
                            alert(error.status);
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
                        console.log(this.country);
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
                    this.username = result.username;
                });
            });
            Promise.all([mytokenPromise]).then((vals) => {
                this.$axios.$get('https://dtodoaqui.xyz/api/my_profile', {
                    withCredentials: false,
                    headers: {
                        'Authorization': 'Bearer ' + mytokenPromise.accessToken
                    }
                }).then(result => {
                    //console.log(result);
                    if(result.data == ''){
                        this.$axios.$post('https://dtodoaqui.xyz/api/profile', {
                        'profile': {
                            'user_id': localStorage.getItem('id'),
                            'avatar_name': 'prueba.jpg',
                            'first_name': 'Mi Nombre',
                            'last_name': 'Mi Apellido',
                            'country': 'PE',
                            'address': 'Mi dirección',
                            'description': 'Mi Descripción',
                            'phone': '999999999',
                            'website': 'prueba.web',
                            'facebook': 'Ingrese aquí tu link de facebook',
                            'twitter': 'prueba.twit',
                            'linkedin': 'prueba.link',
                            /*'created': '2019-10-29T20:12:30Z',
                            'modified': '2019-10-29T20:12:30Z',
                            'inserted_at': '2019-10-29T20:12:30Z',
                            'updated_at': '2019-10-29T20:12:30Z',*/
                        }
                    }).then(function(response) {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    }) 
                    }else{
                        this.direccion = result.address;
                        this.pais = result.country;
                        this.descripcion = result.description;
                        this.nombres = result.first_name;
                        this.apellidos = result.last_name;
                        this.facebook = result.facebook;
                        this.telefono = result.phone;
                        this.idprofile = result.id;
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
</style>
