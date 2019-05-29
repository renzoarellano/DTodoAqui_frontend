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
                                <option v-for="distrito in distritos" v-bind:value="distrito.name"  v-bind:label="distrito.name">
                                    
                                </option>
                                </datalist>
                                <!--region-select class="form-control" v-model="region" :country="country" /-->
                            </div>
                            <div class="form-group">
                                <select name="categoria" id="categoriaBusqueda" class="form-control option-style" tabindex="-98">
                                        <option class="color-selected" value="0" selected disabled>Todas las categorías
                                        </option>
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
export default {
    name: 'Buscador',
    data(){
        return{
            country: 'PE',
            distrito: '',
            distritos: [
            {name:"Callao"},
            {name:"Bellavista"},  
            {name:"Carmen de la Legua Reynoso"},  
            {name:"La Perla"},  
            {name:"La Punta"},  
            {name:"Ventanilla"},  
            {name:"Mi Perú"},  
            {name:"Lima"},
            {name:"Ancón"},  
            {name:"Ate"},  
            {name:"Barranco"},  
            {name:"Breña"},  
            {name:"Carabayllo"},  
            {name:"Chaclacayo"},  
            {name:"Chorrillos"},  
            {name:"Cieneguilla"},  
            {name:"Comas"},  
            {name:"El Agustino"},  
            {name:"Independencia"},  
            {name:"Jesús María"},  
            {name:"La Molina"},  
            {name:"La Victoria"},  
            {name:"Lince"},  
            {name:"Los Olivos"},  
            {name:"Lurigancho"},  
            {name:"Lurin"},  
            {name:"Magdalena del Mar"},  
            {name:"Pueblo Libre"},  
            {name:"Miraflores"},  
            {name:"Pachacamac"},  
            {name:"Pucusana"},  
            {name:"Puente Piedra"},  
            {name:"Punta Hermosa"},  
            {name:"Punta Negra"},  
            {name:"Rímac"},  
            {name:"San Bartolo"},  
            {name:"San Borja"},  
            {name:"San Isidro"},  
            {name:"San Juan de Lurigancho"},  
            {name:"San Juan de Miraflores"},  
            {name:"San Luis"},  
            {name:"San Martín de Porres"},  
            {name:"San Miguel"},  
            {name:"Santa Anita"},  
            {name:"Santa María del Mar"},  
            {name:"Santa Rosa"},  
            {name:"Santiago de Surco"},  
            {name:"Surquillo"},  
            {name:"Villa El Salvador"},  
            {name:"Villa María del Triunfo"}
           
            ],
             
        }
    },
    mounted(){
        
    },
    methods:{
        
    }

}
</script>
  