function switchTab(tab) {
    // Update buttons
    document.getElementById('tabLogin').classList.remove('active');
    document.getElementById('tabSignup').classList.remove('active');
    
    // Update forms
    document.getElementById('loginForm').classList.remove('active');
    document.getElementById('signupForm').classList.remove('active');
    
    // Clear messages
    document.getElementById('loginError').textContent = '';
    document.getElementById('signupError').textContent = '';
    document.getElementById('signupSuccess').textContent = '';

    if (tab === 'login') {
        document.getElementById('tabLogin').classList.add('active');
        document.getElementById('loginForm').classList.add('active');
    } else {
        document.getElementById('tabSignup').classList.add('active');
        document.getElementById('signupForm').classList.add('active');
    }
}

function getUsers() {
    const users = localStorage.getItem('app_users');
    return users ? JSON.parse(users) : {};
}

function saveUsers(users) {
    localStorage.setItem('app_users', JSON.stringify(users));
}

function handleSignup(event) {
    event.preventDefault();
    
    const id = document.getElementById('signupId').value.trim();
    const password = document.getElementById('signupPassword').value;
    const errorEl = document.getElementById('signupError');
    const successEl = document.getElementById('signupSuccess');
    
    errorEl.textContent = '';
    successEl.textContent = '';
    
    if (id.length < 3) {
        errorEl.textContent = 'ID must be at least 3 characters long.';
        return;
    }
    
    if (password.length < 6) {
        errorEl.textContent = 'Password must be at least 6 characters long.';
        return;
    }

    const users = getUsers();
    
    if (users[id]) {
        errorEl.textContent = 'This ID is already taken. Try another one.';
        return;
    }
    
    // Save new user
    users[id] = { password: password };
    saveUsers(users);
    
    successEl.textContent = 'Account created successfully! You can now log in.';
    document.getElementById('signupForm').reset();
    
    // switch to login after 2 seconds
    setTimeout(() => {
        switchTab('login');
        document.getElementById('loginId').value = id;
    }, 2000);
}

function handleLogin(event) {
    event.preventDefault();
    
    const id = document.getElementById('loginId').value.trim();
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');
    
    errorEl.textContent = '';
    
    const users = getUsers();
    
    if (!users[id]) {
        errorEl.textContent = 'User ID not found.';
        return;
    }
    
    if (users[id].password !== password) {
        errorEl.textContent = 'Incorrect password.';
        return;
    }
    
    // Success: store a flag and redirect
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('currentUserId', id);
    
    // Redirect to task manager
    window.location.href = 'todo.html';
}
