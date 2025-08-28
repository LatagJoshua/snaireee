import { auth } from './firebase-init.js';
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            var email = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            try {
                await signInWithEmailAndPassword(auth, email, password);
                window.location.href = 'home.html';
            } catch (err) {
                var msg = document.getElementById('message');
                if (msg) {
                    msg.textContent = err.message || 'Login failed';
                    msg.classList.remove('hidden');
                } else {
                    alert(err.message || 'Login failed');
                }
            }
        });
    }

    onAuthStateChanged(auth, function(user){
        if (user) {
            // Already signed in, optionally redirect
        }
    });

    document.querySelectorAll('.password-toggle').forEach(function (toggle) {
        var container = toggle.closest('.input-container');
        if (!container) return;
        var input = container.querySelector('input');
        if (!input) return;

        toggle.setAttribute('role', 'button');
        toggle.setAttribute('tabindex', '0');
        toggle.setAttribute('aria-label', 'Show password');

        function toggleVisibility() {
            var show = input.type === 'password';
            input.type = show ? 'text' : 'password';
            toggle.classList.toggle('active', show);
            toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
            toggle.setAttribute('aria-pressed', String(show));
        }

        toggle.addEventListener('click', toggleVisibility);
        toggle.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleVisibility();
            }
        });
    });
});

