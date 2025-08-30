let len = 7;

function Display(value) {
    console.log(value);
    len = value;
    // Update all ChangeLength
    let ele = document.getElementsByClassName("ChangeLength");
    for (let i = 0; i < ele.length; i++) {
        ele[i].innerText = value;
    }

    // Select first Circle element
    let circle = document.getElementsByClassName("Circle")[0];

    if (value > 10) {
        circle.style.backgroundColor = "green";
    } else if (value <= 10 && value > 7) {
        circle.style.backgroundColor = "yellow";
    } else {
        circle.style.backgroundColor = "red";
    }
}

// going to make constraints for api 
// -------------------- Checkbox Counter --------------------
const checkboxes = document.querySelectorAll("input[type=checkbox]");

function countChecked() {
    let count = 0;
    checkboxes.forEach(box => {
        if (box.checked) count++;
    });
    console.log("Checked:", count); // 👉 Shows count in console
}

// Run once at start
countChecked();

// Add event listeners to all checkboxes
checkboxes.forEach(box => {
    box.addEventListener("change", countChecked);
});

async function api() {

    const apiKey = "FxyJoXZXw9Vh5GR0vYFHSA==z2bya1dkdYT41s0I";
    const url = `https://api.api-ninjas.com/v1/passwordgenerator?length=${len}`;
    let obj ;
    await fetch(url, {
        method: "GET",
        headers: {
            "X-Api-Key": apiKey
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log("Generated password:", data.random_password);
            obj = data.random_password;

        })
        .catch(error => {
            console.error("Error:", error);
        });
        return obj;
}

let passwordGenerator = document.querySelector("#Generator");
passwordGenerator.addEventListener("click", async () => {
    let pass = await api();
    console.log("Final password is:", pass);

    // Select the element where you want to show password
    let Showing = document.querySelector(".ShowPass");
    Showing.innerHTML = `<p>${pass}</p>`;
});


