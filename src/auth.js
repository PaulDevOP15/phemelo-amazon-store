function saveAuthUser(email) {
  localStorage.setItem("amazonCloneUser", email);
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const createAccountButton = document.getElementById("create-account");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const emailInput = document.getElementById("email");
      const passwordInput = document.getElementById("password");

      if (!emailInput || !passwordInput) {
        return;
      }

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (!email || password.length < 6) {
        alert("Enter a valid email and password (minimum 6 characters).");
        return;
      }

      saveAuthUser(email);
      window.location.href = "../index/index.html";
    });
  }

  if (createAccountButton) {
    createAccountButton.addEventListener("click", () => {
      alert("Account creation demo complete. You can sign in now.");
    });
  }
});
