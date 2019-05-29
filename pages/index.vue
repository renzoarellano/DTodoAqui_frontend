<template>
  <div class="home">
    <Header />
    <Buscador />
    <CategoriasHome />
    <div class="container">
        <div class="row">
            <div class="col-xl-12 np titleEstablecimientos">
                <h1>
                    Establecimientos Destacados
                </h1>
            </div>
            <EstablecimientoDestacado />
        </div>
     </div>
    <Footer />
  </div>
</template>

<script>
/*eslint-disable */
// @ is an alias to /src
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";
import Buscador from "~/components/Buscador.vue";
import CategoriasHome from "~/components/CategoriasHome.vue";
import EstablecimientoDestacado from "~/components/EstablecimientoDestacado.vue";



export default {
  name: "home",
  components: {
    Header,
    Buscador,
    CategoriasHome,
    EstablecimientoDestacado,
    Footer,
  }
};
</script>

<style>

</style>

