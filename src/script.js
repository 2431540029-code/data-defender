console.log("ROOT SCRIPT");
import { player, loadPlayer, savePlayer, updatePlayer, showPlayerPopup, hidePlayerPopup } from "./src/player.js";
import { startTimer, stopTimer, resetTimer, getCurrentTime } from "./src/timer.js";
import { saveMatchData } from "./src/firebase.js";
import { fetchTop10, showLeaderboard, hideLeaderboard, initLeaderboardControls } from "./leaderboard.js";

// =========================
// DATA DEFENDER GAME
// =========================

class Game {

    constructor() {
        // =====================
        // UI
        // =====================
        this.ui = {
            loadingScreen: document.getElementById("loadingScreen"),
            menuScreen: document.getElementById("menuScreen"),
            storyScreen: document.getElementById("storyScreen"),
            missionScreen: document.getElementById("missionScreen"),
            quizScreen: document.getElementById("quizScreen"),
            bossScreen: document.getElementById("bossScreen"),
            endScreen: document.getElementById("endScreen"),

            startBtn: document.getElementById("startBtn"),
            nextBtn: document.getElementById("nextBtn"),
            missionBtn: document.getElementById("missionBtn"),
            nextQuestionBtn: document.getElementById("nextQuestionBtn"),

            loadingBar: document.getElementById("loadingProgress"),
            loadingText: document.getElementById("loadingText"),

            speaker: document.getElementById("speaker"),
            dialogText: document.getElementById("dialogText"),

            questionTitle: document.getElementById("questionTitle"),
            answerButtons: document.querySelectorAll("#quizScreen .answerBtn"),

            score: document.getElementById("score"),
            scoreText: document.getElementById("scoreText"),
            firewall: document.getElementById("firewallBar"),
            hpFill: document.getElementById("hpFill"),

            resultPanel: document.getElementById("resultPanel"),
            resultTitle: document.getElementById("resultTitle"),
            resultExplain: document.getElementById("resultExplain"),
            resultReference: document.getElementById("resultReference"),
            questionNumber: document.getElementById("questionNumber"),
            storyAvatar: document.getElementById("storyAvatar"),

            bossFill: document.getElementById("bossFill"),
            bossDialog: document.getElementById("bossDialog"),
            attackBtn: document.getElementById("attackBtn"),
            bossImage: document.getElementById("bossImage"),
            bossBattleSection: document.getElementById("bossBattle"),
            bossTitle: document.getElementById("bossTitle"),
            bossLargeImage: document.getElementById("bossLargeImage"),
            bossFillLarge: document.getElementById("bossFillLarge"),
            firewallLarge: document.getElementById("firewallLarge"),
            bossScore: document.getElementById("bossScore"),
            bossBattleDialog: document.getElementById("bossBattleDialog"),
            bossQuestionTitle: document.getElementById("bossQuestionTitle"),
            bossAnswerButtons: document.querySelectorAll("#bossBattle .bossAnswer"),
            playerNameInput: document.getElementById("playerName"),
            loginPlayerName: document.getElementById("loginPlayerName"),
            playerPopup: document.getElementById("playerPopup"),
            playerPopupInput: document.getElementById("playerPopupInput"),
            playerPopupConfirm: document.getElementById("playerPopupConfirm"),
            globalHUD: document.getElementById("globalHUD"),
            playerNameLabel: document.getElementById("playerNameLabel"),
            scoreLabel: document.getElementById("scoreLabel"),
            firewallLabel: document.getElementById("firewallLabel"),
            chapterLabel: document.getElementById("chapterLabel"),
            timerLabel: document.getElementById("timerText"),
            leaderboardOpen: document.getElementById("leaderboardOpen"),
            leaderboardPopup: document.getElementById("leaderboardPopup"),
            leaderboardBody: document.getElementById("leaderboardBody"),
            leaderboardClose: document.getElementById("leaderboardClose"),
            victoryPopup: document.getElementById("victoryPopup"),
            victoryScore: document.getElementById("victoryScore"),
            victoryFirewall: document.getElementById("victoryFirewall"),
            victoryTime: document.getElementById("victoryTime"),
            victoryChapter: document.getElementById("victoryChapter"),
            victoryLeaderboardBtn: document.getElementById("victoryLeaderboardBtn"),
            victoryRestartBtn: document.getElementById("victoryRestartBtn"),
            gameOverPopup: document.getElementById("gameOverPopup"),
            gameOverLeaderboardBtn: document.getElementById("gameOverLeaderboardBtn"),
            gameOverRestartBtn: document.getElementById("gameOverRestartBtn"),
            endingText: document.getElementById("endingText"),
            endingScore: document.getElementById("endingScore"),
            endingFirewall: document.getElementById("endingFirewall"),
            endingCorrect: document.getElementById("endingCorrect"),
            endingBoss: document.getElementById("endingBoss"),
            endingRank: document.getElementById("endingRank"),
            achievementBox: document.getElementById("achievementBox"),
            restartBtn: document.getElementById("restartBtn"),
            downloadCertBtn: document.getElementById("downloadCertBtn")
        };

        // =====================
        // GAME DATA
        // =====================
        this.data = {
            loading: 0,
            storyIndex: 0,
            chapterIndex: 0,
            questionIndex: 0,
            score: 0,
            firewall: 100,
            bossHP: 100,
            bossQuestionIndex: 0,
            bossQuestions: [],
            currentQuestions: [],
            totalQuestions: 0,
            correctAnswers: 0,
            chapterCompleteMode: false,
            playerName: "Player"
        };

        this.typeTimer = null;

        // Create Audio objects WITHOUT src to avoid immediate range requests
        this.sound = {
            bgm: new Audio(),
            click: new Audio(),
            correct: new Audio(),
            wrong: new Audio(),
            alarm: new Audio(),
            victory: new Audio()
        };

        // Safer audio setup: set preload and catch unsupported/source errors
        Object.values(this.sound).forEach(s => {
            try {
                if (!s) return;
                s.preload = 'auto';
                s.load && s.load();
            } catch (e) {
                console.warn('Audio init failed', e);
            }
        });

        // Try to fetch audio files and set blob URLs to avoid range/content issues on some dev servers
        const audioMap = {
            bgm: 'assets/audio/bgm.mp3',
            click: 'assets/audio/click.wav',
            correct: 'assets/audio/correct.wav',
            wrong: 'assets/audio/wrong.wav',
            alarm: 'assets/audio/alarm.wav',
            victory: 'assets/audio/victory.wav'
        };

        Object.entries(audioMap).forEach(([key, path]) => {
            const a = this.sound[key];
            if (!a) return;
            fetch(path).then(r => {
                if (!r.ok) throw new Error('fetch failed');
                return r.blob();
            }).then(b => {
                try {
                    const url = URL.createObjectURL(b);
                    a.src = url;
                } catch (e) {
                    // ignore
                }
            }).catch(() => {
                // fallback: keep original src
            });
        });

        this.sound.bgm.loop = true;
        this.sound.bgm.volume = 0.35;
        this.sound.click.volume = 0.7;
        this.sound.correct.volume = 0.8;
        this.sound.wrong.volume = 0.8;
        this.sound.alarm.volume = 0.8;
        this.sound.victory.volume = 0.9;

        this.init();
    }

