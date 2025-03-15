// App data for both home screen and drawer
const homeScreenApps = [
    { id: 'clock', name: 'Clock', icon: 'fas fa-clock' },
    { id: 'calendar', name: 'Calendar', icon: 'fas fa-calendar-alt' },
    { id: 'cosmicDash', name: 'Cosmic Dash', icon: 'fas fa-rocket' },
    { id: 'pacman', name: 'Pacman', icon: 'fas fa-ghost' },
    { id: 'xrayOrb', name: 'X-Ray Orb', icon: 'fas fa-atom' },
    { id: 'settings', name: 'Settings', icon: 'fas fa-cog' },
    { id: 'support', name: 'App Store', icon: 'fas fa-heart' }
];

// Apps that appear only in the drawer, not on the home screen
const drawerOnlyApps = [
    { id: 'tictactoe', name: 'Tic Tac Toe', icon: 'fas fa-th' },
    { id: 'tetris', name: 'Tetris', icon: 'fas fa-layer-group' },
    { id: 'sokoban', name: 'Sokoban', icon: 'fas fa-box' }
];

// Combined apps for use in functions that need all apps
const allApps = [...homeScreenApps, ...drawerOnlyApps];

// File paths for apps
const appPaths = {
    cosmicDash: '/games/cosmicdash/index.html',
    pacman: '/games/pacman/index.html',
    xrayOrb: '/games/x-ray-orb/index.html',
    clock: '/apps/clock/clock.html',
    calendar: '/apps/calendar/index.html',
    support: '/comingsoon.html',
    tictactoe: '/games/tictactoe/index.html',
    tetris: '/games/tetris/index.html',
    sokoban: '/games/sokoban/index.html'
};

// DOM Elements
const appGrid = document.querySelector('.app-grid');
const drawerApps = document.querySelector('.drawer-apps');
const appDrawer = document.querySelector('.app-drawer');
const appDrawerToggle = document.getElementById('app-drawer-toggle');
const drawerHandle = document.getElementById('drawer-handle');
const appOpenAnimation = document.querySelector('.app-open-animation');
const appContent = document.querySelector('.app-content');
const appTitle = document.querySelector('.app-title');
const appBackBtn = document.querySelector('.app-back-btn');
const statusTime = document.querySelector('.time');
const fullscreenToggle = document.querySelector('.fullscreen-toggle');
const homeButton = document.querySelector('.home-button');
const searchInput = document.querySelector('.drawer-search-input');

// Load saved settings
let settings = loadSettings();

// Apply settings
applySettings();

// Initialize app grid
initializeAppGrid();

// Initialize app drawer
initializeAppDrawer();

// Update time in status bar
updateTime();
setInterval(updateTime, 1000);

// Event Listeners
appDrawerToggle.addEventListener('click', toggleAppDrawer);
drawerHandle.addEventListener('click', closeAppDrawer);
appBackBtn.addEventListener('click', closeApp);
fullscreenToggle.addEventListener('click', toggleFullscreen);
homeButton.addEventListener('click', goHome);
searchInput.addEventListener('input', filterApps);

// Prevent accidental back navigation
window.addEventListener('popstate', (e) => {
    e.preventDefault();
    history.pushState(null, document.title, window.location.href);
    return false;
});

history.pushState(null, document.title, window.location.href);

// Function for appgrid
function initializeAppGrid() {
    // Clear grid
    appGrid.innerHTML = '';

    // Add apps to grid
    const gridSize = parseInt(settings.gridSize);
    const totalCells = gridSize * gridSize;
    const visibleApps = homeScreenApps.slice(0, totalCells);

    visibleApps.forEach(app => {
        const appElement = createAppIcon(app);
        appGrid.appendChild(appElement);
    });
}

// Function for appdrawer
function initializeAppDrawer() {
    // Clear drawer
    drawerApps.innerHTML = '';

    // Add all apps to drawer
    allApps.forEach(app => {
        const appElement = createAppIcon(app);
        drawerApps.appendChild(appElement);
    });
}

function createAppIcon(app) {
    const appElement = document.createElement('div');
    appElement.className = 'app-icon';
    appElement.setAttribute('data-app', app.id);

    appElement.innerHTML = `
        <div class="app-icon-img">
            <i class="${app.icon}"></i>
        </div>
        <div class="app-icon-label">${app.name}</div>
    `;

    appElement.addEventListener('click', () => {
        openApp(app);
    });

    return appElement;
}

function toggleAppDrawer() {
    appDrawer.classList.toggle('open');
}

function closeAppDrawer() {
    appDrawer.classList.remove('open');
}

