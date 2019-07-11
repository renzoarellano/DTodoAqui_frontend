<template>
    <div class="col-12 np">
        <div class="row">
            <div class="col-12 col-sm-5 np">
                <img class="img-responsive" :src="`https://dtodoaqui.xyz/`+imagen" alt="Establecimiento - DtodoAqui">
            </div>
            <div class="col-12 col-sm-7 text-left">
                <div class="col-12 titleEstablecimiento">
                    <h4>
                        <nuxt-link :to="'establecimientos/'+ id"> {{title}} </nuxt-link>
                    </h4>
                </div>
                <div class="col-12  direccionEstablecimiento">
                    <h6>
                       {{ direccion }}
                    </h6>
                </div>
                <div class="col ratingEstablecimiento">
                  Rating: <star-rating :show-rating="false" :star-size="25" :read-only="true" :rating="rating"></star-rating>
                </div>
                <div class="col-12 keywordEstablecimiento ">
                    <li class="posKeywords" v-for="key in keywords" :key="key.id">
                        <nuxt-link :to="'establecimiento/' + key.name">
                        {{key.name}}
                        </nuxt-link>
                    </li>
                </div>
                <div>
                    {{keywords}}
                </div>
                <div class="col-12 descripcionEstablecimiento text-justify">
                    <p>
                        <span> Descripción: </span> <br> {{descripcion}}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    name: 'Establecimiento',
    data(){
        return{
        boundRating: 0,
        }
    },
    props:{
        id: Number,
        imagen:String,
        title:String,
        direccion:String,
        keywords:String,
        descripcion:String,
        rating: Number,
    },
    
}
</script>

<style>
.descripcionEstablecimiento p span {
    color: #ff1d47;
    font-family: 'muli_semibold';
    font-size: 13px;
}
.opinionesEstablecimiento{
    margin-top:25px;
}
.descripcionEstablecimiento p {
    color: #232323;
    font-family: 'muli_regular';
    font-size: 12px;
}
.posKeywords{
    float:left;
    list-style: none;
}
.estiloEstrella{
    color:#ff1d47;

}
</style>


