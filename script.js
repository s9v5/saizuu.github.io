document.addEventListener('DOMContentLoaded', () => {
    // Éléments DOM
    const music = document.getElementById('background-music');
    const toggleBtn = document.getElementById('music-toggle');
    const volumeControl = document.getElementById('volume-control');
    const profileImg = document.querySelector('.profile-img');
    
    // Configuration musique
    music.volume = 0.5;
    let isPlaying = false;
    
    // Effet machine à écrire
    const typingElements = document.querySelectorAll('.typing-effect');
    typingElements.forEach((el, index) => {
        const text = el.textContent;
        el.textContent = '';
        el.style.borderRight = '2px solid white';
        
        setTimeout(() => {
            let i = 0;
            const typing = setInterval(() => {
                if (i < text.length) {
                    el.textContent += text.charAt(i);
                    i++;
                } else {
                    el.style.borderRight = 'none';
                    clearInterval(typing);
                }
            }, 50);
        }, index * 1200);
    });
    
    // Contrôle musique
    toggleBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            toggleBtn.textContent = '♫ OFF';
        } else {
            music.play().catch(e => {
                console.log("Lecture bloquée:", e);
                toggleBtn.textContent = '♫ ERR';
            });
            toggleBtn.textContent = '♫ ON';
        }
        isPlaying = !isPlaying;
    });
    
    // Contrôle volume
    volumeControl.addEventListener('input', () => {
        music.volume = volumeControl.value;
    });
    
    // Effet parallaxe
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 20 - 10;
        const y = (e.clientY / window.innerHeight) * 20 - 10;
        document.body.style.backgroundPosition = `${50 + x}% ${50 + y}%`;
    });
    
    // Effet survol photo
    profileImg.addEventListener('mouseenter', () => {
        profileImg.style.transform = 'scale(1.05) rotate(1deg)';
    });
    
    profileImg.addEventListener('mouseleave', () => {
        profileImg.style.transform = 'scale(1) rotate(0)';
    });
    
    // Démarrer musique après interaction
    document.body.addEventListener('click', initAudio, { once: true });
    
    function initAudio() {
        if (!isPlaying) {
            music.play().then(() => {
                isPlaying = true;
                toggleBtn.textContent = '♫ ON';
            }).catch(e => {
                console.log("Erreur audio:", e);
            });
        }
    }
});