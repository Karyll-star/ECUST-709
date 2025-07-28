// 全局变量
let currentBatteryLevel = 85;
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
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

function addFlashEffect(element) {
    element.classList.add('flash');
    setTimeout(() => {
        element.classList.remove('flash');
    }, 300);
}

// 舍友卡片功能
function initializeRoommateCards() {
    const cards = document.querySelectorAll('.roommate-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是编辑按钮，不显示弹窗
            if (e.target.closest('.edit-btn') || e.target.closest('.image-upload')) {
                return;
            }
            
            playSound('click');
            addShakeEffect(this);
            
            // 显示详细信息弹窗
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
    
    // 初始化图片上传功能
    initializeImageUpload();
}

// 图片上传功能
function initializeImageUpload() {
    const imageUploads = document.querySelectorAll('.image-upload');
    
    imageUploads.forEach(upload => {
        upload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // 验证文件类型
                if (!file.type.startsWith('image/')) {
                    showNotification('请选择图片文件！');
                    return;
                }
                
                // 验证文件大小（限制为5MB）
                if (file.size > 5 * 1024 * 1024) {
                    showNotification('图片文件过大，请选择小于5MB的图片！');
                    return;
                }
                
                const reader = new FileReader();
                reader.onload = function(e) {
                    const roommateType = upload.dataset.roommate;
                    const roommateCard = upload.closest('.roommate-card');
                    const image = roommateCard.querySelector('.roommate-image');
                    
                    // 显示图片预览弹窗
                    showImagePreview(e.target.result, roommateType, image, roommateCard);
                };
                
                reader.readAsDataURL(file);
            }
        });
    });
}

// 保存图片到本地存储
function saveImageToLocalStorage(roommateType, imageData) {
    try {
        const savedImages = JSON.parse(localStorage.getItem('roommateImages') || '{}');
        savedImages[roommateType] = imageData;
        localStorage.setItem('roommateImages', JSON.stringify(savedImages));
    } catch (error) {
        console.log('保存图片失败:', error);
    }
}

// 加载保存的图片
function loadSavedImages() {
    try {
        const savedImages = JSON.parse(localStorage.getItem('roommateImages') || '{}');
        
        Object.keys(savedImages).forEach(roommateType => {
            const roommateCard = document.querySelector(`[data-roommate="${roommateType}"]`);
            if (roommateCard) {
                const image = roommateCard.querySelector('.roommate-image');
                image.src = savedImages[roommateType];
            }
        });
    } catch (error) {
        console.log('加载保存的图片失败:', error);
    }
}

// 图片预览功能
function showImagePreview(imageData, roommateType, imageElement, roommateCard) {
    const previewContent = `
        <h2>图片预览</h2>
        <div class="image-preview-container">
            <div class="preview-image-wrapper">
                <img src="${imageData}" alt="预览图片" class="preview-image">
            </div>
            <div class="preview-info">
                <p><strong>舍友类型:</strong> ${roommateType}</p>
                <p><strong>图片尺寸:</strong> <span id="image-size">计算中...</span></p>
                <p><strong>文件大小:</strong> <span id="file-size">计算中...</span></p>
            </div>
            <div class="preview-actions">
                <button class="preview-btn confirm-btn" onclick="confirmImageUpdate('${imageData}', '${roommateType}', '${imageElement.id}', '${roommateCard.dataset.roommate}')">
                    <i class="fas fa-check"></i> 确认使用
                </button>
                <button class="preview-btn cancel-btn" onclick="closeModal()">
                    <i class="fas fa-times"></i> 取消
                </button>
            </div>
        </div>
    `;
    
    showModal(previewContent);
    
    // 计算图片信息
    const img = new Image();
    img.onload = function() {
        document.getElementById('image-size').textContent = `${this.width} × ${this.height}`;
        
        // 计算文件大小
        const base64Length = imageData.length;
        const fileSizeKB = Math.round((base64Length * 0.75) / 1024);
        document.getElementById('file-size').textContent = `${fileSizeKB} KB`;
    };
    img.src = imageData;
}

