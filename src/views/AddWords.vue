<template>
    <div>
        <form @submit.prevent="$emit('inputSubmit', word); word.name = ''; word.equal = '';">
            <div class="form-row">
                <div class="form-group col-lg-3">
                    <input type="text" class="form-control" v-model="word.name" placeholder="Kelime">
                </div>
                <div class="form-group col-lg-3">
                    <input type="text" class="form-control" v-model="word.equal" placeholder="Karşılığı">
                </div>
                <div class="form-group col-lg-3">
                    <button type="submit" class="btn btn-primary"><i class="fas fa-plus mr-1"></i>Ekle</button>
                </div>
            </div>
        </form>
        <div class="table-responsive">
            <table class="table table-sm">
                <thead class="thead-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Kelime</th>
                        <th scope="col">Karşılığı</th>
                        <th scope="col">Sil</th>
                    </tr>
                </thead>
                <tbody v-if="itemsForAdd.length > 0">
                    <tr v-for="(el, index) in itemsForAdd" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ el.name }}</td>
                        <td>{{ el.equal }}</td>
                        <td ><a href="#" class="btn btn-danger btn-sm" @click.prevent="$emit('deleteAdd', el.id)">Kaydı sil</a></td>
                    </tr>
                </tbody>
                <tbody v-if="itemsForAdd.length == 0">
                    <tr>
                        <td colspan="3"><small>Sonuç bulunamadı</small></td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        itemsForAdd: {
            type: Array,
            default: [],
            required: true
        }
    },
    data() {
        return {
            word: {
                name: '',
                equal: ''
            }
        }
    }
}
</script>