function goHome() {
    // Close app drawer if open
    closeAppDrawer();

    // Close any open app
    if (appOpenAnimation.style.display === 'flex') {
        closeApp();
    }
}

function openApp(app) {
    // Close drawer if open
    appDrawer.classList.remove('open');

    // Set app title
    appTitle.textContent = app.name;

    // Clear app content
    appContent.innerHTML = '';

    // Load app content based on ID
    switch (app.id) {
        case 'clock':
            loadLocalApp(appPaths.clock);
            break;
        case 'calendar':
            loadLocalApp(appPaths.calendar);
            break;
        case 'cosmicDash':
            loadLocalApp(appPaths.cosmicDash);
            break;
        case 'pacman':
            loadLocalApp(appPaths.pacman);
            break;
        case 'xrayOrb':
            loadLocalApp(appPaths.xrayOrb);
            break;
        case 'settings':
            loadSettingsApp();
            break;
        case 'tictactoe':
            loadLocalApp(appPaths.tictactoe);
            break;
        case 'tetris':
            loadLocalApp(appPaths.tetris);
            break;
        case 'sokoban':
            loadLocalApp(appPaths.sokoban);
            break;
        case 'support':
            loadLocalApp(appPaths.support);
            break;
        default:
            appContent.innerHTML = `<div style="padding: 20px;">App content for ${app.name} goes here.</div>`;
    }

    // Show app animation
    appOpenAnimation.style.display = 'flex';
}

function closeApp() {
    appOpenAnimation.style.animation = 'appClose 0.3s forwards';

    setTimeout(() => {
        appOpenAnimation.style.display = 'none';
        appOpenAnimation.style.animation = 'appOpen 0.3s forwards';
        appContent.innerHTML = '';
    }, 300);
}

// New function to load app from local file
function loadLocalApp(filePath) {
    const iframe = document.createElement('iframe');
    iframe.className = 'game-frame';
    iframe.src = filePath;

    appContent.appendChild(iframe);
}

function loadSettingsApp() {
    const settingsContent = document.createElement('div');
    settingsContent.className = 'settings-screen';

    settingsContent.innerHTML = `
        <div class="settings-section">
            <div class="settings-section-title">Display</div>
            <div class="settings-option">
                <div class="settings-option-title">Wallpaper</div>
                <div class="settings-option-content">
                    <div class="wallpaper-preview ${settings.wallpaper === 'wallpaper1.jpeg' ? 'active' : ''}" data-wallpaper="wallpaper1.jpeg" style="background-image: url('wallpaper1.jpeg')"></div>
                    <div class="wallpaper-preview ${settings.wallpaper === 'wallpaper2.jpeg' ? 'active' : ''}" data-wallpaper="wallpaper2.jpeg" style="background-image: url('wallpaper2.jpeg')"></div>
                            <div class="wallpaper-preview ${settings.wallpaper === 'wallpaper3.jpeg' ? 'active' : ''}" data-wallpaper="wallpaper3.jpeg" style="background-image: url('wallpaper3.jpeg')"></div>
                            <div class="wallpaper-preview ${settings.wallpaper === 'wallpaper4.jpeg' ? 'active' : ''}" data-wallpaper="wallpaper4.jpeg" style="background-image: url('wallpaper4.jpeg')"></div>
                            <div class="wallpaper-preview ${settings.wallpaper === 'wallpaper5.jpeg' ? 'active' : ''}" data-wallpaper="wallpaper5.jpeg" style="background-image: url('wallpaper5.jpeg')"></div>
                            <div class="wallpaper-preview ${settings.wallpaper === 'wallpaper6.jpeg' ? 'active' : ''}" data-wallpaper="wallpaper6.jpeg" style="background-image: url('wallpaper6.jpeg')"></div>
                </div>
            </div>
            <div class="settings-option">
                <div class="settings-option-title">App Icon Size</div>
                <div class="settings-option-content">
                    <div class="slider-container">
                        <input type="range" class="slider" min="40" max="80" value="${settings.appSize}" id="app-size-slider">
                        <div class="slider-value">${settings.appSize}px</div>
                    </div>
                </div>
            </div>
            <div class="settings-option">
                <div class="settings-option-title">Font Size</div>
                <div class="settings-option-content">
                    <div class="slider-container">
                        <input type="range" class="slider" min="10" max="16" value="${settings.fontSize}" id="font-size-slider">
                        <div class="slider-value">${settings.fontSize}px</div>
                    </div>
                </div>
            </div>
            <div class="settings-option">
                <div class="settings-option-title">Grid Size</div>
                <div class="settings-option-content">
                    <div class="slider-container">
                        <input type="range" class="slider" min="3" max="6" value="${settings.gridSize}" id="grid-size-slider">
                        <div class="slider-value">${settings.gridSize}x${settings.gridSize}</div>
                    </div>
                </div>
            </div>
            <div class="settings-option">
                <div class="settings-option-title">Theme</div>
                <div class="settings-option-content">
                    <div class="theme-icon"><i class="fas fa-moon"></i></div>
                    <label class="theme-switch">
                        <input type="checkbox" id="theme-toggle" ${settings.theme === 'light' ? 'checked' : ''}>
                        <span class="slider-switch"></span>
                    </label>
                    <div class="theme-icon"><i class="fas fa-sun"></i></div>
                </div>
            </div>
        </div>
    `;

    appContent.appendChild(settingsContent);

    // Add event listeners for settings changes
    const wallpaperPreviews = settingsContent.querySelectorAll('.wallpaper-preview');
    wallpaperPreviews.forEach(preview => {
        preview.addEventListener('click', () => {
            wallpaperPreviews.forEach(p => p.classList.remove('active'));
            preview.classList.add('active');
            settings.wallpaper = preview.getAttribute('data-wallpaper');
            saveSettings();
            applySettings();
        });
    });

    const appSizeSlider = document.getElementById('app-size-slider');
    appSizeSlider.addEventListener('input', () => {
        const sliderValue = appSizeSlider.value;
        settings.appSize = sliderValue;
        appSizeSlider.nextElementSibling.textContent = `${sliderValue}px`;
        saveSettings();
        applySettings();
    });

    const fontSizeSlider = document.getElementById('font-size-slider');
    fontSizeSlider.addEventListener('input', () => {
        const sliderValue = fontSizeSlider.value;
        settings.fontSize = sliderValue;
        fontSizeSlider.nextElementSibling.textContent = `${sliderValue}px`;
        saveSettings();
        applySettings();
    });

    const gridSizeSlider = document.getElementById('grid-size-slider');
    gridSizeSlider.addEventListener('input', () => {
        const sliderValue = gridSizeSlider.value;
        settings.gridSize = sliderValue;
        gridSizeSlider.nextElementSibling.textContent = `${sliderValue}x${sliderValue}`;
        saveSettings();
        applySettings();
        initializeAppGrid();
    });

    // Add event listener for theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', () => {
        settings.theme = themeToggle.checked ? 'light' : 'dark';
        saveSettings();
        applySettings();
    });
}

function updateTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    statusTime.textContent = `${hours}:${minutes}`;
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
        fullscreenToggle.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
            fullscreenToggle.innerHTML = '<i class="fas fa-expand"></i>';
        }
    }
}

// Filtering Apps
function filterApps() {
    const query = searchInput.value.toLowerCase();
    const appIcons = drawerApps.querySelectorAll('.app-icon');

    appIcons.forEach(appIcon => {
        const appName = appIcon.querySelector('.app-icon-label').textContent.toLowerCase();
        if (appName.includes(query)) {
            appIcon.style.display = '';
        } else {
            appIcon.style.display = 'none';
        }
    });
}

function loadSettings() {
    const defaultSettings = {
        wallpaper: 'wallpaper1.jpeg',
        appSize: 60,
        fontSize: 12,
        gridSize: 5,
        theme: 'dark'
    };

    const savedSettings = localStorage.getItem('androidGamesHubSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
}

function saveSettings() {
    localStorage.setItem('androidGamesHubSettings', JSON.stringify(settings));
}

function applySettings() {
    // Apply existing settings
    document.documentElement.style.setProperty('--app-size', `${settings.appSize}px`);
    document.documentElement.style.setProperty('--font-size', `${settings.fontSize}px`);
    document.documentElement.style.setProperty('--grid-size', settings.gridSize);
    document.body.style.backgroundImage = `url('${settings.wallpaper}')`;

    // Apply theme setting
    if (settings.theme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
    } else {
        document.documentElement.removeAttribute('data-theme');
    }
}

// Set up dock icons
// Update the dock event listener setup
document.querySelectorAll('.dock-icon').forEach(dockIcon => {
    // Skip the app drawer toggle button
    if (dockIcon.id !== 'app-drawer-toggle') {
        dockIcon.addEventListener('click', () => {
            const appId = dockIcon.getAttribute('data-app');
            // Find the corresponding app object
            const app = allApps.find(app => app.id === appId);
            if (app) {
                openApp(app);
            }
        });
    }
});

// SEO and performance optimizations

// Lazy load app images
function lazyLoadAppImages() {
    // Create intersection observer
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const dataSrc = img.getAttribute('data-src');
                if (dataSrc) {
                    img.src = dataSrc;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    // Target all lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Implement page speed improvements
function optimizePageSpeed() {
    // Add loading state to apps
    appContent.innerHTML = '<div class="app-loading"></div>';

    // Preload wallpapers based on most frequently used
    const preloadWallpapers = ['wallpaper1.jpeg', 'wallpaper2.jpeg'];
    preloadWallpapers.forEach(wallpaper => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = wallpaper;
        document.head.appendChild(link);
    });
}

// Add structured data dynamically based on current game
function updateStructuredData(app) {
    if (!app) return;

    // Get existing structured data
    let scriptElement = document.querySelector('script[type="application/ld+json"]');

    // Create new structured data for the current app
    const gameData = {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": app.name,
        "applicationCategory": "Game",
        "operatingSystem": "Web",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
        },
        "description": `Play ${app.name} on GameDroid - the ultimate mobile gaming platform.`
    };

    // Update existing or create new
    if (scriptElement) {
        scriptElement.textContent = JSON.stringify(gameData);
    } else {
        scriptElement = document.createElement('script');
        scriptElement.type = 'application/ld+json';
        scriptElement.textContent = JSON.stringify(gameData);
        document.head.appendChild(scriptElement);
    }
}

// Track user engagement for SEO analytics
function trackEngagement() {
    // Only initialize if user has accepted analytics
    if (localStorage.getItem('analyticsConsent') === 'true') {
        document.querySelectorAll('.app-icon, .dock-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                const appName = icon.getAttribute('data-app');
                // This would normally send to your analytics service
                console.log(`User opened app: ${appName}`);

                // Update page title for better SEO when users bookmark specific games
                const app = allApps.find(a => a.id === appName);
                if (app) {
                    document.title = `${app.name} - GameDroid | Play Mobile Games`;
                }
            });
        });
    }
}

