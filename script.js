/**
 * UAS Smart Campus Mobile - Ardila Sabila (242302011)
 * Fitur Lengkap: SPA, Smart Schedule, Mission LocalStorage, & Multi-role Login
 */

const app = {
    // 1. Inisialisasi & Splash Screen (Level 3)
    init: function() {
        setTimeout(() => {
            const splash = document.getElementById('splash');
            const loginPage = document.getElementById('login-page');
            if (splash) splash.classList.add('hidden');
            if (loginPage) loginPage.classList.remove('hidden');
        }, 3000); 
    },

    // 2. Multi-role Login System (Level 10)
    login: function() {
        const nim = document.getElementById('nim-input').value;
        const pass = document.getElementById('pass-input').value;

        // Login bisa untuk semua NIM (minimal 8 karakter)
        if(nim.length >= 8 && pass !== "") {
            localStorage.setItem('user_nim', nim);
            document.getElementById('login-page').classList.add('hidden');
            document.getElementById('main-app').classList.remove('hidden');
            this.navigate('dashboard');
        } else {
            alert("Masukkan NIM dan Password dengan benar!");
        }
    },

    // 3. SPA Navigation System (Level 4)
    navigate: function(page, event) {
        if(event) {
            document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
            event.currentTarget.classList.add('active');
        }
        this.render(page);
    },

    // 4. Dynamic Page Rendering
    render: function(page) {
        const content = document.getElementById('app-content');
        let html = '';

        switch(page) {
            case 'dashboard':
                html = `
                    <div class="card">
                        <h3>🎯 Mission Progress</h3>
                        <div style="background:#eee; height:12px; border-radius:10px; margin:15px 0;">
                            <div id="progress-bar" style="background:linear-gradient(90deg, #a29bfe, #74b9ff); width:0%; height:100%; border-radius:10px; transition:0.5s;"></div>
                        </div>
                        <p id="progress-text" style="font-size:12px; font-weight:600;">0% Mission Completed</p>
                    </div>
                    <div class="card">
                        <h4><i class="bi bi-megaphone"></i> Info Kampus (API)</h4>
                        <p id="news-api" style="font-size:14px; color:#636e72; margin-top:10px;">Memuat data...</p>
                    </div>
                `;
                this.updateProgress(); 
                this.fetchNews(); 
                break;

            case 'jadwal':
                // Level 5: Smart Schedule Logic (Berdasarkan Foto Jadwal Ma'soem)
                const sekarang = new Date();
                const hariIndex = sekarang.getDay(); // 0=Minggu, 3=Rabu, 5=Jumat, 6=Sabtu
                const opsi = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const tanggalDisplay = sekarang.toLocaleDateString('id-ID', opsi);

                let jadwalHtml = '';
                if (hariIndex === 3) { // RABU
                    jadwalHtml = `
                        <div style="border-left:4px solid #a29bfe; padding-left:15px; margin-bottom:15px;">
                            <b>Sistem Informasi Akuntansi</b><br><small>08:00 - 10:00 | Ruang B302</small>
                        </div>
                        <div style="border-left:4px solid #74b9ff; padding-left:15px;">
                            <b>Pemrograman Web Mobile</b><br><small>13:30 - 15:30 | Ruang B302</small>
                        </div>`;
                } else if (hariIndex === 5) { // JUMAT
                    jadwalHtml = `
                        <div style="border-left:4px solid #a29bfe; padding-left:15px;">
                            <b>Pemrograman WEB II</b><br><small>08:00 - 10:00 | Ruang B303</small>
                        </div>`;
                } else if (hariIndex === 6) { // SABTU
                    jadwalHtml = `<b>Kegiatan UKM</b><br><small>Area Kampus</small>`;
                } else if (hariIndex === 0) { // MINGGU
                    jadwalHtml = `<p style="color:#888;">Hari Libur - Waktunya istirahat!</p>`;
                } else {
                    jadwalHtml = `<p style="color:#888;">Tidak ada jadwal kuliah utama hari ini.</p>`;
                }

                html = `
                    <div class="card">
                        <h3>📅 Jadwal Hari Ini</h3>
                        <p style="font-size:12px; color:#636e72; margin-bottom:15px;">${tanggalDisplay}</p>
                        ${jadwalHtml}
                    </div>`;
                break;

            case 'tugas':
                html = `
                    <div class="card">
                        <h3>✅ Academic Mission</h3>
                        ${this.createMissionItem(0, "Laporan Proyek APSI")}
                        ${this.createMissionItem(1, "Database UTS SIA")}
                        ${this.createMissionItem(2, "Update Portofolio CV")}
                    </div>`;
                break;

            case 'profil':
                html = `
                    <div class="card" style="text-align:center;">
                        <i class="bi bi-person-circle" style="font-size:60px; color:#a29bfe;"></i>
                        <h2 style="margin-top:10px;">Ardila Sabila</h2>
                        <p style="color:#888;">NIM: 242302011</p>
                        <hr style="margin:20px 0; border:0; border-top:1px solid #eee;">
                        <button onclick="window.open('https://ardila-sabila.vercel.app/')">Buka CV Online</button>
                    </div>`;
                break;
        }
        content.innerHTML = html;
    },

    // 5. Mission Logic
    createMissionItem: function(id, title) {
        const checked = localStorage.getItem('mission_' + id) === 'true' ? 'checked' : '';
        return `
            <div style="display:flex; align-items:center; margin-bottom:12px; background:#f9f9fb; padding:10px; border-radius:12px;">
                <input type="checkbox" id="m${id}" ${checked} onchange="app.toggleMission(${id}, this.checked)" style="width:20px; height:20px; margin-right:10px;">
                <label for="m${id}">${title}</label>
            </div>`;
    },

    toggleMission: function(id, isChecked) {
        localStorage.setItem('mission_' + id, isChecked); 
        this.updateProgress(); 
    },

    updateProgress: function() {
        setTimeout(() => {
            const missions = [0, 1, 2];
            const completed = missions.filter(id => localStorage.getItem('mission_' + id) === 'true').length;
            const percent = Math.round((completed / missions.length) * 100);
            const bar = document.getElementById('progress-bar');
            const text = document.getElementById('progress-text');
            if(bar) bar.style.width = percent + '%';
            if(text) text.innerText = `${percent}% Mission Completed`;
        }, 50);
    },

    fetchNews: function() {
        setTimeout(() => {
            const newsEl = document.getElementById('news-api');
            if(newsEl) newsEl.innerHTML = `<b>UAS Project Ready!</b><br>Halo Ardila, jangan lupa kumpulkan link CV ke LMS.`;
        }, 1500);
    },

    toggleTheme: function() {
        document.body.classList.toggle('dark-mode');
        const icon = document.querySelector('#theme-toggle i');
        icon.className = document.body.classList.contains('dark-mode') ? 'bi bi-sun' : 'bi bi-moon-stars';
    }
};

app.init();
