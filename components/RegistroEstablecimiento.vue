<template>
    <div class="col-xs-12 np backgroundEstablecimiento">
        <div class="container">
            <div class="row">
                <div v-if="showError" class="col-12 col-md-11 col-lg-7 np position-alert text-center">
                    <div class="alert alert-danger" role="alert">
                        <p>Porfavor corriga los siguientes errores: </p>
                        <li v-for="error in errors" :key="error">{{ error }}</li>
                        <button class="btnCerrarErrores" @click="showError = false">
                            Cerrar ❌
                        </button>
    
                    </div>
    
                </div>
            </div>
        </div>
    
        <div class="login-wrapEstablecimiento">   
            <div class="login-html">   
                <div class="login-form">
                    <div class="group text-center">    
                        <label for="fotoPerfil" class="label">Subir</label>
                        <input style="display:none" id="fotoPerfil" type="file" class="input" @change="onFotosFile" ref="subirFotos">
                        <button class="estiloSubirImg" @click="$refs.subirFotos.click()">
                            Subir Logo
                        </button>   
                    </div>   
                    <form @submit="formRegistroEstablecimiento" enctype="multipart/form-data" autocomplete="off">   
                        <div class="group">
                           <label for="registroNombreEstablecimiento" class="label">Nombre de Establecimiento (Obligatorio)</label>
                           <input id="registroNombreEstablecimiento" v-model="nombreEstablecimiento" type="text" class="input">   
                        </div>
                        <div class="group">
                            <label for="registroTelefonoEstablecimiento" class="label">Website o Página de Facebook (Opcional)</label>
                            <input id="registroTelefonoEstablecimiento" v-model="slugEstablecimiento" type="text" class="input">
                        </div>
    
                        <div class="group">
                            <label for="registroTelefonoEstablecimiento" class="label">Link de Google Map (Obligatorio)</label>
                            <input id="registroUrlGoogleMap" v-model="urlGoogle" type="text" class="input">
                        </div>
    
                        <div class="group">
                            <label for="registroDireccionEstablecimiento" class="label">Dirección (Obligatorio)</label>
                            <input id="registroDireccionEstablecimiento" v-model="direccionEstablecimiento" type="text" class="input">
                        </div>
    
                        <div class="group" style="margin-top:20px">
    
                            <label for="registroDireccionEstablecimiento" class="label">Ingrese distrito (Obligatorio)</label>
    
                            <input list="listaDistritos" v-model="distrito"  class="form-control text-center" type="text"  placeholder="Distrito">
                            <datalist id="listaDistritos" >
                            <option v-for="distrito in distritos" v-bind:value="distrito.name"  v-bind:label="distrito.name" :key="distrito.name">
                            </option>
                            </datalist>
    
                            <!--region-select class="form-control" v-model="region" :country="country" /-->
                        </div>
                        <div class="group" style="margin-top:20px">
                        
                        </div>
                  
    
                        <div style="display:none">
                            <div class="group">
                                <label for="registroTelefonoEstablecimiento" class="label">Teléfono</label>
                                <input id="registroTelefonoEstablecimiento" v-model="telefonoEstablecimiento" type="text" class="input">
                            </div>

                            <div class="group">
                                <label for="registroDireccionEstablecimiento" class="label">Horario de Atencion</label>
                                <input id="registroHorarioEstablecimiento" v-model="horarioEstablecimiento" type="text" class="input">
                            </div>

                            <div class="group">
                                <label for="registroDireccionEstablecimiento" class="label">Correo de Contacto</label>
                                <input id="registroCorreoEstablecimiento" v-model="correoEstablecimiento" type="email" class="input">
                            </div>

                            <div class="group">
                                <label for="registroDireccionEstablecimiento" class="label">Descripción del Establecimiento</label>
                                <textarea @change="getdescripcionEstablecimiento" id="registroDescripcionEstablecimiento" cols="30" rows="5" class="input"></textarea>
                            </div>
    
                        </div>

                        <div class="group">
                            <button type="submit" class="button">Registrar</button>
                        </div>
    
    
    
                    </form>
    
                    <div class="hr"></div>

                </div>

            </div>

        </div>
    
    </div>
</template>