    init() {
        this.loadingAnimation();

        this.ui.startBtn.onclick = () => {
            this.playSound("click");
            if (!player.name) {
                showPlayerPopup();
            } else {
                this.startGame();
            }
        };
        this.ui.nextBtn.onclick = () => {
            this.playSound("click");
            this.nextStory();
        };
        this.ui.missionBtn.onclick = () => {
            this.playSound("click");
            this.startQuiz();
        };

        this.ui.attackBtn.onclick=()=>{
            this.playSound("click");
            this.attackBoss();

        };

        this.ui.answerButtons.forEach((btn, index) => {
            btn.onclick = () => {
                this.playSound("click");
                this.checkAnswer(index);
            }
        });

        this.ui.nextQuestionBtn.onclick = () => {
            this.playSound("click");
            this.nextQuestion();
        };

        this.ui.restartBtn.onclick = () => {
            this.playSound("click");
            this.resetGame();
        };

        this.ui.downloadCertBtn.onclick = () => {
            this.downloadCertificate();
        };

        this.ui.victoryLeaderboardBtn.onclick = async () => {
            await renderLeaderboard();
            displayLeaderboardPopup();
        };

        this.ui.victoryRestartBtn.onclick = () => {
            this.playSound("click");
            this.hideVictoryPopup();
            this.resetGame();
        };

        this.ui.gameOverLeaderboardBtn.onclick = async () => {
            await renderLeaderboard();
            displayLeaderboardPopup();
        };

        this.ui.gameOverRestartBtn.onclick = () => {
            this.playSound("click");
            this.hideGameOverPopup();
            this.resetGame();
        };

        // boss answer handlers
        this.ui.bossAnswerButtons.forEach((btn, i) => {
            btn.onclick = () => {
                this.playSound("click");
                this.checkBossAnswer(i);
            };
        });

        window.addEventListener("playerConfirmed", (event) => {
            const confirmedPlayer = event.detail && event.detail.player;
            if (confirmedPlayer && confirmedPlayer.name) {
                updatePlayer({ name: confirmedPlayer.name });
            }
            this.updateHUD();
            this.startGame();
        });

        this.loadSavedPlayer();
        initLeaderboardControls();
        this.bindLegacyStartButton();
    }

