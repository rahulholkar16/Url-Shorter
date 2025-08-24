// ======== EDIT THESE TO MATCH YOUR BACKEND ========
// If your router is mounted at app.use('/url', route) then:
//   - POST to   http://localhost:3000/url   with JSON { url }
//   - Redirect is served at http://localhost:3000/url/:code
// If mounted at root (app.use('/', route)), then prefix can be "".
const API_BASE = 'http://localhost:3000/api/v1';   // POST endpoint for creating short link
const SHORT_PATH_PREFIX = '/url/';              // where GET ":code" is handled (include leading and trailing slashes as needed)
// ====================================================

const $ = (id) => document.getElementById(id);
const longUrl = $('longUrl');
const errorBox = $('errorBox');
const result = $('result');
const shortUrlDisplay = $('shortUrlDisplay');
const openBtn = $('openBtn');
const copyBtn = $('copyBtn');
const notes = $('notes');
const configInfo = $('configInfo');

configInfo.textContent = `POST: ${API_BASE}  •  GET: ${SHORT_PATH_PREFIX}:code`;

function showError(msg) {
    errorBox.style.display = 'block';
    errorBox.textContent = msg;
}
function clearError() {
    errorBox.style.display = 'none';
    errorBox.textContent = '';
}

function isValidHttpUrl(value) {
    try {
        const u = new URL(value);
        return u.protocol === 'http:' || u.protocol === 'https:';
    } catch { return false; }
}

async function shorten() {
    clearError();
    const url = longUrl.value.trim();
    if (!url) { showError('Please paste a URL.'); return; }
    if (!isValidHttpUrl(url)) { showError('That doesn\'t look like a valid http(s) URL.'); return; }

    const btn = document.getElementById('shortenBtn');
    const originalText = btn.textContent;
    btn.disabled = true; btn.textContent = 'Shortening…';

    try {
        const res = await fetch(`${API_BASE}/short`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });

        const data = await res.json();
        if (!res.ok) {
            if (data && data.errors) {
                // Zod-like validation errors from your backend
                const messages = data.errors.map(e => `${e.path}: ${e.message}`).join(' | ');
                showError(messages || data.msg || 'Validation failed');
            } else {
                showError(data?.msg || data?.error || 'Something went wrong.');
            }
            return;
        }

        // Expecting: { data: { sortUrl, origenalUrl, ... } }
        const code = data?.data?.sortUrl || data?.data?.shortUrl || data?.sortUrl || data?.shortUrl;
        if (!code) { showError('Response missing short code. Check field name: sortUrl'); return; }

        const origin = window.location.origin;
        console.log(origin);
        
        const shortHref = origin + SHORT_PATH_PREFIX + code;

        shortUrlDisplay.textContent = shortHref;
        openBtn.href = shortHref;
        result.style.display = 'block';

        notes.textContent = `This short link will redirect to: ${data?.data?.origenalUrl || url}`;
    } catch (err) {
        console.error(err);
        showError('Network error. Is the backend running?');
    } finally {
        btn.disabled = false; btn.textContent = originalText;
    }
}

function copy() {
    const text = shortUrlDisplay.textContent.trim();
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy', 1100);
    });
}

// Events
document.getElementById('shortenBtn').addEventListener('click', shorten);
document.getElementById('clearBtn').addEventListener('click', () => {
    longUrl.value = ''; result.style.display = 'none'; clearError(); longUrl.focus();
});
copyBtn.addEventListener('click', copy);

longUrl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') shorten();
    if (e.key === 'Escape') { longUrl.value = ''; clearError(); }
});
