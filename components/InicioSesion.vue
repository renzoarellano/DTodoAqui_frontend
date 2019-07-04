<template>
    <div class="col-xs-12 np posSesion">
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
                <div class="login-wrap">
                    <div class="login-html">
                        <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Iniciar Sesión</label>
                        <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Registrarse</label>
                        <div class="login-form">
                            <div class="sign-in-htm">
                                <form @submit="formLogin" autocomplete="off">
                                    <div class="group">
                                        <label for="correo" class="label">Username</label>
                                        <input id="correo" v-model="username" type="text" class="input">
                                    </div>
                                    <div class="group">
                                        <label for="contrasena" class="label">Contraseña</label>
                                        <input id="contrasena" v-model="password" type="password" class="input" data-type="password">
                                    </div>
                                    <div class="group">
                                        <input id="check" type="checkbox" class="check" checked>
                                        <label for="check"><span class="icon"></span> Mantener la sesión</label>
                                    </div>
                                    <div class="group">
                                        <!--input type="submit" class="button" value="Iniciar"--->
                                        <button type="submit" class="button">Iniciar</button>
                                    </div>
                                </form>
                                <div class="hr"></div>
                                <!--div class="foot-lnk">
                                <a href="#forgot">¿Olvidate tu contraseña?</a>
                            </div-->
                            </div>
                            <div class="sign-up-htm">
                                <form @submit="formRegistro" autocomplete="off">
                                    <div class="group">
                                        <label for="registroUsername" class="label">Username</label>
                                        <input id="registroUsername" v-model="registrousername" type="text" class="input">
                                    </div>
                                    <div class="group">
                                        <label for="registroCorreo" class="label">Correo eléctronico</label>
                                        <input id="registroCorreo" v-model="registroemail" type="email" class="input">
                                    </div>
                                    <div class="group">
                                        <label for="registroContrasena" class="label">Contraseña (8 carácteres mínimo)</label>
                                        <input id="registroContrasena" v-model="registropassword" minlength="8" type="password" class="input" data-type="password">
                                    </div>
                                    <div class="group">
                                        <label for="registroRecontrasena" class="label">Repetir Contraseña </label>
                                        <input id="registroRecontrasena" v-model="registrorepassword" type="password" class="input" minlength="8">
                                    </div>
                                    <div class="group">
                                        <button type="submit" class="button">Registrar</button>
                                    </div>
                                </form>
                                <div class="hr"></div>
                                <div class="foot-lnk">
                                    <label for="tab-1">¿Ya eres miembro?</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>

const Cookie = process.client ? require('js-cookie') : undefined
    export default {
        name: 'Login',
        data() {
            return {
                username: '',
                password: '',
                registrousername: '',
                registroemail: '',
                registropassword: '',
                registrorepassword: '',
                notificacionLogin: false,
                errors: [],
                showError: false
            };
        },
        methods: {
            formRegistro(e) {
                e.preventDefault();
                this.errors = [];
                if (this.registrousername && this.validEmail(this.registroemail) && this.registropassword && this.registrorepassword) {
                    if (this.registrorepassword == this.registropassword) {
                        let currentObj = this;
                        this.$axios.$post('https://dtodoaqui.xyz/api/api/sign_up', {
                                user: {
                                    username: this.registrousername,
                                    email: this.registroemail,
                                    password: this.registropassword,
                                    password_confirmation: this.registrorepassword
                                }
                            })
                            .then(function(response) {
                                currentObj.output = response;
                                console.log(response);
                                localStorage.token = response.jwt;
                                console.log(atob(response.jwt.split(".")[1]));
                                localStorage.user = atob(response.jwt.split(".")[1]);
                                //console.log(JSON.parse(atob(response.data.jwt.split(".")[1])));
                                //console.log(JSON.parse(atob(response.data.jwt.split(".")[1])).sub);

                                const auth = {
                                accessToken: localStorage.token,
                                id: localStorage.userid
                                }

                                
                                $nuxt.$store.commit('setAuth', auth) // mutating to store for client rendering
                                Cookie.set('auth', auth) // saving token in cookie for server rendering
                                $nuxt.$router.push('/')
                                /*localStorage.userid = JSON.parse(atob(response.data.jwt.split(".")[1])).sub;
                                localStorage.setItem('access_token', localStorage.token) // store the token in localstorage
                                localStorage.setItem('id', localStorage.userid)
                                setTimeout("location.href='/'", 1000);*/
                            })
                            .catch(function(error) {
                                if(error.response.status == 401){
                                alert('Datos Ingresado NO válidos');
                                }else if(error.response.status == 500){
                                    alert('El servicio no funciona correctamente');
                                }
                            });
                    } else {
                        this.errors.push('Reingrese correctamente su contraseña.');
                        this.showError = true;
                    }
                } else {
                    if (!this.registrousername) {
                        this.errors.push('Username requerido.');
                    }
                    if (!this.validEmail(this.registroemail)) {
                        this.errors.push('Ingrese un email correcto.');
                    }
                    if (!this.registropassword) {
                        this.errors.push('Ingrese una contraseña.');
                    }
                    if ((this.registropassword != this.registrorepassword) || !this.registrorepassword) {
                        this.errors.push('Reingrese correctamente su contraseña.');
                    }
                    this.showError = true;
                }
            },
            formLogin(e) {
                e.preventDefault();
                this.errors = [];
                if (this.username && this.password) {
                    //console.log('Logeando');
                    var currentObjl = this;
                    console.log('Logeando');
                    this.$axios.$post('https://dtodoaqui.xyz/api/api/sign_in', {
                            'username': this.username,
                            'password': this.password
                        })
                        .then(function(response) {
                            //console.log(response);
                            //console.log(response.data.jwt);
                            localStorage.token = response.jwt;
                            //console.log(atob(response.jwt.split(".")[1]));
                            localStorage.user = atob(response.jwt.split(".")[1]);
                            //console.log(JSON.parse(atob(response.data.jwt.split(".")[1])));
                            //console.log(JSON.parse(atob(response.data.jwt.split(".")[1])).sub);
                            localStorage.userid = JSON.parse(atob(response.jwt.split(".")[1])).sub;
                            
                            const auth = {
                            accessToken: localStorage.token,
                            id: localStorage.userid
                            }

                            
                            $nuxt.$store.commit('setAuth', auth) // mutating to store for client rendering
                            Cookie.set('auth', auth) // saving token in cookie for server rendering
                            $nuxt.$router.push('/')
                           /* localStorage.setItem('access_token', localStorage.token) // store the token in localstorage
                            localStorage.setItem('id', localStorage.userid)
                            $nuxt.$router.push('/inicio');*/
                        })
                        .catch(function(error) {
                            if(error.response.status == 401){
                                alert('Datos Ingresado NO válidos');
                            }else if(error.response.status == 500){
                                 alert('El servicio no funciona correctamente');
                            }
                        });
                }else{
                    if (!this.username) {
                        this.errors.push('Username requerido.');
                    }
                    if (!this.password) {
                        this.errors.push('Contraseña correcta requerida.');
                    }
                    this.showError = true;
                }
            },
            validEmail: function(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
        },
        
    }
</script>

<style scoped>
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
    button {
        padding: 7px;
        margin-top: 10px;
        background-color: green;
        color: white;
        font-size: 1.1rem;
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


