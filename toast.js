// toast.js

// 🔹 Reusable toast function
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.innerHTML = `${type === "success" ? "✅" : "⚠️"} ${message}`;
    toast.style.position = "fixed";
    toast.style.top = "-80px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.backgroundColor = type === "success" ? "#28a745" : "#dc3545";
    toast.style.color = "white";
    toast.style.padding = "15px 25px";
    toast.style.fontSize = "18px";
    toast.style.borderRadius = "6px";
    toast.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
    toast.style.zIndex = "9999";
    toast.style.fontFamily = "Arial, sans-serif";
    toast.style.opacity = "0";
    toast.style.transition = "top 0.5s ease, opacity 0.5s ease";

    document.body.appendChild(toast);

    // Slide in + fade in
    setTimeout(() => {
        toast.style.top = "20px";
        toast.style.opacity = "1";
    }, 50);

    // Slide out + fade out after 3 seconds
    setTimeout(() => {
        toast.style.top = "-80px";
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

// 🔹 Auto-attach event to all "Place Order" buttons
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("place-order-btn")) {
        showToast("Your order has been placed successfully!", "success");
    }
});