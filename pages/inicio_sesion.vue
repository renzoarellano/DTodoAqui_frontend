<template>
  <div class="inicio_sesion">
    <Header />
    <Login /> 
    <Footer />
  </div>
</template>

<script>
/*eslint-disable */
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Login from "@/components/InicioSesion.vue";

export default {
  name: "inicio_sesion",
  components: {
    Header,
    Login,
    Footer,
  }
};
</script>
