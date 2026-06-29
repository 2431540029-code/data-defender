console.log("SRC SCRIPT");
import { player, loadPlayer, savePlayer, showPlayerPopup, hidePlayerPopup } from "./player.js";
import { startTimer, stopTimer, resetTimer, getCurrentTime } from "./timer.js";
import { saveMatchData } from "./firebase.js";
import { showLeaderboard, hideLeaderboard } from "./leaderboard.js";
// =========================
// DATA DEFENDER GAME
// =========================

class Game {

    constructor() {
        // =====================
        // UI ELEMENTS
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
            leaderboardBtn: document.getElementById("leaderboardBtn"),
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

        if (this.ui.leaderboardBtn) {
            this.ui.leaderboardBtn.onclick = () => {
                showLeaderboard();
            };
        }
        // =====================
        // GAME DATA INITIALIZATION
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
            playerName: "Player",
            time: "00:00"
        };

        this.typeTimer = null;

        // Audio Objects configuration
        this.sound = {
            bgm: new Audio(),
            click: new Audio(),
            correct: new Audio(),
            wrong: new Audio(),
            alarm: new Audio(),
            victory: new Audio()
        };

        this.sound.bgm.loop = true;
        this.sound.bgm.volume = 0.35;
        this.sound.click.volume = 0.7;
        this.sound.correct.volume = 0.8;
        this.sound.wrong.volume = 0.8;
        this.sound.alarm.volume = 0.8;
        this.sound.victory.volume = 0.9;

