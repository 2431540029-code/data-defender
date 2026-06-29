export const player = {
    id: "",
    name: "",
    score: 0,
    chapter: 1,
    firewall: 100,
    time: "00:00"
};

const STORAGE_KEY = "datadefender-player";
let initialized = false;

function getPopupElements() {
    return {
        popup: document.getElementById("playerPopup"),
        input: document.getElementById("playerPopupInput"),
        confirmBtn: document.getElementById("playerPopupConfirm")
    };
}

export function loadPlayer() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
        return player;
    }

    try {
        const saved = JSON.parse(raw);
        player.id = saved.id || "";
        player.name = saved.name || "";
    } catch (error) {
        console.warn("Could not parse saved player data", error);
    }
    return player;
}

export function savePlayer() {
    if (!player.id) {
        player.id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now());
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        id: player.id,
        name: player.name
    }));
}

export function updatePlayer(data) {
    if (!data || typeof data !== "object") {
        return player;
    }

    if (data.name !== undefined) {
        player.name = data.name;
    }
    if (data.score !== undefined) {
        player.score = data.score;
    }
    if (data.chapter !== undefined) {
        player.chapter = data.chapter;
    }
    if (data.firewall !== undefined) {
        player.firewall = data.firewall;
    }
    if (data.time !== undefined) {
        player.time = data.time;
    }

    if (data.name) {
        savePlayer();
    }
    return player;
}

export function showPlayerPopup() {
    const elements = getPopupElements();
    if (!elements.popup || !elements.input || !elements.confirmBtn) {
        return;
    }

    if (!initialized) {
        initialized = true;
        elements.confirmBtn.addEventListener("click", () => {
            const name = elements.input.value.trim();
            if (!name) {
                elements.input.focus();
                return;
            }
            player.name = name;
            savePlayer();
            hidePlayerPopup();
            window.dispatchEvent(new CustomEvent("playerConfirmed", {
                detail: { player }
            }));
        });
    }

    elements.input.value = player.name || "";
    elements.popup.classList.add("visible");
    elements.input.focus();
}

export function hidePlayerPopup() {
    const elements = getPopupElements();
    if (!elements.popup) {
        return;
    }
    elements.popup.classList.remove("visible");
}
