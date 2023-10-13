// indexedDB.js

const DB_NAME = "language";
const DB_VERSION = 1;
const STORE_NAME = "words";

let db;

export function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject("IndexedDB başlatılamadı.");
    };

    request.onsuccess = () => {
      db = request.result;
      resolve("IndexedDB başarıyla başlatıldı.");
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      const objectStore = db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      objectStore.createIndex("timestamp", "timestamp", { unique: false });
    };
  });
}

export function getDB() {
  return db;
}