// 确认图片更新
function confirmImageUpdate(imageData, roommateType, imageElementId, roommateTypeData) {
    const imageElement = document.querySelector(`[data-roommate="${roommateTypeData}"] .roommate-image`);
    const roommateCard = document.querySelector(`[data-roommate="${roommateTypeData}"]`);
    
    // 更新图片
    imageElement.src = imageData;
    
    // 添加成功动画
    imageElement.classList.add('image-upload-success');
    setTimeout(() => {
        imageElement.classList.remove('image-upload-success');
    }, 500);
    
    // 播放成功音效
    playSound('success');
    
    // 显示成功通知
    showNotification(`${roommateType}的图片更新成功！`);
    
    // 更新日期水印
    const dateWatermark = roommateCard.querySelector('.date-watermark');
    const today = new Date();
    const dateString = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    dateWatermark.textContent = dateString;
    
    // 保存到本地存储
    saveImageToLocalStorage(roommateType, imageData);
    
    // 关闭弹窗
    closeModal();
}

// 重置舍友图片
function resetRoommateImage(roommateType) {
    const roommateCard = document.querySelector(`[data-roommate="${roommateType}"]`);
    const image = roommateCard.querySelector('.roommate-image');
    
    // 默认图片URL
    const defaultImages = {
        '社恐': 'https://via.placeholder.com/150x200/FFD1DC/FFFFFF?text=社恐',
        '摸鱼': 'https://via.placeholder.com/150x200/FFD1DC/FFFFFF?text=摸鱼',
        '学霸': 'https://via.placeholder.com/150x200/FFD1DC/FFFFFF?text=学霸',
        '夜猫': 'https://via.placeholder.com/150x200/FFD1DC/FFFFFF?text=夜猫'
    };
    
    // 更新图片
    image.src = defaultImages[roommateType];
    
    // 添加重置动画
    image.classList.add('image-upload-success');
    setTimeout(() => {
        image.classList.remove('image-upload-success');
    }, 500);
    
    // 播放音效
    playSound('success');
    
    // 显示通知
    showNotification(`${roommateType}的图片已重置为默认！`);
    
    // 更新日期水印
    const dateWatermark = roommateCard.querySelector('.date-watermark');
    const today = new Date();
    const dateString = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')}`;
    dateWatermark.textContent = dateString;
    
    // 从本地存储中删除
    try {
        const savedImages = JSON.parse(localStorage.getItem('roommateImages') || '{}');
        delete savedImages[roommateType];
        localStorage.setItem('roommateImages', JSON.stringify(savedImages));
    } catch (error) {
        console.log('删除保存的图片失败:', error);
    }
}

// 宠物功能
function initializePets() {
    const pets = document.querySelectorAll('.pet');
    
    pets.forEach(pet => {
        pet.addEventListener('click', function() {
            const petType = this.dataset.pet;
            const quote = this.querySelector('.pet-quote').textContent;
            
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
        
        // 添加浮动动画
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            pet.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000);
    });
}

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

// 电量监控功能
function initializeBatteryMonitor() {
    const batteryLevel = document.getElementById('batteryLevel');
    const batteryFill = batteryLevel.querySelector('.battery-fill');
    const batteryText = batteryLevel.querySelector('.battery-text');
    
    // 模拟电量变化
    setInterval(() => {
        currentBatteryLevel += (Math.random() - 0.5) * 2;
        currentBatteryLevel = Math.max(0, Math.min(100, currentBatteryLevel));
        
        batteryFill.style.width = `${currentBatteryLevel}%`;
        batteryText.textContent = `${Math.round(currentBatteryLevel)}%`;
        
        // 低电量警告
        if (currentBatteryLevel < 20) {
            batteryLevel.classList.add('low-battery');
            playSound('warning');
            showNotification('电量不足！请及时充电！');
        } else {
            batteryLevel.classList.remove('low-battery');
        }
        
        // 根据电量改变颜色
        if (currentBatteryLevel > 60) {
            batteryFill.style.background = 'linear-gradient(90deg, #4CAF50, #8BC34A)';
        } else if (currentBatteryLevel > 30) {
            batteryFill.style.background = 'linear-gradient(90deg, #FF9800, #FFC107)';
        } else {
            batteryFill.style.background = 'linear-gradient(90deg, #FF6B6B, #FF8E53)';
        }
    }, 5000);
    
    // CSV上传功能
    const csvUpload = document.getElementById('csvUpload');
    csvUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            playSound('success');
            showNotification('电量数据上传成功！');
            
            // 模拟处理CSV数据
            setTimeout(() => {
                showNotification('数据分析完成！');
            }, 2000);
        }
    });
}

