document.addEventListener('DOMContentLoaded', function () {
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

