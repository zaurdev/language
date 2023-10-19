<template>
    <div>
        <nav class="navbar navbar-light bg-light align-items-center" v-if="showAdd">
            <router-link class="navbar-brand" to="/">
                <img src="/img/icon.png" width="60" height="60" class="d-inline-block align-top" alt="">
            </router-link>
            <div class="d-flex">
                <a href="javascript:void(0)" class="btn btn-primary mr-2" @click.prevent="reload()">
                    Çözülmüşleri yeniden sor
                </a>
                <router-link to="/add" class="btn btn-primary">
                    <i class="fas fa-plus mr-1"></i>
                    Kelimeler ekle
                </router-link>
            </div>
        </nav>
        <router-link to="/" class="btn btn-primary" v-else>
            <i class="fas fa-arrow-left mr-1"></i>
            Geri dön
        </router-link>
    </div>
</template>

<script>
export default {
    methods:{
        reload(){
            this.$emit('repeat', true);
        }
    },
    computed: {
        showAdd() {
            if (this.$route.fullPath == '/add') {
                return false;
            } else {
                return true;
            }
        }
    }
}
</script>