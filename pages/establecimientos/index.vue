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
            :title="establecimiento.name" :direccion="establecimiento.address" :keywords="keyword" :descripcion="establecimiento.description" :rating="establecimiento.rating"/>
        </div>
         
      </div>  
    </div>
    <Footer />
  </div>
</template>

<script>
/*eslint-disable */
// @ is an alias to /src
import Buscador from "@/components/Buscador.vue";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import SearchHeader from "@/components/SearchHeader.vue";
import BannerEstablecimiento from "@/components/BannerEstablecimiento.vue";
import Establecimiento from "@/components/Establecimiento.vue";
export default {
  name: "establecimientos",
  components: {
    Header,
    Buscador,
    SearchHeader,
    BannerEstablecimiento,
    Establecimiento,
    Footer,
  },
  data(){
    return{
      keyword:'',
      establecimientos:{},
      distrito:'',
      categoria:'',
      arrayRatings: {},
    }
  },
  mounted(){
        
  },
  created(){
        var currentUrl = this.$route.query;
        console.log(currentUrl);
        this.keyword = currentUrl.keyword;
        this.distrito = currentUrl.location;
        this.categoria = currentUrl.categories;
        var linksearch = '';
        if(this.keyword && !this.distrito && !this.categoria){
          linksearch = `https://dtodoaqui.xyz/api/search?keyword=`+this.keyword;
        }else if(!this.keyword && this.distrito && !this.categoria){
          linksearch = `https://dtodoaqui.xyz/api/search?location=`+this.distrito;
        }else if(!this.keyword && !this.distrito && this.categoria){
            linksearch = `https://dtodoaqui.xyz/api/search?categories=`+this.categoria;
        }else if(this.keyword && this.distrito && !this.categoria){
            linksearch = `https://dtodoaqui.xyz/api/search?keyword=`+this.keyword+`&location=`+this.distrito;
        }else if(!this.keyword && this.distrito && this.categoria){
            linksearch = `https://dtodoaqui.xyz/api/search?location=`+this.distrito+`&categories=`+this.categoria;
        }else if(this.keyword && !this.distrito && this.categoria){
           linksearch = `https://dtodoaqui.xyz/api/search?keyword=`+this.keyword+`&categories=`+this.categoria;
        }else if(this.keyword && this.distrito && this.categoria){
            linksearch = `https://dtodoaqui.xyz/api/search?keyword=`+this.keyword+`&location=`+this.distrito+`&categories=`+this.categoria;
        }else if(!this.keyword && !this.distrito && !this.categoria){
          linksearch = `https://dtodoaqui.xyz/api/search`;
        }
        
        this.$axios.$get(linksearch).then((response) => {
        this.establecimientos = response.data;
        //console.log(this.establecimientos);
          this.establecimientos.forEach((item) => {
            this.$axios.$get(`https://dtodoaqui.xyz/api/listings/`+item.id+`/rating`).then((response) => {
            item.rating = response.sum;
           //console.log(item.rating + '-' + item.id);
          }).catch((error) => {
          console.log(error);
          });
          });
        }).catch((error) => {
        
        console.log(error);
        });

        

        
    },

};
</script>
<style>
.espacioEstablecimiento{
  margin-top: 15px;
  margin-bottom: 15px;
}
</style>

