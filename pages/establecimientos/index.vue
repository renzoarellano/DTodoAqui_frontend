<template>
  <div>
    <SearchHeader />  
    <BannerEstablecimiento />
    <div class="container">
      <div class="row">
        <div class="col-12  col-lg-12 col-xl-12">
            <!--Filtro de Busqueda -->
        </div>
        <div class="col-12  col-lg-6 col-xl-6 espacioEstablecimiento" v-for="establecimiento in establecimientos" :key="establecimiento.id" >
            <Establecimiento  :id="establecimiento.id" :imagen="establecimiento.slug"
            :title="establecimiento.name" :direccion="establecimiento.address" :keywords="keyword" :descripcion="establecimiento.description"/>
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
      keyword:'Ceviche',
      establecimientos:{},
    }
  },
  created(){
       this.$axios.$get('https://dtodoaqui.xyz/api/listings').then((response) => {
        this.establecimientos = response.data;
        console.log(this.establecimientos);
        }).catch((error) => {
        
        console.log(error);
        });
    }
};
</script>
<style>
.espacioEstablecimiento{
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>

