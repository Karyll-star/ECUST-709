// 全局变量
let countdownTimers = {};

// 音效系统
class SoundSystem {
    constructor() {
        this.sounds = {
            click: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
            meow: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
            bark: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
            warning: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT',
            success: 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT'
        };
    }

    play(soundName) {
        try {
            const audio = new Audio(this.sounds[soundName]);
            audio.volume = 0.3;
            audio.play();
        } catch (error) {
            console.log('音效播放失败:', error);
        }
    }
}

const soundSystem = new SoundSystem();

// 工具函数
function playSound(soundName) {
    soundSystem.play(soundName);
}

function addShakeEffect(element) {
    element.classList.add('shake');
    setTimeout(() => element.classList.remove('shake'), 500);
}

function addFlashEffect(element) {
    element.classList.add('flash');
    setTimeout(() => element.classList.remove('flash'), 300);
}

// 舍友卡片功能
function initializeRoommateCards() {
    const cards = document.querySelectorAll('.roommate-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            playSound('click');
            addShakeEffect(this);
            
            const roommateType = this.dataset.roommate;
            const roommateName = this.querySelector('h3').textContent;
            const status = this.querySelector('.status').textContent;
            const quote = this.querySelector('.card-quote p').textContent;
            
            showModal(`
                <h2>${roommateName}的详细信息</h2>
                <div class="roommate-detail">
                    <p><strong>类型:</strong> ${roommateType}</p>
                    <p><strong>状态:</strong> ${status}</p>
                    <p><strong>经典台词:</strong> ${quote}</p>
                    <div class="power-chart">
                        <h3>能力值图表</h3>
                        <div class="chart-bars">
                            <div class="chart-bar">
                                <span>战斗力</span>
                                <div class="bar-fill" style="width: ${Math.random() * 100}%"></div>
                            </div>
                            <div class="chart-bar">
                                <span>摸鱼指数</span>
                                <div class="bar-fill" style="width: ${Math.random() * 100}%"></div>
                            </div>
                            <div class="chart-bar">
                                <span>学习能力</span>
                                <div class="bar-fill" style="width: ${Math.random() * 100}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `);
        });
    });
}

// 宠物功能
function initializePets() {
    // 选择所有宠物和植物元素
    const pets = document.querySelectorAll('.pet, .swim-fish, .plant');
    pets.forEach(pet => {
        pet.addEventListener('click', function() {
            const petType = this.dataset.pet || this.dataset.plant || this.id;
            const quote = this.querySelector('.pet-quote, .plant-quote')?.textContent || '';
            const realImg = this.dataset.real;
            
            if (petType === 'fish1' || petType === 'fish2') {
                showModal(`
                    <h2>鱼缸${petType === 'fish1' ? '1号' : '2号'} - 真实照片</h2>
                    <div style="text-align:center;">
                        <img src="${realImg || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'}" alt="鱼缸真实图片" style="max-width:100%;border-radius:15px;box-shadow:0 4px 15px #B5EAD7;margin-bottom:15px;">
                        <div style="font-size:1.1rem;color:#4ECDC4;">${quote || '游来游去的小鱼'}</div>
                    </div>
                `);
                return;
            }
            
            if (petType === 'cat') {
                playSound('meow');
            } else if (petType === 'dog') {
                playSound('bark');
            }
            
            addShakeEffect(this);
            showModal(`
                <h2>宠物互动</h2>
                <div class="pet-interaction">
                    <p><strong>宠物类型:</strong> ${petType === 'cat' ? '猫咪' : '狗狗'}</p>
                    <p><strong>当前状态:</strong> 正在卖萌</p>
                    <p><strong>说的话:</strong> ${quote}</p>
                    <div class="pet-actions">
                        <button onclick="feedPet('${petType}')">喂食</button>
                        <button onclick="playWithPet('${petType}')">玩耍</button>
                        <button onclick="petPet('${petType}')">抚摸</button>
                    </div>
                </div>
            `);
        });
        
        // 只为非鱼类的元素添加漂移动画
        if (!pet.classList.contains('swim-fish')) {
            startPetDrift(pet);
        }
        
        // 为有眼睛的元素添加鼠标悬停效果
        const eyes = pet.querySelector('.eyes');
        if (eyes) {
            pet.addEventListener('mouseenter', function() {
                eyes.style.animationDuration = '1.2s';
            });
            
            pet.addEventListener('mouseleave', function() {
                eyes.style.animationDuration = '';
            });
        }
    });
}

// 宠物互动功能
function feedPet(petType) {
    playSound('success');
    showNotification(`${petType === 'cat' ? '猫咪' : '狗狗'}吃饱了！`);
}

