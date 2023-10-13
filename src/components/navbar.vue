<template>
    <div>
        <nav class="navbar navbar-light bg-light align-items-center" v-if="showAdd">
            <router-link class="navbar-brand" to="/">
                <img src="/img/icon.png" width="60" height="60" class="d-inline-block align-top" alt="">
            </router-link>
            <router-link to="/add" class="btn btn-primary">
                <i class="fas fa-plus mr-1"></i>
                Kelimeler ekle
            </router-link>
        </nav>
        <router-link to="/" class="btn btn-primary" v-else>
            <i class="fas fa-arrow-left mr-1"></i>
            Geri dön
        </router-link>
    </div>
</template>

<script>
export default {
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