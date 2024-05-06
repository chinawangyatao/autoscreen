<template>
  <div>
      hello wolrd
  </div>
</template>

<script>
import {useAutoScale} from "../../lib/autoscreen.cjs.js"
export default {
  data(){
    return{

    }
  },
  mounted() {
    useAutoScale({
    width:1920,
    height:1080,
    el:document.getElementById("app")
})
  },
  methods:{

  }
}
</script>

<style lang="scss" scoped>

</style>
