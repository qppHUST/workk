<template>
  <router-link to="/index" class="logo-wrapper ">
     <img  v-if='collapse' alt="logo" class="logo" src="@/assets/img/ksLogo.png"  />
     <img  v-else alt="logo" class="logo" src="@/assets/img/logo.png"  />
    <!-- <svg-icon icon="logo" class="verticalMiddle" :size="30" />
    <div class="logo-title verticalMiddle">Vue Antd Admin</div> -->
  </router-link>
</template>

<script>
export default {
  name: 'logo',
  props: ['collapse'],
  data() {
    return {};
  },

};
</script>
<style scoped>
.logo{
  height: 38px ;
}
</style>
