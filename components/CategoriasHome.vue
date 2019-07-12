<template>
    <section class="segundaSection">
        <div class="container">
            <div class="row">
                <div class="col-xl-12 np titleEstablecimientos">
                    <h1>
                        Encuentra el mejor negocio en tu ciudad
                    </h1>
                </div>
                <div class="col-6 col-md-4 col-lg-3 col-xl-3 text-center padCategoria">
                    <nuxt-link to="/establecimientos?categories=3">
                        <div class="col-12 np">
    
                            <img class="" src="~/assets/hotel.png" alt="">
    
                        </div>
                        <div class="col-12 np postitleCategoria">
                            <h6>
                                Hoteles
                            </h6>
                        </div>
                    </nuxt-link>
                </div>
                <div class="col-6 col-md-4 col-lg-3 col-xl-3 text-center padCategoria">
                    <nuxt-link to="/establecimientos?categories=2">
                        <div class="col-12 np">
    
                            <img src="~/assets/food-truck.png" alt="">
    
                        </div>
                        <div class="col-12 np postitleCategoria">
                            <h6>
                                Comida Rápida
                            </h6>
                        </div>
                    </nuxt-link>
                </div>
                <div class="col-6 col-md-4 col-lg-3 col-xl-3 text-center padCategoria">
                    <nuxt-link to="/establecimientos?categories=1">
                        <div class="col-12 np">
    
                            <img src="~/assets/restaurant.png" alt="">
    
                        </div>
                        <div class="col-12 np postitleCategoria">
                            <h6>
                                Restaurantes
                            </h6>
                        </div>
                    </nuxt-link>
                </div>
                <div class="col-6 col-md-4 col-lg-3 col-xl-3 text-center padCategoria">
                    <nuxt-link to="/establecimientos?categories=4">
                        <div class="col-12 np">
    
                            <img src="~/assets/gym.png" alt="">
    
                        </div>
                        <div class="col-12 np postitleCategoria">
                            <h6>
                                Gimnasios
                            </h6>
                        </div>
                    </nuxt-link>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'CategoriasHome',
}
</script>
