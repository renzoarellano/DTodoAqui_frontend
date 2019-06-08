<template>
  <div>
    <SearchHeader />  
    <BannerEstablecimiento />
    <div class="container">
      <div class="row">
        <div class="col-12  col-lg-12 col-xl-12">
            <!--Filtro de Busqueda -->
        </div>
        <div class="col-12  col-lg-6 col-xl-6 espacioEstablecimiento">
            <Establecimiento :id="'1'" :imagen="'https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg'"
            :title="'Esto es una prueba'" :direccion="'Prueba de direccion'" :keywords="keyword" :descripcion="'Esto es una descripcion descripcion descripcion descripcion'"/>
        </div>

        <div class="col-12  col-lg-6 col-xl-6 espacioEstablecimiento">
            <Establecimiento :id="'1'" :imagen="'https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg'"
            :title="'Esto es una prueba'" :direccion="'Prueba de direccion'" :keywords="keyword" :descripcion="'Esto es una descripcion descripcion descripcion descripcion'"/>
        </div>

        <div class="col-12  col-lg-6 col-xl-6 espacioEstablecimiento">
            <Establecimiento :id="'1'" :imagen="'https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg'"
            :title="'Esto es una prueba'" :direccion="'Prueba de direccion'" :keywords="keyword" :descripcion="'Esto es una descripcion descripcion descripcion descripcion'"/>
        </div>

        <div class="col-12  col-lg-6 col-xl-6 espacioEstablecimiento">
            <Establecimiento :id="'1'" :imagen="'https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg'"
            :title="'Esto es una prueba'" :direccion="'Prueba de direccion'" :keywords="keyword" :descripcion="'Esto es una descripcion descripcion descripcion descripcion'"/>
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
  },
  data(){
    return{
      keyword:'Ceviche'
    }
  }
};
</script>
<style>
.espacioEstablecimiento{
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>

