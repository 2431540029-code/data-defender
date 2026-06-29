import { getDatabase, ref, query, orderByChild, limitToLast, get } from "firebase/database";

const leaderboardPopupId = "leaderboardPopup"; // Hoặc ID thực tế của bảng trong HTML
const leaderboardBodyId = "leaderboardBody";

// Hàm duy nhất để hiển thị bảng xếp hạng
export async function showLeaderboard() {
    const db = getDatabase();
    const leaderboardBody = document.getElementById(leaderboardBodyId);
    
    // Truy vấn dữ liệu từ Firebase
    const topScoresQuery = query(ref(db, 'scores'), orderByChild('score'), limitToLast(10));
    const snapshot = await get(topScoresQuery);
    
    if (!leaderboardBody) return;
    
    leaderboardBody.innerHTML = ""; // Xóa dữ liệu cũ

    if (snapshot.exists()) {
        const scores = [];
        snapshot.forEach((childSnapshot) => {
            scores.push(childSnapshot.val());
        });
        
        // Đảo ngược để xếp hạng cao nhất lên đầu
        scores.reverse().forEach((data, index) => {
            const row = document.createElement("div");
            row.className = "leaderboard-row";
            row.innerHTML = `
                <div class="leaderboard-rank">${index + 1}</div>
                <div class="leaderboard-name">${data.Name || "Player"}</div>
                <div class="leaderboard-score">${data.score || 0}</div>
            `;
            leaderboardBody.appendChild(row);
        });
    }
    
    // Hiển thị bảng
    const popup = document.getElementById(leaderboardPopupId);
    if (popup) {
        popup.classList.add("visible");
    }
}

export function hideLeaderboard() {
    const popup = document.getElementById(leaderboardPopupId);
    if (popup) {
        popup.classList.remove("visible");
    }
}