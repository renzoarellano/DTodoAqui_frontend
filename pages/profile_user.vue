<template>
    <div class="profileUser">
    <Header />
    <ProfileUser /> 
    <Footer />
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import ProfileUser from "@/components/ProfileUser.vue";

export default {
  name: "profile_user",
  components: {
    Header,
    ProfileUser,
    Footer,
  }
}
</script>
