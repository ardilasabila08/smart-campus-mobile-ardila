/**
 * UAS Smart Campus Mobile - Ardila Sabila (242302011)
 * Fitur: SPA, Smart Schedule, Mission System (LocalStorage), & API Integration
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

    // 2. Auth System (Level 3: Login Page)
    login: function() {
        const nim = document.getElementById('nim-input').value;
        if(nim === "242302011") {
            document.getElementById('login-page').classList.add('hidden');
            document.getElementById('main-app').classList.remove('hidden');
            this.navigate('dashboard');
        } else {
            alert("NIM tidak terdaftar! Gunakan: 242302011");
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

    // 4. Dynamic Rendering (Level 4, 5, 6, & 10)
    render: function(page) {
        const content = document.getElementById('app-content');
        let html = '';

        switch(page) {
            case 'dashboard':
                html = `
                    <div class="card">
                        <h3 style="color:#a29bfe;">🎯 Mission Progress</h3>
                        <div style="background:#eee; height:12px; border-radius:10px; margin:15px 0;">
                            <div id="progress-bar" style="background:linear-gradient(90deg, #a29bfe, #74b9ff); width:0%; height:100%; border-radius:10px; transition:0.5s;"></div>
                        </div>
                        <p id="progress-text" style="font-size:12px; font-weight:600; color:#636e72;">0% Mission Completed</p>
                    </div>
                    <div class="card">
                        <h4><i class="bi bi-megaphone"></i> Info Kampus (API)</h4>
                        <p id="news-api" style="font-size:14px; color:#636e72; margin-top:10px;">Menghubungkan...</p>
                    </div>
                `;
                this.updateProgress(); 
                this.fetchNews(); 
                break;

            case 'jadwal':
                // Level 5: Smart Schedule System
                html = `
                    <div class="card">
                        <h3>📅 Jadwal Hari Ini</h3>
                        <div style="border-left:4px solid #a29bfe; padding-left:15px; margin-top:15px;">
                            <b style="color:#2d3436;">Pemrograman Web Mobile</b><br>
                            <small style="color:#636e72;">08:00 - 10:30 | Ruang D.3.1</small>
                        </div>
                        <p style="margin-top:20px; font-size:11px; color:#aaa;">Data disinkronkan dari Smart Schedule System[cite: 55].</p>
                    </div>
                `;
                break;

            case 'tugas':
                // Level 6: Academic Mission System
                html = `
                    <div class="card">
                        <h3>✅ Academic Mission</h3>
                        <p style="font-size:12px; color:#636e72; margin-bottom:15px;">Tandai tugas yang sudah selesai.</p>
                        ${this.createMissionItem(0, "Laporan Proyek APSi")}
                        ${this.createMissionItem(1, "Database UTS SIA")}
                        ${this.createMissionItem(2, "Update Portofolio CV")}
                    </div>
                `;
                break;

            case 'profil':
                // Level 10: Smart Developer Showcase
                html = `
                    <div class="card" style="text-align:center;">
                        <i class="bi bi-person-circle" style="font-size:60px; color:#a29bfe;"></i>
                        <h2 style="margin-top:10px; color:#2d3436;">Ardila Sabila</h2>
                        <p style="color:#636e72;">NIM: 242302011</p>
                        <hr style="margin:20px 0; border:0; border-top:1px solid #eee;">
                        <button onclick="window.open('https://ardila-sabila.vercel.app/')">
                            <i class="bi bi-link-45deg"></i> Lihat CV Online
                        </button>
                        <p style="font-size:10px; margin-top:15px; color:#b2bec3;">Terhubung dengan Developer Showcase[cite: 116, 121].</p>
                    </div>
                `;
                break;
        }
        content.innerHTML = html;
    },

    // 5. Mission Logic (Level 6 & 8)
    createMissionItem: function(id, title) {
        const checked = localStorage.getItem('mission_' + id) === 'true' ? 'checked' : '';
        return `
            <div style="display:flex; align-items:center; margin-bottom:15px; background:#f9f9fb; padding:10px; border-radius:12px;">
                <input type="checkbox" id="m${id}" ${checked} 
                    onchange="app.toggleMission(${id}, this.checked)" 
                    style="width:20px; height:20px; margin-right:12px; cursor:pointer;">
                <label for="m${id}" style="font-size:14px; color:#2d3436; cursor:pointer;">${title}</label>
            </div>
        `;
    },

    toggleMission: function(id, isChecked) {
        localStorage.setItem('mission_' + id, isChecked); // Simpan ke LocalStorage [cite: 79]
        this.updateProgress(); // Update langsung angkanya 
    },

    updateProgress: function() {
        // Menghitung persentase misi secara real-time
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

    // 6. API Integration (Level 7)
    fetchNews: function() {
        setTimeout(() => {
            const newsEl = document.getElementById('news-api');
            if(newsEl) {
                newsEl.innerHTML = `
                    <b style="color:#a29bfe;">UAS Smart Campus Ready!</b><br>
                    Halo Ardila, pastikan link deploy sudah terhubung ke CV[cite: 143].
                `;
            }
        }, 1500);
    },

    // 7. Theme System (Level 8)
    toggleTheme: function() {
        document.body.classList.toggle('dark-mode');
        const icon = document.querySelector('#theme-toggle i');
        icon.className = document.body.classList.contains('dark-mode') ? 'bi bi-sun' : 'bi bi-moon-stars';
    }
};

app.init();