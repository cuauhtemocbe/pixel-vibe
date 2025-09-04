import Phaser from "phaser";
import Boot from "@scenes/Boot";
import Play from "@scenes/Play";

const GAME_WIDTH = 320;
const GAME_HEIGHT = 180;

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#0d0d0d",
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  pixelArt: true,
  roundPixels: true,
  physics: {
    default: "arcade",
    arcade: { gravity: { x: 0, y: 800 }, debug: false }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: [Boot, Play]
};

new Phaser.Game(config);

// Fullscreen functionality
function setupFullscreenButton() {
  const fullscreenBtn = document.getElementById('fullscreen-btn');
  
  if (!fullscreenBtn) return;

  fullscreenBtn.addEventListener('click', () => {
    const gameContainer = document.getElementById('game');
    
    if (!gameContainer) return;

    if (!document.fullscreenElement) {
      // Enter fullscreen
      gameContainer.requestFullscreen().catch(err => {
        console.warn('Error attempting to enable fullscreen:', err);
      });
    } else {
      // Exit fullscreen
      document.exitFullscreen().catch(err => {
        console.warn('Error attempting to exit fullscreen:', err);
      });
    }
  });

  // Handle fullscreen change events
  document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
      fullscreenBtn.textContent = '⛶ EXIT FULLSCREEN';
      fullscreenBtn.title = 'Salir de pantalla completa';
    } else {
      fullscreenBtn.textContent = '⛶ FULLSCREEN';
      fullscreenBtn.title = 'Entrar a pantalla completa';
    }
  });

  // Handle fullscreen error
  document.addEventListener('fullscreenerror', () => {
    console.error('Failed to enter fullscreen mode');
  });
}

// Initialize fullscreen button when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupFullscreenButton);
} else {
  setupFullscreenButton();
}