    // Extra: bind old login screen start button if present
    bindLegacyStartButton() {
        const startGameBtn = document.getElementById("startGame");
        if (!startGameBtn) return;
        startGameBtn.onclick = () => {
            const nameInput = document.getElementById("loginPlayerName");
            const entered = nameInput && nameInput.value.trim();
            if (entered) {
                updatePlayer({ name: entered });
                this.updateHUD();
                document.getElementById("loginScreen").style.display = "none";
                this.startGame();
            } else {
                showPlayerPopup();
            }
        };
    }

    playSound(name) {
        const sound = this.sound[name];
        if (!sound) return;
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }

    startBGM() {
        this.sound.bgm.play().catch(() => {});
    }

    stopBGM() {
        this.sound.bgm.pause();
        this.sound.bgm.currentTime = 0;
    }

    //  Hàm gộp cập nhật HUD 
    updateHUD() {
        this.ui.playerNameLabel.innerHTML = player.name || "Player";
        this.ui.scoreLabel.innerHTML = this.data.score;
        this.ui.score.innerHTML = this.data.score;
        this.ui.scoreText.innerHTML = this.data.score;
        this.ui.firewallLabel.innerHTML = `${this.data.firewall}%`;
        this.ui.chapterLabel.innerHTML = this.data.chapterIndex + 1;
        this.ui.timerLabel.innerHTML = getCurrentTime();
        this.ui.firewall.style.width = this.data.firewall + "%";
        this.ui.hpFill.style.width = this.data.firewall + "%";
    }

    loadSavedPlayer() {
        const saved = loadPlayer();
        if (saved && saved.name) {
            updatePlayer({
                name: saved.name,
                score: saved.score || 0,
                chapter: saved.chapter || 1,
                firewall: saved.firewall || 100,
                time: saved.time || "00:00"
            });
            this.ui.playerNameInput.value = saved.name;
            this.ui.loginPlayerName.value = saved.name;
        }
        this.updateHUD();
    }

    showVictoryPopup() {
        if (!this.ui.victoryPopup) return;
        this.ui.victoryScore.innerHTML = this.data.score;
        this.ui.victoryFirewall.innerHTML = `${Math.max(this.data.firewall, 0)}%`;
        this.ui.victoryTime.innerHTML = getCurrentTime();
        this.ui.victoryChapter.innerHTML = this.data.chapterIndex + 1;
        this.ui.victoryPopup.classList.add("visible");
    }

    hideVictoryPopup() {
        if (!this.ui.victoryPopup) return;
        this.ui.victoryPopup.classList.remove("visible");
    }

    showGameOverPopup() {
        if (!this.ui.gameOverPopup) return;
        this.ui.gameOverPopup.classList.add("visible");
    }

    hideGameOverPopup() {
        if (!this.ui.gameOverPopup) return;
        this.ui.gameOverPopup.classList.remove("visible");
    }

