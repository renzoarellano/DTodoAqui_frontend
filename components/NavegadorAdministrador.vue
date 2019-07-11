<template>
    <div class="navAdministrador col-12">
        <div class="row">
             <div class="col-12 text-center">
                <h1 class="titulo">Bienvenido Administrador</h1>
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
export default {
    name:'NavegadorAdministrador',
    
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
</style>

