<template>
    <el-row type="flex" :gutter="0" v-if="auth">
        <el-col :span="19">
            <el-link href="/" :underline="false">
                <el-image :src="auth.Company.logo" fit="contain"></el-image>
            </el-link>
            <span style="font-size:16px;vertical-align: top;">{{auth.Company.title}}</span>
        </el-col>
        <el-col :span="3" style="text-align: right;">
            <!-- <MessageView></MessageView> -->
        </el-col>
        <el-col :span="1" style="text-align: right;">
            
        </el-col>
        <el-col :span="2">
            
            <el-menu :default-active="activeIndex" 
                    class="topbar-el-menu" 
                    mode="horizontal" 
                    menu-trigger="hover"
                    @select="onSelect">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-user-solid"></i> {{ auth.username }}
                    </template>
                    <el-menu-item index="/matrix/user">
                        <i class="el-icon-user"></i>
                        <template slot="title">
                            <span slot="title">用户</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/matrix/system" divided v-if="auth.isAdmin">
                        <i class="el-icon-setting"></i>
                        <template slot="title">
                            <span slot="title">系统管理</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/matrix/files" v-if="auth.isAdmin">
                        <i class="el-icon-folder"></i>
                        <template slot="title">
                            <span slot="title">我的文件</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="home" v-if="auth.isAdmin">
                        <i class="el-icon-s-home"></i>
                        <template slot="title">
                            <span slot="title">默认首页</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="signout" divided>
                        <i class="el-icon-s-unfold"></i>
                        <template slot="title">
                            <span slot="title">注销</span>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </el-col>
    </el-row>    
</template>

<script>
import _startsWith from 'lodash/startsWith';
import Cookies from 'js-cookie';
//import MessageView from '../../components/message/MessageView';

export default{
    name: "Header",
    props: {
        auth: Object
    },
    data(){
        return {
            activeIndex: '1'
        }
    },
    components: {
        //MessageView
    },
    created(){
        this.initTheme();
    },
    mounted(){
        this.m3.html.setTitle(this.auth);
    },
    methods: {
        onSelect(key) {
            if(_startsWith(key,'/matrix/')){
                window.open(key, '_blank');
            } else {
                if(key === 'home'){
                    this.m3.html.setAppAsHome(this,{url:'/home'});
                } else if(key==='signout'){
                    window.open(`/user/logout/${this.auth.Company.name}`,'_parent');
                } 
            }
        },
        initTheme(){
            let body = document.body;
            let value = Cookies.get('m3-theme')?Cookies.get('m3-theme'):'dark';
            body.classList.add(value);
        },
        onToggleTheme(val){

            //let theme = {dark:'#252D47',light:'#409EFF'};
            
            Cookies.set('m3-theme',val);
            
            window.location.reload();
        }
    }
}
</script>
<style scoped>
    .el-icon-user-solid{
        color: #ffffff!important;
        font-weight:500!important;
    }
</style>
<style>
    .dark .m3 > .header{
        height: 50px!important;
        line-height: 50px;
        /* background: rgb(37, 45, 71); */
        background: #252D47;
        color: #ffffff;
        padding: 0px 0px 0px 10px;
        position: fixed;
        width: 100%;
        z-index: 1000;
    }
    .light .m3 > .header{
        height: 50px!important;
        line-height: 50px;
        /* background: rgb(37, 45, 71); */
        background: #1890ff;
        color: #ffffff;
        padding: 0px 0px 0px 10px;
    }
    .m3 > .header .el-image > .el-image__inner{
        max-width: 120px;
        min-width: 32px;
        width: 64px;
        height: 32px;
        padding: 7px 0px;
    }
    .m3 > .el-main{
        padding: 0px;
    }
    .el-link.el-link--default {
        color: #ffffff;
    }
    .topbar-el-menu .el-submenu__icon-arrow.el-icon-arrow-down{
            color: #ffffff;
        }
        .el-menu-item:hover{
            background-color: #409dfe!important;
        }
    .dark .m3 .topbar-el-menu.el-menu.el-menu--horizontal {
            border-bottom: unset;
            background: #242c46;
        }
    .light .m3 .topbar-el-menu.el-menu.el-menu--horizontal {
            border-bottom: unset;
            background: #1890ff;
        }
        .topbar-el-menu.el-menu.el-menu--horizontal >.el-menu-item {
            height: 30px;
            line-height: 30px;
        }
        .topbar-el-menu.el-menu.el-menu--horizontal>.el-submenu {
            float: right;
        }
        .topbar-el-menu.el-menu.el-menu--horizontal >.el-submenu .el-submenu__title {
            height: 50px;
            line-height: 50px;
            border-bottom: unset;
            color: #ffffff;
        }
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):focus, 
    .el-menu--horizontal>.el-menu-item:not(.is-disabled):hover, 
    .el-menu--horizontal>.el-submenu .el-submenu__title:hover {
        background-color: #409dfe!important;
    }
</style>
