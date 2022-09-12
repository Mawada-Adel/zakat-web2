<template>
  <div class="home">
    <navComponent></navComponent>
    <HelloWorld />
  </div>
</template>

<script>
// @ is an alias to /src

import HelloWorld from '@/components/HelloWorld.vue'
import navComponent from '@/components/nav.vue'

export default {
  name: 'HomeView',
  components: {
    navComponent,
    HelloWorld
  }
}
</script>
