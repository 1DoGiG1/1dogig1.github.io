const frame = document.getElementById('frame');
const slider = document.getElementById('slider');
const playButton = document.getElementById('play-button');

let isPlaying = false; // Флаг для отслеживания состояния воспроизведения
let animationInterval; // Переменная для хранения интервала анимации
const totalFrames = parseInt(slider.max); // Всего кадров (из значения ползунка)
const preloadImages = []; // Массив для хранения предзагруженных изображений

// Предзагрузка всех кадров
const preloadAllFrames = () => {
    for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.src = `/static/images/current_frame_${i}.png`;
        preloadImages.push(img);
    }
};

// Обновление кадра через предзагруженные изображения
const updateFrame = (frameNumber) => {
    frame.src = preloadImages[frameNumber - 2].src; // Используем предзагруженное изображение
    slider.value = frameNumber; // Синхронизируем ползунок
};

// Функция для автоматического воспроизведения анимации
const playAnimation = () => {
    let currentFrame = parseInt(slider.value); // Начинаем с текущего значения ползунка

    animationInterval = setInterval(() => {
        currentFrame = currentFrame < totalFrames ? currentFrame + 1 : 1; // Циклически переключаем кадры
        updateFrame(currentFrame);
    }, 10); // Интервал между кадрами (30 мс = ~33 кадра в секунду)
};

// Функция для остановки анимации
const stopAnimation = () => {
    clearInterval(animationInterval); // Останавливаем интервал
};

// Обработчик для кнопки воспроизведения/паузы
playButton.addEventListener('click', () => {
    if (isPlaying) {
        stopAnimation();
        playButton.textContent = 'Play'; // Изменяем текст кнопки
    } else {
        playAnimation();
        playButton.textContent = 'Pause'; // Изменяем текст кнопки
    }
    isPlaying = !isPlaying; // Переключаем состояние
});

// Обработчик для изменения ползунка вручную
slider.addEventListener('input', () => {
    stopAnimation(); // Останавливаем анимацию, если пользователь двигает ползунок
    isPlaying = false;
    playButton.textContent = 'Play'; // Меняем кнопку на "Play"
    updateFrame(slider.value); // Обновляем кадр
});

// Предзагрузка кадров при загрузке страницы
preloadAllFrames();