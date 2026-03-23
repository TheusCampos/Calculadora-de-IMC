document.body.classList.add("js-loading");

const bmiData = [
    { label: "Magreza", color: "var(--imc-thin)", min: 0, max: 18.5 },
    { label: "Normal", color: "var(--imc-normal)", min: 18.5, max: 25 },
    { label: "Sobrepeso", color: "var(--imc-over)", min: 25, max: 30 },
    { label: "Obesidade", color: "var(--imc-obese)", min: 30, max: 100 }
];

const getBMIInfo = (bmi) => {
    return bmiData.find(data => bmi >= data.min && bmi < data.max) || bmiData[3];
};

const updateUI = (bmi) => {
    const info = getBMIInfo(bmi);
    const resultContainer = document.getElementById('result-container');
    const bmiValue = document.getElementById('bmi-value');
    const bmiDesc = document.getElementById('bmi-description');
    const badge = document.getElementById('bmi-badge');
    const indicator = document.getElementById('imc-indicator');

    resultContainer.classList.remove('hidden');
    
    gsap.from(resultContainer, {
        duration: 0.5,
        opacity: 0,
        y: 20,
        ease: "power2.out",
    });

    bmiValue.textContent = bmi.toFixed(1);
    bmiValue.style.color = info.color;
    bmiDesc.textContent = info.label;
    
    badge.style.backgroundColor = info.color;
    badge.style.color = '#fff';

    // Update indicator position
    let percentage = ((bmi - 15) / (40 - 15)) * 100;
    percentage = Math.max(5, Math.min(95, percentage));
    
    gsap.to(indicator, {
        duration: 0.5,
        left: `${percentage}%`,
        borderColor: info.color,
        ease: "power2.out",
    });
};

document.getElementById('imc-form').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const weight = parseFloat(document.getElementById('weight').value);
    let height = parseFloat(document.getElementById('height').value);

    if (height > 3) height /= 100; // Auto-convert cm to m

    const bmi = weight / (height * height);
    updateUI(bmi);
});

window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.remove("js-loading");

    // Animations on page load
    gsap.from(".hero-title", {
        duration: 0.8,
        opacity: 0,
        y: -30,
        ease: "power2.out",
        delay: 0.2,
    });

    gsap.from(".hero-description", {
        duration: 0.8,
        opacity: 0,
        y: -30,
        ease: "power2.out",
        delay: 0.4,
    });

    gsap.from(".hero-image", {
        duration: 1,
        opacity: 0,
        scale: 0.8,
        ease: "elastic.out(1, 0.5)",
        delay: 0.6,
    });

    gsap.from(".calculator-box", {
        duration: 0.8,
        opacity: 0,
        y: 50,
        ease: "power2.out",
        delay: 0.8,
    });
});


