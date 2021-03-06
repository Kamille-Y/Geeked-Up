const logout = async function() {
  const response = await fetch('/api/userRoutes/lougout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to log out');
  }
};

document.querySelector('#logout-link').addEventListener('click', logout);
