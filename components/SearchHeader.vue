
<template>
    <header  class="header-color col-12 np" style="background-color:white !important;">
        <div class="container">
            <div class="row no-gutters">
                <div class="col-6 col-md-6 col-lg-6 np">
                    <div class="row">
                        <div class="col-md-6 col-lg-4 text-left" style="padding-right:0px;">
                            <span class="header-logo">
                                                    <a href="/"><svg width="40px" height="50px" viewBox="0 0 40 50" version="1.1"
                                                            xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                                            <defs></defs>
                                                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                                <g id="logo" transform="translate(-20.000000, -15.000000)" stroke="#FF1D47"
                                                                    stroke-width="3">
                                                                    <g id="Marker" transform="translate(22.000000, 17.000000)">
                                                                        <path
                                                                            d="M18,45.2332275 C30,33.8305966 36,24.7932582 36,18.1212121 C36,8.11314302 27.9411255,0 18,0 C8.0588745,0 0,8.11314302 0,18.1212121 C0,24.7932582 6,33.8305966 18,45.2332275 Z"
                                                                            id="Oval"></path>
                                                                        <ellipse id="Oval-2" cx="18" cy="16.7272727" rx="5.53846154"
                                                                            ry="5.57575758"></ellipse>
                                                                    </g>
                                                                </g>
                                                            </g>
                                                        </svg></a>
                                                </span>
                            <span id="LogoChange" class="header-title">
                                                    D'TodoAqui
                                                </span>
                        </div>
                        <div class="d-none d-sm-none d-md-none d-lg-block col-lg-8 ">
                            <nav class="nav">
                                <ul class="ul-spacei">
                                    <li class="nav-item">
                                        <nuxt-link to="/">Inicio</nuxt-link>
                                    </li>
                                    <li class="nav-item">
                                        <nuxt-link to="establecimientos">Establecimientos</nuxt-link>
                                    </li>
                                    <!--li class="nav-item">
                                                            <a href="">Noticias</a>
                                                        </li-->
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
                <div class="col-6 col-md-6 col-lg-6 ">
                    <div class="d-none d-sm-none d-md-none d-lg-block  col-lg-12 np">
                        <nav class="nav">
                            <ul class="ul-spaced">
                                <li>
                                    <nuxt-link class="btnFormEstablecimientos" to="registro_establecimiento">
                                        <i class="fa fa-plus"></i> Agregar Establecimiento
                                    </nuxt-link>
                                </li>
                                <li v-if="loggedIn" @click="logout()">
                                    <nuxt-link class="btnCerrarToken" to="inicio_sesion">
                                        Cerrar sesion
                                    </nuxt-link>
                                </li>
                                <li v-if="loggedIn">
                                    <nuxt-link class="btnIrProfile" to="profile_user">
                                        <i class="far fa-user"></i> Mi Perfil
                                    </nuxt-link>
                                </li>
                                <li v-if="!loggedIn">
                                    <nuxt-link to="inicio_sesion">Iniciar Sesión / Registrarme</nuxt-link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div class="d-block d-sm-block d-md-block d-lg-none d-xl-none col-md-12 np">
                        <button @click="SandwichEffect" :class="[bte2c]" id="btn2">
                                                <span :class="[change1]" id="lin1" ></span>
                                                <span :class="[change2]"  id="lin2" ></span>
                                                <span :class="[change3]" id="lin3" ></span>
                                                <span :class="[change4]" id="lin4" ></span>
                                                <span :class="[change6]" id="lin6"></span>
                                            </button>
                    </div>
                </div>
                <div class="col-12 subHeaderBuscador">
                    <form class="col-12 np">
                        <div class="row justify-content-md-center">
                            <div class="col-12 col-sm-4 padright">
                                <input class="searchHeaderstyle" type="text" placeholder="Keyword">
                            </div>
                            <div class="col-12 col-sm-4 padright">
                                <input class="searchHeaderstyle" list="listaDistritos" type="text" placeholder="Ubicación">
                                <datalist id="listaDistritos">
                                    <option>
                                                
                                    </option>
                                </datalist>
                            </div>
                            <div class="col-12 col-sm-1 padfix">
                                <button class="btnSearchHeader" type="submit">
                                    <i class="fas fa-search-location"></i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
    
            </div>
        </div>
        <div id="subheader" v-bind:style="styleSubheader" class="d-block d-sm-block d-md-block d-lg-none d-xl-none col-md-12">
            <ul class="subnav-mobile">
                <li v-if="loggedIn">
                    <nuxt-link class="btnIrProfile" to="profile_user">
                        <i class="far fa-user"></i> Mi Perfil
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/">Inicio</nuxt-link>
                </li>
                <li>
                    <nuxt-link to="establecimientos">Establecimientos</nuxt-link>
                </li>
                <li>
                    <nuxt-link class="btnFormEstablecimientos" to="registro_establecimiento">
                        <i class="fa fa-plus"></i> Agregar Establecimiento
                    </nuxt-link>
                </li>
                <li v-if="!loggedIn">
                    <nuxt-link to="inicio_sesion">Iniciar Sesión / Registrarme</nuxt-link>
                </li>
    
                <li v-if="loggedIn" @click="logout()">
                    <nuxt-link class="btnCerrarToken" to="inicio_sesion">
                        Cerrar sesion
                    </nuxt-link>
                </li>
    
                <!--li>
                                        <a href="">Noticias</a>
                                    </li-->
    
            </ul>
        </div>
    </header>
