<template>
<el-container style="height:100vh;">
  <el-header>
    
  </el-header>
  <el-main style="padding:0px;">
    
      <el-container style="height:100%;">
        <el-aside ref="left">
          <el-tree :data="data" :props="defaultProps"></el-tree>
        </el-aside>
        <el-container ref="main">
          <el-main>Main</el-main>
        </el-container>
      </el-container>
    
  </el-main>
  <el-footer></el-footer>
</el-container>
  
</template>

<script>
import Split from 'split.js'
const axios = require("axios").default;

export default {
  name: 'MainView',
  props: {
    
  },
  data(){
    return {
      data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
    };
  },
  mounted(){
    Split([this.$refs.left.$el, this.$refs.main.$el], {
        sizes: [25, 75],
        gutterSize: 5,
        minSize: [0, 100],
    })
    this.initSession();
  },
  methods:{
    initSession() {
      axios
        .get(`${window.base}/user/signin?${window.signin}`)
        .then((rtn) => {
          window.session = rtn.data.message;
        })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.el-tree{
  background: transparent;
}
.el-header{
  background:rgb(37, 45, 71);
  height: 50px!important;
}
.el-aside,.el-footer{
  background: #f2f2f2;
}
.el-footer{
  height:30px!important;
  line-height: 30px;
}
.gutter.gutter-horizontal {
    background:#f2f2f2;
}
</style>
