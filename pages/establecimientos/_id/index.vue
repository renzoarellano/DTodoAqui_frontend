<template>
    <div>
        <Header/>


    
        <div class="container" style="padding-top:100px;">
        <div class="row">
          <div v-if="showError" class="col-12 col-md-11 col-lg-7 np position-alert text-center">
    
            <div class="alert alert-danger" role="alert">
    
                <p>
    
                    <b>Porfavor corriga los siguientes errores: </b>
    
                    <li v-for="error in errors" :key="error">{{ error }}</li>
    
                </p>
    
                <button class="btnCerrarErrores" @click="showError = false">
    
                            Cerrar ❌
    
                        </button>
    
            </div>
    
        </div>
        </div>
        
        <div class="row">
            <div class="col-12 ">
               ID del establecimiento: {{ $route.params.id }}
            </div>
            <div class="col-12 text-center">
                <h1>
                    TITULO DEL ESTABLECIMIENTO
                </h1>
            </div>
            <div class="col text-center">
                <img class="tamLogoEstablecimiento" src="https://d500.epimg.net/cincodias/imagenes/2018/11/13/lifestyle/1542113135_776401_1542116070_noticia_normal.jpg" alt="">
            </div>
            <div class="col-12 ">
                <iframe class="mapGoogle" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.5064099055103!2d-77.08406164913637!3d-12.077444445719461!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c970336b0725%3A0xae2a6f969b48786e!2sPlaza+San+Miguel!5e0!3m2!1ses-419!2spe!4v1560026077632!5m2!1ses-419!2spe" frameborder="0" style="border:0" allowfullscreen></iframe>
            
            </div>
        </div>
        <div class="row">
            <div class="col">
                <form @submit="formResena" enctype="multipart/form-data" autocomplete="off">
                    <div class="col">
                        <label for="">Ingrese una reseña</label>
                    </div>
                    <textarea @change="getResena" v-model="resenaEstablecimiento"  id="registroDescripcionEstablecimiento"  class="input"></textarea>
                <div class="col text-center" style="margin-top:15px; margin-bottom:15px;">
                     <button type="submit" class="button">Ingresar Reseña</button>
                </div>
                </form>
            </div>
        </div>
        
    </div>
    <Footer/>
    </div>
</template>

<script>
import axios from 'axios';
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

export default {
    components:{
        Header,
        Footer,
    },
data(){
    return{
        datos:{

        },
        resenaEstablecimiento: '',
        resenaPuestas: '',
        showError:false,
        errors:[],
    }
},
methods:{
    getResena(event) {
            this.resenaEstablecimiento = event.target.value
            console.log(this.resenaEstablecimiento);
        },
    formResena(e){
        e.preventDefault();
        this.errors=[];
        if(this.resenaEstablecimiento.length > 150){
            this.errors.push('La reseña es muy larga; tiene que tener un maximo de 150 carácteres');
            this.showError = true;
        }else if(!this.resenaEstablecimiento){
            this.errors.push('Ingrese una reseña porfavor!');
            this.showError = true;
        }
    }
    },
    
}
</script>

<style>
.btnCerrarErrores {
    background-color: transparent;
    outline: none;
    border: 1px solid rgba(255, 29, 71, 1);
    font-family: 'muli_bold';
    padding: 10px 10px 10px 10px;
    font-size: 15px;
    color: rgba(255, 29, 71, 1);
    border-radius: 20px;
}

.modal {
    width: 500px;
    margin: 0px auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px 3px;
    transition: all 0.2s ease-in;
    font-family: Helvetica, Arial, sans-serif;
}
.position-alert {
    position: fixed;
    margin: auto;
    z-index: 999;
    top: 10%;
}

.button{
    color:rgba(255,29,71,1);
    font-family: 'muli_bold';
    font-size: 18px;
    transition: 0.4s all;
    background-color: white;
    border:1px solid black;
    transition: 0.4s all;
    padding: 5px 10px 5px 10px;
    border-radius:20px;
}
.button:hover{
    color:white;
    font-family: 'muli_bold';
    font-size: 18px;
    transition: 0.4s all;
    background-color: rgba(255,29,71,1);
    border:1px solid black;
    transition: 0.4s all;
    padding: 5px 10px 5px 10px;
    border-radius:20px;
    outline:none;
}
#registroDescripcionEstablecimiento{
    width:100%;
    height:100px;
    border:1px solid black;
    font-family:'muli_semibold';
    font-size:15px;
    border-radius:20px;
    outline:none;
    padding: 5px 10px 5px 10px;
}
.tamLogoEstablecimiento{
    width: 100%;
    max-height: 450px;
    min-height: 250px;
}
.mapGoogle{
    width:100%;
    max-height: 450px;
    min-height: 400px;
}
</style>
