<template>
    <section class="primeraSection">
        <div class="col-12 np backgroundNav">
            <div class="container">
                <div class="col-12 np buscadorInicio">
                    <h1 class="tituloSection1 text-center">
                        Encuentra todo cerca a ti
                    </h1>
                    <h5 class="tituloSection2 text-center">
                        Los mejores establecimientos en un solo lugar
                    </h5>
                </div>
                <div class="col-12 np formPosition">
                    <form class="busquedaForm" autocomplete="off" >
                        <div>
                            <div class="form-group">
                                <input v-model="keyword" class="form-control" type="text" placeholder="Palabra clave">
                            </div>
                            <div class="form-group" style="margin-right:5px;">
                                <select id="listaCategorias" class="form-control" v-model="distrito">
                                <option disabled selected  value="">Seleccione un distrito</option>
                                <option v-for="distrito in distritos"  :value="distrito.id" :key="distrito.id">{{distrito.name}}</option>
                                </select>
                                <!--region-select class="form-control" v-model="region" :country="country" /-->
                            </div>
                            <div class="form-group">
                                <select id="listaCategorias" v-model="categoria">
                                <option disabled selected  value="">Seleccione una categoria</option>
                                <option v-for="categoria in categorias"  :value="categoria.id" :key="categoria.id">{{categoria.name}}</option>
                                </select>
                                <!--region-select class="form-control" v-model="region" :country="country" /-->
                            </div>
                            <div class="form-group form-control">
                                <button @click.self="busquedaAccion" type="button" id="busquedaForm" class="btn-busquedaForm">
                                        BUSCAR LOCALES
                                    </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    name: 'Buscador',
    data(){
        return{
            keyword:'',
            distrito: '',
            categoria: '',
            distritos: {},
            categorias: {},
             
        }
    },
    created(){
      
         axios.get('https://dtodoaqui.xyz/api/location').then((response) => {
        this.distritos = response.data.data;
        //console.log(this.distritos);
        }).catch((error) => {
        
        console.log(error);
        });

        axios.get('https://dtodoaqui.xyz/api/categories').then((response) => {
        this.categorias = response.data.data;
        //console.log(this.distritos);
        }).catch((error) => {
        
        console.log(error);
        });
        
    },
    methods:{
        busquedaAccion(e){
            e.preventDefault();
            if(this.keyword && !this.distrito && !this.categoria){
                this.$router.push(`establecimientos?keyword=`+this.keyword);
            }else if(!this.keyword && this.distrito && !this.categoria){
                this.$router.push(`establecimientos?location=`+parseInt(this.distrito));
            }else if(!this.keyword && !this.distrito && this.categoria){
                this.$router.push(`establecimientos?categories=`+parseInt(this.categoria));
            }else if(this.keyword && this.distrito && !this.categoria){
                this.$router.push(`establecimientos?keyword=`+this.keyword+`&`+`location=`+parseInt(this.distrito));
            }else if(!this.keyword && this.distrito && this.categoria){
                this.$router.push(`establecimientos?location=`+parseInt(this.distrito)+`&`+`categories=`+parseInt(this.categoria));
            }else if(this.keyword && !this.distrito && this.categoria){
                this.$router.push(`establecimientos?keyword=`+this.keyword+`&`+`categories=`+parseInt(this.categoria));
            }else if(this.keyword && this.distrito && this.categoria){
                this.$router.push(`establecimientos?keyword=`+this.keyword+`&`+`location=`+parseInt(this.distrito)+`&`+`categories=`+parseInt(this.categoria));
            }else if(!this.keyword && !this.distrito && !this.categoria){
                this.$router.push(`establecimientos`);
            }
            
        },
       
    },
    

}
</script>
  