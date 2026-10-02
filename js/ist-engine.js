/**
 * StaySphere Indian Standard Time (IST) Dynamic Atmosphere Engine
 * Shifts color palettes and ambient shaders according to live Indian Standard Time (UTC+5:30).
 * Clean, minimal labels without emojis.
 */

const ISTAtmosphere = (() => {
  let manualOverride = null;

  function getISTDate() {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const istTime = new Date(utc + (3600000 * 5.5));
    return istTime;
  }

  function getDayPart(istDate) {
    if (manualOverride) return manualOverride;

    const hours = istDate.getHours();
    if (hours >= 5 && hours < 12) {
      return { id: 'morning', label: 'Sunrise Saffron (Dawn)' };
    } else if (hours >= 12 && hours < 17) {
      return { id: 'afternoon', label: 'Daylight Azure (Afternoon)' };
    } else if (hours >= 17 && hours < 20) {
      return { id: 'sunset', label: 'Dusk Saffron & Purple (Sunset)' };
    } else {
      return { id: 'night', label: 'Midnight Indigo (Night)' };
    }
  }

  function formatISTTime(istDate) {
    return istDate.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  }

  function applyAtmosphere() {
    const istDate = getISTDate();
    const daypart = getDayPart(istDate);

    // Remove existing ist classes
    document.body.classList.remove('ist-morning', 'ist-afternoon', 'ist-sunset', 'ist-night');
    document.body.classList.add(`ist-${daypart.id}`);

    // Update Live Clock and Pill if present in DOM
    const clockEl = document.getElementById('ist-live-clock');
    const labelEl = document.getElementById('ist-daypart-label');

    if (clockEl) {
      clockEl.textContent = formatISTTime(istDate);
    }
    if (labelEl) {
      labelEl.textContent = daypart.label;
    }

    // Update active state in test buttons
    document.querySelectorAll('.btn-time-shift').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.time === daypart.id);
    });
  }

  function setOverride(daypartId) {
    if (daypartId === 'auto') {
      manualOverride = null;
    } else {
      const labels = {
        morning: { id: 'morning', label: 'Sunrise Saffron (Dawn)' },
        afternoon: { id: 'afternoon', label: 'Daylight Azure (Afternoon)' },
        sunset: { id: 'sunset', label: 'Dusk Saffron & Purple (Sunset)' },
        night: { id: 'night', label: 'Midnight Indigo (Night)' }
      };
      manualOverride = labels[daypartId];
    }
    applyAtmosphere();
  }

  function init() {
    applyAtmosphere();
    setInterval(applyAtmosphere, 1000);

    document.querySelectorAll('.btn-time-shift').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        setOverride(btn.dataset.time);
      });
    });
  }

  return { init, setOverride, getISTDate, getDayPart };
})();

document.addEventListener('DOMContentLoaded', () => {
  ISTAtmosphere.init();
});