function playWithPet(petType) {
    playSound('click');
    showNotification(`${petType === 'cat' ? '猫咪' : '狗狗'}很开心！`);
}

function petPet(petType) {
    playSound('success');
    showNotification(`${petType === 'cat' ? '猫咪' : '狗狗'}被摸得很舒服！`);
}

// 今日舍规数据池
const dormRulesPool = [
    { type: 'forbidden', icon: 'ban', text: '今天必须将袜子穿在手上' },
    { type: 'suggestion', icon: 'lightbulb', text: '每位舍友必须讲一句二次元台词' },
    { type: 'forbidden', icon: 'ban', text: '禁止与洗衣机谈恋爱' },
    { type: 'suggestion', icon: 'lightbulb', text: '建议以猫耳发卡作为今日通行证' },
    { type: 'forbidden', icon: 'ban', text: '禁止使用正常语气说话，必须角色扮演' },
    { type: 'suggestion', icon: 'lightbulb', text: '建议以Saber为榜样完成学习任务' },
    { type: 'forbidden', icon: 'ban', text: '禁止不对猫猫（或幻想中的猫猫）打招呼' },
    { type: 'suggestion', icon: 'lightbulb', text: '建议将宿舍命名为"次元裂缝研究所"' },
    { type: 'forbidden', icon: 'ban', text: '禁止忘记赞美初音未来' },
    { type: 'suggestion', icon: 'lightbulb', text: '建议对镜自拍并加二次元滤镜后群发' }
];

function getRandomRuleOfDay() {
    const today = new Date();
    const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
    const idx = seed % dormRulesPool.length;
    return dormRulesPool[idx];
}

function renderRuleOfDay() {
    const rule = getRandomRuleOfDay();
    const rulesList = document.querySelector('.rules-list');
    if (rulesList) {
        rulesList.innerHTML = `
            <div class="rule-item ${rule.type}">
                <i class="fas fa-${rule.icon}"></i>
                <span>${rule.text}</span>
            </div>
        `;
    }
}

function initializeRules() {
    renderRuleOfDay();
}

// 节日倒计时功能
function initializeCountdown() {
    const countdownElements = document.querySelectorAll('.countdown-timer');
    
    countdownElements.forEach(element => {
        const targetDate = new Date(element.dataset.date);
        const timerId = setInterval(() => {
            const now = new Date();
            const timeLeft = targetDate - now;
            
            if (timeLeft <= 0) {
                clearInterval(timerId);
                element.innerHTML = '<span>00</span>天<span>00</span>时<span>00</span>分';
                element.classList.add('final-day');
                showNotification('节日到了！');
                return;
            }
            
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            
            element.querySelector('.days').textContent = days.toString().padStart(2, '0');
            element.querySelector('.hours').textContent = hours.toString().padStart(2, '0');
            element.querySelector('.minutes').textContent = minutes.toString().padStart(2, '0');
            
            if (days <= 3) element.classList.add('urgent');
            if (days <= 1) element.classList.add('final-day');
        }, 1000);
        
        countdownTimers[element.dataset.date] = timerId;
    });
}

// 弹窗系统
function showModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    modal.style.opacity = '0';
    
    setTimeout(() => modal.style.opacity = '1', 10);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.opacity = '0';
    setTimeout(() => modal.style.display = 'none', 300);
}

// 通知系统
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

// 导航功能
function initializeNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            playSound('click');
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 漂移动画函数
function startPetDrift(pet) {
    if (pet.driftTimer) clearInterval(pet.driftTimer);
    pet.driftTimer = setInterval(() => {
        if (pet.classList.contains('dragging')) return;
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        pet.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }, 3000);
}

