<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 mt-3">
                <app-navbar />
            </div>
            <div class="col-lg-12 mt-3">
                <router-view 
                        :randomElements="randomElements" 
                        @inputSubmit="addData($event)" 
                        :itemsForAdd="itemsForAdd"
                        @deleteAdd="deleteDataAdd($event)" 
                    />
            </div>
        </div>
    </div>
</template>

<script>
import { initDB, getDB } from "../indexDB";
export default {
    data() {
        return {
            itemsForAdd: [],
        }
    },
    components: {
        "app-navbar": () => import('../components/navbar.vue'),
    },
    computed: {
        randomElements() {
            const shuffledList = this.shuffleArray(this.list);
            return shuffledList.slice(0, 7);
        }
    },
    methods: {
        shuffleArray(array) {
            let shuffled = this.itemsForAdd.slice(0), i = this.itemsForAdd.length, temp, index;
            while (i-- > 0) {
                index = Math.floor((i + 1) * Math.random());
                temp = shuffled[index];
                shuffled[index] = shuffled[i];
                shuffled[i] = temp;
            }
            return shuffled;
        },
        deleteDataAdd(id) {
            const db = getDB();
            const transaction = db.transaction(["words"], "readwrite");
            const objectStore = transaction.objectStore("words");

            const request = objectStore.delete(id);

            request.onsuccess = () => {
                this.getDataAdd();
            };
            request.onerror = () => { };
        },
        getDataAdd() {
            const db = getDB();
            const transaction = db.transaction(["words"], "readonly");
            const objectStore = transaction.objectStore("words");
            const request = objectStore.index("timestamp").openCursor(null, "prev");
            const result = [];
            request.onsuccess = (event) => {
                const cursor = event.target.result;
                if (cursor) {
                    result.push(cursor.value);
                    cursor.continue();
                } else {
                    this.itemsForAdd = result;
                }
            };
        },
        addData(word) {
            let wordObj = { ...word, timestamp: new Date().getTime(), };
            const db = getDB();
            const transaction = db.transaction(["words"], "readwrite");
            const objectStore = transaction.objectStore("words");

            const request = objectStore.add(wordObj);

            request.onsuccess = () => {
                this.getDataAdd();
            };

            request.onerror = () => {
                console.error("Veri eklenirken bir hata oluştu.");
            };
        },
    },
    mounted() {
        initDB()
            .then((message) => {
                this.getDataAdd();
            })
            .catch((err) => {
                console.log(err);
            })
    }
}
</script>