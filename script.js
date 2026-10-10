// Web Audio API untuk Efek Suara Sci-Fi
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, audioCtx.currentTime + 0.05);
        gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    } else if (type === 'hover') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(0.02, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.03);
    } else if (type === 'success') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.08);
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.2);
    }
}

// Navigasi Tab Single Page Application (Halus tanpa kilatan merah)
function switchPage(pageId) {
    playSound('click');
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById('page-' + pageId).classList.add('active');
    event.currentTarget.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Boot Screen Berjalan Tepat Selama 4 Detik dengan Hitungan Persen
window.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('boot-screen');
    if (bootScreen) {
        let currentPercent = 0;
        const totalDuration = 4000; // 4 Detik
        const intervalTime = 40;     // Kecepatan update (ms)
        const increment = 100 / (totalDuration / intervalTime);
        
        const fill = document.querySelector('.progress-fill');
        const percentText = document.getElementById('percent-count');
        const statusText = document.getElementById('boot-status');
        
        const statuses = [
            "Menginisialisasi Jaringan Enkripsi Kuantum...",
            "Sinkronisasi Inti Nexus-AI...",
            "Memuat Protokol Pertahanan Polimorfik...",
            "Sistem Komando Nasional Siap."
        ];

        const bootTimer = setInterval(() => {
            currentPercent += increment;
            if (currentPercent >= 100) {
                currentPercent = 100;
                clearInterval(bootTimer);
                setTimeout(() => {
                    bootScreen.style.opacity = '0';
                    setTimeout(() => bootScreen.remove(), 800);
                }, 300);
            }

            let roundedPercent = Math.floor(currentPercent);
            if(fill) fill.style.width = roundedPercent + '%';
            if(percentText) percentText.innerText = roundedPercent;
            
            if(statusText) {
                let idx = Math.floor((roundedPercent / 100) * statuses.length);
                statusText.innerText = statuses[Math.min(idx, statuses.length - 1)];
            }
        }, intervalTime);
    }
    
    // Jam Sistem & Fluktuasi Beban CPU AI
    setInterval(() => {
        const now = new Date();
        const clockEl = document.getElementById('live-clock');
        if(clockEl) {
            clockEl.innerText = now.toTimeString().split(' ')[0];
        }
        const cpuEl = document.getElementById('cpu-load');
        if(cpuEl) {
            let randomLoad = Math.floor(Math.random() * 25) + 12;
            cpuEl.innerText = randomLoad + '%';
        }
    }, 1000);

    initToastAlerts();
});

// Fitur Panel Kontrol Darurat
function triggerLockdown() {
    playSound('success');
    const overlay = document.getElementById('lockdown-overlay');
    const log = document.getElementById('panel-log');
    if(overlay) {
        overlay.classList.remove('lockdown-hidden');
        if(log) log.innerText = "[ALERT] Protokol Lockdown Kuantum Aktif! Seluruh akses eksternal diputus.";
        setTimeout(() => {
            overlay.classList.add('lockdown-hidden');
            if(log) log.innerText = "[OK] Lockdown dicabut. Jaringan kembali ke mode normal.";
        }, 4000);
    }
}

function triggerPurge() {
    playSound('click');
    const log = document.getElementById('panel-log');
    if(log) {
        log.innerText = "[PURGE] Menghapus cache anomali dan sisa jejak paket berbahaya... BERHASIL.";
    }
}

// Sistem Notifikasi Toast Real-time Otomatis
function initToastAlerts() {
    const alerts = [
        "Mendeteksi brute-force attempt pada Node-04 [Diblokir AI]",
        "Anomali enkripsi terdeteksi di sektor regional timur",
        "Pembaruan struktur firewall polimorfik berhasil diterapkan",
        "Sinkronisasi data kuantum dengan pusat berjalan stabil"
    ];
    
    setInterval(() => {
        const toast = document.getElementById('toast-alert');
        const msg = document.getElementById('toast-msg');
        if(toast && msg) {
            let randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
            msg.innerText = randomAlert;
            toast.classList.remove('toast-hidden');
            
            setTimeout(() => {
                toast.classList.add('toast-hidden');
            }, 4500);
        }
    }, 14000);
}

