document.addEventListener('DOMContentLoaded', function () {
  const toast = document.getElementById('successToast');
  if (toast) {
    window.showSuccessToast = function (message) {
      toast.textContent = message;
      toast.style.display = 'block';
      setTimeout(() => { toast.style.display = 'none'; }, 2000);
    };
  }
});

window.copyText = function (text) {
  if (!text) return Promise.reject();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
  }
  return legacyCopy(text);
};

function legacyCopy(text) {
  try {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.position = 'fixed'; ta.style.left = '-9999px'; ta.setAttribute('readonly', '');
    document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy'); document.body.removeChild(ta);
    return ok ? Promise.resolve() : Promise.reject();
  } catch { return Promise.reject(); }
}

window.navTo = function (path) { window.location.href = path; };

window.openInNewTabOrSelf = function (url) {
  try {
    const w = window.open(url, '_blank');
    setTimeout(() => { if (!w || w.closed || typeof w.closed === 'undefined') { window.location.href = url; } }, 600);
  } catch {
    window.location.href = url;
  }
};


