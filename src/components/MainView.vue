<template>

  <RuleView style="height:calc(100vh - 50px);"></RuleView>
  
</template>

<script>
import RuleView from './rule/RuleView';


export default {
  name: 'MainView',
  props: {
    global: Object
  },
  components:{
    RuleView
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .gutter.gutter-horizontal {
      background:#f2f2f2;
}
</style>