    async saveMatchResult() {
        const payload = {
            name: player.name || this.data.playerName || "Player",
            score: this.data.score,
            chapter: this.data.chapterIndex + 1,
            firewall: Math.max(this.data.firewall, 0),
            time: getCurrentTime()
        };
        try {
            await saveMatchData(payload);
        } catch (error) {
            console.warn("Unable to save match result", error);
        }
        updatePlayer({
            name: payload.name,
            score: payload.score,
            chapter: payload.chapter,
            firewall: payload.firewall,
            time: payload.time
        });
    }

    checkAnswer(index) {
        const q = this.data.currentQuestions[this.data.questionIndex];
        this.ui.resultPanel.classList.remove("hidden");

        if (index === q.correct) {
            this.playSound("correct");
            this.data.correctAnswers += 1;
            this.ui.resultTitle.innerHTML = "✅ Chính xác!";
            this.data.score += 10;
            this.data.firewall = Math.min(this.data.firewall + 5, 100);
        } else {
            this.playSound("wrong");
            this.ui.resultTitle.innerHTML = "❌ Chưa chính xác";
            this.data.firewall = Math.max(this.data.firewall - 10, 0);
        }

        // Thay đổi màu sắc nút khi bấm (Đúng hiện Xanh, Chọn sai hiện Đỏ)
        this.ui.answerButtons.forEach((btn, i) => {
            if (i === q.correct) {
                btn.style.background = "#27AE60"; // Màu xanh mượt
            }
            if (index === i && index !== q.correct) {
                btn.style.background = "#E74C3C"; // Màu đỏ rực
            }
            btn.disabled = true;
        });

        //   Hiển thị đáp án đúng kèm giải thích trực quan cho Giảng viên xem
        const correctAnswer = q.answers[q.correct];
        this.ui.resultExplain.innerHTML = `<strong>Đáp án đúng:</strong> ${correctAnswer}<br><br>${q.explanation}`;
        
        this.ui.resultReference.innerHTML = q.reference;

        this.updateHUD();

        if (this.data.firewall <= 0) {
            this.loseGame();
            return;
        }
    }

    nextQuestion() {
        this.data.questionIndex++;
        this.ui.resultPanel.classList.add("hidden");

        //  CẢI TIẾN 5: Reset lại màu nền và trạng thái disabled của các nút cho câu mới
        this.ui.answerButtons.forEach(btn => {
            btn.disabled = false;
            btn.style.background = "";
        });

        const currentSet = this.data.currentQuestions;
        if (this.data.questionIndex >= currentSet.length) {
            this.data.chapterIndex++;
            this.data.storyIndex = 0;

            if (this.data.chapterIndex < storyChapters.length) {
                this.data.chapterCompleteMode = true;
                this.data.firewall = Math.min(this.data.firewall + 20, 100);
                this.updateHUD();
                this.showMissionComplete();
                return;
            }

            this.startBossBattle();
            return;
        }

        this.showQuestion();
    }

    showMissionComplete() {
        const chapter = storyChapters[this.data.chapterIndex - 1];
        this.updateStoryBackground(chapter.background);
        this.ui.speaker.innerHTML = "MISSION COMPLETE";
        this.ui.storyAvatar.src = chapter.avatars[Object.keys(chapter.avatars)[0]].src;
        this.ui.storyAvatar.classList.toggle("glow", false);
        this.ui.nextBtn.innerText = "Continue";
        this.typeWriter("Firewall +20\n\nTiếp tục để chuyển sang chương tiếp theo.")
        this.showScreen(this.ui.storyScreen);
    }

    startBoss() {
        this.showScreen(this.ui.bossBattleSection);
    }

    startBossBattle() {
        this.data.bossQuestionIndex = 0;
        this.data.bossHP = 100;
        this.data.bossQuestions = bossQuestions;
        this.data.firewall = 100;
        this.ui.bossTitle.innerHTML = "BOSS X";
        this.ui.bossBattleDialog.innerHTML = "⚠ WARNING<br>Firewall đang được kích hoạt...<br>One hacker cực mạnh xuất hiện!";
        this.playSound("alarm");
        this.updateBossHUD();
        this.showScreen(this.ui.bossBattleSection);

        setTimeout(() => {
            this.showBossQuestion();
        }, 1000);
    }

    updateBossHUD() {
        this.ui.bossFillLarge.style.width = this.data.bossHP + "%";
        this.ui.firewallLarge.style.width = this.data.firewall + "%";
        this.ui.bossScore.innerHTML = this.data.score;
    }

