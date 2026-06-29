import { initializeApp } from "firebase/app";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit
} from "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyA0bB-8KV9Uou_AVAv5bWmb22R3SdEgEL4",

    authDomain: "data-defender-fb9c0.firebaseapp.com",

    projectId: "data-defender-fb9c0",

    storageBucket: "data-defender-fb9c0.firebasestorage.app",

    messagingSenderId: "1042842356241",

    appId: "1:1042842356241:web:011b5f54d5257f8d83ffb0"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

window.db = db;

window.collection = collection;

window.addDoc = addDoc;

window.getDocs = getDocs;

window.query = query;

window.orderBy = orderBy;

window.limit = limit;

window.saveScore = async function(data){

    await addDoc(collection(db,"leaderboard"),data);

}