// Matrix Rain Background Canvas Effect
const canvas = document.getElementById('cyberCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01CYBERLIFE89$#@%&*ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let x = 0; x < columns; x++) {
        drops[x] = Math.random() * canvas.height;
    }

    function drawMatrix() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff0000';
        ctx.font = fontSize + 'px monospace';
        ctx.textAlign = 'center';

        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.shadowBlur = 4;
            ctx.shadowColor = '#ff0000';
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            ctx.shadowBlur = 0;

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 50);

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Konsol Terminal Interaktif dengan Efek Ketik (TypeWriter)
const terminalOutput = document.getElementById("terminal-output");
const commandInput = document.getElementById("terminal-command-input");
const terminalScroll = document.getElementById("terminal-body-scroll");

function typeWriterOutput(text, callback) {
    let i = 0;
    function typing() {
        if (i < text.length) {
            terminalOutput.innerHTML += text.charAt(i);
            i++;
            if(terminalScroll) terminalScroll.scrollTop = terminalScroll.scrollHeight;
            setTimeout(typing, 10);
        } else if (callback) {
            callback();
        }
    }
    typing();
}

if (terminalOutput) {
    const introWelcome = "> INISIALISASI ROOT MAINFRAME CYBERLIFE OS...\n> KETIK 'help' UNTUK MENAMPILKAN PERINTAH OPERASIONAL.\n\n";
    terminalOutput.innerHTML = introWelcome;

    if (commandInput) {
        commandInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                playSound('click');
                let cmd = this.value.trim().toLowerCase();
                terminalOutput.innerHTML += `> ${this.value}\n`;
                
                let responseText = "";
                if (cmd === 'help') {
                    playSound('success');
                    responseText = `DAFTAR PERINTAH:\n - status          : Menampilkan status jaringan & server inti\n - scan            : Memindai anomali jaringan global secara manual\n - override        : Memaksa sinkronisasi tingkat 5 kuantum\n - self-destruct   : Simulasi darurat pemusnahan data terenkripsi\n - clear           : Membersihkan riwayat konsol\n - about           : Informasi identitas sistem operasional\n\n`;
                } else if (cmd === 'status') {
                    playSound('success');
                    responseText = `[OK] Server Inti: ONLINE (99.99% Uptime)\n[OK] Enkripsi Kuantum: TINGKAT 5 AKTIF\n[OK] Nexus-AI: PREDIKSI ANOMALI NORMAL\n\n`;
                } else if (cmd === 'scan') {
                    playSound('success');
                    responseText = `[SCAN] Menganalisis seluruh node jaringan... 0 Kerentanan ditemukan. Pertahanan optimal.\n\n`;
                } else if (cmd === 'override') {
                    playSound('success');
                    responseText = `[WARNING] Menginisialisasi Quantum Override... Selesai. Sistem dikunci sepenuhnya terhadap agresi eksternal.\n\n`;
                } else if (cmd === 'self-destruct') {
                    playSound('success');
                    responseText = `[CRITICAL] Peringatan: Perintah pemusnahan memerlukan otorisasi tingkat tinggi (Level 10). Ditolak oleh Nexus-AI.\n\n`;
                } else if (cmd === 'clear') {
                    terminalOutput.innerHTML = '';
                    responseText = "";
                } else if (cmd === 'about') {
                    responseText = `CYBERLIFE - Pusat Komando Siber Nasional Republik Indonesia.\n\n`;
                } else if (cmd !== '') {
                    responseText = `Perintah tidak dikenal: '${cmd}'. Ketik 'help' untuk daftar perintah.\n\n`;
                }
                
                this.value = '';
                if(responseText) {
                    typeWriterOutput(responseText);
                }
            }
        });
    }
}
