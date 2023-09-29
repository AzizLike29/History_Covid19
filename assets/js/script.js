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
      const statistics = data.response[0];
      const country = statistics.country;
      const continent = statistics.continent;
      const day = statistics.day;
      const activeCases = statistics.cases.active;
      const totalCases = statistics.cases.total;
      const criticalCases = statistics.cases.critical;
      const totalDeaths = statistics.deaths.total;
      const recoveredCases = statistics.cases.recovered;
      const totalTests = statistics.tests.total;

      document.getElementById("country").textContent = country;
      document.getElementById("continent").textContent = continent;
      document.getElementById("day").textContent = day;
      document.getElementById("active").textContent = activeCases;
      document.getElementById("cases").textContent = totalCases;
      document.getElementById("critical").textContent = criticalCases;
      document.getElementById("deaths").textContent = totalDeaths;
      document.getElementById("recovered").textContent = recoveredCases;
      document.getElementById("tests").textContent = totalTests;
    } else {
      console.error("Error fetching data:", data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

document.getElementById("searchButton").addEventListener("click", function () {
  const country = document.getElementById("countryInput").value;

  fetchDataByCountry(country);
});
