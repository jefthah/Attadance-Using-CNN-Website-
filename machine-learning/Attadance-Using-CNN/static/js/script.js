document.getElementById('captureForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var user_id = document.getElementById('user_id').value;

    // Validasi user ID di sisi client
    if (!/^[a-zA-Z0-9_-]*$/.test(user_id)) {
        alert("Invalid user ID. Use only letters, numbers, underscores, or hyphens.");
        return;
    }

    // Mengambil geolokasi pengguna
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;

            fetch('/capture', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `user_id=${user_id}&latitude=${latitude}&longitude=${longitude}`
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }, function(error) {
            alert('Error getting geolocation: ' + error.message);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});
