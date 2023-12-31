import { initDB, getDB } from "../indexDB";

export default (await import('vue')).defineComponent({
data() {
return {
itemsForAdd: [],
itemsForRand: [],
};
},
components: {
"app-navbar": () => import('../components/navbar.vue'),
},
computed: {
randomElements() {
return this.itemsForRand;
}
},
methods: {
generateRandomQuestions() {
let filtered = this.itemsForAdd.filter((e) => (!e.done) ? true : false);
const shuffledList = this.shuffleArray(filtered);
this.itemsForRand = shuffledList.slice(0, 7);
},
repeat() {
Object.keys(this.itemsForAdd).forEach((e) => {
this.itemsForAdd[e].done = false;
this.updateData(this.itemsForAdd[e]);
});
// window.location.reload();
},
shuffleArray(array) {
let shuffled = array.slice(0), i = array.length, temp, index;
while (i-- > 0) {
index = Math.floor((i + 1) * Math.random());
temp = shuffled[index];
shuffled[index] = shuffled[i];
shuffled[i] = temp;
}
return shuffled;
},
updateData(d) {
const db = getDB();
const transaction = db.transaction(["words"], "readwrite");
const objectStore = transaction.objectStore("words");

const getRequest = objectStore.get(d.id);

getRequest.onsuccess = (event) => {
const data = event.target.result;

if (data) {
data.name = d.name;
data.equal = d.equal;
data.done = d.done ?? false;

const putRequest = objectStore.put(data);

putRequest.onsuccess = () => {
console.log("Veri başarıyla güncellendi");
};

putRequest.onerror = () => {
console.error("Veri güncellenirken bir hata oluştu.");
};
} else {
console.error("Belirtilen ID ile eşleşen veri bulunamadı.");
}
};

getRequest.onerror = () => {
console.error("Veri alınırken bir hata oluştu.");
};
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
this.generateRandomQuestions();
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
});
}
});
