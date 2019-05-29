<template>
    <div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 pad-establecimiento">
        <div class="col-12 np">
            <a href="#"><img class="img-responsive" src="" alt="Establecimiento ejemplo 2"></a>
        </div>
        <div class="col-12 titleEstablecimiento">
            <h4>
                <a href="#">Ejemplo Establecimiento 1</a>
            </h4>
        </div>
        <div class="col-12  direccionEstablecimiento">
            <h6>
                Av. Es un ejemplo 265 Jr.
            </h6>
        </div>
        <div class="col-6 ratingEstablecimiento">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
            <i class="far fa-star"></i>
        </div>
        <div class="col opinionesEstablecimiento">
            <p>
                <span>4545</span> Opiniones
            </p>
        </div>
        <div class="col-12 keywordEstablecimiento">
            <a href="#">Keyword1</a>,
            <a href="#">Keyword2</a>,
            <a href="#">Keyword3</a>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EstablecimientoDestacado',
}
</script>

<style>
.titleEstablecimiento h4 a {
    font-family: 'muli_bold', sans-serif;
    color: #232323;
    text-align: center;
}

.titleEstablecimiento h4 a:focus,
.titleEstablecimiento h4 a:hover {
    text-decoration: none;
    color: #232323;
}

.titleEstablecimiento {
    margin: 5px 0px 0px 0px;
}

.np {
    padding-left: 0px;
    padding-right: 0px;
}

.ratingEstablecimiento {
    text-align: left;
}

.keywordEstablecimiento {
    text-align: left;
}
</style>

