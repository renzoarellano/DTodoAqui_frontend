<template>
  <div> 
    <SearchHeader /> 
    <BannerEstablecimiento /> 
    <div class="col-12 subHeaderBuscador" style="padding-top:10px;">
      <div class="row">
         <div class="col-2 text-right">
                      <button @click="busquedaTodos" class="btnTodos">Mostrar Todos</button>
                    </div>
                    <form @submit="busquedaAccion" class="col-10 np">
                        <div class="row justify-content-md-center">
                            <div class="col-12 col-sm-3 padright">
                                <input v-model="keywordopc" class="searchHeaderstyle" type="text" placeholder="Keyword">
                            </div>
                            <div class="col-12 col-sm-3 padright">
                                <select  class="searchHeaderstyle" v-model="distritoopc">
                                <option disabled selected  value="">Seleccione un distrito</option>
                                <option v-for="distrito in distritosOpc"  :value="distrito.id" :key="distrito.id">{{distrito.name}}</option>
                                </select>
                            </div>
                            <div class="col-12 col-sm-3 padright">
                                <select class="searchHeaderstyle" v-model="categoriaopc">
                                <option disabled selected  value="">Seleccione una categoria</option>
                                <option v-for="categoria in categoriasOpc"  :value="categoria.id" :key="categoria.id">{{categoria.name}}</option>
                                </select>
                            </div>
                            <div class="col-12 col-sm-1 padfix">
                                <button class="btnSearchHeader" type="submit">
                                    <img class="tambtnSearch" src="~/assets/search.png" alt="">
                                </button>
                            </div>
                        </div>
                    </form>
      </div>               
    </div>
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
      establecimientos:{},
      distritosOpc:{},
      distrito: '',
      distritoopc: '',
      categoriasOpc:{},
      categoria:'',
      categoriaopc: '',
      keyword: '',
      keywordopc:'',
      arrayRatings: {},
    }
  },
  methods:{
        busquedaAccion(e){
            e.preventDefault();
            var linksearch = '';
            if(this.keywordopc && !this.distritoopc && !this.categoriaopc){
              linksearch = `https://dtodoaqui.xyz/api/search?keywordopc=`+this.keywordopc;
            }else if(!this.keywordopc && this.distritoopc && !this.categoriaopc){
              linksearch = `https://dtodoaqui.xyz/api/search?location=`+this.distritoopc;
            }else if(!this.keywordopc && !this.distritoopc && this.categoriaopc){
                linksearch = `https://dtodoaqui.xyz/api/search?categories=`+this.categoriaopc;
            }else if(this.keywordopc && this.distritoopc && !this.categoriaopc){
                linksearch = `https://dtodoaqui.xyz/api/search?keywordopc=`+this.keywordopc+`&location=`+this.distritoopc;
            }else if(!this.keywordopc && this.distritoopc && this.categoriaopc){
                linksearch = `https://dtodoaqui.xyz/api/search?location=`+this.distritoopc+`&categories=`+this.categoriaopc;
            }else if(this.keywordopc && !this.distritoopc && this.categoriaopc){
              linksearch = `https://dtodoaqui.xyz/api/search?keywordopc=`+this.keywordopc+`&categories=`+this.categoriaopc;
            }else if(this.keywordopc && this.distritoopc && this.categoriaopc){
                linksearch = `https://dtodoaqui.xyz/api/search?keywordopc=`+this.keywordopc+`&location=`+this.distritoopc+`&categories=`+this.categoriaopc;
            }else if(!this.keywordopc && !this.distritoopc && !this.categoriaopc){
              linksearch = `https://dtodoaqui.xyz/api/search`;
            }
            
            this.$axios.$get(linksearch).then((response) => {
            this.establecimientos = response.data;
            //console.log(this.establecimientos);
              this.establecimientos.forEach((item) => {
                this.$axios.$get(`https://dtodoaqui.xyz/api/listings/`+item.id+`/rating`).then((response) => {
                item.rating = response.sum;
              //console.log(item.rating + '-' + item.id);
              this.$forceUpdate();
              }).catch((error) => {
              console.log(error);
              });
              });
            }).catch((error) => {
            
            console.log(error);
            });  
        },
         busquedaTodos(){
              this.$axios.$get('https://dtodoaqui.xyz/api/search').then((response) => {
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
            }
        
  },
  created(){
    this.$axios.$get('https://dtodoaqui.xyz/api/location').then((response) => {
        this.distritosOpc = response.data;
        //console.log(this.distritos);
        }).catch((error) => {
        
        console.log(error);
        });

        this.$axios.$get('https://dtodoaqui.xyz/api/categories').then((response) => {
        this.categoriasOpc = response.data;
        //console.log(this.distritos);
        }).catch((error) => {
        
        console.log(error);
        });
        

        var currentUrl = this.$route.query;
        console.log(currentUrl);
        this.keywordopc = currentUrl.keyword;
        this.distrito = currentUrl.location;
        this.categoria = currentUrl.categories;
        var linksearch = '';
        if(this.keywordopc && !this.distrito && !this.categoria){
          linksearch = `https://dtodoaqui.xyz/api/search?keyword=`+this.keywordopc;
        }else if(!this.keywordopc && this.distrito && !this.categoria){
          linksearch = `https://dtodoaqui.xyz/api/search?location=`+this.distrito;
        }else if(!this.keywordopc && !this.distrito && this.categoria){
            linksearch = `https://dtodoaqui.xyz/api/search?categories=`+this.categoria;
        }else if(this.keywordopc && this.distrito && !this.categoria){
            linksearch = `https://dtodoaqui.xyz/api/search?keyword=`+this.keywordopc+`&location=`+this.distrito;
        }else if(!this.keywordopc && this.distrito && this.categoria){
            linksearch = `https://dtodoaqui.xyz/api/search?location=`+this.distrito+`&categories=`+this.categoria;
        }else if(this.keywordopc && !this.distrito && this.categoria){
           linksearch = `https://dtodoaqui.xyz/api/search?keyword=`+this.keywordopc+`&categories=`+this.categoria;
        }else if(this.keywordopc && this.distrito && this.categoria){
            linksearch = `https://dtodoaqui.xyz/api/search?keyword=`+this.keywordopc+`&location=`+this.distrito+`&categories=`+this.categoria;
        }else if(!this.keywordopc && !this.distrito && !this.categoria){
          linksearch = `https://dtodoaqui.xyz/api/search`;
        }
        
        this.$axios.$get(linksearch).then((response) => {
        this.establecimientos = response.data;
        //console.log(this.establecimientos);
          this.establecimientos.forEach((item) => {
            this.$axios.$get(`https://dtodoaqui.xyz/api/listings/`+item.id+`/rating`).then((response) => {
            item.rating = response.sum;
           //console.log(item.rating + '-' + item.id);
           this.$forceUpdate();
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
.btnTodos{
  background-color: #ff1d47;
  border: 1px solid #232323;
  padding: 10px 25px 10px 25px;
  color:white;
  outline:none;
  border-radius: 25px;
}
</style>

