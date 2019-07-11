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
                        <input style="display:none" id="fotoPerfil" type="file" class="input" @change="onFotoEstablecimientoFile" ref="subirFotos">
                        <button class="estiloSubirImg" @click="$refs.subirFotos.click()">
                            Subir Logo
                        </button>
                        <p v-if="showConfirmacion" class="estiloConfirmacionimagen">Imagen subida correctamente</p>
                    </div>   
                    <form @submit="formRegistroEstablecimiento" enctype="multipart/form-data" autocomplete="off">   
                        <div class="group">
                           <label for="registroNombreEstablecimiento" class="label">Nombre de Establecimiento (Obligatorio)</label>
                           <input id="registroNombreEstablecimiento" v-model="nombreEstablecimiento" type="text" class="input">   
                        </div>
                        <div class="group">
                            <label for="registroDireccionEstablecimiento" class="label">Dirección (Obligatorio)</label>
                            <input id="registroDireccionEstablecimiento" v-model="direccionEstablecimiento" type="text" class="input">
                        </div>
                        <div class="group" style="margin-top:20px">
    
                            <label for="registroDireccionEstablecimiento" class="label">Seleccione una categoría (Obligatorio)</label>
                            <select id="listaCategorias" v-model="categoria">
                            <option disabled selected  value="">Seleccione una categoria</option>
                            <option v-for="categoria in categorias"  :value="categoria.id" :key="categoria.id">{{categoria.name}}</option>
                            </select>
                            <!--region-select class="form-control" v-model="region" :country="country" /-->
                        </div>

                        <div class="group">
                            <label for="registroTelefonoEstablecimiento" class="label">Website o Página de Facebook (Opcional)</label>
                            <input id="registroTelefonoEstablecimiento" v-model="videoYoutube" type="text" class="input">
                        </div>
    
                        <div class="group">
                            <label for="registroTelefonoEstablecimiento" class="label">Link de Google Map (Obligatorio)</label>
                            <input id="registroUrlGoogleMap" v-model="urlGoogle" type="text" class="input">
                        </div>
    
                        
    
                        <div class="group" style="margin-top:20px">
    
                            <label for="registroDireccionEstablecimiento" class="label">Ingrese distrito (Obligatorio)</label>
                            <select id="listaCategorias" v-model="distrito">
                            <option disabled selected  value="">Seleccione un distrito</option>
                            <option v-for="distrito in distritos"  :value="distrito.id" :key="distrito.id">{{distrito.name}}</option>
                            </select>
    
                            <!--region-select class="form-control" v-model="region" :country="country" /-->
                        </div>
                        <div class="group">
                            <label for="registroTelefonoEstablecimiento" class="label">Horario de atención(Obligatorio)</label>
                            <input id="horarioEstablecimiento" v-model="horarioEstablecimiento" type="text" class="input">
                        </div>
                        <div class="group">
                            <label for="registroDireccionEstablecimiento" class="label">Descripción del Establecimiento</label>
                            <textarea @change="getdescripcionEstablecimiento" id="registroDescripcionEstablecimiento" cols="30" rows="5" class="input"></textarea>
                        </div>
                  
    
                        <div style="display:none">
                            <div class="group">
                                <label for="registroTelefonoEstablecimiento" class="label">Teléfono</label>
                                <input id="registroTelefonoEstablecimiento" v-model="telefonoEstablecimiento" type="text" class="input">
                            </div>
                            <div class="group">
                                <label for="registroDireccionEstablecimiento" class="label">Correo de Contacto</label>
                                <input id="registroCorreoEstablecimiento" v-model="correoEstablecimiento" type="email" class="input">
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
            nameProfileImage: '',
            idprofile : '',
            showConfirmacion:false,
            nombreEstablecimiento: '',
            telefonoEstablecimiento: '',
            direccionEstablecimiento: '',
            horarioEstablecimiento: '',
            correoEstablecimiento: '',
            descripcionEstablecimiento: '',
            slugEstablecimiento: '',
            videoYoutube:'',
            fotoRespone: 'dato',
            establecimiento: {},
            urlGoogle: '',
            showError: false,
            errors: [],
            distrito: '',
            distritos: {},
            categoria:'',
            categorias:{},
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

        this.$axios.$get('https://dtodoaqui.xyz/api/categories').then((response) => {
        this.categorias = response.data;
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
                    let imageToken = this.$store.getters.loggeIn;
                    console.log(imageToken);
                    if(imageToken == null){
                        this.errors.push('¡Usuario no registrado!');
                        this.showError = true;
                    }
                    
                     let images = JSON.stringify ({
                            image: {
                            'image_name': this.nameProfileImage,
                            'image_base64': this.fotosFile,
                            'entity_id': imageToken.id,
                            'entity_name': 'profile',
                            }
                        });
                        
                    //console.log(images);
                    this.$axios.$post('https://dtodoaqui.xyz/api/upload_image',images, {
                        headers:{
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + imageToken.accessToken
                        }
                    }).then((response) => {
                        console.log(response);
                        if(response){
                            this.slugEstablecimiento = response.data.image_name;
                            console.log(this.slugEstablecimiento);
                            this.showConfirmacion = true;
                        }
                    }).catch((error) => {
                    this.errors.push('¡Usuario no registrado!');
                    this.showError = true;
                });
                }
                reader.readAsDataURL(file)
            } else {
                alert('Sorry, FileReader API not supported')
            }
        },
        onFotoEstablecimientoFile(event) {
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
            let datosMap = this.getLatandLong(this.urlGoogle);
            /*var slugverificado = this.verifySlug(this.slugEstablecimiento);
            if(slugverificado == false) {
                this.errors.push('Ingrese un link correcto');
                this.showError = true;
            }else{
                this.slugEstablecimiento = slugverificado;
            }
            console.log(this.slugEstablecimiento);*/
            var currentObjl = this;
            var storeData = this.$store.getters.loggeIn;

            
            if(this.slugEstablecimiento && this.nombreEstablecimiento && this.direccionEstablecimiento && this.descripcionEstablecimiento && this.categoria && this.urlGoogle  && this.distrito){
                let listings = JSON.stringify ({
                    listings: {
                        'name': this.nombreEstablecimiento,
                        'address': this.direccionEstablecimiento,
                        'category_id':this.categoria,
                        'location_id':this.distrito,
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
                
                this.$axios.$post('https://dtodoaqui.xyz/api/listings', listings,{
                    headers: {
                        'Content-Type': 'application/json'      
                    },
                })
                .then((response) => { 
                    $nuxt.$router.push('/establecimientos');
                   
                    //console.log(this.errors);
                })
                .catch((error) => {
                    this.errors.push('¡Usuario no registrado!');
                    this.showError = true;
                    //currentObjl.output = error.response;
                    console.log(currentObjl.output);
                });
            }else{
                //console.log(listings);
                if(!this.slugEstablecimiento) {
                    this.errors.push('Suba un foto en formato: JPG, PNG o GIF porfavor.');
                }
                if(!this.nombreEstablecimiento) {
                    this.errors.push('Ingrese correctamente el nombre del establecimiento.');
                }
                if(!this.direccionEstablecimiento) {
                    this.errors.push('Ingrese correctamente la direccion del establecimiento.');
                }
                if(!this.categoria) {
                    this.errors.push('Seleccione una categoría.');
                }
                if(!this.urlGoogle) {
                    this.errors.push('Ingrese correctamente el link de Google Map.');
                }
                if(!this.distrito) {
                    this.errors.push('Ingrese correctamente el distrito.');
                }
                if(!this.horarioEstablecimiento) {
                    this.errors.push('Ingrese su horario de atención.');
                }
                if(!this.descripcionEstablecimiento) {
                    this.errors.push('Ingrese una descripción.');
                }
                if(!datosMap) {
                    this.errors.push('Error de Map.');
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

#listaCategorias{
    padding: 15px;
    width: 100%;
    text-align: center;
    border: 0px;
    border-radius: 25px;
    color: #232323;
    outline:none;
}
.estiloConfirmacionimagen{
    color:green;
    text-align: center;
    font-family: 'muli_semibold';
    font-size: 16px;
    background-color:white;
    padding: 5px 5px 5px 5px;
    border-radius:25px;
    margin-top:10px;
    
}
</style>

