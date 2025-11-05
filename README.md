![Singularity](https://img.shields.io/badge/Singularity-black?style=for-the-badge&labelColor=white&color=black)

- **Полная приватность** - P2P соединение без сохранения данных
- **Статический сайт** - только HTML, CSS, JS (без backend)
- **Анонимность** - без регистрации, cookies и логирования
- **Open Source** - прозрачный код без скрытых функций

![Structure](https://img.shields.io/badge/Structure-black?style=for-the-badge&labelColor=white&color=black)

```
sozvon/
├── index.html    # Главная страница
├── style.css     # Стили (Liquid Glass дизайн)
└── app.js        # Логика (WebRTC + PeerJS)
```

![HowItWork](https://img.shields.io/badge/HowItWork-black?style=for-the-badge&labelColor=white&color=black)

```
[Участник A] ←→ [PeerJS сервер] ←→ [Участник B]
                      ↓ (только координация)
[Участник A] ←─────────────────────→ [Участник B]
           (прямое P2P соединение с шифрованием)
```

![AboutPeerJS](https://img.shields.io/badge/AboutPeerJS-black?style=for-the-badge&labelColor=white&color=black)


**Что делает:**
- Помогает найти собеседника по ID
- Обменивается техническими данными (SDP, ICE candidates)
- Устанавливает P2P соединение

**Что НЕ делает:**
-  Не видит ваше видео
-  Не видит ваш аудио
-  Не сохраняет контент
-  Не логирует соединения

-  ![Garantuee](https://img.shields.io/badge/Garantuee-black?style=for-the-badge&labelColor=white&color=black)

-  
 **Нет логирования** - никакие данные не сохраняются
 **Нет аналитики** - нет Google Analytics, Яндекс.Метрики и т.д.
 **Нет cookies** - не используются вообще
 **Нет IP логов** - сервер не записывает IP адреса
 **Временные ID** - генерируются случайно каждый раз
 **End-to-end** - данные зашифрованы от устройства к устройству