<script>
import componentMap from '@/components/componentMap.vue';
export default {
    name: 'RegistroEstablecimiento',
    components: {
      componentMap,
    },
    data() {
        return {
            fotosFile: '',
            nombreEstablecimiento: '',
            telefonoEstablecimiento: '',
            direccionEstablecimiento: '',
            horarioEstablecimiento: '',
            correoEstablecimiento: '',
            descripcionEstablecimiento: '',
            slugEstablecimiento: '',
            distrito: '',
            fotoRespone: 'dato',
            establecimiento: {},
            urlGoogle: '',
            showError: false,
            errors: [],
            distrito: '',
            distritos: {},
            center: { lat: 45.508, lng: -73.587 },
            markers: [],
            places: [],
            currentPlace: null, 
      };
    },
    created(){
        this.$axios.$get('https://dtodoaqui.xyz/api/location').then((response) => {
        this.distritos = response.data;
        console.log(this.distritos);
        }).catch((error) => {
        
        console.log(error);
        });
        
    },
    mounted() {
        this.geolocate();
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
                }
                reader.readAsDataURL(file)
            } else {
                alert('Sorry, FileReader API not supported')
            }
        },
        onFotosFile(event) {
            this.fotosFile = event.target.files[0];
            //Activar esta funcion para pasar la imagen a database64 !importante
            this.setImage(this.fotosFile);

        },
        getLatandLong(url) {
            var urld = url;
            var regex = new RegExp('@(.*),(.*),');
            var lon_lat_match = urld.match(regex);
            return lon_lat_match;
        },
        verifySlug(url) {
            var urlSlug = url;
            var regex = new RegExp('^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$');
            var result = regex.test(urlSlug);
            if (result) {
                return urlSlug;
            } else {
                return result;
            }
        },
        getdescripcionEstablecimiento(event) {
            this.descripcionEstablecimiento = event.target.value
            //console.log(this.descripcionEstablecimiento);
        },
        formRegistroEstablecimiento(e) {
            //alert(localStorage.getItem('id'));
            e.preventDefault();
            this.errors = [];
            var datosMap = this.getLatandLong(this.urlGoogle);
            var slugverificado = this.verifySlug(this.slugEstablecimiento);
            if (slugverificado == false) {
                this.errors.push('Ingrese un link correcto');
                this.showError = true;
            }else{
                this.slugEstablecimiento = slugverificado;
            }
            console.log(this.slugEstablecimiento);
            var currentObjl = this;
            var storeData = this.$store.getters.loggeIn;
            //console.log(storeData.accessToken);
            if(this.fotoRespone && this.nombreEstablecimiento && this.urlGoogle && this.direccionEstablecimiento && this.distrito && datosMap){
                this.$axios.$post('http://35.226.8.87/api/location', {
                    'location': {
                        'image_name': 'http://www.cccartagena.org.co/sites/default/files/imagenesbook/tienda.jpg',
                        'name': this.nombreEstablecimiento,
                        'slug': this.slugEstablecimiento,
                        'is_verified': false,
                        'latitude': parseFloat(datosMap[1]),
                        'longitude': parseFloat(datosMap[2]),
                        'address': this.direccionEstablecimiento,
                        'district': this.distrito,
                        'user_id': storeData.id,
                    }
                })
                .then(function(response) {
                    alert('Establecimiento creado');
                    location.reload();
                    //console.log(this.errors);
                })
                .catch((error) => {
                    this.errors.push('¡Usuario no registrado!');
                    this.showError = true;
                    //currentObjl.output = error.response;
                    console.log(currentObjl.output);
                });
            }else{
                if(!this.nombreEstablecimiento) {
                    this.errors.push('Ingrese correctamente el nombre del establecimiento');
                }
                if(!this.urlGoogle) {
                    this.errors.push('Ingrese correctamente el link de Google Map');
                }
                if(!this.direccionEstablecimiento) {
                    this.errors.push('Ingrese correctamente la direccion del establecimiento');
                }
                if(!this.distrito) {
                    this.errors.push('Ingrese correctamente el distrito');
                }
                
                    this.showError = true;
            }
        },
        // receives a place object via the autocomplete component
        setPlace(place) {
        this.currentPlace = place;
        },
        addMarker() {
        if (this.currentPlace) {
            const marker = {
            lat: this.currentPlace.geometry.location.lat(),
            lng: this.currentPlace.geometry.location.lng()
            };
            this.markers.push({ position: marker });
            this.places.push(this.currentPlace);
            this.center = marker;
            this.currentPlace = null;
        }
        },
        geolocate: function() {
        navigator.geolocation.getCurrentPosition(position => {
            this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
            };
        });
        },
        
    },
    
}
</script>

<style>
.estiloSubirImg {
    background-color: transparent;
    border: 2px solid white;
    border-radius: 20px;
    padding: 15px;
    color: white;
    font-family: 'muli_bold';
    font-size: 18px;
    outline: none;
    transition: 0.4s all;
}

.estiloSubirImg:hover,
.estiloSubirImg:focus {
    background-color: white;
    border: 2px solid white;
    border-radius: 20px;
    padding: 15px;
    color: #ff1d47;
    font-family: 'muli_bold';
    font-size: 18px;
    outline: none;
    transition: 0.4s all;
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
    transition: all 0.2s ease-in;
    font-family: Helvetica, Arial, sans-serif;
}

.fadeIn-enter {
    opacity: 0;
}

.fadeIn-leave-active {
    opacity: 0;
    transition: all 0.2s step-end;
}

.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
    transform: scale(1.1);
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #00000094;
    z-index: 999;
    transition: opacity 0.2s ease;
}

.position-alert {
    position: fixed;
    margin: auto;
    z-index: 999;
    top: 40%;
}
</style>

