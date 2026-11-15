/**
 * PlayUp Floating "SHARE SITE" Side Tab & Modal Component
 * Crafted following Emil Kowalski's Design Engineering & Apple fluid interface principles:
 * - Theme: PlayUp site theme blue (#3b82f6, #60a5fa, dark glassmorphism)
 * - Motion: Custom punchy ease-out (cubic-bezier(0.16, 1, 0.3, 1)), snappy sub-250ms transitions
 * - Tactile feedback: scale(0.97) instant press response on :active
 * - Hardware acceleration: only transform and opacity animations
 * - Responsive & accessible: hover-guarded for touch, prefers-reduced-motion support, auto-hide on fullscreen
 */
(function () {
  'use strict';

  var SHARE_URL = 'https://playupp.pages.dev/';
  var SHARE_TITLE = 'PlayUp — Live Sports & TV Channels';
  var SHARE_TEXT = 'Watch live cricket, football, sports and TV channels in HD on PlayUp!';

  function getQrSrc() {
    var isSub = window.location.pathname.indexOf('/cricket/') !== -1;
    return isSub ? '../public/playup-qr.png' : './public/playup-qr.png';
  }

  var FALLBACK_QR = 'https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=' + encodeURIComponent(SHARE_URL) + '&color=2563eb';

  var CSS_TEXT = [
    '/* ═══ PLAYUP SHARE FLOATING SIDE TAB ═══ */',
    '.playup-share-tab {',
    '  position: fixed !important;',
    '  right: 0 !important;',
    '  top: 50% !important;',
    '  transform: translateY(-50%) !important;',
    '  z-index: 99990 !important;',
    '  display: flex !important;',
    '  flex-direction: column !important;',
    '  align-items: center !important;',
    '  justify-content: center !important;',
    '  gap: 8px !important;',
    '  padding: 12px 8px 12px 10px !important;',
    '  background: rgba(11, 14, 22, 0.88) !important;',
    '  backdrop-filter: blur(18px) saturate(160%) !important;',
    '  -webkit-backdrop-filter: blur(18px) saturate(160%) !important;',
    '  border: 1px solid rgba(59, 130, 246, 0.22) !important;',
    '  border-right: none !important;',
    '  border-radius: 11px 0 0 11px !important;',
    '  box-shadow: -4px 0 16px rgba(0, 0, 0, 0.45) !important;',
    '  cursor: pointer !important;',
    '  user-select: none !important;',
    '  -webkit-user-select: none !important;',
    '  -webkit-tap-highlight-color: transparent !important;',
    '  touch-action: manipulation !important;',
    '  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1),',
    '              background 180ms ease,',
    '              border-color 180ms ease,',
    '              box-shadow 200ms ease !important;',
    '}',
    '.playup-share-tab::before {',
    '  content: "";',
    '  position: absolute;',
    '  left: 0;',
    '  top: 50%;',
    '  transform: translateY(-50%) scaleY(1);',
    '  transform-origin: center left;',
    '  height: 36px;',
    '  width: 2.5px;',
    '  border-radius: 0 2px 2px 0;',
    '  background: linear-gradient(180deg, #60a5fa 0%, #3b82f6 100%);',
    '  box-shadow: none;',
    '  transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1), background 200ms ease !important;',
    '}',
    '@media (hover: hover) and (pointer: fine) {',
    '  .playup-share-tab:hover {',
    '    transform: translateY(-50%) translateX(-4px) !important;',
    '    background: rgba(15, 20, 32, 0.96) !important;',
    '    border-color: rgba(59, 130, 246, 0.4) !important;',
    '    box-shadow: -5px 0 18px rgba(0, 0, 0, 0.55) !important;',
    '  }',
    '  .playup-share-tab:hover::before {',
    '    transform: translateY(-50%) scaleY(1.36) !important;',
    '    background: linear-gradient(180deg, #93c5fd 0%, #3b82f6 100%) !important;',
    '  }',
    '  .playup-share-tab:hover .playup-share-tab-icon {',
    '    color: #60a5fa !important;',
    '    transform: scale(1.1);',
    '  }',
    '  .playup-share-tab:hover .playup-share-tab-text {',
    '    color: #ffffff !important;',
    '  }',
    '}',
    '.playup-share-tab:active {',
    '  transform: translateY(-50%) translateX(-1px) scale(0.96) !important;',
    '  transition-duration: 70ms !important;',
    '}',
    '.playup-share-tab-icon {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  width: 17px;',
    '  height: 17px;',
    '  color: #3b82f6;',
    '  transition: color 180ms ease, transform 180ms cubic-bezier(0.16, 1, 0.3, 1);',
    '}',
    '.playup-share-tab-text {',
    '  writing-mode: vertical-rl;',
    '  text-orientation: mixed;',
    '  font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;',
    '  font-size: 9.5px;',
    '  font-weight: 700;',
    '  letter-spacing: 1.6px;',
    '  text-transform: uppercase;',
    '  color: #f0f4ff;',
    '  white-space: nowrap;',
    '  transition: color 180ms ease;',
    '}',
    '',
    '/* Fullscreen auto-hide (never block video) */',
    ':fullscreen .playup-share-tab,',
    ':-webkit-full-screen .playup-share-tab,',
    '.is-fullscreen .playup-share-tab,',
    '.player-mobile-fs .playup-share-tab,',
    'body.is-fullscreen-active .playup-share-tab {',
    '  display: none !important;',
    '  opacity: 0 !important;',
    '  pointer-events: none !important;',
    '}',
    '',
    '/* ═══ MODAL OVERLAY (Apple Scrim & Material Blur) ═══ */',
    '.playup-share-overlay {',
    '  position: fixed !important;',
    '  inset: 0 !important;',
    '  z-index: 100000 !important;',
    '  background: rgba(4, 6, 11, 0.78) !important;',
    '  backdrop-filter: blur(20px) saturate(180%) !important;',
    '  -webkit-backdrop-filter: blur(20px) saturate(180%) !important;',
    '  display: flex !important;',
    '  align-items: center !important;',
    '  justify-content: center !important;',
    '  padding: max(16px, env(safe-area-inset-top)) max(16px, env(safe-area-inset-right)) max(16px, env(safe-area-inset-bottom)) max(16px, env(safe-area-inset-left)) !important;',
    '  opacity: 0 !important;',
    '  visibility: hidden !important;',
    '  pointer-events: none !important;',
    '  -webkit-tap-highlight-color: transparent !important;',
    '  transition: opacity 220ms cubic-bezier(0.16, 1, 0.3, 1), visibility 220ms ease !important;',
    '}',
    '.playup-share-overlay.is-open {',
    '  opacity: 1 !important;',
    '  visibility: visible !important;',
    '  pointer-events: auto !important;',
    '}',
    '',
    '/* ═══ MODAL CARD (Apple Translucent Material + Emil Spring Curve) ═══ */',
    '.playup-share-modal {',
    '  position: relative !important;',
    '  width: 100% !important;',
    '  max-width: 360px !important;',
    '  background: linear-gradient(165deg, rgba(16, 21, 33, 0.94) 0%, rgba(9, 12, 19, 0.98) 100%) !important;',
    '  border: 1px solid rgba(59, 130, 246, 0.22) !important;',
    '  border-top: 1px solid rgba(255, 255, 255, 0.16) !important;',
    '  border-radius: 22px !important;',
    '  padding: 26px 20px 20px !important;',
    '  text-align: center !important;',
    '  box-shadow: 0 24px 60px -8px rgba(0, 0, 0, 0.85), 0 10px 24px -4px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1) !important;',
    '  transform: scale(0.95) translateY(10px) !important;',
    '  opacity: 0 !important;',
    '  transform-origin: center center !important;',
    '  transition: transform 240ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease !important;',
    '  font-family: "DM Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;',
    '  color: #f0f4ff !important;',
    '  box-sizing: border-box !important;',
    '  will-change: transform, opacity !important;',
    '}',
    '.playup-share-overlay.is-open .playup-share-modal {',
    '  transform: scale(1) translateY(0) !important;',
    '  opacity: 1 !important;',
    '}',
    '.playup-share-overlay:not(.is-open) .playup-share-modal {',
    '  transition: transform 140ms ease-in, opacity 140ms ease-in !important;',
    '}',
    '',
    '/* ═══ CHOREOGRAPHED STAGGER ENTRANCE (Emil Kowalski / Choreograph) ═══ */',
    '.playup-modal-stagger {',
    '  opacity: 0;',
    '  transform: translateY(8px);',
    '  transition: opacity 220ms cubic-bezier(0.16, 1, 0.3, 1), transform 220ms cubic-bezier(0.16, 1, 0.3, 1);',
    '}',
    '.playup-share-overlay.is-open .playup-modal-stagger {',
    '  opacity: 1;',
    '  transform: translateY(0);',
    '}',
    '.playup-share-overlay.is-open .playup-modal-stagger:nth-child(2) { transition-delay: 35ms; }',
    '.playup-share-overlay.is-open .playup-modal-stagger:nth-child(3) { transition-delay: 75ms; }',
    '.playup-share-overlay.is-open .playup-modal-stagger:nth-child(4) { transition-delay: 115ms; }',
    '.playup-share-overlay.is-open .playup-modal-stagger:nth-child(5) { transition-delay: 155ms; }',
    '.playup-share-overlay:not(.is-open) .playup-modal-stagger {',
    '  transition-delay: 0ms !important;',
    '  transition-duration: 120ms !important;',
    '}',
    '',
    '/* Close Button (Apple Touch Sizing & Rotational Feedback) */',
    '.playup-share-close {',
    '  position: absolute !important;',
    '  top: 14px !important;',
    '  right: 14px !important;',
    '  z-index: 50 !important;',
    '  width: 36px !important;',
    '  height: 36px !important;',
    '  border-radius: 50% !important;',
    '  background: rgba(255, 255, 255, 0.06) !important;',
    '  border: 1px solid rgba(255, 255, 255, 0.12) !important;',
    '  color: #94a3b8 !important;',
    '  display: flex !important;',
    '  align-items: center !important;',
    '  justify-content: center !important;',
    '  cursor: pointer !important;',
    '  padding: 0 !important;',
    '  pointer-events: auto !important;',
    '  -webkit-tap-highlight-color: transparent !important;',
    '  touch-action: manipulation !important;',
    '  transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), background 140ms ease, border-color 140ms ease, color 140ms ease !important;',
    '}',
    '.playup-share-close svg {',
    '  pointer-events: none !important;',
    '  display: block;',
    '}',
    '@media (hover: hover) and (pointer: fine) {',
    '  .playup-share-close:hover {',
    '    background: rgba(59, 130, 246, 0.16) !important;',
    '    border-color: rgba(59, 130, 246, 0.45) !important;',
    '    color: #ffffff !important;',
    '    transform: rotate(90deg) scale(1.05) !important;',
    '  }',
    '}',
    '.playup-share-close:active {',
    '  transform: rotate(90deg) scale(0.94) !important;',
    '  transition-duration: 70ms !important;',
    '}',
    '',
    '/* Modal Top Icon */',
    '.playup-share-top-icon {',
    '  width: 46px;',
    '  height: 46px;',
    '  border-radius: 15px;',
    '  background: rgba(59, 130, 246, 0.12);',
    '  border: 1px solid rgba(59, 130, 246, 0.28);',
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  color: #60a5fa;',
    '  margin-bottom: 12px;',
    '  box-shadow: none;',
    '}',
    '',
    '/* Title & Subtitle */',
    '.playup-share-title {',
    '  display: inline-flex !important;',
    '  align-items: center !important;',
    '  justify-content: center !important;',
    '  gap: 12px !important;',
    '  font-size: 21px !important;',
    '  font-weight: 800 !important;',
    '  letter-spacing: -0.015em !important;',
    '  color: #ffffff !important;',
    '  margin: 0 0 4px !important;',
    '}',
    '.playup-title-icon {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  color: #3b82f6;',
    '  flex-shrink: 0;',
    '}',
    '.playup-title-icon svg {',
    '  width: 20px;',
    '  height: 20px;',
    '  display: block;',
    '}',
    '.playup-share-subtitle {',
    '  font-size: 13px !important;',
    '  color: #94a3b8 !important;',
    '  margin: 0 0 16px !important;',
    '}',
    '',
    '/* QR Code Container (Emil Elevational Lift - Clean Shadow) */',
    '.playup-share-qr-wrap {',
    '  background: #ffffff;',
    '  border-radius: 16px;',
    '  padding: 10px;',
    '  display: inline-block;',
    '  box-shadow: 0 12px 28px -4px rgba(0, 0, 0, 0.55);',
    '  margin-bottom: 16px;',
    '  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 200ms ease;',
    '}',
    '@media (hover: hover) and (pointer: fine) {',
    '  .playup-share-qr-wrap:hover {',
    '    transform: scale(1.02);',
    '    box-shadow: 0 16px 36px -4px rgba(0, 0, 0, 0.65);',
    '  }',
    '}',
    '.playup-share-qr-img {',
    '  width: 172px;',
    '  height: 172px;',
    '  display: block;',
    '  object-fit: contain;',
    '  border-radius: 8px;',
    '}',
    '',
    '/* URL Pill */',
    '.playup-share-url-box {',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  gap: 8px;',
    '  background: rgba(59, 130, 246, 0.08);',
    '  border: 1px solid rgba(59, 130, 246, 0.2);',
    '  border-radius: 11px;',
    '  padding: 9px 12px;',
    '  font-size: 12.5px;',
    '  font-weight: 600;',
    '  color: #60a5fa;',
    '  margin-bottom: 15px;',
    '  word-break: break-all;',
    '  user-select: all;',
    '  -webkit-user-select: all;',
    '  cursor: pointer;',
    '  -webkit-tap-highlight-color: transparent !important;',
    '  touch-action: manipulation;',
    '  transition: background 160ms ease, border-color 160ms ease, transform 140ms cubic-bezier(0.16, 1, 0.3, 1);',
    '}',
    '@media (hover: hover) and (pointer: fine) {',
    '  .playup-share-url-box:hover {',
    '    background: rgba(59, 130, 246, 0.15);',
    '    border-color: rgba(59, 130, 246, 0.42);',
    '  }',
    '}',
    '.playup-share-url-box:active {',
    '  transform: scale(0.98);',
    '  transition-duration: 70ms;',
    '}',
    '.playup-share-url-box svg {',
    '  flex-shrink: 0;',
    '  color: #93c5fd;',
    '}',
    '',
    '/* Actions (Side-by-side Same Row) */',
    '.playup-share-actions {',
    '  display: flex !important;',
    '  flex-direction: row !important;',
    '  align-items: center !important;',
    '  gap: 10px !important;',
    '  width: 100% !important;',
    '}',
    '',
    '/* Copy Link Button (Asymmetric Press/Release Timing) */',
    '.playup-share-btn-copy {',
    '  flex: 1 1 0 !important;',
    '  width: auto !important;',
    '  min-width: 0 !important;',
    '  min-height: 42px !important;',
    '  display: inline-flex !important;',
    '  align-items: center !important;',
    '  justify-content: center !important;',
    '  gap: 7px !important;',
    '  padding: 11px 12px !important;',
    '  border-radius: 12px !important;',
    '  border: none !important;',
    '  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%) !important;',
    '  color: #ffffff !important;',
    '  font-family: inherit !important;',
    '  font-size: 13.5px !important;',
    '  font-weight: 700 !important;',
    '  cursor: pointer !important;',
    '  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.32) !important;',
    '  white-space: nowrap !important;',
    '  -webkit-tap-highlight-color: transparent !important;',
    '  touch-action: manipulation !important;',
    '  transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 160ms ease, background 180ms ease, filter 160ms ease !important;',
    '}',
    '@media (hover: hover) and (pointer: fine) {',
    '  .playup-share-btn-copy:hover {',
    '    transform: translateY(-1px) !important;',
    '    box-shadow: 0 6px 18px rgba(59, 130, 246, 0.45) !important;',
    '  }',
    '}',
    '.playup-share-btn-copy:active {',
    '  transform: scale(0.97) !important;',
    '  transition-duration: 70ms !important;',
    '}',
    '.playup-share-btn-copy.is-copied {',
    '  background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;',
    '  box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35) !important;',
    '}',
    '.playup-btn-icon-wrap {',
    '  display: inline-flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  flex-shrink: 0;',
    '  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);',
    '}',
    '.playup-share-btn-copy.is-copied .playup-btn-icon-wrap {',
    '  transform: scale(1.15);',
    '}',
    '',
    '/* Web Share Button (Side-by-side) */',
    '.playup-share-btn-native {',
    '  flex: 1 1 0 !important;',
    '  width: auto !important;',
    '  min-width: 0 !important;',
    '  min-height: 42px !important;',
    '  display: inline-flex !important;',
    '  align-items: center !important;',
    '  justify-content: center !important;',
    '  gap: 7px !important;',
    '  padding: 11px 12px !important;',
    '  border-radius: 12px !important;',
    '  border: 1px solid rgba(255, 255, 255, 0.12) !important;',
    '  background: rgba(255, 255, 255, 0.05) !important;',
    '  color: #f0f4ff !important;',
    '  font-family: inherit !important;',
    '  font-size: 13.5px !important;',
    '  font-weight: 600 !important;',
    '  cursor: pointer !important;',
    '  white-space: nowrap !important;',
    '  -webkit-tap-highlight-color: transparent !important;',
    '  touch-action: manipulation !important;',
    '  transition: transform 160ms cubic-bezier(0.16, 1, 0.3, 1), background 140ms ease, border-color 140ms ease !important;',
    '}',
    '@media (hover: hover) and (pointer: fine) {',
    '  .playup-share-btn-native:hover {',
    '    background: rgba(255, 255, 255, 0.09) !important;',
    '    border-color: rgba(59, 130, 246, 0.35) !important;',
    '  }',
    '}',
    '.playup-share-btn-native:active {',
    '  transform: scale(0.97) !important;',
    '  transition-duration: 70ms !important;',
    '}',
    '.playup-share-btn-native svg {',
    '  flex-shrink: 0;',
    '}',
    '',
    '/* Accessible Focus Rings */',
    '.playup-share-close:focus-visible,',
    '.playup-share-url-box:focus-visible,',
    '.playup-share-btn-copy:focus-visible,',
    '.playup-share-btn-native:focus-visible,',
    '.playup-share-tab:focus-visible {',
    '  outline: 2px solid #60a5fa !important;',
    '  outline-offset: 2px !important;',
    '}',
    '',
    '/* Reduced Motion & Transparency (Accessibility) */',
    '@media (prefers-reduced-motion: reduce) {',
    '  .playup-share-tab,',
    '  .playup-share-overlay,',
    '  .playup-share-modal,',
    '  .playup-modal-stagger,',
    '  .playup-share-btn-copy,',
    '  .playup-share-close,',
    '  .playup-share-btn-native,',
    '  .playup-share-qr-wrap,',
    '  .playup-share-url-box {',
    '    transition: opacity 120ms ease, background 120ms ease !important;',
    '    transform: none !important;',
    '  }',
    '  .playup-share-overlay.is-open .playup-share-modal,',
    '  .playup-share-overlay.is-open .playup-modal-stagger {',
    '    transform: none !important;',
    '  }',
    '}',
    '@media (prefers-reduced-transparency: reduce) {',
    '  .playup-share-overlay {',
    '    background: rgba(8, 12, 20, 0.96) !important;',
    '    backdrop-filter: none !important;',
    '    -webkit-backdrop-filter: none !important;',
    '  }',
    '  .playup-share-modal {',
    '    background: #0f1523 !important;',
    '    backdrop-filter: none !important;',
    '    -webkit-backdrop-filter: none !important;',
    '  }',
    '}',
    '',
    '/* Responsive Mobile Styling */',
    '@media (max-width: 640px) {',
    '  .playup-share-tab {',
    '    padding: 8px 5px 8px 7px !important;',
    '    gap: 5px !important;',
    '    border-radius: 8px 0 0 8px !important;',
    '  }',
    '  .playup-share-tab::before {',
    '    height: 24px !important;',
    '    width: 2px !important;',
    '  }',
    '  .playup-share-tab-icon {',
    '    width: 14px !important;',
    '    height: 14px !important;',
    '  }',
    '  .playup-share-tab-icon svg {',
    '    width: 12px !important;',
    '    height: 12px !important;',
    '  }',
    '  .playup-share-tab-text {',
    '    font-size: 8.5px !important;',
    '    letter-spacing: 1.4px !important;',
    '  }',
    '  .playup-share-modal {',
    '    max-width: 326px !important;',
    '    padding: 22px 16px 18px !important;',
    '  }',
    '  .playup-share-title {',
    '    font-size: 19px !important;',
    '  }',
    '  .playup-share-qr-img {',
    '    width: 148px !important;',
    '    height: 148px !important;',
    '  }',
    '}'
  ].join('\n');

  function injectStyles() {
    if (document.getElementById('playup-share-site-styles')) return;
    var style = document.createElement('style');
    style.id = 'playup-share-site-styles';
    style.textContent = CSS_TEXT;
    document.head.appendChild(style);
  }

  function createTab() {
    if (document.getElementById('playupShareTab')) return;

    var tab = document.createElement('div');
    tab.className = 'playup-share-tab';
    tab.id = 'playupShareTab';
    tab.setAttribute('role', 'button');
    tab.setAttribute('tabindex', '0');
    tab.setAttribute('aria-label', 'Share PlayUp');
    tab.setAttribute('title', 'Share PlayUp');

    tab.innerHTML = [
      '<div class="playup-share-tab-icon" aria-hidden="true">',
      '  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">',
      '    <circle cx="18" cy="5" r="3"></circle>',
      '    <circle cx="6" cy="12" r="3"></circle>',
      '    <circle cx="18" cy="19" r="3"></circle>',
      '    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>',
      '    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>',
      '  </svg>',
      '</div>',
      '<span class="playup-share-tab-text">SHARE SITE</span>'
    ].join('');

    tab.addEventListener('click', openModal);
    tab.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal();
      }
    });

    document.body.appendChild(tab);
  }

  var lastFocusedEl = null;

  function createModal() {
    if (document.getElementById('playupShareModalOverlay')) return;

    var overlay = document.createElement('div');
    overlay.className = 'playup-share-overlay';
    overlay.id = 'playupShareModalOverlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'playupShareTitle');
    overlay.setAttribute('aria-hidden', 'true');

    var supportsShare = typeof navigator !== 'undefined' && !!navigator.share;
    var qrSrc = getQrSrc();

    overlay.innerHTML = [
      '<div class="playup-share-modal" role="document">',
      '  <button type="button" class="playup-share-close" id="playupShareCloseBtn" aria-label="Close share dialog">',
      '    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">',
      '      <line x1="18" y1="6" x2="6" y2="18"></line>',
      '      <line x1="6" y1="6" x2="18" y2="18"></line>',
      '    </svg>',
      '  </button>',
      '  <div class="playup-modal-stagger">',
      '    <h2 class="playup-share-title" id="playupShareTitle">',
      '      <span class="playup-title-icon" aria-hidden="true">',
      '        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">',
      '          <circle cx="18" cy="5" r="3"></circle>',
      '          <circle cx="6" cy="12" r="3"></circle>',
      '          <circle cx="18" cy="19" r="3"></circle>',
      '          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>',
      '          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>',
      '        </svg>',
      '      </span>',
      '      <span>Share PlayUp</span>',
      '    </h2>',
      '    <p class="playup-share-subtitle">Share PlayUp with your friends</p>',
      '  </div>',
      '  <div class="playup-modal-stagger">',
      '    <div class="playup-share-qr-wrap">',
      '      <img class="playup-share-qr-img" id="playupShareQrImg" src="' + qrSrc + '" alt="PlayUp QR Code" />',
      '    </div>',
      '  </div>',
      '  <div class="playup-modal-stagger">',
      '    <div class="playup-share-url-box" title="Click to copy link" id="playupShareUrlPreview" role="button" tabindex="0" aria-label="Copy website URL">',
      '      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">',
      '        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>',
      '        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>',
      '      </svg>',
      '      <span>' + SHARE_URL + '</span>',
      '    </div>',
      '  </div>',
      '  <div class="playup-modal-stagger">',
      '    <div class="playup-share-actions">',
      '      <button type="button" class="playup-share-btn-copy" id="playupShareCopyBtn">',
      '        <span class="playup-btn-icon-wrap" id="playupShareCopyIcon">',
      '          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">',
      '            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>',
      '            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>',
      '          </svg>',
      '        </span>',
      '        <span id="playupShareCopyText">Copy Link</span>',
      '      </button>',
      '      <button type="button" class="playup-share-btn-native" id="playupShareNativeBtn">',
      '        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">',
      '          <circle cx="18" cy="5" r="3"></circle>',
      '          <circle cx="6" cy="12" r="3"></circle>',
      '          <circle cx="18" cy="19" r="3"></circle>',
      '          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>',
      '          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>',
      '        </svg>',
      '        <span>Share via...</span>',
      '      </button>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('');

    // Fallback QR image if local image fails
    var qrImg = overlay.querySelector('#playupShareQrImg');
    if (qrImg) {
      qrImg.onerror = function () {
        this.onerror = null;
        this.src = FALLBACK_QR;
      };
    }

    // Close button
    var closeBtn = overlay.querySelector('#playupShareCloseBtn');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
      });
      closeBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          closeModal();
        }
      });
    }

    // Click outside modal or on close button via delegation
    overlay.addEventListener('click', function (e) {
      if (e.target && (e.target.closest('#playupShareCloseBtn') || e.target.closest('.playup-share-close'))) {
        e.preventDefault();
        e.stopPropagation();
        closeModal();
        return;
      }
      if (e.target === overlay) {
        closeModal();
      }
    });

    // Copy Link Button with tactile feedback & checkmark animation
    var copyBtn = overlay.querySelector('#playupShareCopyBtn');
    var copyText = overlay.querySelector('#playupShareCopyText');
    var copyIcon = overlay.querySelector('#playupShareCopyIcon');
    var copyTimeout = null;

    var copyIconSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
    var checkmarkIconSvg = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';

    function handleCopy() {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(SHARE_URL).then(function () {
          showCopiedState();
        }).catch(function () {
          fallbackCopy();
        });
      } else {
        fallbackCopy();
      }

      function fallbackCopy() {
        var input = document.createElement('textarea');
        input.value = SHARE_URL;
        input.style.position = 'fixed';
        input.style.left = '-9999px';
        input.style.top = '0';
        document.body.appendChild(input);
        input.focus();
        input.select();
        try {
          var copied = document.execCommand('copy');
          if (copied) showCopiedState();
        } catch (_) {}
        document.body.removeChild(input);
      }

      function showCopiedState() {
        if (!copyBtn || !copyText) return;
        copyBtn.classList.add('is-copied');
        if (copyIcon) copyIcon.innerHTML = checkmarkIconSvg;
        copyText.textContent = 'Copied!';

        // Apple multimodal tactile haptic feedback on supported mobile devices
        if (typeof navigator !== 'undefined' && navigator.vibrate) {
          try { navigator.vibrate(25); } catch (_) {}
        }

        if (copyTimeout) clearTimeout(copyTimeout);
        copyTimeout = setTimeout(function () {
          copyBtn.classList.remove('is-copied');
          if (copyIcon) copyIcon.innerHTML = copyIconSvg;
          copyText.textContent = 'Copy Link';
        }, 2200);
      }
    }

    if (copyBtn) copyBtn.addEventListener('click', handleCopy);

    var urlPreview = overlay.querySelector('#playupShareUrlPreview');
    if (urlPreview) {
      urlPreview.addEventListener('click', handleCopy);
      urlPreview.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCopy();
        }
      });
    }

    // Web Share Button (with copy fallback if share API unavailable)
    var nativeBtn = overlay.querySelector('#playupShareNativeBtn');
    if (nativeBtn) {
      nativeBtn.addEventListener('click', function () {
        if (typeof navigator !== 'undefined' && navigator.share) {
          navigator.share({
            title: SHARE_TITLE,
            text: SHARE_TEXT,
            url: SHARE_URL
          }).catch(function () {});
        } else {
          handleCopy();
        }
      });
    }

    // Accessible Tab trapping inside modal
    overlay.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusables = overlay.querySelectorAll('button:not([disabled]), [tabindex="0"]');
      if (!focusables || !focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    document.body.appendChild(overlay);
  }

  function openModal() {
    var overlay = document.getElementById('playupShareModalOverlay');
    if (!overlay) {
      createModal();
      overlay = document.getElementById('playupShareModalOverlay');
    }
    if (overlay) {
      lastFocusedEl = document.activeElement;
      document.body.style.overflow = 'hidden';
      overlay.classList.add('is-open');
      overlay.setAttribute('aria-hidden', 'false');
      var copyBtn = overlay.querySelector('#playupShareCopyBtn');
      if (copyBtn) {
        setTimeout(function () {
          try { copyBtn.focus(); } catch (_) {}
        }, 80);
      }
    }
  }

  function closeModal() {
    var overlay = document.getElementById('playupShareModalOverlay');
    if (overlay) {
      overlay.classList.remove('is-open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
        try { lastFocusedEl.focus(); } catch (_) {}
      }
    }
  }

  // Keyboard shortcut: Escape to close
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var overlay = document.getElementById('playupShareModalOverlay');
      if (overlay && overlay.classList.contains('is-open')) {
        closeModal();
      }
    }
  });

  function init() {
    if (!document.body) {
      document.addEventListener('DOMContentLoaded', init);
      return;
    }
    injectStyles();
    createTab();
    createModal();
  }

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
  // Extra fallback to ensure it runs even if events fired earlier
  setTimeout(init, 300);
})();