        // Run systems
        this.init();
        this.initEvents(); 
    }

    initEvents() {
        // START GAME
        if (this.ui.startBtn) {
            this.ui.startBtn.onclick = () => {
                this.playSound("click");
                const menuName = this.ui.playerNameInput?.value.trim() || "";

                if (menuName !== "") {
                    this.data.playerName = menuName;
                    this.startGame();
                } else if (player.name) {
                    this.data.playerName = player.name;
                    this.startGame();
                } else {
                    showPlayerPopup();
                }
            };
        }

        // STORY NEXT BUTTON
        if (this.ui.nextBtn) {
            this.ui.nextBtn.onclick = () => {
                this.playSound("click");
                
                // LẦN 1: Nếu chữ vẫn đang chạy mà người chơi bấm nút
                if (this.isTyping) {
                    if (this.typeTimer) {
                        clearInterval(this.typeTimer); // Dừng hiệu ứng chạy từng chữ
                        this.typeTimer = null;
                    }
                    this.ui.dialogText.innerHTML = this.currentFullText; // Bung hết toàn bộ chữ ra luôn
                    this.isTyping = false; // Đổi trạng thái thành đã chạy xong
                } 
                // LẦN 2: Nếu chữ đã chạy xong hoàn toàn rồi mới bấm -> Chuyển câu thoại kế tiếp
                else {
                    this.nextStory();
                }
            };
        }

        // QUIZ BUTTONS
        if (this.ui.answerButtons) {
            this.ui.answerButtons.forEach((btn, index) => {
                btn.onclick = () => {
                    this.playSound("click");
                    this.checkAnswer(index);
                };
            });
        }

        if (this.ui.nextQuestionBtn) {
            this.ui.nextQuestionBtn.onclick = () => {
                this.playSound("click");
                this.nextQuestion();
            };
        }

        // BOSS ATTACK
        if (this.ui.attackBtn) {
            this.ui.attackBtn.onclick = () => {
                this.playSound("click");
                this.attackBoss();
            };
        }

        if (this.ui.bossAnswerButtons) {
            this.ui.bossAnswerButtons.forEach((btn, index) => {
                btn.onclick = () => {
                    this.playSound("click");
                    this.checkBossAnswer(index);
                };
            });
        }

        // LEADERBOARD
        if (this.ui.leaderboardBtn) {
            this.ui.leaderboardBtn.onclick = async () => {
                await showLeaderboard(); // Gọi đúng hàm đã import
            };
        }

        if (this.ui.leaderboardClose) {
            this.ui.leaderboardClose.onclick = () => {
                hideLeaderboard(); // Gọi đúng hàm đã import
            };
        }

        // GAME OVER LEADERBOARD
        if (this.ui.gameOverLeaderboardBtn) {
            this.ui.gameOverLeaderboardBtn.onclick = async () => {
                await showLeaderboard(); // Sửa từ displayLeaderboardPopup thành showLeaderboard
            };
        }

        // VICTORY LEADERBOARD
        if (this.ui.victoryLeaderboardBtn) {
            this.ui.victoryLeaderboardBtn.onclick = async () => {
                await showLeaderboard(); // Sửa từ displayLeaderboardPopup thành showLeaderboard
            };
        }

        // GAME OVER RESTART
        if (this.ui.gameOverRestartBtn) {
            this.ui.gameOverRestartBtn.onclick = () => {
                this.hideGameOverPopup();
                this.resetGame();
            };
        }

        if (this.ui.gameOverLeaderboardBtn) {
            this.ui.gameOverLeaderboardBtn.onclick = async () => {
                await showLeaderboard();
            };
        }

        // VICTORY RESTART
        if (this.ui.victoryRestartBtn) {
            this.ui.victoryRestartBtn.onclick = () => {
                this.hideVictoryPopup();
                this.resetGame();
            };
        }

        if (this.ui.victoryLeaderboardBtn) {
            this.ui.victoryLeaderboardBtn.onclick = async () => {
                await showLeaderboard();
            };
        }

        // ENDING ACTIONS
        if (this.ui.restartBtn) {
            this.ui.restartBtn.onclick = () => {
                this.resetGame();
            };
        }

        if (this.ui.downloadCertBtn) {
            this.ui.downloadCertBtn.onclick = () => {
                this.downloadCertificate();
            };
        }
    }

    init() {
        const savedPlayer = loadPlayer();
        if (savedPlayer && savedPlayer.name) {
            this.data.playerName = savedPlayer.name;
        }

        this.loadingAnimation();

        if (this.ui.missionBtn) {
            this.ui.missionBtn.onclick = () => {
                this.playSound("click");
                this.startQuiz();

                startTimer((formattedTime) => {
                    this.data.time = formattedTime;
                    if (this.ui.timerLabel) {
                        this.ui.timerLabel.innerText = formattedTime;
                    }
                });
            };
        }

        // Popup Event from player.js
        window.addEventListener("playerConfirmed", (event) => {
            const confirmedPlayer = event.detail && event.detail.player;
            const playerName = confirmedPlayer && confirmedPlayer.name ? confirmedPlayer.name : "Player";
            this.data.playerName = playerName;
            this.updateHUD();

            const loginScreen = document.getElementById("loginScreen");
            if (loginScreen) loginScreen.style.display = "none";

            this.startGame();
        });

        this.loadSavedPlayer();
    }

    playSound(name) {
        const sound = this.sound[name];
        if (!sound) return;
        sound.currentTime = 0;
        sound.play().catch(err => console.log("Bỏ qua lỗi audio:", err));
    }

    startBGM() {
        if (this.sound.bgm) {
            this.sound.bgm.play().catch(err => console.log("Bỏ qua lỗi BGM:", err));
        }
    }

    stopBGM() {
        this.sound.bgm.pause();
        this.sound.bgm.currentTime = 0;
    }

    updateHUD() {
        if (this.ui.playerNameLabel) this.ui.playerNameLabel.innerHTML = this.data.playerName || "Player";
        if (this.ui.scoreLabel) this.ui.scoreLabel.innerHTML = this.data.score;
        if (this.ui.score) this.ui.score.innerHTML = this.data.score;
        if (this.ui.scoreText) this.ui.scoreText.innerHTML = this.data.score;
        if (this.ui.firewallLabel) this.ui.firewallLabel.innerHTML = `${this.data.firewall}%`;
        if (this.ui.chapterLabel) this.ui.chapterLabel.innerHTML = this.data.chapterIndex + 1;
        if (this.ui.timerLabel) this.ui.timerLabel.innerHTML = getCurrentTime();
        if (this.ui.firewall) this.ui.firewall.style.width = this.data.firewall + "%";
        if (this.ui.hpFill) this.ui.hpFill.style.width = this.data.firewall + "%";
    }

    loadSavedPlayer() {
        const saved = loadPlayer();
        if (saved && saved.name) {
            this.data.playerName = saved.name;
            if (this.ui.playerNameInput) this.ui.playerNameInput.value = saved.name;
            if (this.ui.loginPlayerName) this.ui.loginPlayerName.value = saved.name;
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
            name: this.data.playerName || "Player",
            score: this.data.score,
            chapter: this.data.chapterIndex + 1,
            firewall: Math.max(this.data.firewall, 0),
            time: getCurrentTime()
        };
        try {
            await saveMatchData(payload);
            console.log("🔥 Lưu Firebase thành công!", payload);
        } catch (error) {
            console.warn("Unable to save match result", error);
        }
    }

    checkAnswer(index) {
        const q = this.data.currentQuestions[this.data.questionIndex];
        if (!q) return;
        
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
            this.data.firewall -= 20;
            
            this.updateHUD();
            if (this.data.firewall <= 0) {
                this.loseGame();
                return;
            }
        }

        this.ui.answerButtons.forEach((btn, i) => {
            if (i === q.correct) {
                btn.style.background = "#27AE60";
            }
            if (index === i && index !== q.correct) {
                btn.style.background = "#E74C3C";
            }
            btn.disabled = true;
        });

        const correctAnswer = q.answers[q.correct];
        this.ui.resultExplain.innerHTML = `<strong>Đáp án đúng:</strong> ${correctAnswer}<br><br>${q.explanation}`;
        this.ui.resultReference.innerHTML = q.reference;

        this.updateHUD();
    }

    nextQuestion() {
        this.data.questionIndex++;
        this.ui.resultPanel.classList.add("hidden");

        this.ui.answerButtons.forEach(btn => {
            btn.disabled = false;
            btn.style.background = "";
        });

        const currentSet = this.data.currentQuestions;
        if (this.data.questionIndex >= currentSet.length) {
            this.data.chapterIndex++;
            this.data.storyIndex = 0;

            if (typeof storyChapters !== "undefined" && this.data.chapterIndex < storyChapters.length) {
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
        if (typeof storyChapters === "undefined") return;
        const chapter = storyChapters[this.data.chapterIndex - 1];
        this.updateStoryBackground(chapter.background);
        this.ui.speaker.innerHTML = "MISSION COMPLETE";
        this.ui.storyAvatar.src = chapter.avatars[Object.keys(chapter.avatars)[0]].src;
        this.ui.storyAvatar.classList.toggle("glow", false);
        this.ui.nextBtn.innerText = "Continue";
       this.typeWriter("Firewall +20\n\nTiếp tục để chuyển sang chương tiếp theo.")
        this.showScreen(this.ui.storyScreen);
    }

    startBossBattle() {
        this.data.bossQuestionIndex = 0;
        this.data.bossHP = 100;
        if (typeof bossQuestions !== "undefined") this.data.bossQuestions = bossQuestions;
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
        if (this.ui.bossFillLarge) this.ui.bossFillLarge.style.width = this.data.bossHP + "%";
        if (this.ui.firewallLarge) this.ui.firewallLarge.style.width = this.data.firewall + "%";
        if (this.ui.bossScore) this.ui.bossScore.innerHTML = this.data.score;
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
        this.data.bossHP = Math.max(this.data.bossHP - 20, 0);
        if (this.ui.bossFill) this.ui.bossFill.style.width = this.data.bossHP + "%";

        const dialog = [
            "🔥 Firewall đang tấn công...",
            "💻 Hacker đang mất quyền truy cập...",
            "🛡 Hệ thống đang mã hóa dữ liệu...",
            "⚠ Hacker bị chặn!"
        ];

        this.ui.bossDialog.innerHTML = dialog[Math.floor(Math.random() * dialog.length)];
        if (this.ui.bossImage) {
            this.ui.bossImage.classList.add("shake");
            setTimeout(() => {
                this.ui.bossImage.classList.remove("shake");
            }, 400);
        }

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
            if (this.ui.loadingBar) this.ui.loadingBar.style.width = this.data.loading + "%";

            const index = Math.min(
                Math.floor(this.data.loading / 20),
                loadingMessage.length - 1
            );
            if (this.ui.loadingText) this.ui.loadingText.innerHTML = loadingMessage[index];

            if (this.data.loading >= 100) {
                clearInterval(timer);
                this.startBGM();
                this.showScreen(this.ui.menuScreen);
            }
        }, 25);
    }

    showScreen(screen) {
        if (!screen) return;
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
            if (s) s.classList.add("hidden");
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
        if (this.ui.globalHUD) this.ui.globalHUD.classList.remove("hidden");
        resetTimer();
        startTimer((time) => {
            if (this.ui.timerLabel) this.ui.timerLabel.innerHTML = time;
        });
        this.updateHUD();
        this.startBGM();
        this.showScreen(this.ui.storyScreen);
        this.showStory();
    }

    showStory() {
        if (typeof storyChapters === "undefined") return;
        const chapter = storyChapters[this.data.chapterIndex];
        if (!chapter) return;
        const current = chapter.scenes[this.data.storyIndex];
        if (!current) return;

        this.updateStoryBackground(chapter.background);
        this.ui.speaker.innerHTML = current.speaker;
        this.updateCharacterFocus(current.speaker, chapter.avatars);
        this.ui.nextBtn.innerText = "Tiếp tục";
        this.typeWriter(current.text);
    }

    updateStoryBackground(background) {
        if (this.ui.storyScreen) {
            this.ui.storyScreen.style.backgroundImage = `linear-gradient(rgba(0,0,0,.55), rgba(0,0,0,.7)), url('${background}')`;
        }
    }

    updateCharacterFocus(speaker, chapterAvatars) {
        const speakerMap = {
            "Giám đốc": { src: "assets/characters/director.jpg", glow: false },
            "ARES AI": { src: "assets/characters/ai.jpg", glow: false },
            "⚠ HỆ THỐNG": { src: "assets/characters/ai.jpg", glow: false },
            "BOSS X": { src: "assets/characters/hacker.jpg", glow: true },
            "Bạn": { src: "assets/characters/player.avif", glow: false },
            "Trưởng phòng": { src: "assets/characters/director.jpg", glow: false },
            "Chuyên gia": { src: "assets/characters/player.avif", glow: false }
        };

        const chapterMap = chapterAvatars || {};
        const data = chapterMap[speaker] || speakerMap[speaker] || speakerMap["Giám đốc"];

        if (this.ui.storyAvatar) {
            this.ui.storyAvatar.src = data.src;
            this.ui.storyAvatar.classList.toggle("glow", data.glow);
        }
    }

    typeWriter(text) {
        if (this.typeTimer) {
            clearInterval(this.typeTimer);
        }

        this.currentFullText = text; // Lưu lại toàn bộ nội dung văn bản gốc để bung ra khi cần
        this.ui.dialogText.innerHTML = "";
        this.isTyping = true; // Bật cờ báo hiệu chữ đang chạy
        let i = 0;

        this.typeTimer = setInterval(() => {
            if (i < text.length) {
                this.ui.dialogText.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(this.typeTimer);
                this.typeTimer = null;
                this.isTyping = false; // Chữ chạy xong hết tự nhiên thì tắt cờ đi
            }
        }, 25);
    }

    nextStory() {
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
        if (typeof storyChapters === "undefined") return;
        const chapter = storyChapters[this.data.chapterIndex];

        if (this.data.storyIndex >= chapter.scenes.length) {
            this.startQuiz();
            return;
        }

        this.showStory();
    }

    startQuiz() {
        this.data.questionIndex = 0;
        this.data.correctAnswers = 0;

        if (typeof chapter1Questions !== "undefined") {
            switch (this.data.chapterIndex + 1) {
                case 1: this.data.currentQuestions = chapter1Questions; break;
                case 2: this.data.currentQuestions = chapter2Questions; break;
                case 3: this.data.currentQuestions = chapter3Questions; break;
                case 4: this.data.currentQuestions = chapter4Questions; break;
                case 5: this.data.currentQuestions = chapter5Questions; break;
                default: this.data.currentQuestions = [];
            }
        }

        this.data.totalQuestions = this.data.currentQuestions.length;
        this.data.score = 0;
        this.data.firewall = 100;
        this.updateHUD();
        this.showScreen(this.ui.quizScreen);
        this.showQuestion();
    }

    showQuestion() {
        const currentSet = this.data.currentQuestions;
        const q = currentSet[this.data.questionIndex];
        if (!q) return;

        this.ui.questionNumber.innerHTML = `Câu ${this.data.questionIndex + 1} / ${currentSet.length}`;
        this.ui.questionTitle.innerHTML = q.question;

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
        this.showEnding(true);
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
        const rankMatch = this.ui.endingRank.innerHTML.match(/Rank\s([A-Z])/);
        const rank = rankMatch ? rankMatch[1] : "D";
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
        
        this.ui.resultPanel.classList.add("hidden");
        this.hideVictoryPopup();
        this.hideGameOverPopup();
        hideLeaderboard();
        this.ui.globalHUD.classList.add("hidden");
        resetTimer();
        if (this.ui.timerLabel) this.ui.timerLabel.innerHTML = "00:00";
        this.updateHUD();
        this.showScreen(this.ui.menuScreen);
    }
}

// Khởi tạo Game object chạy hệ thống toàn cục
const game = new Game();