// 拖拽功能实现
function enablePetDragDrop() {
    // 选择所有可拖拽的元素：宠物、鱼、植物
    const draggables = document.querySelectorAll('.pet, .swim-fish, .plant');
    draggables.forEach(el => {
        el.style.cursor = 'grab';
        el.onmousedown = dragStart;
        el.ontouchstart = dragStart;
    });
    
    let draggingEl = null, offsetX = 0, offsetY = 0;
    
    function dragStart(e) {
        e.preventDefault();
        draggingEl = this;
        
        draggingEl.classList.add('dragging');
        draggingEl.style.cursor = 'grabbing';
        
        const startRect = draggingEl.getBoundingClientRect();
        if (e.type === 'touchstart') {
            offsetX = e.touches[0].clientX - startRect.left;
            offsetY = e.touches[0].clientY - startRect.top;
            document.ontouchmove = dragMove;
            document.ontouchend = dragEnd;
        } else {
            offsetX = e.clientX - startRect.left;
            offsetY = e.clientY - startRect.top;
            document.onmousemove = dragMove;
            document.onmouseup = dragEnd;
        }
        
        draggingEl.style.position = 'fixed';
        draggingEl.style.left = startRect.left + 'px';
        draggingEl.style.top = startRect.top + 'px';
        draggingEl.style.zIndex = 9999;
    }
    
    function dragMove(e) {
        if (!draggingEl) return;
        let x, y;
        if (e.type === 'touchmove') {
            x = e.touches[0].clientX - offsetX;
            y = e.touches[0].clientY - offsetY;
        } else {
            x = e.clientX - offsetX;
            y = e.clientY - offsetY;
        }
        draggingEl.style.left = x + 'px';
        draggingEl.style.top = y + 'px';
    }
    
    function dragEnd(e) {
        if (!draggingEl) return;
        
        draggingEl.classList.remove('dragging');
        draggingEl.style.cursor = 'grab';
        draggingEl.style.position = '';
        draggingEl.style.left = '';
        draggingEl.style.top = '';
        draggingEl.style.zIndex = '';
        
        document.onmousemove = null;
        document.onmouseup = null;
        document.ontouchmove = null;
        document.ontouchend = null;
        
        draggingEl = null;
    }
}

// 鱼缸小鱼动态游动动画
function animateFishTank() {
    const tank = document.querySelector('.fish-tank');
    if (!tank) {
        console.log('鱼缸元素未找到');
        return;
    }
    
    const fishes = [
        { el: document.getElementById('fish1'), dir: 1, y: 60, speed: 1.2, flip: false, lastX: 0 },
        { el: document.getElementById('fish2'), dir: -1, y: 120, speed: 0.9, flip: true, lastX: 0 }
    ];
    
    // 检查小鱼元素是否存在
    fishes.forEach((fish, i) => {
        if (!fish.el) {
            console.log(`小鱼${i+1}元素未找到`);
            return;
        }
        console.log(`小鱼${i+1}元素找到:`, fish.el);
    });
    
    const tankW = 320, tankH = 200, fishW = 48, fishH = 28, margin = 10;
    let t = 0;
    
    // 设置小鱼的初始位置
    fishes.forEach((fish, i) => {
        if (fish.el) {
            // 确保小鱼有正确的定位样式
            fish.el.style.position = 'absolute';
            fish.el.style.left = (margin + (i * 60)) + 'px';
            fish.el.style.top = fish.y + 'px';
            fish.el.style.transform = 'scaleX(1)';
            fish.el.style.zIndex = '20';
            fish.lastX = margin + (i * 60);
            
            console.log(`设置小鱼${i+1}初始位置:`, fish.el.style.left, fish.el.style.top);
        }
    });
    
    function moveFish() {
        t += 0.03;
        fishes.forEach((fish, i) => {
            if (!fish.el) return;
            
            let range = tankW - fishW - margin * 2;
            let x = Math.abs(Math.sin(t * fish.speed + i)) * range;
            if (fish.dir < 0) x = range - x;
            let y = fish.y + Math.sin(t * fish.speed + i * 1.5) * 10;
            
            let direction = (x > fish.lastX) ? 1 : -1;
            fish.el.style.left = (x + margin) + 'px';
            fish.el.style.top = y + 'px';
            fish.el.style.transform = `scaleX(${direction})`;
            fish.lastX = x;
        });
        requestAnimationFrame(moveFish);
    }
    
    // 延迟启动动画，确保DOM完全加载
    setTimeout(() => {
        console.log('启动小鱼游动动画');
        moveFish();
    }, 500);
}

// 通话模块辅助函数
function toggleFullscreenById(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    if (!document.fullscreenElement) {
        if (el.requestFullscreen) el.requestFullscreen();
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
}

function openInNewTab(url) {
    try {
        window.open(url, '_blank');
    } catch (e) {
        console.log('无法在新窗口打开:', e);
    }
}

// 页面加载完成后的初始化
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const closeBtn = modal.querySelector('.close-btn');
    
    closeBtn.addEventListener('click', function() {
        playSound('click');
        closeModal();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) closeModal();
    });
    
    // 初始化所有功能
    initializeRoommateCards();
    initializePets();
    initializeRules();
    initializeCountdown();
    initializeNavigation();
    enablePetDragDrop();
    animateFishTank();
    
    // 页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // 星星闪烁效果
    setInterval(() => {
        const stars = document.querySelectorAll('.star-effect');
        stars.forEach(star => {
            if (Math.random() < 0.3) {
                star.style.opacity = '1';
                setTimeout(() => star.style.opacity = '0.3', 200);
            }
        });
    }, 500);
    
    console.log('709寝室宇宙网页已加载完成！');
}); 