    showBossQuestion() {
        const q = this.data.bossQuestions[this.data.bossQuestionIndex];
        if (!q) {
            this.winGame();
            return;
        }

        this.ui.bossQuestionTitle.innerHTML = q.question;
        const labels = ["A", "B", "C", "D"];
        this.ui.bossAnswerButtons.forEach((btn, index) => {
            btn.innerHTML = `${labels[index]}. ${q.answers[index]}`;
            btn.disabled = false;
            btn.style.background = "";
        });
    }

    checkBossAnswer(index) {
        const q = this.data.bossQuestions[this.data.bossQuestionIndex];
        if (!q) return;

        if (index === q.correct) {
            this.playSound("correct");
            this.data.bossHP = Math.max(this.data.bossHP - 20, 0);
            this.data.score += 10;
            this.ui.bossBattleDialog.innerHTML = "✅ Đúng! Boss mất 20 HP.";
        } else {
            this.playSound("wrong");
            this.data.firewall = Math.max(this.data.firewall - 15, 0);
            this.ui.bossBattleDialog.innerHTML = "❌ Sai! Firewall bị suy giảm.";
        }

        this.ui.bossAnswerButtons.forEach((btn, i) => {
            if (i === q.correct) {
                btn.style.background = "#27AE60";
            }
            if (index === i && index !== q.correct) {
                btn.style.background = "#E74C3C";
            }
            btn.disabled = true;
        });

        this.updateBossHUD();

        if (this.data.firewall <= 0) {
            this.loseGame();
            return;
        }

        if (this.data.bossHP <= 0) {
            this.winGame();
            return;
        }

        this.data.bossQuestionIndex++;
        if (this.data.bossQuestionIndex >= this.data.bossQuestions.length) {
            this.winGame();
            return;
        }

        setTimeout(() => {
            this.showBossQuestion();
        }, 900);
    }

    attackBoss() {
        this.data.bossHP -= 20;
        if (this.data.bossHP < 0) {
            this.data.bossHP = 0;
        }

        this.ui.bossFill.style.width = this.data.bossHP + "%";

        const dialog = [
            "🔥 Firewall đang tấn công...",
            "💻 Hacker đang mất quyền truy cập...",
            "🛡 Hệ thống đang mã hóa dữ liệu...",
            "⚠ Hacker bị chặn!"
        ];

        this.ui.bossDialog.innerHTML = dialog[Math.floor(Math.random() * dialog.length)];
        this.ui.bossImage.classList.add("shake");

        setTimeout(() => {
            this.ui.bossImage.classList.remove("shake");
        }, 400);

        if (this.data.bossHP <= 0) {
            this.winGame();
        }
    }

    loadingAnimation() {
        const loadingMessage = [
            "Initializing Security System...",
            "Connecting Firewall...",
            "Checking Database...",
            "Scanning Network...",
            "Launching AI Security..."
        ];

        const timer = setInterval(() => {
            this.data.loading++;
            this.ui.loadingBar.style.width = this.data.loading + "%";

            //   Sửa lỗi undefined tại mốc 100% bằng cách giới hạn index tối đa
            const index = Math.min(
                Math.floor(this.data.loading / 20),
                loadingMessage.length - 1
            );
            this.ui.loadingText.innerHTML = loadingMessage[index];

            if (this.data.loading >= 100) {
                clearInterval(timer);
                this.startBGM();
                this.showScreen(this.ui.menuScreen);
            }
        }, 25);
    }

    showScreen(screen) {
        const screens = [
            this.ui.loadingScreen,
            this.ui.menuScreen,
            this.ui.storyScreen,
            this.ui.missionScreen,
            this.ui.quizScreen,
            this.ui.bossScreen,
            this.ui.bossBattleSection,
            this.ui.endScreen
        ];

        screens.forEach(s => {
            s.classList.add("hidden");
        });

        screen.classList.remove("hidden");
    }

