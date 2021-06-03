<script>
  import Progress from "./lib/Progress.svelte";

  let progresses = [];

  fetch("https://www.brandonsanderson.com/", {
    headers: {
      "Content-Type": "application/json",
      "API-Key": "secret",
    },
  })
    .then(function (response) {
      return response.text();
    })
    .then(function (html) {
      let parser = new DOMParser();
      let doc = parser.parseFromString(html, "text/html");

      let labels = doc.querySelectorAll(".vc_label");
      console.log(labels);
      let percentages = doc.querySelectorAll(".vc_bar");
      console.log(percentages);

      for (let i = 0; i < labels.length; i++) {
        progresses.push({
          title: labels[i].textContent,
          percentage: percentages[0].getAttribute("data-percentage-value"),
        });
      }
    })
    .catch(function (err) {
      console.log("Failed to fetch page: ", err);
    });
</script>

<main>
  <div id="center-screen">
    <div id="container">
      {#each progresses as progress}
        <Progress title={progress.title} percentage={progress.percentage} />
      {/each}
    </div>
  </div>
</main>

<svelte:head>
  <link rel="preconnect" href="https://fonts.gstatic.com" />
  <link
    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<style>
  main {
    font-family: "Montserrat";
  }

  #center-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--background-color);
    padding: 10px;
  }
  #container {
    box-sizing: border-box;
    max-width: 600px;
    background-color: white;
    border-radius: 25px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 80px;
    display: grid;
    grid-template-columns: 1;
    gap: 20px;
  }

  @media only screen and (max-width: 600px) {
    #container {
      padding: 40px;
    }
  }
</style>