// Add custom sharing functionality
function enableSocialSharing() {
    // Create share button in app header
    const appHeader = document.querySelector('.app-header');
    const shareButton = document.createElement('div');
    shareButton.className = 'app-share-btn';
    shareButton.innerHTML = '<i class="fas fa-share-alt"></i>';
    appHeader.appendChild(shareButton);

    // Add share functionality
    shareButton.addEventListener('click', () => {
        const currentApp = appTitle.textContent;

        // Use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: `Play ${currentApp} on GameDroid`,
                text: `Check out ${currentApp} on GameDroid - the ultimate mobile gaming platform!`,
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const shareUrl = encodeURIComponent(window.location.href);
            const shareText = encodeURIComponent(`Check out ${currentApp} on GameDroid!`);

            const shareModal = document.createElement('div');
            shareModal.className = 'share-modal';
            shareModal.innerHTML = `
          <div class="share-card">
            <div class="share-card-content">
              <div class="share-card-title">Share ${currentApp}</div>
              <div class="share-links">
                <a href="https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
                <a href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
                <a href="https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
                <a href="mailto:?subject=Check out this game&body=${shareText}%20${decodeURIComponent(shareUrl)}"><i class="fas fa-envelope"></i></a>
              </div>
            </div>
          </div>
        `;

            document.body.appendChild(shareModal);

            // Close modal when clicking outside
            shareModal.addEventListener('click', (e) => {
                if (e.target === shareModal) {
                    document.body.removeChild(shareModal);
                }
            });
        }
    });
}

// Modify original openApp function to include SEO improvements
const originalOpenApp = openApp;
openApp = function (app) {
    // Call the original function
    originalOpenApp(app);

    // Add SEO enhancements
    updateStructuredData(app);

    // Update meta tags dynamically
    document.querySelector('meta[name="description"]').content =
        `Play ${app.name} on GameDroid - the ultimate mobile gaming platform featuring classic and modern games.`;

    // Update Open Graph tags
    document.querySelector('meta[property="og:title"]').content =
        `${app.name} - GameDroid Mobile Gaming`;
    document.querySelector('meta[property="og:description"]').content =
        `Play ${app.name} and other classic games on GameDroid's beautiful interface.`;

    // Update URL without page reload (for sharing specific games)
    const newUrl = `${window.location.origin}${window.location.pathname}?game=${app.id}`;
    history.pushState({ app: app.id }, app.name, newUrl);
};

// Initialize new features
document.addEventListener('DOMContentLoaded', function () {
    lazyLoadAppImages();
    optimizePageSpeed();
    trackEngagement();
    enableSocialSharing();

    // Check for specific game in URL and open it
    const urlParams = new URLSearchParams(window.location.search);
    const gameParam = urlParams.get('game');
    if (gameParam) {
        const gameToOpen = allApps.find(app => app.id === gameParam);
        if (gameToOpen) {
            setTimeout(() => openApp(gameToOpen), 500);
        }
    }
});