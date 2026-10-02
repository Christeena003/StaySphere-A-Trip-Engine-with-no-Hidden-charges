/**
 * StaySphere Modern Authentication Engine
 * Implements accessible password toggles, live validation, strength scoring,
 * tab state management, and demo filler helpers.
 */

document.addEventListener('DOMContentLoaded', () => {
  initAriaSync();
  initTabSwitching();
  initPasswordToggles();
  initPasswordStrengthChecker();
  initFormSubmissions();
  initDemoFillers();
});

/**
 * Modern Web Guidance: Sync aria-invalid with :user-invalid state
 */
function initAriaSync() {
  const syncAria = (el) => {
    if (!el || !el.matches) return;
    try {
      const isInvalid = el.matches(':user-invalid');
      el.setAttribute('aria-invalid', isInvalid ? 'true' : 'false');
    } catch (e) {
      // Fallback if browser doesn't support :user-invalid selector in matches
      const isInvalid = !el.checkValidity();
      el.setAttribute('aria-invalid', isInvalid ? 'true' : 'false');
    }
  };

  document.addEventListener('blur', (e) => {
    if (e.target.matches && e.target.matches('input, select, textarea')) {
      syncAria(e.target);
    }
  }, true);

  document.addEventListener('input', (e) => {
    if (e.target.hasAttribute && e.target.hasAttribute('aria-invalid')) {
      syncAria(e.target);
    }
  });
}

/**
 * Tab Switching: Sign In <-> Create Account
 */
function initTabSwitching() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const signinForm = document.getElementById('form-signin');
  const signupForm = document.getElementById('form-signup');
  const formTitle = document.getElementById('form-title');
  const formSubtitle = document.getElementById('form-subtitle');

  if (!tabBtns.length || !signinForm || !signupForm) return;

  const setTab = (targetTab) => {
    tabBtns.forEach(btn => {
      const isActive = btn.dataset.tab === targetTab;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    const isTraveler = document.body.classList.contains('traveler-theme');

    if (targetTab === 'signup') {
      signinForm.style.display = 'none';
      signupForm.style.display = 'flex';
      if (formTitle) {
        formTitle.textContent = isTraveler ? 'Create your account' : 'Register your business';
      }
      if (formSubtitle) {
        formSubtitle.textContent = isTraveler 
          ? 'Join StaySphere to unlock authentic local travel stays & hidden gems.'
          : 'List your boutique stay, villas, or unique experiences with zero listing fees.';
      }
      history.replaceState(null, '', '#signup');
    } else {
      signupForm.style.display = 'none';
      signinForm.style.display = 'flex';
      if (formTitle) {
        formTitle.textContent = isTraveler ? 'Welcome back' : 'Partner Portal Sign In';
      }
      if (formSubtitle) {
        formSubtitle.textContent = isTraveler
          ? 'Sign in to access your booked stays, saved spots, and local journeys.'
          : 'Access your reservations, host calendar, payout ledger, and guest messages.';
      }
      history.replaceState(null, '', '#signin');
    }
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setTab(btn.dataset.tab);
    });
  });

  // Check URL hash for direct tab navigation
  if (window.location.hash === '#signup') {
    setTab('signup');
  } else {
    setTab('signin');
  }
}

/**
 * Password Visibility Toggle
 */
function initPasswordToggles() {
  const toggleButtons = document.querySelectorAll('.btn-toggle-pw');

  toggleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      if (!input) return;

      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.setAttribute('aria-pressed', isPassword ? 'true' : 'false');
      btn.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');

      // Swap icons
      const svg = btn.querySelector('svg');
      if (svg) {
        if (isPassword) {
          // Eye-off icon
          svg.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
          `;
        } else {
          // Eye icon
          svg.innerHTML = `
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          `;
        }
      }
    });
  });
}

/**
 * Real-time Password Strength and Requirement Checker
 */
function initPasswordStrengthChecker() {
  const pwInputs = document.querySelectorAll('input[data-strength-check="true"]');

  pwInputs.forEach(input => {
    const meter = document.getElementById(input.id + '-strength-meter');
    const fill = document.getElementById(input.id + '-strength-fill');
    const reqList = document.getElementById(input.id + '-requirements');

    if (!meter || !fill) return;

    input.addEventListener('input', () => {
      const val = input.value;
      if (val.length === 0) {
        meter.style.display = 'none';
        return;
      }
      meter.style.display = 'block';

      // Test rules
      const hasLength = val.length >= 8;
      const hasUpper = /[A-Z]/.test(val);
      const hasLower = /[a-z]/.test(val);
      const hasNumber = /[0-9]/.test(val);
      const hasSpecial = /[^A-Za-z0-9]/.test(val);

      let score = 0;
      if (hasLength) score++;
      if (hasUpper) score++;
      if (hasLower) score++;
      if (hasNumber) score++;
      if (hasSpecial) score++;

      // Update meter fill
      const percentages = ['15%', '35%', '60%', '85%', '100%'];
      const colors = ['#ef4444', '#f97316', '#eab308', '#14b8a6', '#10b981'];

      fill.style.width = percentages[score - 1] || '10%';
      fill.style.backgroundColor = colors[score - 1] || '#ef4444';

      // Update individual requirements if checklist exists
      if (reqList) {
        updateReq(reqList, 'req-len', hasLength);
        updateReq(reqList, 'req-upper', hasUpper);
        updateReq(reqList, 'req-num', hasNumber);
        updateReq(reqList, 'req-special', hasSpecial);
      }
    });
  });

  function updateReq(list, ruleName, isMet) {
    const item = list.querySelector(`[data-rule="${ruleName}"]`);
    if (!item) return;
    item.classList.toggle('met', isMet);
    const icon = item.querySelector('svg');
    if (icon) {
      if (isMet) {
        icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />`;
      } else {
        icon.innerHTML = `<circle cx="12" cy="12" r="8" stroke-width="2" stroke="currentColor" fill="none" opacity="0.4" />`;
      }
    }
  }
}