// 舍规功能
function initializeRules() {
    const ruleItems = document.querySelectorAll('.rule-item');
    
    ruleItems.forEach(rule => {
        rule.addEventListener('click', function() {
            playSound('click');
            addFlashEffect(this);
            
            const ruleText = this.querySelector('span').textContent;
            const isForbidden = this.classList.contains('forbidden');
            
            showModal(`
                <h2>舍规详情</h2>
                <div class="rule-detail">
                    <p><strong>规则:</strong> ${ruleText}</p>
                    <p><strong>类型:</strong> ${isForbidden ? '禁止类' : '建议类'}</p>
                    <p><strong>说明:</strong> ${isForbidden ? '违反此规则将受到惩罚！' : '建议遵守此规则以维护寝室和谐！'}</p>
                    ${isForbidden ? '<div class="warning-icon">⚠️</div>' : '<div class="suggestion-icon">💡</div>'}
                </div>
            `);
        });
    });
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
            
            // 特殊效果
            if (days <= 3) {
                element.classList.add('urgent');
            }
            if (days <= 1) {
                element.classList.add('final-day');
            }
        }, 1000);
        
        countdownTimers[element.dataset.date] = timerId;
    });
}

// 身份生成器功能
function initializeCharacterGenerator() {
    const generateBtn = document.getElementById('generateBtn');
    const personalitySelect = document.getElementById('personalityType');
    
    const characterData = {
        chunibyo: {
            skills: ['暗黑魔法', '中二病发作', '幻想力MAX'],
            weaknesses: ['现实打击', '社死现场', '中二病晚期'],
            specials: ['暗黑能量波', '幻想具现化', '中二病传染']
        },
        cyber: {
            skills: ['黑客技术', '机械改造', '电子入侵'],
            weaknesses: ['EMP攻击', '网络断线', '系统崩溃'],
            specials: ['量子计算', '赛博朋克', '数字永生']
        },
        tsundere: {
            skills: ['傲娇技能', '口是心非', '脸红攻击'],
            weaknesses: ['直球攻击', '温柔陷阱', '傲娇暴露'],
            specials: ['傲娇光环', '脸红特效', '口是心非MAX']
        },
        yandere: {
            skills: ['病娇技能', '占有欲MAX', '黑化能力'],
            weaknesses: ['背叛打击', '失去目标', '病娇暴露'],
            specials: ['病娇光环', '黑化模式', '占有欲爆发']
        }
    };
    
    generateBtn.addEventListener('click', function() {
        playSound('success');
        addShakeEffect(this);
        
        const personality = personalitySelect.value;
        const data = characterData[personality];
        
        // 随机选择属性
        const skill = data.skills[Math.floor(Math.random() * data.skills.length)];
        const weakness = data.weaknesses[Math.floor(Math.random() * data.weaknesses.length)];
        const special = data.specials[Math.floor(Math.random() * data.specials.length)];
        
        // 更新显示
        document.getElementById('skillValue').textContent = skill;
        document.getElementById('weaknessValue').textContent = weakness;
        document.getElementById('specialValue').textContent = special;
        
        // 更新标题
        const characterTitle = document.querySelector('.character-title');
        characterTitle.textContent = `${personality === 'chunibyo' ? '中二病' : 
                                   personality === 'cyber' ? '赛博朋克' : 
                                   personality === 'tsundere' ? '傲娇' : '病娇'}系角色`;
        
        // 添加生成动画
        const characterCard = document.getElementById('characterCard');
        characterCard.style.transform = 'scale(1.05)';
        setTimeout(() => {
            characterCard.style.transform = 'scale(1)';
        }, 300);
        
        showNotification('角色生成成功！');
    });
}

// 弹窗系统
function showModal(content) {
    const modal = document.getElementById('modal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = content;
    modal.style.display = 'block';
    
    // 添加弹窗动画
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// 通知系统
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bright-yellow);
        color: #333;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 4px 15px var(--shadow-color);
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
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

// 关闭弹窗事件
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal');
    const closeBtn = modal.querySelector('.close-btn');
    
    closeBtn.addEventListener('click', function() {
        playSound('click');
        closeModal();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // 初始化所有功能
    initializeRoommateCards();
    loadSavedImages(); // 加载保存的图片
    initializePets();
    initializeBatteryMonitor();
    initializeRules();
    initializeCountdown();
    initializeCharacterGenerator();
    initializeNavigation();
    
    // 添加页面加载动画
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // 添加星星闪烁效果
    setInterval(() => {
        const stars = document.querySelectorAll('.star-effect');
        stars.forEach(star => {
            if (Math.random() < 0.3) {
                star.style.opacity = '1';
                setTimeout(() => {
                    star.style.opacity = '0.3';
                }, 200);
            }
        });
    }, 500);
    
    console.log('709寝室宇宙网页已加载完成！');
}); 