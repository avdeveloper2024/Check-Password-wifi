   class WiFiPenTestSimulator {
            constructor() {
                this.legalWarning = "این ابزار فقط برای اهداف آموزشی است";
                this.commonPasswords = ["123456", "password", "12345678", "qwerty", "123456789"];
            }
            
            simulateWEPVulnerability() {
                return {
                    title: "آسیب‌پذیری پروتکل WEP",
                    description: "WEP از IVهای ۲۴ بیتی استفاده می‌کند که پس از ترافیک کافی قابل crack شدن است",
                    vulnerability: "Weak Initialization Vector (IV)",
                    risk: "بالا",
                    solution: "ارتقاء به WPA2 یا WPA3",
                    note: "این یک شبیه‌سازی آموزشی است"
                };
            }
            
            simulateDictionaryAttack() {
                return {
                    title: "شبیه‌سازی حمله دیکشنری",
                    description: "هکرها لیستی از رمزهای عبور رایج را امتحان می‌کنند",
                    howItWorks: "امتحان کردن رمزهای معمول مانند '123456' یا 'password'",
                    prevention: "استفاده از رمزهای پیچیده و منحصر به فرد",
                    example: this.commonPasswords
                };
            }
            
            checkPasswordStrength(password) {
                if (!password) return "ضعیف";
                
                let score = 0;
                if (password.length >= 12) score += 2;
                else if (password.length >= 8) score += 1;
                
                if (/[A-Z]/.test(password)) score += 1;
                if (/[a-z]/.test(password)) score += 1;
                if (/[0-9]/.test(password)) score += 1;
                if (/[^A-Za-z0-9]/.test(password)) score += 1;
                
                const levels = ['بسیار ضعیف', 'ضعیف', 'متوسط', 'قوی', 'بسیار قوی'];
                return levels[Math.min(score, levels.length - 1)];
            }
            
            getSecurityRecommendations() {
                return [
                    "استفاده از WPA3 یا حداقل WPA2",
                    "غیرفعال کردن WPS در روتر",
                    "انتخاب رمزعبور پیچیده (حداقل ۱۲ کاراکتر)",
                    "به‌روزرسانی firmware روتر",
                    "مخفی کردن SSID شبکه",
                    "فیلترینگ MAC Address"
                ];
            }
            
            generateEducationalReport() {
                return {
                    title: "گزارش آموزشی امنیت وای‌فای",
                    date: new Date().toLocaleDateString('fa-IR'),
                    vulnerabilities: [
                        this.simulateWEPVulnerability(),
                        this.simulateDictionaryAttack()
                    ],
                    recommendations: this.getSecurityRecommendations(),
                    disclaimer: "این گزارش فقط برای اهداف آموزشی تهیه شده است"
                };
            }
        }

        const simulator = new WiFiPenTestSimulator();

        function checkPassword() {
            const password = document.getElementById('passwordInput').value;
            const strength = simulator.checkPasswordStrength(password);
            const resultDiv = document.getElementById('passwordResult');
            
            resultDiv.innerHTML = `
                <strong>نتایج بررسی:</strong><br>
                - قدرت رمزعبور: <strong>${strength}</strong><br>
                - طول رمزعبور: ${password.length} کاراکتر<br>
                ${strength.includes('ضعیف') ? 
                    '⚠️ پیشنهاد: رمزعبور قوی‌تری انتخاب کنید' : 
                    '✅ رمزعبور قابل قبول است'}
            `;
        }

        function simulateWEP() {
            const result = simulator.simulateWEPVulnerability();
            const resultDiv = document.getElementById('simulationResult');
            
            resultDiv.innerHTML = `
                <strong>${result.title}</strong><br>
                📝 ${result.description}<br>
                ⚠️ آسیب‌پذیری: ${result.vulnerability}<br>
                🚨 سطح خطر: ${result.risk}<br>
                ✅ راه حل: ${result.solution}<br>
                📌 نکته: ${result.note}
            `;
        }

        function simulateDictionary() {
            const result = simulator.simulateDictionaryAttack();
            const resultDiv = document.getElementById('simulationResult');
            
            resultDiv.innerHTML = `
                <strong>${result.title}</strong><br>
                📝 ${result.description}<br>
                🔍 نحوه کار: ${result.howItWorks}<br>
                🛡️ پیشگیری: ${result.prevention}<br>
                📋 مثال رمزهای رایج: ${result.example.join(', ')}<br>
                💡 نکته: از این رمزها استفاده نکنید!
            `;
        }

        function showPrevention() {
            const recommendations = simulator.getSecurityRecommendations();
            const resultDiv = document.getElementById('simulationResult');
            
            resultDiv.innerHTML = `
                <strong>راهکارهای پیشگیری از حملات</strong><br>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            `;
        }

        function generateReport() {
            const report = simulator.generateEducationalReport();
            const resultDiv = document.getElementById('reportResult');
            
            resultDiv.innerHTML = `
                <strong>${report.title}</strong><br>
                📅 تاریخ: ${report.date}<br><br>
                
                <strong>آسیب‌پذیری‌های شبیه‌سازی شده:</strong><br>
                ${report.vulnerabilities.map(vul => `
                    - ${vul.title}: ${vul.description}
                `).join('<br>')}<br><br>
                
                <strong>توصیه‌های امنیتی:</strong><br>
                <ul>
                    ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul><br>
                
                <em>${report.disclaimer}</em>
            `;
        }