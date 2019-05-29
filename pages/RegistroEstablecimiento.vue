<template>
  <div class="inicio_sesion">
    <Header />
    <RegistroEstablecimiento />
    <Footer />
  </div>
</template>

<script>
/*eslint-disable */
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import RegistroEstablecimiento from "@/components/RegistroEstablecimiento.vue";

export default {
  name: "registro_establecimiento",
  components: {
    Header,
    RegistroEstablecimiento,
    Footer,
  }
};
</script>
