<template>
  <div class="edicion">
    <Header />
    <div class="container">
        <div class="row">
          <editEstablecimiento> </editEstablecimiento>
        </div>
     </div>
    <Footer />
  </div>
</template>

<script>
/*eslint-disable */
// @ is an alias to /src
import Header from "~/components/Header.vue";
import editEstablecimiento from "~/components/editEstablecimiento.vue";
import Footer from "~/components/Footer.vue";



export default {
  name: "home",
  data(){
    return{
      getID:'',
    datos:{},
    markers: { 
      lng: 10.2, 
      lat: 10
      }
    ,
    categoria:'',
    location:'',
    userCreador:'',
    }
  },
  components: {
    Header,
    editEstablecimiento,
    Footer,
  },
  
};
</script>

<style>

</style>

