<template>
    <div class="navAdministrador col-12">
        <div class="row">
             <div class="col-12 col-md-6 text-center">
                <h1 class="titulo">Bienvenido Administrador</h1>
            </div>
            <div class="col-12 col-md-6 text-right posCerrar">
                <button @click="logout" class="btn btn-danger">Cerrar Sesión</button>
            </div>
            <div class="col-12 col-md-4 text-center" >
                <nuxt-link class="linkAdmi" to="/panel">
                     Establecimientos
                </nuxt-link>
            </div>
            <div class="col-12 col-md-4 text-center" >
                <nuxt-link class="linkAdmi" to="/panel/solicitudes">
                     Solicitudes 
                </nuxt-link>
            </div>
            <div class="col-12 col-md-4 text-center" >
                <nuxt-link class="linkAdmi" to="/panel/reclamos">
                     Reclamos
                </nuxt-link>
            </div>
        </div>
    </div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    name:'NavegadorAdministrador',
    methods:{
        logout() {
            Cookie.remove('auth')
            this.$store.commit('setAuth', null)
            //console.log(this.$store.getters.loggeIn);
           $nuxt.$router.push('/inicio_sesion');
        }
    }
    
}
</script>
<style>
.titulo{
    font-family: 'muli_bold';
    margin-bottom: 30px;
}
.linkAdmi{
    font-family: 'muli_semibold';
    color:#232323;
    font-size: 15px;
    margin-top: 15px;
    text-decoration: none;
    border:2px solid black;
    padding: 10px 25px 10px 25px;
    border-radius:25px;
    transition: 0.4s all;
}
.linkAdmi:hover,.linkAdmi:focus{
    font-family: 'muli_semibold';
    color:#ff1d47;
    font-size: 15px;
    margin-top: 15px;
    text-decoration: none;
    border:2px solid #ff1d47;
    padding: 10px 25px 10px 25px;
    border-radius:25px;
    transition: 0.4s all;
}
.posCerrar{
    margin-top:10px;
}
</style>

