// Initialize progress tracking
document.addEventListener('DOMContentLoaded', function() {
    // Set print date
    const now = new Date();
    document.getElementById('print-date').textContent = now.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Load saved progress from localStorage
    loadProgress();
    
    // Initial progress update
    updateProgress();
});

// Update progress calculations
function updateProgress() {
    // Category counts
    const categories = {
        'pu': 8,
        'pbm': 8,
        'ppu': 7,
        'lbi': 10,
        'lbe': 7,
        'pkpm': 19
    };
    
    let totalCompleted = 0;
    let totalTopics = 0;
    
    // Calculate progress for each category
    for (const [category, count] of Object.entries(categories)) {
        let completed = 0;
        
        // Count checked items for this category
        for (let i = 1; i <= count; i++) {
            const checkbox = document.getElementById(`${category}-${i}`);
            if (checkbox.checked) {
                completed++;
            }
        }
        
        // Update category progress
        const percentage = Math.round((completed / count) * 100);
        document.getElementById(`${category}-percentage`).textContent = `${percentage}%`;
        document.getElementById(`${category}-progress`).style.width = `${percentage}%`;
        document.getElementById(`${category}-count`).textContent = `${completed}/${count}`;
        
        totalCompleted += completed;
        totalTopics += count;
        
        // Save to localStorage
        localStorage.setItem(`${category}-progress`, completed);
    }
    
    // Calculate overall progress
    const overallPercentage = Math.round((totalCompleted / totalTopics) * 100);
    document.getElementById('overall-percentage').textContent = `${overallPercentage}%`;
    document.getElementById('overall-progress').style.width = `${overallPercentage}%`;
    
    // Save overall progress
    localStorage.setItem('total-progress', totalCompleted);
    localStorage.setItem('total-topics', totalTopics);
}

// Load saved progress
function loadProgress() {
    const categories = {
        'pu': 8,
        'pbm': 8,
        'ppu': 7,
        'lbi': 10,
        'lbe': 7,
        'pkpm': 19
    };
    
    for (const [category, count] of Object.entries(categories)) {
        const savedProgress = localStorage.getItem(`${category}-progress`);
        
        if (savedProgress !== null) {
            const completed = parseInt(savedProgress);
            
            // Check the appropriate checkboxes
            for (let i = 1; i <= count; i++) {
                const checkbox = document.getElementById(`${category}-${i}`);
                if (i <= completed) {
                    checkbox.checked = true;
                }
            }
        }
    }
}

// Reset all progress
function resetProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        // Clear localStorage
        localStorage.clear();
        
        // Update progress display
        updateProgress();
    }
}
