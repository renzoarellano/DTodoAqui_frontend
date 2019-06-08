<template>
    <div class="col-xs-12 np backgroundEstablecimiento">
    
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
    
    
    
                            <label for="registroTelefonoEstablecimiento" class="label">Slug (Opcional)</label>
    
    
    
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
    
                            <input list="listaDistritos" v-model="distrito" class="input" type="text" placeholder="Distrito">
    
                            <datalist id="listaDistritos">
    
                                    <option v-for="distrito in distritos" v-bind:value="distrito.name"  v-bind:label="distrito.name">
    
                                        
    
                                    </option>
    
                                    </datalist>
    
                            <!--region-select class="form-control" v-model="region" :country="country" /-->
    
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
export default {
    name: 'RegistroEstablecimiento',
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
            distritos: [
                { name: "Callao" },
                { name: "Bellavista" },
                { name: "Carmen de la Legua Reynoso" },
                { name: "La Perla" },
                { name: "La Punta" },
                { name: "Ventanilla" },
                { name: "Mi Perú" },
                { name: "Lima" },
                { name: "Ancón" },
                { name: "Ate" },
                { name: "Barranco" },
                { name: "Breña" },
                { name: "Carabayllo" },
                { name: "Chaclacayo" },
                { name: "Chorrillos" },
                { name: "Cieneguilla" },
                { name: "Comas" },
                { name: "El Agustino" },
                { name: "Independencia" },
                { name: "Jesús María" },
                { name: "La Molina" },
                { name: "La Victoria" },
                { name: "Lince" },
                { name: "Los Olivos" },
                { name: "Lurigancho" },
                { name: "Lurin" },
                { name: "Magdalena del Mar" },
                { name: "Pueblo Libre" },
                { name: "Miraflores" },
                { name: "Pachacamac" },
                { name: "Pucusana" },
                { name: "Puente Piedra" },
                { name: "Punta Hermosa" },
                { name: "Punta Negra" },
                { name: "Rímac" },
                { name: "San Bartolo" },
                { name: "San Borja" },
                { name: "San Isidro" },
                { name: "San Juan de Lurigancho" },
                { name: "San Juan de Miraflores" },
                { name: "San Luis" },
                { name: "San Martín de Porres" },
                { name: "San Miguel" },
                { name: "Santa Anita" },
                { name: "Santa María del Mar" },
                { name: "Santa Rosa" },
                { name: "Santiago de Surco" },
                { name: "Surquillo" },
                { name: "Villa El Salvador" },
                { name: "Villa María del Triunfo" }
            ],
        }
    },
    mounted() {

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
            if (!this.slugEstablecimiento) {
                this.errors.push('Slug mal ingresado');
                this.showError = true;
            }else{
                this.slugEstablecimiento = slugverificado;
            }
            console.log(this.slugEstablecimiento);
            var currentObjl = this;
            var storeData = this.$store.getters.loggeIn;
            console.log(storeData.accessToken);
            if(this.fotoRespone && this.nombreEstablecimiento && this.urlGoogle && this.direccionEstablecimiento && this.distrito){
                this.axios.post('https://dtodoaqui.pw/api/location', {
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
                .catch(function(error) {
                    alert('ESTABLECIMIENTO NO CREADO - USTED NO ESTA REGISTRADO');
                    console.log(error);
                }).catch(function(error) {
                    this.errors.push('¡Usuario no registrado!');
                    this.showError = true;
                    currentObjl.output = error.response;
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

