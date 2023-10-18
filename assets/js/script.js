const baseUrl = "https://covid-193.p.rapidapi.com/statistics";

async function fetchDataByCountry(country) {
  const url = `${baseUrl}?country=${country}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "94a56e86d7mshcfab305ae016d14p1759f1jsn4604c082ab7e",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (response.ok) {
      if (data.results === 0) {
        const errorAlert = document.getElementById("error");
        errorAlert.innerHTML =
          '<i class="fa-solid fa-circle-exclamation fa-beat"></i> Sorry, your data was not found';
        errorAlert.classList.add("fade-in");
        errorAlert.style.display = "block";

        // Time to fade
        setTimeout(() => {
          errorAlert.classList.add("active");
        }, 100);
      } else {
        const statistics = data.response[0];
        const country = statistics.country;
        const continent = statistics.continent;
        const day = formatDate(statistics.day);
        const activeCases = statistics.cases.active.toLocaleString() ?? "Null";
        const totalCases = statistics.cases.total.toLocaleString() ?? "Null";
        const criticalCases =
          statistics.cases.critical.toLocaleString() ?? "Null";
        const totalDeaths = statistics.deaths.total.toLocaleString() ?? "Null";
        const recoveredCases =
          statistics.cases.recovered.toLocaleString() ?? "Null";
        const totalTests = statistics.tests.total.toLocaleString() ?? "Null";

        document.getElementById("country").textContent = country;
        document.getElementById("continent").textContent = continent;
        document.getElementById("day").textContent = day;
        document.getElementById("active").textContent = activeCases;
        document.getElementById("cases").textContent = totalCases;
        document.getElementById("critical").textContent = criticalCases;
        document.getElementById("deaths").textContent = totalDeaths;
        document.getElementById("recovered").textContent = recoveredCases;
        document.getElementById("tests").textContent = totalTests;

        const errorAlert = document.getElementById("error");
        errorAlert.textContent = "";
        errorAlert.style.display = "none";
      }
    } else {
      console.error("Error fetching data:", data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function handleSubmitSearch(event) {
  event.preventDefault();
  const country = document.getElementById("countryInput").value;
  document.getElementById("countryInput").value = "";
  fetchDataByCountry(country);
}

// validation date
function formatDate(dateString) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const today = new Date(dateString).toLocaleDateString(undefined, options);
  return today;
}

// your form
var form = document.getElementById("search");

// attach event listener
form.addEventListener("submit", handleSubmitSearch, true);
