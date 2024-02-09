
export const gameImages = [
    {
        id: 0,
        src: require('../../assets/images/shaurma.png'),
        fresh: true,
    }, 
    {
        id: 1,
        src: require('../../assets/images/pizza.webp'),
        fresh: true,
    }, 
    {
        id: 2,
        src: require('../../assets/images/graten.webp'),
        fresh: true,
    }, 
    {
        id: 3,
        src: require('../../assets/images/stinky-shaurma.webp'),
        fresh: false,
    }, 
    {
        id: 4,
        src: require('../../assets/images/stinky-graten.webp'),
        fresh: false,
    }, 
    {
        id: 5,
        src: require('../../assets/images/stinky-pizza.webp'),
        fresh: false,
    }, 
];

export const images = {
    gameBackground: require('../../assets/images/game-background.jpg'),
    diarrheaBackground: require('../../assets/images/diarrhea-background.jpg'),
    homeBackground: require('../../assets/images/home-background.jpg'),
    logo: require('../../assets/images/bufet_logo.png'),
    slow: require('../../assets/images/slow.png'),
    middle: require('../../assets/images/middle.png'),
    fast: require('../../assets/images/fast.png'),
};

export const sounds = {
    diarrea: require('../../assets/sounds/diarrea.mp3'),
    eating: require('../../assets/sounds/eating-sound.mp3'),
    slow: require('../../assets/sounds/game-music/slow.mp3'),
    middle: require('../../assets/sounds/game-music/middle.mp3'),
    fast: require('../../assets/sounds/game-music/fast.mp3'),
};

export const videos = {
    slow: require("../../assets/video/slow.mp4"),
    middle: require("../../assets/video/middle.mp4"),
    fast: require("../../assets/video/fast.mp4"),
    authBackground: require("../../assets/video/auth-background-video.mp4"),
    authBackground2: require("../../assets/video/auth-background-second.mp4"),
};

export const videoSpeed = {
    slow: { initialSpeed: 1, step: 1.5 },
    middle: { initialSpeed: 1, step: 1 },
    fast: { initialSpeed: 1, step: 1 },
};

export const spawnTimeout = {
    slow: { min: 1000, max: 2000, step: 0.1 },
    middle: { min: 100, max: 2000, step: 0.2 },
    fast: { min: 100, max: 1000, step: 0.3 },
};