</template>

<script>
/*eslint-disable */
export default {
    name: 'Header',
    data() {
        return {
            change1: 'change11',
            change2: 'change22',
            change3: 'change33',
            change4: 'change44',
            change6: 'change66',
            bte2c: 'bte22c',
            contador: 0,
            styleSubheader: {
                marginLeft: '6000px',
            }
        }
    },
    methods: {
        SandwichEffect: function() {
            if (this.contador == 0) {
                this.change1 = 'change1',
                    this.change2 = 'change2',
                    this.change3 = 'change3',
                    this.change4 = 'change4',
                    this.change6 = 'change6',
                    this.bte2c = 'bte2c',
                    this.styleSubheader.marginLeft = '0px',
                    this.contador = 1
            } else {
                this.change1 = 'change11',
                    this.change2 = 'change22',
                    this.change3 = 'change33',
                    this.change4 = 'change44',
                    this.change6 = 'change66',
                    this.bte2c = 'bte22c',
                    this.styleSubheader.marginLeft = '6000px',
                    this.contador = 0
            }
        },
        logout() {
            localStorage.removeItem('access_token')
            localStorage.removeItem('id')
            //$nuxt.$store.state.accessToken = null;
            $nuxt.$router.push('/inicio_sesion');
        },
    },
    computed: {
        loggedIn() {
           return $nuxt.$store.getters.loggeIn;
        },

    }
};
</script>

<style>
.change1 {
    opacity: 0;
    bottom: -10px;
    transform: rotate(45deg);
    height: 5px;
    background-color: #ff1d47;
    display: block;
    position: relative;
    transition: all 0.3s;
    bottom: 0px;
    border-radius: 100px;
}

.change11 {
    opacity: 1;
    bottom: 0px;
    transform: rotate(0deg);
    height: 5px;
    background-color: #ff1d47;
    display: block;
    position: relative;
    transition: all 0.3s;
    bottom: 0px;
    border-radius: 100px;
}

.change2 {
    opacity: 0;
    background-color: transparent;
    height: 5px;
    background-color: #ff1d47;
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
    transition: all 0.3s;
    position: relative;
    transition: all 0.3s;
    border-radius: 100px;
}

.change22 {
    opacity: 1;
    background-color: white;
    height: 5px;
    background-color: #ff1d47;
    display: block;
    margin-top: 5px;
    margin-bottom: 5px;
    transition: all 0.3s;
    position: relative;
    transition: all 0.3s;
    border-radius: 100px;
}

.change3 {
    opacity: 0;
    top: -10px;
    transform: rotate(-45deg);
    height: 5px;
    background-color: #ff1d47;
    display: block;
    position: relative;
    transition: all 0.3s;
    top: 0px;
    border-radius: 100px;
}

.change33 {
    opacity: 1;
    top: 0px;
    transform: rotate(0deg);
    height: 5px;
    background-color: #ff1d47;
    display: block;
    position: relative;
    transition: all 0.3s;
    top: 0px;
    border-radius: 100px;
}

.change4 {
    opacity: 1;
    height: 5px;
    background-color: #ff1d47;
    display: block;
    position: relative;
    transition: all 0.3s;
    bottom: 15px;
    opacity: 1;
    transform: rotate(45deg);
    border-radius: 100px;
}

