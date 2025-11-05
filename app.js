class LoadingAnimation {
    constructor() {
        this.symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '=', '+', '/', '\\', '|', '~', '`', '<', '>', '?', '{', '}', '[', ']', '(', ')', '.', ',', ';', ':'];
        this.loadingScreen = document.getElementById('loadingScreen');
        this.symbolAnimation = document.getElementById('symbolAnimation');
        this.loadingText = document.getElementById('loadingText');
        this.spinnerInterval = null;
        this.helloInterval = null;
        this.rotation = 0;
        this.spinnerChars = [];
        this.helloChars = [];
    }
    
    getRandomSymbol() {
        return this.symbols[Math.floor(Math.random() * this.symbols.length)];
    }
    
    createSpinner() {
        const radius = 4;
        
        let output = '';
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 19; j++) {
                const dx = j - 9;
                const dy = i - 4;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > radius - 1.5 && distance < radius + 1.5) {
                    output += this.getRandomSymbol();
                } else {
                    output += ' ';
                }
            }
            output += '\n';
        }
        
        return output;
    }
    
    animateSpinner() {
        this.symbolAnimation.textContent = this.createSpinner();
        this.rotation += 0.3;
    }
    
    startSpinner() {
        this.spinnerInterval = setInterval(() => {
            this.animateSpinner();
        }, 50);
        
        setTimeout(() => {
            this.showHello();
        }, 3000);
    }
    
    showHello() {
        clearInterval(this.spinnerInterval);
        this.symbolAnimation.style.opacity = '0';
        
        setTimeout(() => {
            this.symbolAnimation.style.display = 'none';
            this.loadingText.style.display = 'block';
            
            const text = 'Hello!';
            this.helloChars = text.split('');
            this.loadingText.classList.add('show');
            
            let iterations = 0;
            this.helloInterval = setInterval(() => {
                if (iterations < 20) {
                    let displayText = '';
                    for (let i = 0; i < this.helloChars.length; i++) {
                        if (Math.random() > 0.3) {
                            displayText += this.getRandomSymbol();
                        } else {
                            displayText += this.helloChars[i];
                        }
                    }
                    this.loadingText.textContent = displayText;
                    iterations++;
                } else if (iterations < 30) {
                    let displayText = '';
                    for (let i = 0; i < this.helloChars.length; i++) {
                        if (Math.random() > 0.7) {
                            displayText += this.getRandomSymbol();
                        } else {
                            displayText += this.helloChars[i];
                        }
                    }
                    this.loadingText.textContent = displayText;
                    iterations++;
                } else {
                    this.loadingText.textContent = 'Hello!';
                    clearInterval(this.helloInterval);
                    setTimeout(() => this.hideLoading(), 1000);
                }
            }, 60);
        }, 400);
    }
    
    hideLoading() {
        this.loadingScreen.classList.add('fade-out');
        setTimeout(() => {
            this.loadingScreen.classList.remove('active');
            this.loadingScreen.style.display = 'none';
            if (window.secureCallInstance) {
                window.secureCallInstance.animateWelcomeScreen();
            }
        }, 800);
    }
    
    start() {
        this.startSpinner();
    }
}

class SecureCall {
    constructor() {
        this.peer = null;
        this.currentCall = null;
        this.localStream = null;
        this.remoteStream = null;
        this.roomId = null;
        
        this.videoEnabled = true;
        this.audioEnabled = true;
        
        this.initializeElements();
        this.attachEventListeners();
    }
    
    animateWelcomeScreen() {
        const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '=', '+', '/', '\\', '|', '~', '`', '<', '>', '?'];
        
        const logo = document.querySelector('.logo h1');
        const originalText = logo.textContent;
        const chars = originalText.split('');
        
        let iterations = 0;
        const interval = setInterval(() => {
            if (iterations < 15) {
                logo.textContent = chars.map((char, index) => {
                    if (char === ' ') return ' ';
                    if (Math.random() > 0.5) {
                        return symbols[Math.floor(Math.random() * symbols.length)];
                    }
                    return char;
                }).join('');
                iterations++;
            } else if (iterations < 25) {
                logo.textContent = chars.map((char, index) => {
                    if (char === ' ') return ' ';
                    if (Math.random() > 0.8) {
                        return symbols[Math.floor(Math.random() * symbols.length)];
                    }
                    return char;
                }).join('');
                iterations++;
            } else {
                logo.textContent = originalText;
                clearInterval(interval);
            }
        }, 40);
        
