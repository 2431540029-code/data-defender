import { initializeApp, getApps, getApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    limit,
    serverTimestamp
} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA0bB-8KV9Uou_AVAv5bWmb22R3SdEgEL4",
    authDomain: "data-defender-fb9c0.firebaseapp.com",
    projectId: "data-defender-fb9c0",
    storageBucket: "data-defender-fb9c0.appspot.com",
    messagingSenderId: "1042842356241",
    appId: "1:1042842356241:web:011b5f54d5257f8d83ffb0"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const leaderboardCollection = collection(db, "leaderboard");

export async function saveMatchData(match) {
    if (!match || typeof match !== "object") {
        return;
    }

    const payload = {
        name: match.name || "Player",
        score: match.score || 0,
        chapter: match.chapter || 1,
        firewall: match.firewall || 0,
        time: match.time || "00:00",
        createdAt: serverTimestamp()
    };

    await addDoc(leaderboardCollection, payload);
}

export async function getTop10() {
    const listQuery = query(
        leaderboardCollection,
        orderBy("score", "desc"),
        orderBy("createdAt", "asc"),
        limit(10)
    );
    const snapshot = await getDocs(listQuery);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
}
