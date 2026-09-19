
/* =========================
   PLAYTIME CHART
========================= */

// Game names

const gameNames = [
    "Counter-Strike",
    "Battlefield V",
    "Civilization VI",
    "NBA 2K",
    "Human: Fall Flat"
];

// Playtime data in hours
// Counter-Strike: 2000 is a lower bound.

const playtimeHours = [
    2000,
    285,
    160,
    600,
    42
];


// Find the canvas element

const chartCanvas =
    document.getElementById("playtimeChart");


// Create the chart

if (chartCanvas && typeof Chart !== "undefined") {

    new Chart(chartCanvas, {

        type: "bar",

        data: {

            labels: gameNames,

            datasets: [{

                label: "Playtime (Hours)",

                data: playtimeHours,

                backgroundColor: "#818cf8",

                borderColor: "#a5b4fc",

                borderWidth: 1,

                borderRadius: 6

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: {

                    labels: {
                        color: "#e5e7eb"
                    }

                },

                tooltip: {

                    callbacks: {

                        label: function(context) {

                            return context.parsed.y + " hours";

                        }

                    }

                }

            },

            scales: {

                x: {

                    ticks: {
                        color: "#e5e7eb"
                    },

                    grid: {
                        color: "#334155"
                    }

                },

                y: {

                    beginAtZero: true,

                    ticks: {

                        color: "#e5e7eb"

                    },

                    grid: {

                        color: "#334155"

                    }

                }

            }

        }

    });

} else {

    console.error(
        "Chart canvas or Chart.js library not found."
    );

}


/* =========================
   GAMING MEMORY INTERACTION
========================= */

// Find HTML elements
const memoryButton = document.getElementById("memoryButton");
const memoryText = document.getElementById("memoryText");
const momentContent = document.getElementById("momentContent");

// Function

function showGamingMemory() {

    // Toggle visibility
    momentContent.hidden = !momentContent.hidden;

    // Update button and message
    if (momentContent.hidden) {

        memoryButton.textContent = "Show a Gaming Memory";
        memoryText.textContent = "";

    } else {

        memoryButton.textContent = "Hide Gaming Memories";
        memoryText.textContent = "Gaming memories unlocked!";

    }
}

// Event listener
memoryButton.addEventListener("click", showGamingMemory);



/* =========================
   BACKGROUND MUSIC PLAYLIST
========================= */

const backgroundMusic =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");


// Playlist
const playlist = [
    "audio/bgm1.mp3",
    "audio/bgm2.mp3",
    "audio/bgm3.mp3"
];


// Current song index
let currentSong = 0;


// Volume: 30%
backgroundMusic.volume = 0.3;


// Update music button
function updateMusicButton() {

    const isPlaying = !backgroundMusic.paused;

    musicButton.textContent = isPlaying
        ? "♫ Pause Music"
        : "♫ Play Music";

}


// Play current song
async function playCurrentSong() {

    try {

        await backgroundMusic.play();

    } catch (error) {

        console.warn("Music playback failed:", error);

    }

    updateMusicButton();
}


// Toggle play / pause
function toggleMusic() {

    if (backgroundMusic.paused) {

        playCurrentSong();

    } else {

        backgroundMusic.pause();
        updateMusicButton();

    }

}


// Automatically play next song
function playNextSong() {

    currentSong = (currentSong + 1) % playlist.length;

    backgroundMusic.src = playlist[currentSong];

    playCurrentSong();

}


// Button click
musicButton.addEventListener("click", toggleMusic);


// When a song ends, play the next one
backgroundMusic.addEventListener("ended", playNextSong);


// Update button when playback changes
backgroundMusic.addEventListener("play", updateMusicButton);
backgroundMusic.addEventListener("pause", updateMusicButton);


// Attempt autoplay when page loads
playCurrentSong();