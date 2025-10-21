document.addEventListener('DOMContentLoaded', (event) => {
    const radar = document.getElementById('radar');

    function updateRadar(targets) {
        // Clear previous targets
        radar.querySelectorAll('.target').forEach(target => target.remove());

        const centerX = radar.clientWidth / 2;
        const centerY = radar.clientHeight / 2;

        targets.forEach(targetData => {
            const target = document.createElement('div');
            target.className = 'target';
            radar.appendChild(target);

            const radius = Math.min(centerX, centerY) * (targetData.distance / 100);
            const radian = targetData.angle * (Math.PI / 180);
            const x = centerX + radius * Math.cos(radian) - target.clientWidth / 2;
            const y = centerY - radius * Math.sin(radian) - target.clientHeight / 2;

            target.style.left = `${x}px`;
            target.style.top = `${y}px`;
        });
    }

    async function fetchData() {
        try {
            const response = await fetch('http://192.168.1.130/get_target');
            const data = await response.json();

            if (Array.isArray(data)) {
                updateRadar(data);
            } else {
                console.error('Received invalid target data:', data);
            }
        } catch (error) {
            console.error('Error fetching target data:', error);
        }
    }

    setInterval(fetchData, 1000);



});