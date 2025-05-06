document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById('file-upload');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    if (file.type !== 'application/json') {
        alert('Only JSON files are accepted.');
        return;
    }

    const reader = new FileReader();
    reader.onload = async function(event) {
        const jsonData = event.target.result;

        try {
            const products = JSON.parse(jsonData);
            console.log('Parsed Products:', products);
            const res = await fetch('/api/admin/products/bulk', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(products),
            });

            const response = await res.json();
            alert(response.message || 'Bulk upload failed');
        } catch (err) {
            alert('Error parsing the JSON file or uploading the data.');
        }
    };

    reader.readAsText(file);
});
