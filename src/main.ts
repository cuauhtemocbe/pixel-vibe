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
    if (!document.fullscreenElement) {
      // Enter fullscreen on document body to include all UI elements
      document.documentElement.requestFullscreen().catch(err => {
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

// Mobile controls functionality
function setupMobileControls() {
  const mobileButtons = document.querySelectorAll('#mobile-controls button');
  
  mobileButtons.forEach(button => {
    const keyCode = button.getAttribute('data-key');
    
    if (!keyCode) return;

    // Handle touch events for mobile
    button.addEventListener('touchstart', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatchMobileInput(keyCode, true);
      button.classList.add('active');
    }, { passive: false });

    button.addEventListener('touchend', (e) => {
      e.preventDefault();
      e.stopPropagation();
      dispatchMobileInput(keyCode, false);
      button.classList.remove('active');
    }, { passive: false });

    // Prevent touch events from triggering click events
    button.addEventListener('touchcancel', (e) => {
      e.preventDefault();
      dispatchMobileInput(keyCode, false);
      button.classList.remove('active');
    });

    // Handle mouse events for desktop testing
    button.addEventListener('mousedown', (e) => {
      e.preventDefault();
      dispatchMobileInput(keyCode, true);
      button.classList.add('active');
    });

    button.addEventListener('mouseup', (e) => {
      e.preventDefault();
      dispatchMobileInput(keyCode, false);
      button.classList.remove('active');
    });

    // Handle mouse leave to prevent stuck buttons
    button.addEventListener('mouseleave', (e) => {
      dispatchMobileInput(keyCode, false);
      button.classList.remove('active');
    });

    // Prevent context menu on long press
    button.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });
  });
}

// Dispatch custom mobile input events
function dispatchMobileInput(keyCode: string, pressed: boolean) {
  // Debug logging
  const debugEl = document.getElementById('debug');
  if (debugEl && debugEl.style.display === 'block') {
    debugEl.textContent = `Mobile Input: ${keyCode} ${pressed ? 'PRESSED' : 'RELEASED'} (${new Date().toLocaleTimeString()})`;
  }
  
  const event = new CustomEvent('mobileInput', {
    detail: {
      key: keyCode,
      pressed: pressed,
      action: pressed ? 'keydown' : 'keyup'
    }
  });
  window.dispatchEvent(event);
  
  // Also dispatch keyboard events for visual feedback
  if (pressed) {
    simulateKeyDown(keyCode);
  } else {
    simulateKeyUp(keyCode);
  }
}

// Simulate keyboard events for Phaser
function simulateKeyDown(keyCode: string) {
  const event = new KeyboardEvent('keydown', {
    code: keyCode,
    key: getKeyFromCode(keyCode),
    bubbles: true,
    cancelable: true
  });
  document.dispatchEvent(event);
}

function simulateKeyUp(keyCode: string) {
  const event = new KeyboardEvent('keyup', {
    code: keyCode,
    key: getKeyFromCode(keyCode),
    bubbles: true,
    cancelable: true
  });
  document.dispatchEvent(event);
}

// Convert key codes to key values
function getKeyFromCode(code: string): string {
  const keyMap: { [key: string]: string } = {
    'ArrowUp': 'ArrowUp',
    'ArrowDown': 'ArrowDown',
    'ArrowLeft': 'ArrowLeft',
    'ArrowRight': 'ArrowRight',
    'Space': ' '
  };
  return keyMap[code] || code;
}

// Initialize mobile controls when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupMobileControls);
} else {
  setupMobileControls();
}

// Visual feedback for keyboard input
function setupKeyboardVisualFeedback() {
  const buttonMap: { [key: string]: string } = {
    'ArrowLeft': 'btn-left',
    'ArrowRight': 'btn-right',
    'ArrowUp': 'btn-up',
    'ArrowDown': 'btn-down',
    ' ': 'jump-btn' // Space key
  };

  // Handle keyboard down events
  document.addEventListener('keydown', (e) => {
    const buttonId = buttonMap[e.key];
    if (buttonId) {
      const button = document.getElementById(buttonId);
      if (button) {
        button.classList.add('keyboard-active');
      }
    }
  });

  // Handle keyboard up events
  document.addEventListener('keyup', (e) => {
    const buttonId = buttonMap[e.key];
    if (buttonId) {
      const button = document.getElementById(buttonId);
      if (button) {
        button.classList.remove('keyboard-active');
      }
    }
  });
}

// Initialize keyboard visual feedback when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupKeyboardVisualFeedback);
} else {
  setupKeyboardVisualFeedback();
}

// Debug toggle functionality
function setupDebugToggle() {
  const debugToggle = document.getElementById('debug-toggle');
  const debugEl = document.getElementById('debug');
  let debugEnabled = false;
  
  if (debugToggle && debugEl) {
    debugToggle.addEventListener('click', () => {
      debugEnabled = !debugEnabled;
      if (debugEnabled) {
        debugEl.style.display = 'block';
        debugToggle.textContent = 'HIDE DEBUG';
        debugEl.textContent = 'Debug mode enabled - touch controls to see events';
      } else {
        debugEl.style.display = 'none';
        debugToggle.textContent = 'DEBUG';
      }
    });
  }
}

// Initialize debug toggle when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', setupDebugToggle);
} else {
  setupDebugToggle();
}
