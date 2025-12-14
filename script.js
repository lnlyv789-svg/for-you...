document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded - Starting birthday app");
    initBirthdayApp();
});

function initBirthdayApp() {
    console.log("Initializing birthday app...");
    
    // Elements
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const musicToggle = document.getElementById('musicToggle');
    const musicText = document.getElementById('musicText');
    const birthdayMusic = document.getElementById('birthdayMusic');
    const blowCandleBtn = document.getElementById('blowCandleBtn');
    const flame = document.getElementById('flame');
    const cakeMessage = document.getElementById('cakeMessage');
    const addWishBtn = document.getElementById('addWishBtn');
    const newWishInput = document.getElementById('newWish');
    const shareBtn = document.getElementById('shareBtn');
    const restartBtn = document.getElementById('restartBtn');
    const themeToggle = document.getElementById('themeToggle');
    const birthdayName = document.getElementById('birthdayName');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const uploadBtn = document.getElementById('uploadBtn');
    const confettiEffect = document.getElementById('confettiEffect');
    
    console.log("Elements found:", {
        slides: slides.length,
        prevBtn: !!prevBtn,
        nextBtn: !!nextBtn,
        birthdayMusic: !!birthdayMusic
    });
    
    // Birthday Data - Customize Here!
    const birthdayData = {
        name: "Sahabatku",
        age: 20,
        messages: [
            "Di hari spesialmu ini, aku ingin mengucapkan... Kamu adalah orang yang paling spesial! Semoga semua impianmu terkabul dan kebahagiaan selalu menyertaimu.",
            "Setiap senyumanmu adalah anugerah, setiap tawamu adalah berkah. Teruslah menjadi cahaya bagi orang-orang di sekitarmu!",
            "Di usia yang ke-{age} ini, semoga kamu mendapatkan semua yang terbaik dalam hidup. Kamu pantas mendapatkan dunia!",
            "Semoga tahun ini membawamu petualangan baru, teman baru, dan kenangan indah yang tak terlupakan!"
        ],
        wishes: [
            { author: "Teman Baik", text: "Selamat ulang tahun! Semoga panjang umur dan selalu sehat ya!" },
            { author: "Keluarga", text: "Semoga sukses selalu dalam segala hal yang kamu lakukan!" },
            { author: "Sahabat", text: "Semoga tahun ini penuh dengan kebahagiaan dan tawa!" }
        ]
    };
    
    let currentSlide = 0;
    let isMusicPlaying = false;
    
    // Initialize App
    function init() {
        console.log("Initializing...");
        
        // Personalize the page
        personalizePage();
        
        // Setup event listeners
        setupEventListeners();
        
        // Initialize music
        initMusic();
        
        // Update navigation buttons
        updateNavigation();
        
        console.log("App initialized successfully!");
    }
    
    // Personalize page with birthday data
    function personalizePage() {
        // Set name
        birthdayName.textContent = birthdayData.name;
        
        // Set random message
        const randomMessage = birthdayData.messages[Math.floor(Math.random() * birthdayData.messages.length)];
        const personalizedMessage = randomMessage.replace("{age}", birthdayData.age);
        birthdayMessage.textContent = personalizedMessage;
        
        // Initialize wishes
        initializeWishes();
    }
    
    // Initialize wishes from data
    function initializeWishes() {
        const wishesContainer = document.getElementById('wishesContainer');
        if (!wishesContainer) return;
        
        wishesContainer.innerHTML = '';
        
        birthdayData.wishes.forEach(wish => {
            const wishCard = document.createElement('div');
            wishCard.className = 'wish-card';
            wishCard.innerHTML = `
                <div class="wish-header">
                    <i class="fas fa-star"></i>
                    <span class="wish-author">Dari: ${wish.author}</span>
                </div>
                <p class="wish-text">${wish.text}</p>
            `;
            wishesContainer.appendChild(wishCard);
        });
    }
    
    // Initialize music
    function initMusic() {
        birthdayMusic.volume = 0.3;
        
        // Set music to start paused (let user control)
        birthdayMusic.pause();
        isMusicPlaying = false;
        updateMusicButton();
    }
    
    // Update music button display
    function updateMusicButton() {
        if (isMusicPlaying) {
            musicToggle.innerHTML = '<i class="fas fa-volume-up"></i> Musik ON';
            musicText.textContent = 'Musik ON';
        } else {
            musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i> Musik OFF';
            musicText.textContent = 'Musik OFF';
        }
    }
    
    // Setup all event listeners
    function setupEventListeners() {
        console.log("Setting up event listeners...");
        
        // Navigation buttons
        prevBtn.addEventListener('click', goToPrevSlide);
        nextBtn.addEventListener('click', goToNextSlide);
        
        // Progress dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => goToSlide(index));
        });
        
        // Music control
        musicToggle.addEventListener('click', toggleMusic);
        
        // Candle interaction
        if (blowCandleBtn) {
            blowCandleBtn.addEventListener('click', blowCandle);
        }
        
        // Add new wish
        if (addWishBtn) {
            addWishBtn.addEventListener('click', addNewWish);
        }
        
        if (newWishInput) {
            newWishInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    addNewWish();
                }
            });
        }
        
        // Share button
        if (shareBtn) {
            shareBtn.addEventListener('click', shareBirthday);
        }
        
        // Restart button
        if (restartBtn) {
            restartBtn.addEventListener('click', restartSlideshow);
        }
        
        // Theme toggle
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Option buttons (in slide 2)
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const response = this.getAttribute('data-answer');
                showResponseMessage(response);
            });
        });
        
        // Upload button
        if (uploadBtn) {
            uploadBtn.addEventListener('click', simulateUpload);
        }
        
        // Add keyboard navigation
        document.addEventListener('keydown', handleKeyboardNavigation);
        
        console.log("Event listeners setup complete!");
    }
    
    // Handle keyboard navigation
    function handleKeyboardNavigation(e) {
        if (e.key === 'ArrowLeft') {
            goToPrevSlide();
        } else if (e.key === 'ArrowRight') {
            goToNextSlide();
        } else if (e.key === ' ') {
            e.preventDefault();
            toggleMusic();
        }
    }
    
    // Slide navigation
    function goToSlide(index) {
        console.log(`Going to slide ${index}`);
        
        if (index < 0 || index >= slides.length) {
            console.log(`Invalid slide index: ${index}`);
            return;
        }
        
        // Hide current slide
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        
        // Show new slide
        currentSlide = index;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        // Update slide counter text
        updateSlideCounters();
        
        // Update navigation buttons
        updateNavigation();
        
        // Special effects for specific slides
        handleSlideEffects();
        
        console.log(`Now on slide ${currentSlide + 1}/${slides.length}`);
    }
    
    function goToPrevSlide() {
        console.log("Previous button clicked");
        if (currentSlide > 0) {
            goToSlide(currentSlide - 1);
        }
    }
    
    function goToNextSlide() {
        console.log("Next button clicked");
        if (currentSlide < slides.length - 1) {
            goToSlide(currentSlide + 1);
        }
    }
    
    function updateNavigation() {
        // Update previous button
        prevBtn.disabled = currentSlide === 0;
        
        // Update next button
        nextBtn.disabled = currentSlide === slides.length - 1;
        
        // Change next button text on last slide
        if (currentSlide === slides.length - 1) {
            nextBtn.innerHTML = 'Selesai <i class="fas fa-check"></i>';
        } else {
            nextBtn.innerHTML = 'Berikutnya <i class="fas fa-chevron-right"></i>';
        }
        
        console.log("Navigation updated:", {
            currentSlide: currentSlide,
            prevDisabled: prevBtn.disabled,
            nextDisabled: nextBtn.disabled
        });
    }
    
    function updateSlideCounters() {
        document.querySelectorAll('.slide-counter').forEach(counter => {
            counter.textContent = `${currentSlide + 1}/${slides.length}`;
        });
    }
    
    // Handle special effects for specific slides
    function handleSlideEffects() {
        // Cake slide (slide 5, index 4)
        if (currentSlide === 4) {
            resetCandle();
        }
        
        // Final slide (slide 6, index 5)
        if (currentSlide === 5) {
            createConfetti();
        }
    }
    
    // Music control
    function toggleMusic() {
        console.log("Toggling music, current state:", isMusicPlaying);
        
        if (isMusicPlaying) {
            birthdayMusic.pause();
            isMusicPlaying = false;
        } else {
            // Try to play music
            const playPromise = birthdayMusic.play();
            
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    isMusicPlaying = true;
                    updateMusicButton();
                    console.log("Music started successfully");
                }).catch(error => {
                    console.log("Music play failed:", error);
                    alert("Musik tidak dapat diputar. Silakan klik tombol musik sekali lagi.");
                });
            }
        }
        
        updateMusicButton();
    }
    
    // Candle interaction
    function blowCandle() {
        console.log("Blowing candle...");
        
        // Hide flame with animation
        if (flame) {
            flame.style.animation = 'none';
            flame.style.opacity = '0';
            flame.style.transition = 'opacity 0.5s';
        }
        
        // Update message
        if (cakeMessage) {
            cakeMessage.innerHTML = `🎉 Yeay! Lilin ditiup!<br>Semoga harapanmu terkabul, ${birthdayData.name}!`;
            cakeMessage.style.color = '#FF4D94';
            cakeMessage.style.fontWeight = 'bold';
        }
        
        // Disable button
        if (blowCandleBtn) {
            blowCandleBtn.disabled = true;
            blowCandleBtn.innerHTML = '<i class="fas fa-check"></i> Sudah Ditiup!';
        }
        
        // Play celebration sound
        playCelebrationSound();
        
        // Create confetti
        createConfetti();
        
        console.log("Candle blown successfully");
    }
    
    function resetCandle() {
        console.log("Resetting candle...");
        
        if (flame) {
            flame.style.animation = 'flicker 0.5s infinite alternate';
            flame.style.opacity = '1';
        }
        
        if (blowCandleBtn) {
            blowCandleBtn.disabled = false;
            blowCandleBtn.innerHTML = '<i class="fas fa-wind"></i> Tiup Lilinnya!';
        }
        
        if (cakeMessage) {
            cakeMessage.innerHTML = 'Tiup lilin dan buat harapan! 🎂';
            cakeMessage.style.color = '';
            cakeMessage.style.fontWeight = '';
        }
    }
    
    // Add new wish
    function addNewWish() {
        const wishText = newWishInput ? newWishInput.value.trim() : '';
        
        if (wishText) {
            const wishesContainer = document.getElementById('wishesContainer');
            
            if (wishesContainer) {
                // Create new wish card
                const wishCard = document.createElement('div');
                wishCard.className = 'wish-card';
                wishCard.innerHTML = `
                    <div class="wish-header">
                        <i class="fas fa-user-circle"></i>
                        <span class="wish-author">Dari: Kamu</span>
                    </div>
                    <p class="wish-text">${wishText}</p>
                `;
                
                // Add to container
                wishesContainer.appendChild(wishCard);
                
                // Clear input
                if (newWishInput) {
                    newWishInput.value = '';
                }
                
                // Scroll to bottom
                wishesContainer.scrollTop = wishesContainer.scrollHeight;
                
                // Play sound
                playWishSound();
                
                // Add to data
                birthdayData.wishes.push({
                    author: "Kamu",
                    text: wishText
                });
                
                console.log("New wish added:", wishText);
            }
        }
    }
    
    // Show response message for option buttons
    function showResponseMessage(response) {
        console.log("Showing response for:", response);
        
        const messages = {
            "Banyak rezeki": "💰 Ya! Semoga rezekimu melimpah ruah!",
            "Kesehatan": "💪 Kesehatan adalah harta terbesar! Semoga selalu sehat!",
            "Kebahagiaan": "😊 Kebahagiaan adalah kunci hidup terbaik!",
            "Semua di atas!": "🎯 Perfect! Semoga semua terkabul untukmu!"
        };
        
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = 'response-message';
        messageEl.innerHTML = `
            <div class="speech-bubble">
                <i class="fas fa-smile-wink bubble-heart"></i>
                <p>${messages[response] || "Harapan yang bagus! Semoga terkabul!"}</p>
                <div class="bubble-tail"></div>
            </div>
        `;
        
        // Add to slide 2
        const slide2 = document.getElementById('slide2');
        if (slide2) {
            const questionBox = slide2.querySelector('.question-box');
            if (questionBox && questionBox.parentNode) {
                questionBox.parentNode.insertBefore(messageEl, questionBox.nextSibling);
                
                // Remove after 5 seconds
                setTimeout(() => {
                    if (messageEl.parentNode) {
                        messageEl.remove();
                    }
                }, 5000);
            }
        }
    }
    
    // Share function
    function shareBirthday() {
        const shareText = `🎂 Selamat ulang tahun untuk ${birthdayData.name}! Lihat ucapan spesialnya di sini!`;
        
        if (navigator.share) {
            navigator.share({
                title: `Happy Birthday ${birthdayData.name}!`,
                text: shareText,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Pesan telah disalin ke clipboard! 📋\n\n' + shareText);
            }).catch(() => {
                alert('Pesan: ' + shareText + '\n\nSalin teks ini untuk membagikannya!');
            });
        }
    }
    
    // Restart slideshow
    function restartSlideshow() {
        console.log("Restarting slideshow...");
        goToSlide(0);
    }
    
    // Theme toggle
    function toggleTheme() {
        const themes = ['default', 'purple', 'mint'];
        const currentTheme = document.body.getAttribute('data-theme') || 'default';
        const currentIndex = themes.indexOf(currentTheme);
        const nextIndex = (currentIndex + 1) % themes.length;
        
        document.body.setAttribute('data-theme', themes[nextIndex]);
        
        // Update icon
        const icons = ['fa-palette', 'fa-moon', 'fa-sun'];
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = `fas ${icons[nextIndex]}`;
        }
        
        console.log("Theme changed to:", themes[nextIndex]);
    }
    
    // Simulate photo upload
    function simulateUpload() {
        alert('📸 Fitur upload foto akan datang! Untuk sekarang, kamu bisa simpan foto di galerimu dulu ya!\n\nTips: Kamu bisa screenshot halaman ini sebagai kenangan!');
    }
    
    // Create confetti effect
    function createConfetti() {
        console.log("Creating confetti...");
        
        if (!confettiEffect) return;
        
        // Animate the confetti text
        confettiEffect.style.animation = 'confettiFall 1s infinite';
        
        // Create additional confetti elements
        const emojis = ['🎉', '✨', '🎊', '🎈', '🎁', '💖', '🌸', '🌟'];
        
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                confetti.style.position = 'fixed';
                confetti.style.left = `${Math.random() * 100}%`;
                confetti.style.top = '-50px';
                confetti.style.fontSize = `${Math.random() * 25 + 20}px`;
                confetti.style.zIndex = '9999';
                confetti.style.pointerEvents = 'none';
                
                document.body.appendChild(confetti);
                
                // Animate confetti falling
                confetti.animate([
                    { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                    { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
                ], {
                    duration: Math.random() * 2000 + 2000,
                    easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
                });
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 4000);
            }, i * 100);
        }
    }
    
    // Play sounds
    function playCelebrationSound() {
        try {
            const sound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-happy-crowd-laugh-464.mp3');
            sound.volume = 0.3;
            sound.play().catch(e => console.log("Celebration sound error:", e));
        } catch (e) {
            console.log("Could not play celebration sound:", e);
        }
    }
    
    function playWishSound() {
        try {
            const sound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-magic-sparkle-sound-309.mp3');
            sound.volume = 0.2;
            sound.play().catch(e => console.log("Wish sound error:", e));
        } catch (e) {
            console.log("Could not play wish sound:", e);
        }
    }
    
    // Initialize the app
    init();
}