<template>
  <div>
    <SearchHeader />  
    <BannerEstablecimiento />
    <div class="container">
      <div class="row">
        <div class="col-12  col-lg-5 col-xl-5">
            <!--Filtro de Busqueda -->
        </div>
        <div class="col-12  col-lg-7 col-xl-7">

            <Establecimiento />
   
        </div>
      </div>  
    </div>
    <Footer />
  </div>
</template>

<script>
/*eslint-disable */
// @ is an alias to /src
import SearchHeader from "@/components/SearchHeader.vue";
import Footer from "@/components/Footer.vue";
import BannerEstablecimiento from "@/components/BannerEstablecimiento.vue";
import Establecimiento from "@/components/Establecimiento.vue";
export default {
  name: "establecimientos",
  components: {
    SearchHeader,
    BannerEstablecimiento,
    Establecimiento,
    Footer,
  }
};
</script>
