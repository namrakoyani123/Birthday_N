let candles = [];

const extinguishRandomCandle = () => {
    const activeCandles = candles.filter(
        (candle) => !candle.classList.contains('extinguished')
    );

    if (activeCandles.length === 0) {
        return false;
    }

    const index = Math.floor(Math.random() * activeCandles.length);
    const target = activeCandles[index];
    target.classList.add('extinguished');

    return activeCandles.length === 1; // true if this was the last one
};

const spawnHeartsBatch = () => {
    const emojis = ['💖', '💗', '💞', '✨', '🎉', '🎊'];

    for (let i = 0; i < 40; i++) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';

        const fromLeft = Math.random() < 0.5;
        const x = fromLeft ? Math.random() * 20 : 80 + Math.random() * 20; // corners
        heart.style.left = `${x}vw`;
        heart.style.animationDelay = `${Math.random() * 2}s`;

        heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
};

const launchHearts = () => {
    // multiple batches so it looks continuous for a while
    for (let i = 0; i < 6; i++) {
        setTimeout(spawnHeartsBatch, i * 1500);
    }
};

const startCelebration = () => {
    const holder = document.getElementById('cake-holder');
    if (holder) {
        holder.classList.add('done');
    }

    const song = document.getElementById('birthday-song');
    if (song) {
        try {
            song.currentTime = 0;
            song.play();
        } catch (e) {
            // ignore autoplay errors
        }
    }

    const couple = document.getElementById('dancing-couple');
    if (couple) {
        couple.classList.add('visible');
    }

    launchHearts();
};

const showCake = () => {
    const lastOne = extinguishRandomCandle();
    if (lastOne) {
        startCelebration();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Get all 3 candles on the cake
    candles = Array.from(document.querySelectorAll('.cake .candle'));
});