/**
 * Handle Form Submissions with feedback and simulated sessions
 */
function initFormSubmissions() {
  const forms = document.querySelectorAll('.auth-form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        showToast('Please check the highlighted fields and try again.', 'error');
        return;
      }

      const submitBtn = form.querySelector('.btn-submit');
      const originalText = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg style="animation: spin 1s linear infinite; width: 18px; height: 18px;" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="3" stroke-dasharray="31.4 31.4" opacity="0.3"></circle>
            <circle cx="12" cy="12" r="10" stroke-width="3" stroke-dasharray="31.4 31.4" stroke-dashoffset="15"></circle>
          </svg>
          Processing...
        `;
      }

      setTimeout(() => {
        const isSignin = form.id === 'form-signin';
        const isBusiness = document.body.classList.contains('business-theme');
        const role = isBusiness ? 'Business Partner' : 'Traveler';

        // Retrieve identifier
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value : 'user@staysphere.com';
        const nameInput = form.querySelector('input[name="name"]') || form.querySelector('input[name="businessName"]');
        const accountKey = `staysphere_account_${email.toLowerCase()}`;
        let savedAccount = null;
        try { savedAccount = JSON.parse(localStorage.getItem(accountKey) || 'null'); } catch (_) {}
        const displayName = (isSignin && savedAccount?.name) || (nameInput ? nameInput.value.trim() : '') || email.split('@')[0];

        const sessionData = {
          role: role,
          name: displayName,
          email: email,
          timestamp: new Date().toISOString()
        };
        if (!isSignin) {
          localStorage.setItem(accountKey, JSON.stringify({ name: displayName, email: email, role: role }));
          if (!isBusiness) {
            const directory = JSON.parse(localStorage.getItem('staysphere_account_directory') || '[]');
            if (!directory.some(x => x.email === email)) directory.push({ name: displayName, email, role: 'Traveler' });
            localStorage.setItem('staysphere_account_directory', JSON.stringify(directory));
          }
        }
        localStorage.setItem('staysphere_session', JSON.stringify(sessionData));

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        if (isSignin) {
          showToast(`Welcome back, ${displayName}! Logged in as ${role}.`, 'success');
        } else {
          showToast(`Success! Your StaySphere ${role} account is now active.`, 'success');
        }

        // Display confirmation badge or prompt to return to home
        setTimeout(() => {
          showToast('Redirecting to StaySphere Platform Hub...', 'info');
          setTimeout(() => {
            window.location.href = isBusiness ? 'business-portal.html' : 'index.html';
          }, 1500);
        }, 1200);

      }, 800);
    });
  });
}

/**
 * Demo Credential Quick-Fill
 */
function initDemoFillers() {
  const travelerFillBtn = document.getElementById('fill-traveler-demo');
  const businessFillBtn = document.getElementById('fill-business-demo');

  if (travelerFillBtn) {
    travelerFillBtn.addEventListener('click', () => {
      const email = document.getElementById('signin-email');
      const password = document.getElementById('signin-password');
      if (email) email.value = 'clara.wanderer@staysphere.com';
      if (password) password.value = 'Pass@Traveler2026';
      showToast('Demo Traveler credentials prefilled! Click "Sign In to StaySphere".', 'info');
    });
  }

  if (businessFillBtn) {
    businessFillBtn.addEventListener('click', () => {
      const email = document.getElementById('biz-signin-email');
      const password = document.getElementById('biz-signin-password');
      if (email) email.value = 'partner@oceanviewretreat.com';
      if (password) password.value = 'HostSecure#2026';
      showToast('Demo Host Partner credentials prefilled! Click "Sign In to Business Portal".', 'info');
    });
  }
}

/**
 * Toast Notification System
 */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    container.setAttribute('aria-live', 'polite');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;

  let iconSvg = '';
  if (type === 'success') {
    iconSvg = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg>`;
  } else if (type === 'error') {
    iconSvg = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12"/></svg>`;
  } else {
    iconSvg = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;
  }

  toast.innerHTML = `
    <span style="flex-shrink: 0;">${iconSvg}</span>
    <span style="flex: 1; line-height: 1.4;">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 350);
  }, 4000);
}

// Global modal trigger for "Forgot password"
window.triggerForgotPassword = function(portalType) {
  const email = prompt(`Please enter your ${portalType === 'business' ? 'work/business' : 'registered'} email to receive a password reset link:`);
  if (email && email.includes('@')) {
    showToast(`Password reset link sent to ${email}. Please check your inbox.`, 'success');
  } else if (email) {
    showToast('Please enter a valid email address.', 'error');
  }
};
