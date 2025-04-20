// Update entanglement strength and sync status every 5 seconds (example)
setInterval(function() {
    updateEntanglement();
}, 5000);

// Function to simulate the update of entanglement strength and status
function updateEntanglement() {
    // Randomize the strength and status
    const strength = Math.floor(Math.random() * 100);  // Random strength between 0 and 100
    const isSynced = Math.random() > 0.2; // 80% chance to be synced, 20% to be desynced

    // Update the strength bar
    document.getElementById("strength-fill").style.width = `${strength}%`;
    document.getElementById("strength-percent").innerText = `${strength}%`;

    // Update the sync status
    const syncStatusElement = document.getElementById("sync-status");
    if (isSynced) {
        syncStatusElement.innerText = "Synced";
        syncStatusElement.classList.remove("desynced");
        syncStatusElement.classList.add("synced");
    } else {
        syncStatusElement.innerText = "Desynced";
        syncStatusElement.classList.remove("synced");
        syncStatusElement.classList.add("desynced");
    }

    // Update the last sync timestamp
    document.getElementById("last-sync").innerText = new Date().toISOString().slice(0, 19).replace("T", " ");
}

// Initial call to set the panel with random data on load
updateEntanglement();
