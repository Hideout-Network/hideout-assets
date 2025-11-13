// --- Toggle Feature: If panel exists, remove it and exit ---
if (document.getElementById('autoclicker-panel')) {
    document.getElementById('autoclicker-panel').remove();
    // Since we're not in a function, 'return' won't stop the script.
    // We'd need to wrap this in a condition, but for this structure,
    // we'll let it error or just remove the 'return'.
    // A better way would be to wrap the rest of the code in an else block.
    // Let's do that to ensure it works as requested.
} else {

    // --- 1. Create and Inject CSS Styles ---
    const style = document.createElement('style');
    style.textContent = `
    #autoclicker-panel {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(20px);
        -webkit-backdrop-filter: blur(20px);
        border: 1px solid rgba(229, 231, 235, 0.8);
        border-radius: 16px;
        width: 380px;
        overflow: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    #autoclicker-panel.hidden {
        opacity: 0;
        pointer-events: none;
        transform: translate(-50%, -50%) scale(0.9);
    }

    .ac-panel-header {
        background: rgba(0, 0, 0, 0.9);
        backdrop-filter: blur(20px);
        padding: 12px 16px;
        cursor: move;
        user-select: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px 16px 0 0;
    }

    .ac-panel-title {
        color: #ffffff;
        font-size: 13px;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 8px;
        letter-spacing: 0.5px;
    }

    .ac-panel-controls {
        display: flex;
        gap: 6px;
    }

    .ac-control-btn {
        width: 28px;
        height: 28px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        color: #ffffff;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 600;
    }

    .ac-control-btn:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
        transform: scale(1.05);
    }

    .ac-panel-body {
        padding: 20px;
        color: #000000;
        background: transparent;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
    }

    .ac-full-width {
        grid-column: 1 / -1;
    }

    .ac-status-indicator {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 14px;
        background: rgba(249, 250, 251, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(229, 231, 235, 0.6);
        border-radius: 12px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ac-status-indicator:hover {
        background: rgba(249, 250, 251, 1);
        border-color: rgba(229, 231, 235, 0.8);
    }

    .ac-status-text {
        font-size: 11px;
        font-weight: 700;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .ac-status-badge {
        padding: 4px 12px;
        font-size: 10px;
        font-weight: 700;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        letter-spacing: 0.5px;
        text-transform: uppercase;
        border-radius: 8px;
    }

    .ac-status-badge.active {
        background: #000000;
        color: #ffffff;
        box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    }

    .ac-status-badge.inactive {
        background: rgba(229, 231, 235, 0.8);
        color: #6b7280;
    }

    .ac-setting-group {
        display: flex;
        flex-direction: column;
    }

    .ac-setting-label {
        display: block;
        margin-bottom: 6px;
        font-size: 10px;
        color: #6b7280;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    .ac-input-group {
        display: flex;
        gap: 6px;
        align-items: center;
    }

    .ac-input-group input[type="number"],
    .ac-input-group select {
        flex: 1;
        padding: 8px 12px;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(229, 231, 235, 0.6);
        border-radius: 10px;
        color: #000000;
        font-size: 12px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        font-weight: 600;
    }

    .ac-input-group input[type="number"]:focus,
    .ac-input-group select:focus {
        outline: none;
        border-color: #000000;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
        transform: translateY(-1px);
    }

    .ac-input-group input[type="number"]:hover,
    .ac-input-group select:hover {
        border-color: #9ca3af;
        background: rgba(255, 255, 255, 1);
    }

    .ac-unit-label {
        color: #6b7280;
        font-size: 10px;
        font-weight: 700;
        min-width: 28px;
    }

    .ac-toggle-button {
        width: 100%;
        padding: 12px;
        background: #000000;
        border: 1px solid #000000;
        border-radius: 12px;
        color: #ffffff;
        font-size: 12px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .ac-toggle-button:hover {
        background: #1f2937;
        border-color: #1f2937;
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
    }

    .ac-toggle-button.active {
        background: #ffffff;
        color: #000000;
        border-color: #000000;
    }

    .ac-toggle-button.active:hover {
        background: #f9fafb;
        transform: translateY(-2px);
    }

    .ac-hotkey-info {
        padding: 10px 12px;
        background: rgba(249, 250, 251, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(229, 231, 235, 0.6);
        border-radius: 10px;
        font-size: 9px;
        color: #6b7280;
        line-height: 1.6;
        text-align: center;
    }

    .ac-hotkey-info strong {
        color: #000000;
        font-weight: 700;
    }

    .ac-checkbox-group {
        display: flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 8px 10px;
        background: rgba(249, 250, 251, 0.5);
        border: 1px solid rgba(229, 231, 235, 0.5);
        border-radius: 10px;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ac-checkbox-group:hover {
        background: rgba(249, 250, 251, 0.9);
        border-color: rgba(229, 231, 235, 0.8);
    }

    .ac-checkbox-group input[type="checkbox"] {
        width: 16px;
        height: 16px;
        cursor: pointer;
        accent-color: #000000;
        border-radius: 4px;
    }

    .ac-checkbox-label {
        font-size: 11px;
        color: #000000;
        cursor: pointer;
        font-weight: 600;
    }

    .ac-click-counter {
        text-align: center;
        padding: 14px;
        background: rgba(249, 250, 251, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(229, 231, 235, 0.6);
        border-radius: 12px;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .ac-click-counter:hover {
        background: rgba(249, 250, 251, 1);
        transform: translateY(-1px);
    }

    .ac-counter-label {
        font-size: 10px;
        color: #6b7280;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        font-weight: 700;
    }

    .ac-counter-value {
        font-size: 32px;
        font-weight: 900;
        color: #000000;
        margin-top: 4px;
        font-family: monospace;
    }

    .ac-secondary-btn {
        padding: 10px;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(229, 231, 235, 0.6);
        border-radius: 10px;
        color: #000000;
        font-size: 11px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        text-transform: uppercase;
        letter-spacing: 0.3px;
    }

    .ac-secondary-btn:hover {
        background: rgba(249, 250, 251, 1);
        border-color: #9ca3af;
        transform: translateY(-1px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .ac-secondary-btn.active {
        background: #000000;
        color: #ffffff;
        border-color: #000000;
    }

    @keyframes ac-pulse {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    .ac-clicking {
        animation: ac-pulse 0.3s ease-in-out;
    }

    .ac-visual-target {
        position: fixed;
        width: 24px;
        height: 24px;
        border: 2px solid #000000;
        background: rgba(0, 0, 0, 0.1);
        border-radius: 50%;
        pointer-events: none;
        z-index: 999998;
        transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
        display: none;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }

    .ac-visual-target.active {
        display: block;
    }

    .ac-visual-target::before,
    .ac-visual-target::after {
        content: '';
        position: absolute;
        background: #000000;
        border-radius: 2px;
    }

    .ac-visual-target::before {
        width: 2px;
        height: 100%;
        left: 50%;
        transform: translateX(-50%);
    }

    .ac-visual-target::after {
        height: 2px;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
    `;
    document.head.appendChild(style);

    // --- 2. Create and Inject HTML Panel ---
    const panel = document.createElement('div');
    panel.id = 'autoclicker-panel';
    panel.innerHTML = `
    <div class="ac-panel-header" id="ac-panel-header">
        <div class="ac-panel-title">
            <span>▶</span>
            <span>AUTOCLICKER</span>
        </div>
        <div class="ac-panel-controls">
            <button class="ac-control-btn" id="ac-hide-btn" title="Hide (Alt+H)">−</button>
        </div>
    </div>
    <div class="ac-panel-body">
        <div class="ac-status-indicator ac-full-width">
            <span class="ac-status-text">Status</span>
            <span class="ac-status-badge inactive" id="ac-status-badge">Stopped</span>
        </div>

        <div class="ac-setting-group">
            <label class="ac-setting-label">Interval</label>
            <div class="ac-input-group">
                <input type="number" id="ac-interval-input" value="100" min="1" max="10000">
                <span class="ac-unit-label">ms</span>
            </div>
        </div>

        <div class="ac-setting-group">
            <label class="ac-setting-label">CPS</label>
            <div class="ac-input-group">
                <input type="number" id="ac-cps-input" value="10" min="1" max="1000">
                <span class="ac-unit-label">cps</span>
            </div>
        </div>

        <div class="ac-setting-group">
            <label class="ac-setting-label">Button</label>
            <div class="ac-input-group">
                <select id="ac-mouse-button">
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                    <option value="middle">Middle</option>
                </select>
            </div>
        </div>

        <div class="ac-setting-group">
            <label class="ac-setting-label">Type</label>
            <div class="ac-input-group">
                <select id="ac-click-type">
                    <option value="single">Single</option>
                    <option value="double">Double</option>
                    <option value="triple">Triple</option>
                </select>
            </div>
        </div>

        <div class="ac-checkbox-group">
            <input type="checkbox" id="ac-repeat-enabled">
            <label class="ac-checkbox-label" for="ac-repeat-enabled">Repeat Limit</label>
        </div>

        <div class="ac-checkbox-group">
            <input type="checkbox" id="ac-random-interval">
            <label class="ac-checkbox-label" for="ac-random-interval">Random Interval</label>
        </div>

        <div class="ac-setting-group ac-full-width" id="ac-repeat-group" style="display:none">
            <label class="ac-setting-label">Repeat Count</label>
            <div class="ac-input-group">
                <input type="number" id="ac-repeat-count" value="100" min="1" max="100000">
                <span class="ac-unit-label">times</span>
            </div>
        </div>

        <div class="ac-setting-group ac-full-width" id="ac-random-group" style="display:none">
            <label class="ac-setting-label">Random Range</label>
            <div class="ac-input-group">
                <input type="number" id="ac-random-min" value="50" min="1" max="10000" style="flex:1">
                <span class="ac-unit-label">to</span>
                <input type="number" id="ac-random-max" value="150" min="1" max="10000" style="flex:1">
                <span class="ac-unit-label">ms</span>
            </div>
        </div>

        <div class="ac-click-counter ac-full-width">
            <div class="ac-counter-label">Total Clicks</div>
            <div class="ac-counter-value" id="ac-click-counter">0</div>
        </div>

        <button class="ac-secondary-btn" id="ac-reset-counter">Reset Counter</button>
        <button class="ac-secondary-btn" id="ac-toggle-visual">Visual Target</button>

        <button class="ac-toggle-button ac-full-width" id="ac-toggle-btn">Start (Alt+A)</button>

        <div class="ac-hotkey-info ac-full-width">
            <strong>Alt+A</strong> Toggle | <strong>Alt+H</strong> Hide | <strong>Alt+R</strong> Reset
        </div>
    </div>
    `;
    document.body.appendChild(panel);

    // --- 3. Create Visual Target Element ---
    const visualTarget = document.createElement('div');
    visualTarget.className = 'ac-visual-target';
    document.body.appendChild(visualTarget);

    // --- 4. Initialize State Variables ---
    let isAutoClicking = false;
    let autoClickInterval = null;
    let clickCount = 0;
    let currentRepeatCount = 0;
    let mouseButton = 'left';
    let clickType = 'single';
    let repeatEnabled = false;
    let repeatLimit = 100;
    let randomInterval = false;
    let randomMin = 50;
    let randomMax = 150;
    let showVisualTarget = false;
    let lastMouseX = window.innerWidth / 2;
    let lastMouseY = window.innerHeight / 2;

    // --- 5. Get DOM Element References ---
    const header = document.getElementById('ac-panel-header');
    const toggleBtn = document.getElementById('ac-toggle-btn');
    const hideBtn = document.getElementById('ac-hide-btn');
    const statusBadge = document.getElementById('ac-status-badge');
    const clickCounter = document.getElementById('ac-click-counter');
    const intervalInput = document.getElementById('ac-interval-input');
    const cpsInput = document.getElementById('ac-cps-input');
    const mouseButtonSelect = document.getElementById('ac-mouse-button');
    const clickTypeSelect = document.getElementById('ac-click-type');
    const repeatEnabledCheck = document.getElementById('ac-repeat-enabled');
    const repeatCountInput = document.getElementById('ac-repeat-count');
    const repeatGroup = document.getElementById('ac-repeat-group');
    const randomIntervalCheck = document.getElementById('ac-random-interval');
    const randomGroup = document.getElementById('ac-random-group');
    const randomMinInput = document.getElementById('ac-random-min');
    const randomMaxInput = document.getElementById('ac-random-max');
    const resetCounterBtn = document.getElementById('ac-reset-counter');
    const toggleVisualBtn = document.getElementById('ac-toggle-visual');

    // --- 6. Panel Dragging Logic ---
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        if (e.target === header || header.contains(e.target)) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            xOffset = currentX;
            yOffset = currentY;
            setTranslate(currentX, currentY, panel);
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate(calc(-50% + ${xPos}px), calc(-50% + ${yPos}px))`;
    }

    // --- 7. Mouse Position Tracking ---
    document.addEventListener('mousemove', (e) => {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        if (showVisualTarget) {
            visualTarget.style.left = (e.clientX - 12) + 'px';
            visualTarget.style.top = (e.clientY - 12) + 'px';
        }
    });

    // --- 8. UI Element Event Listeners ---
    intervalInput.addEventListener('input', (e) => {
        const interval = parseInt(e.target.value) || 100;
        const cps = Math.round(1000 / interval);
        cpsInput.value = cps;
        if (isAutoClicking && !randomInterval) {
            stopAutoClicker();
            startAutoClicker();
        }
    });

    cpsInput.addEventListener('input', (e) => {
        const cps = parseInt(e.target.value) || 10;
        const interval = Math.round(1000 / cps);
        intervalInput.value = interval;
        if (isAutoClicking && !randomInterval) {
            stopAutoClicker();
            startAutoClicker();
        }
    });

    mouseButtonSelect.addEventListener('change', (e) => {
        mouseButton = e.target.value;
    });

    clickTypeSelect.addEventListener('change', (e) => {
        clickType = e.target.value;
    });

    repeatEnabledCheck.addEventListener('change', (e) => {
        repeatEnabled = e.target.checked;
        repeatGroup.style.display = repeatEnabled ? 'block' : 'none';
    });

    repeatCountInput.addEventListener('change', (e) => {
        repeatLimit = parseInt(e.target.value) || 100;
    });

    randomIntervalCheck.addEventListener('change', (e) => {
        randomInterval = e.target.checked;
        randomGroup.style.display = randomInterval ? 'block' : 'none';
        if (isAutoClicking) {
            stopAutoClicker();
            startAutoClicker();
        }
    });

    randomMinInput.addEventListener('change', (e) => {
        randomMin = parseInt(e.target.value) || 50;
    });

    randomMaxInput.addEventListener('change', (e) => {
        randomMax = parseInt(e.target.value) || 150;
    });

    resetCounterBtn.addEventListener('click', () => {
        clickCount = 0;
        clickCounter.textContent = '0';
    });

    toggleVisualBtn.addEventListener('click', () => {
        showVisualTarget = !showVisualTarget;
        visualTarget.classList.toggle('active', showVisualTarget);
        toggleVisualBtn.classList.toggle('active', showVisualTarget);
    });

    // --- 9. Core Autoclicker Logic ---
    function performClick() {
        const x = lastMouseX;
        const y = lastMouseY;
        let target = document.elementFromPoint(x, y);
        if (!target) target = document.body;

        // Don't click the panel or the visual target
        if (target.closest('#autoclicker-panel') || target.closest('.ac-visual-target')) return;

        const button = mouseButton === 'left' ? 0 : mouseButton === 'right' ? 2 : 1;
        const eventType = mouseButton === 'left' ? 'click' : mouseButton === 'right' ? 'contextmenu' : 'auxclick';
        const clickTimes = clickType === 'single' ? 1 : clickType === 'double' ? 2 : 3;

        for (let i = 0; i < clickTimes; i++) {
            setTimeout(() => {
                const mousedownEvent = new MouseEvent('mousedown', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: x,
                    clientY: y,
                    button: button,
                    buttons: 1 << button
                });
                target.dispatchEvent(mousedownEvent);

                const mouseupEvent = new MouseEvent('mouseup', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: x,
                    clientY: y,
                    button: button,
                    buttons: 1 << button
                });
                target.dispatchEvent(mouseupEvent);

                const event = new MouseEvent(eventType, {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                    clientX: x,
                    clientY: y,
                    button: button,
                    buttons: 1 << button
                });
                target.dispatchEvent(event);
            }, i * 50); // Stagger multi-clicks slightly
        }

        clickCount++;
        currentRepeatCount++;
        clickCounter.textContent = clickCount;

        // Visual feedback for click
        clickCounter.classList.add('ac-clicking');
        setTimeout(() => clickCounter.classList.remove('ac-clicking'), 200);

        if (repeatEnabled && currentRepeatCount >= repeatLimit) {
            stopAutoClicker();
        }
    }

    function startAutoClicker() {
        if (autoClickInterval) return; // Already running
        currentRepeatCount = 0;

        if (randomInterval) {
            // Use recursive setTimeout for random intervals
            function randomClick() {
                if (!isAutoClicking) return;
                performClick();
                const interval = Math.floor(Math.random() * (randomMax - randomMin + 1)) + randomMin;
                autoClickInterval = setTimeout(randomClick, interval);
            }
            randomClick();
        } else {
            // Use setInterval for fixed intervals
            const interval = parseInt(intervalInput.value) || 100;
            autoClickInterval = setInterval(performClick, interval);
        }

        isAutoClicking = true;
        updateUI();
    }

    function stopAutoClicker() {
        if (autoClickInterval) {
            if (randomInterval) {
                clearTimeout(autoClickInterval);
            } else {
                clearInterval(autoClickInterval);
            }
            autoClickInterval = null;
        }
        isAutoClicking = false;
        updateUI();
    }

    function toggleAutoClicker() {
        if (isAutoClicking) {
            stopAutoClicker();
        } else {
            startAutoClicker();
        }
    }

    function updateUI() {
        if (isAutoClicking) {
            statusBadge.textContent = 'Running';
            statusBadge.classList.remove('inactive');
            statusBadge.classList.add('active');
            toggleBtn.textContent = 'Stop (Alt+A)';
            toggleBtn.classList.add('active');
        } else {
            statusBadge.textContent = 'Stopped';
            statusBadge.classList.remove('active');
            statusBadge.classList.add('inactive');
            toggleBtn.textContent = 'Start (Alt+A)';
            toggleBtn.classList.remove('active');
        }
    }

    // --- 10. Main Control and Hotkey Listeners ---
    toggleBtn.addEventListener('click', toggleAutoClicker);

    hideBtn.addEventListener('click', () => {
        panel.classList.toggle('hidden');
    });

    const keyHandler = (e) => {
        if (e.altKey && e.key.toLowerCase() === 'a') {
            e.preventDefault();
            toggleAutoClicker();
        }
        if (e.altKey && e.key.toLowerCase() === 'h') {
            e.preventDefault();
            panel.classList.toggle('hidden');
        }
        if (e.altKey && e.key.toLowerCase() === 'r') {
            e.preventDefault();
            clickCount = 0;
            clickCounter.textContent = '0';
        }
    };
    document.addEventListener('keydown', keyHandler);

    // --- 11. Cleanup ---
    window.addEventListener('beforeunload', () => {
        stopAutoClicker();
    });
}