    startGame() {
        this.data.chapterIndex = 0;
        this.data.storyIndex = 0;
        this.data.questionIndex = 0;
        this.data.correctAnswers = 0;
        this.data.firewall = 100;
        this.data.score = 0;
        this.ui.globalHUD.classList.remove("hidden");
        resetTimer();
        startTimer((time) => {
            this.ui.timerLabel.innerHTML = time;
        });
        this.updateHUD();
        this.startBGM();
        this.showScreen(this.ui.storyScreen);
        this.showStory();
    }

    showStory(){

        const chapter = storyChapters[this.data.chapterIndex];
        const current = chapter.scenes[this.data.storyIndex];

        this.updateStoryBackground(chapter.background);
        this.ui.speaker.innerHTML = current.speaker;
        this.updateCharacterFocus(current.speaker, chapter.avatars);
        this.ui.nextBtn.innerText = "Tiếp tục";
        this.typeWriter(current.text);

    }
    updateStoryBackground(background) {
        this.ui.storyScreen.style.backgroundImage =
            `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.7)), url('${background}')`;
    }
    updateCharacterFocus(speaker, chapterAvatars) {
        const speakerMap = {
            "Giám đốc": {
                src: "assets/characters/director.jpg",
                glow: false
            },
            "ARES AI": {
                src: "assets/characters/ai.jpg",
                glow: false
            },
            "⚠ HỆ THỐNG": {
                src: "assets/characters/ai.jpg",
                glow: false
            },
            "BOSS X": {
                src: "assets/characters/hacker.jpg",
                glow: true
            },
            "Bạn": {
                src: "assets/characters/player.avif",
                glow: false
            },
            "Trưởng phòng": {
                src: "assets/characters/director.jpg",
                glow: false
            },
            "Chuyên gia": {
                src: "assets/characters/player.avif",
                glow: false
            }
        };

        const chapterMap = chapterAvatars || {};
        const data = chapterMap[speaker] || speakerMap[speaker] || speakerMap["Giám đốc"];

        this.ui.storyAvatar.src = data.src;
        this.ui.storyAvatar.classList.toggle("glow", data.glow);
    }

    typeWriter(text) {

    // Dừng hiệu ứng cũ nếu còn chạy
    if (this.typeTimer) {
        clearInterval(this.typeTimer);
    }

    this.ui.dialogText.innerHTML = "";

    let i = 0;

    this.typeTimer = setInterval(() => {

        if (i < text.length) {
            this.ui.dialogText.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(this.typeTimer);
            this.typeTimer = null;
        }

    }, 25);

}

    nextStory() {

    // Nếu chữ đang chạy thì dừng
    if (this.typeTimer) {
        clearInterval(this.typeTimer);
        this.typeTimer = null;
    }

    if (this.data.chapterCompleteMode) {
        this.data.chapterCompleteMode = false;
        this.ui.nextBtn.innerText = "Tiếp tục";
        this.data.storyIndex = 0;
        this.showStory();
        return;
    }

    this.data.storyIndex++;
    const chapter = storyChapters[this.data.chapterIndex];

    if (this.data.storyIndex >= chapter.scenes.length) {
        this.startQuiz();
        return;
    }

    this.showStory();

}

    //   Reset lại toàn bộ thông số dữ liệu khi người chơi bắt đầu Quiz (Phòng trường hợp chơi lại)
    startQuiz() {
        this.data.questionIndex = 0;
        this.data.correctAnswers = 0;
        this.data.playerName = player.name || this.ui.playerNameInput.value.trim() || "Player";

        switch (this.data.chapterIndex + 1) {
            case 1:
                this.data.currentQuestions = chapter1Questions;
                break;
            case 2:
                this.data.currentQuestions = chapter2Questions;
                break;
            case 3:
                this.data.currentQuestions = chapter3Questions;
                break;
            case 4:
                this.data.currentQuestions = chapter4Questions;
                break;
            case 5:
                this.data.currentQuestions = chapter5Questions;
                break;
            default:
                this.data.currentQuestions = [];
        }

        this.data.totalQuestions = this.data.currentQuestions.length;
        this.data.score = 0;
        this.data.firewall = 100;
        this.updateHUD();
        this.ui.playerNameInput.value = this.data.playerName;
        this.showScreen(this.ui.quizScreen);
        this.showQuestion();
    }

