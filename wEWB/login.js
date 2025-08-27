document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('loginForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            window.location.href = 'home.html';
        });
    }

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