.change44 {
    opacity: 0;
    height: 5px;
    background-color: #ff1d47;
    display: block;
    position: relative;
    transition: all 0.3s;
    bottom: 15px;
    opacity: 0;
    transform: rotate(45deg);
    border-radius: 100px;
}

.change6 {
    opacity: 1;
    height: 5px;
    background-color: #ff1d47;
    display: block;
    position: relative;
    transition: all 0.3s;
    top: -20px;
    opacity: 1;
    transform: rotate(-45deg);
    border-radius: 100px;
}

.change66 {
    opacity: 0;
    height: 5px;
    background-color: #ff1d47;
    display: block;
    position: relative;
    transition: all 0.3s;
    top: -20px;
    opacity: 0;
    transform: rotate(-45deg);
    border-radius: 100px;
}

.bte2c {
    z-index: 99999;
    position: relative;
    width: 60px;
    height: 30px;
    padding: 0px 0px 0px 26px;
    background-color: transparent;
    border: 0px;
    box-shadow: 0px 0px 0px transparent;
    transition: all 0.3s;
    outline: none !important;
    float: right;
    margin-top: 13px;
}

.bte22c {
    z-index: 9;
    position: relative;
    width: 60px;
    height: 30px;
    padding: 0px 0px 0px 26px;
    background-color: transparent;
    border: 0px;
    box-shadow: 0px 0px 0px transparent;
    transition: all 0.3s;
    outline: none !important;
    float: right;
    margin-top: 13px;
}

.bte22c:focus {
    outline: none;
}

.subheaderc {
    margin-left: 0px;
}

.subheaderc {
    margin-left: 6000px;
}

.btnCerrarToken {
    border: 1px solid #ff1d47;
    color: #ff1d47 !important;
    background-color: transparent;
    outline: none;
    font-family: 'muli_bold';
    font-size: 13px;
    padding: 10px !important;
    border-radius: 20px;
    transition: 0.4s all;
}

.btnCerrarToken:hover,
.btnCerrarToken:focus {
    border: 1px solid #ff1d47;
    color: white !important;
    background-color: #ff1d47;
    outline: none;
    font-family: 'muli_bold';
    font-size: 13px;
    padding: 10px !important;
    border-radius: 20px;
    transition: 0.4s all;
}

.btnIrProfile {
    border: 1px solid #ff1d47;
    color: #ff1d47 !important;
    background-color: transparent;
    outline: none;
    font-family: 'muli_bold';
    font-size: 14px !important;
    padding: 10px !important;
    border-radius: 20px;
    transition: 0.4s all;
}

.btnIrProfile:hover,
.btnIrProfile:focus {
    border: 1px solid #ff1d47;
    color: white !important;
    background-color: #ff1d47;
    outline: none;
    font-family: 'muli_bold';
    font-size: 14px !important;
    padding: 10px !important;
    border-radius: 20px;
    transition: 0.4s all;
}

.subHeaderBuscador {
    background-color: white;
    padding-top: 5px;
    padding-bottom: 5px;
}
.searchHeaderstyle{
    border: 1px solid #232323;
    padding: 10px;
    width: 100%;
    color: #232323;
    font-family: 'muli_semibold';
    outline: none;
    border-radius: 20px;
}
.padright{
    padding-right: 0px;
}


@media (min-width:320px){
.padright{
    padding-right: 15px;
}
.btnSearchHeader{
    color: white;
    padding: 5px;
    border:1px solid #ff1d47;
    outline: none;
    width:100%;
    font-size: 25px;
    border-radius: 20px;
    background-color: #ff1d47;
}
}

@media (min-width:768px){
.padright{
    padding-right: 0px;
}
.btnSearchHeader{
    color: white;
    padding: 5px;
    border:1px solid #ff1d47;
    outline: none;
    font-size: 25px;
    background-color: #ff1d47;
}
.padfix{
    padding-right: 0px;
}
}

@media (min-width:992px){
.padfix{
    padding-right: 15px;
}
}

.header-color {
    background-color: transparent;
    padding-top: 10px;
    padding-bottom: 10px;
    transition: 0.4s all;
    position: fixed;
    width: 100%;
    z-index: 999;
    transition: 0.4s all;
}

</style>