    showQuestion() {
        const currentSet = this.data.currentQuestions;
        const q = currentSet[this.data.questionIndex];

        this.ui.questionNumber.innerHTML =
            `Câu ${this.data.questionIndex + 1} / ${currentSet.length}`;

        this.ui.questionTitle.innerHTML = q.question;

        //  Thêm tiền tố nhãn A, B, C, D vào trước nội dung đáp án (Yêu cầu nâng cấp số 1)
        const labels = ["A", "B", "C", "D"];
        this.ui.answerButtons.forEach((btn, index) => {
            btn.innerHTML = `${labels[index]}. ${q.answers[index]}`;
        });
    }
    async winGame() {
        this.stopBGM();
        stopTimer();
        await this.saveMatchResult();
        this.updateHUD();
        this.showScreen(this.ui.endScreen);
        this.showVictoryPopup();
        this.playSound("victory");
        this.showEnding();
    }

    async loseGame() {
        this.stopBGM();
        stopTimer();
        await this.saveMatchResult();
        this.updateHUD();
        this.showScreen(this.ui.endScreen);
        this.showGameOverPopup();
        this.showEnding(false);
    }

    showEnding(success = true) {
        const name = this.data.playerName;
        const score = this.data.score;
        const firewall = Math.max(this.data.firewall, 0);
        const correct = this.data.correctAnswers;
        const bossDefeated = this.data.bossHP <= 0 ? "YES" : "NO";

        let rank = "D";
        let rankIcon = "🥉";
        if (score >= 290) { rank = "S"; rankIcon = "🥇"; }
        else if (score >= 250) { rank = "A"; rankIcon = "🥇"; }
        else if (score >= 200) { rank = "B"; rankIcon = "🥈"; }
        else if (score >= 150) { rank = "C"; rankIcon = "🥉"; }

        this.ui.endingText.innerHTML = `══════════════════════<br>MISSION COMPLETE<br><br>Xin chúc mừng ${name}<br><br>Bạn đã bảo vệ thành công<br>SkyData Corporation<br>══════════════════════`;
        this.ui.endingScore.innerHTML = score;
        this.ui.endingFirewall.innerHTML = firewall + "%";
        this.ui.endingCorrect.innerHTML = `${correct}/${this.data.totalQuestions}`;
        this.ui.endingBoss.innerHTML = bossDefeated;
        this.ui.endingRank.innerHTML = `${rankIcon} Rank ${rank}`;

        const achievements = [];
        if (correct >= 30) achievements.push("Perfect Defender 30/30");
        if (firewall >= 100) achievements.push("Cyber Hero Firewall 100%");
        if (bossDefeated === "YES") achievements.push("Boss Slayer Defeat Boss X");
        if (achievements.length === 0) achievements.push("Steady Defender Keep Going");

        this.ui.achievementBox.innerHTML = achievements.join("<br>");
    }

    downloadCertificate() {
        const name = this.data.playerName;
        const rank = this.ui.endingRank.innerHTML.match(/Rank\s([A-Z])/)[1];
        const cert = `DATA DEFENDER CERTIFICATE\n\nThis certifies that\n${name}\nsuccessfully completed\nDATA DEFENDER\nwith Rank ${rank}`;
        const blob = new Blob([cert], { type: "text/plain;charset=utf-8" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `data-defender-certificate-${name}.txt`;
        link.click();
        URL.revokeObjectURL(link.href);
    }

    resetGame() {
        this.data.chapterIndex = 0;
        this.data.storyIndex = 0;
        this.data.questionIndex = 0;
        this.data.score = 0;
        this.data.firewall = 100;
        this.data.bossHP = 100;
        this.data.bossQuestionIndex = 0;
        this.data.bossQuestions = [];
        this.data.currentQuestions = [];
        this.data.totalQuestions = 0;
        this.data.correctAnswers = 0;
        this.data.chapterCompleteMode = false;
        this.data.playerName = player.name || this.ui.playerNameInput.value.trim() || "Player";
        this.ui.resultPanel.classList.add("hidden");
        this.hideVictoryPopup();
        this.hideGameOverPopup();
        hideLeaderboard();
        this.ui.globalHUD.classList.add("hidden");
        resetTimer();
        this.ui.timerLabel.innerHTML = "00:00";
        this.updateHUD();
        this.showScreen(this.ui.menuScreen);
    }
}

const game = new Game();