import { auth, db } from './firebase-init.js';
import { createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('signupForm');
    if (form) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            var firstName = document.getElementById('firstName').value.trim();
            var lastName = document.getElementById('lastName').value.trim();
            var email = document.getElementById('email').value.trim();
            var password = document.getElementById('password').value;
            var confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                var msg = document.getElementById('message');
                if (msg) {
                    msg.textContent = 'Passwords do not match';
                    msg.classList.remove('hidden');
                } else {
                    alert('Passwords do not match');
                }
                return;
            }

            try {
                var cred = await createUserWithEmailAndPassword(auth, email, password);
                await updateProfile(cred.user, { displayName: firstName + ' ' + lastName });
                await set(ref(db, 'users/' + cred.user.uid), {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    createdAt: new Date().toISOString()
                });

                // Create a public profile record and an owner-mapped record
                function slugifyProfileName(fn, ln, fallback) {
                    var base = (fn + ' ' + ln).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    if (!base) base = fallback;
                    return base;
                }
                var usernameSlug = slugifyProfileName(firstName, lastName, cred.user.uid.substring(0, 8));
                var profileData = {
                    name: firstName + ' ' + lastName,
                    title: '',
                    about: '',
                    avatarUrl: '',
                    ownerUid: cred.user.uid,
                    createdAt: new Date().toISOString()
                };
                await set(ref(db, 'profiles/' + usernameSlug), profileData);
                await set(ref(db, 'profilesByUid/' + cred.user.uid), {
                    username: usernameSlug,
                    createdAt: profileData.createdAt
                });

                window.location.href = 'home.html';
            } catch (err) {
                var msg2 = document.getElementById('message');
                if (msg2) {
                    msg2.textContent = err.message || 'Sign up failed';
                    msg2.classList.remove('hidden');
                } else {
                    alert(err.message || 'Sign up failed');
                }
            }
        });
    }

    document.querySelectorAll('.password-toggle').forEach(function (toggle) {
        var container = toggle.closest('.input-container');
        if (!container) return;
        var input = container.querySelector('input[type="password"], input[type="text"]');
        if (!input) return;

        toggle.setAttribute('role', 'button');
        toggle.setAttribute('tabindex', '0');
        toggle.setAttribute('aria-label', 'Show password');

        function toggleVisibility() {
            var isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            toggle.classList.toggle('active', isPassword);
            toggle.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
            toggle.setAttribute('aria-pressed', String(isPassword));
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