        setTimeout(() => {
            this.animateInputPlaceholder();
        }, 300);
        
        setTimeout(() => {
            const joinBtn = document.getElementById('joinBtn');
            if (joinBtn) {
                joinBtn.style.opacity = '0';
                setTimeout(() => {
                    joinBtn.style.transition = 'opacity 0.5s ease';
                    joinBtn.style.opacity = '1';
                }, 100);
            }
        }, 400);
        
        setTimeout(() => {
            this.animateButton(document.getElementById('createRoomBtn'));
        }, 600);
    }
    
    animateInputPlaceholder() {
        const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '=', '+'];
        const input = document.getElementById('roomInput');
        const originalText = input.placeholder;
        const chars = originalText.split('');
        
        let iterations = 0;
        const interval = setInterval(() => {
            if (iterations < 12) {
                input.placeholder = chars.map(char => {
                    if (char === ' ') return ' ';
                    if (Math.random() > 0.6) {
                        return symbols[Math.floor(Math.random() * symbols.length)];
                    }
                    return char;
                }).join('');
                iterations++;
            } else {
                input.placeholder = originalText;
                clearInterval(interval);
            }
        }, 50);
    }
    
    animateButton(button) {
        const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '=', '+'];
        const textElement = button.querySelector('span') || button;
        const originalText = textElement.textContent;
        const chars = originalText.split('');
        
        let iterations = 0;
        const interval = setInterval(() => {
            if (iterations < 10) {
                textElement.textContent = chars.map(char => {
                    if (char === ' ') return ' ';
                    if (Math.random() > 0.6) {
                        return symbols[Math.floor(Math.random() * symbols.length)];
                    }
                    return char;
                }).join('');
                iterations++;
            } else {
                textElement.textContent = originalText;
                clearInterval(interval);
            }
        }, 50);
    }
    
    initializeElements() {
        this.welcomeScreen = document.getElementById('welcomeScreen');
        this.callScreen = document.getElementById('callScreen');
        
        this.localVideo = document.getElementById('localVideo');
        this.remoteVideo = document.getElementById('remoteVideo');
        
        this.roomInput = document.getElementById('roomInput');
        this.joinBtn = document.getElementById('joinBtn');
        this.createRoomBtn = document.getElementById('createRoomBtn');
        this.toggleVideoBtn = document.getElementById('toggleVideoBtn');
        this.toggleAudioBtn = document.getElementById('toggleAudioBtn');
        this.shareScreenBtn = document.getElementById('shareScreenBtn');
        this.hangupBtn = document.getElementById('hangupBtn');
        this.copyLinkBtn = document.getElementById('copyLinkBtn');
        
        this.currentRoom = document.getElementById('currentRoom');
        this.connectionStatus = document.getElementById('connectionStatus');
        this.notification = document.getElementById('notification');
    }
    
    attachEventListeners() {
        this.joinBtn.addEventListener('click', () => this.joinRoom());
        this.createRoomBtn.addEventListener('click', () => this.createRoom());
        this.roomInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.joinRoom();
        });
        
        this.toggleVideoBtn.addEventListener('click', () => this.toggleVideo());
        this.toggleAudioBtn.addEventListener('click', () => this.toggleAudio());
        this.shareScreenBtn.addEventListener('click', () => this.shareScreen());
        this.hangupBtn.addEventListener('click', () => this.hangup());
        this.copyLinkBtn.addEventListener('click', () => this.copyRoomLink());
        
        const infoBtn = document.getElementById('infoBtn');
        const infoModal = document.getElementById('infoModal');
        const closeModal = document.getElementById('closeModal');
        
        if (infoBtn && infoModal && closeModal) {
            infoBtn.addEventListener('click', () => {
                infoModal.classList.add('show');
            });
            
            closeModal.addEventListener('click', () => {
                infoModal.classList.remove('show');
            });
            
            infoModal.addEventListener('click', (e) => {
                if (e.target === infoModal) {
                    infoModal.classList.remove('show');
                }
            });
        }
        
        document.addEventListener('contextmenu', e => e.preventDefault());
    }
    
    generateRoomId() {
        return Math.random().toString(36).substring(2, 10).toUpperCase();
    }
    
    async createRoom() {
        const roomId = this.generateRoomId();
        this.roomId = roomId;
        this.currentRoom.textContent = roomId;
        
        try {
            await this.initializeMedia();
            await this.initializePeer(roomId);
            this.switchScreen('call');
            this.updateConnectionStatus('Ожидание собеседника...');
            this.showNotification('Комната создана! Поделитесь ссылкой');
        } catch (error) {
            console.error('Error creating room:', error);
            this.showNotification('Ошибка доступа к камере/микрофону', 'error');
        }
    }
    
    async joinRoom() {
        const roomId = this.roomInput.value.trim();
        
        if (!roomId) {
            this.showNotification('Пожалуйста, введите код комнаты', 'error');
            return;
        }
        
        this.roomId = roomId;
        this.currentRoom.textContent = roomId;
        
        try {
            await this.initializeMedia();
            await this.initializePeer();
            this.connectToPeer(roomId);
            this.switchScreen('call');
            this.updateConnectionStatus('Подключение...');
        } catch (error) {
            console.error('Error joining room:', error);
            this.showNotification('Ошибка доступа к камере/микрофону', 'error');
        }
    }
    
    async initializeMedia() {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                    facingMode: 'user'
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true
                }
            });
            
            this.localVideo.srcObject = this.localStream;
        } catch (error) {
            console.error('Error accessing media devices:', error);
            throw error;
        }
    }
    
    async initializePeer(peerId = null) {
        return new Promise((resolve, reject) => {
            const config = peerId ? { id: peerId } : {};
            
            this.peer = new Peer(config, {
                host: '0.peerjs.com',
                port: 443,
                path: '/',
                secure: true,
                config: {
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' }
                    ]
                }
            });
            
            this.peer.on('open', (id) => {
                console.log('Peer ID:', id);
                resolve(id);
            });
            
            this.peer.on('call', (call) => {
                this.updateConnectionStatus('Входящий звонок...');
                call.answer(this.localStream);
                this.currentCall = call;
                
                call.on('stream', (remoteStream) => {
                    this.remoteVideo.srcObject = remoteStream;
                    this.remoteStream = remoteStream;
                    this.updateConnectionStatus('Подключено', true);
                });
                
                call.on('close', () => {
                    this.handlePeerLeft();
                });
            });
            
            this.peer.on('error', (error) => {
                console.error('Peer error:', error);
                this.showNotification('Ошибка соединения', 'error');
                reject(error);
            });
            
            this.peer.on('disconnected', () => {
                this.updateConnectionStatus('Отключено');
            });
        });
    }
    
    connectToPeer(peerId) {
        if (!this.peer) {
            this.showNotification('Ошибка инициализации', 'error');
            return;
        }
        
        this.updateConnectionStatus('Звоним...');
        
        const call = this.peer.call(peerId, this.localStream);
        this.currentCall = call;
        
        call.on('stream', (remoteStream) => {
            this.remoteVideo.srcObject = remoteStream;
            this.remoteStream = remoteStream;
            this.updateConnectionStatus('Подключено', true);
        });
        
        call.on('close', () => {
            this.handlePeerLeft();
        });
    }
    
    handlePeerLeft() {
        this.updateConnectionStatus('Собеседник отключился');
        this.showNotification('Собеседник покинул звонок');
        
        if (this.remoteVideo.srcObject) {
            this.remoteVideo.srcObject.getTracks().forEach(track => track.stop());
            this.remoteVideo.srcObject = null;
        }
    }
    
    toggleVideo() {
        if (this.localStream) {
            this.videoEnabled = !this.videoEnabled;
            this.localStream.getVideoTracks().forEach(track => {
                track.enabled = this.videoEnabled;
            });
            this.toggleVideoBtn.classList.toggle('disabled', !this.videoEnabled);
        }
    }
    
    toggleAudio() {
        if (this.localStream) {
            this.audioEnabled = !this.audioEnabled;
            this.localStream.getAudioTracks().forEach(track => {
                track.enabled = this.audioEnabled;
            });
            this.toggleAudioBtn.classList.toggle('disabled', !this.audioEnabled);
        }
    }
    
    async shareScreen() {
        try {
            const screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: { cursor: 'always' },
                audio: false
            });
            
            const screenTrack = screenStream.getVideoTracks()[0];
            
            if (this.currentCall && this.currentCall.peerConnection) {
                const sender = this.currentCall.peerConnection.getSenders().find(s => 
                    s.track && s.track.kind === 'video'
                );
                
                if (sender) {
                    sender.replaceTrack(screenTrack);
                }
            }
            
            this.localVideo.srcObject = screenStream;
            this.shareScreenBtn.classList.add('active');
            
            screenTrack.onended = () => {
                this.stopScreenShare();
            };
            
            this.showNotification('Демонстрация экрана началась');
        } catch (error) {
            console.error('Error sharing screen:', error);
            this.showNotification('Ошибка демонстрации экрана', 'error');
        }
    }
    
    stopScreenShare() {
        if (this.localStream) {
            const videoTrack = this.localStream.getVideoTracks()[0];
            
            if (this.currentCall && this.currentCall.peerConnection) {
                const sender = this.currentCall.peerConnection.getSenders().find(s => 
                    s.track && s.track.kind === 'video'
                );
                
                if (sender && videoTrack) {
                    sender.replaceTrack(videoTrack);
                }
            }
            
            this.localVideo.srcObject = this.localStream;
            this.shareScreenBtn.classList.remove('active');
            this.showNotification('Демонстрация экрана завершена');
        }
    }
    
    async copyRoomLink() {
        try {
            const roomLink = `${window.location.origin}?room=${this.roomId}`;
            await navigator.clipboard.writeText(roomLink);
            this.showNotification('Ссылка скопирована в буфер обмена');
        } catch (error) {
            console.error('Error copying room link:', error);
            this.showNotification('Ошибка копирования', 'error');
        }
    }
    
    hangup() {
        if (this.currentCall) {
            this.currentCall.close();
            this.currentCall = null;
        }
        
        if (this.peer) {
            this.peer.destroy();
            this.peer = null;
        }
        
        if (this.localStream) {
            this.localStream.getTracks().forEach(track => track.stop());
            this.localStream = null;
        }
        
        if (this.remoteVideo.srcObject) {
            this.remoteVideo.srcObject.getTracks().forEach(track => track.stop());
            this.remoteVideo.srcObject = null;
        }
        
        this.localVideo.srcObject = null;
        this.remoteVideo.srcObject = null;
        this.roomInput.value = '';
        this.switchScreen('welcome');
        this.showNotification('Звонок завершен');
    }
    
    switchScreen(screen) {
        this.welcomeScreen.classList.remove('active');
        this.callScreen.classList.remove('active');
        
        if (screen === 'welcome') {
            this.welcomeScreen.classList.add('active');
        } else if (screen === 'call') {
            this.callScreen.classList.add('active');
        }
    }
    
    updateConnectionStatus(text, connected = false) {
        this.connectionStatus.textContent = text;
        const indicator = document.querySelector('.status-indicator');
        if (connected) {
            indicator.classList.add('connected');
        } else {
            indicator.classList.remove('connected');
        }
    }
    
    showNotification(message, type = 'info') {
        this.notification.textContent = message;
        this.notification.classList.add('show');
        
        setTimeout(() => {
            this.notification.classList.remove('show');
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loading = new LoadingAnimation();
    loading.start();
    
    setTimeout(() => {
        window.secureCallInstance = new SecureCall();
        
        const urlParams = new URLSearchParams(window.location.search);
        const roomId = urlParams.get('room');
        if (roomId) {
            window.secureCallInstance.roomInput.value = roomId;
            setTimeout(() => {
                window.secureCallInstance.joinRoom();
            }, 2000);
        }
    }, 100);
});

