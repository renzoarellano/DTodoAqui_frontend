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
                    <form class="busquedaForm" method="POST" action="index.html">
                        <div>
                            <div class="form-group">
                                <input class="form-control" type="text" placeholder="Palabra clave">
                            </div>
                            <div class="form-group">
                                <input list="listaDistritos" v-model="distrito"  class="form-control" type="text"  placeholder="Distrito">
                                <datalist id="listaDistritos" >
                                <option v-for="distrito in distritos" v-bind:value="distrito.name"  v-bind:label="distrito.name" :key="distrito.name">
                                </option>
                                </datalist>
                                <!--region-select class="form-control" v-model="region" :country="country" /-->
                            </div>
                            <div class="form-group">
                                <select name="categoria" id="categoriaBusqueda" class="form-control option-style" tabindex="-98">
                                        <option class="color-selected" value="0" selected disabled>Todas las categorías</option>
                                        <option class="color-selected" value="Hoteles"> Hoteles</option>
                                        <option class="color-selected" value="Comida Rápida"> Comida Rápida</option>
                                        <option class="color-selected" value="Restaurantes"> Restaurantes</option>
                                        <option class="color-selected" value="Gimnasios"> Gimnasios</option>
                                    </select>
                            </div>
                            <div class="form-group form-control">
                                <button type="submit" id="busquedaForm" class="btn-busquedaForm">
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
export default {
    name: 'Buscador',
    data(){
        return{
            country: 'PE',
            distrito: '',
            distritos: {},
             
        }
    },
    created(){
      
         axios.get('https://dtodoaqui.xyz/api/location').then((response) => {
        this.distritos = response.data.data;
        //console.log(this.distritos);
        }).catch((error) => {
        
        console.log(error);
        });
        
    },
    methods:{
        
    },
    

}
</script>
  