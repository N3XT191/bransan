<script>
  import Progress from "./lib/Progress.svelte";
  import db from "../firestore";

  let loading = true;
  let progresses = [];

  db.collection("progressData")
    .orderBy("updatedOn")
    .limit(1)
    .get()
    .then((querySnapshot) => {
      console.log(querySnapshot);
      let doc = querySnapshot.docs[0];
      progresses = doc.data().data;
      loading = false;
      console.log(progresses);
    });
</script>

<main>
  <div id="center-screen">
    <div id="container">
      {#if loading}
        <div class="loading">Loading data! Please wait.</div>
      {:else}
        {#each progresses as progress}
          <Progress title={progress.title} percentage={progress.percentage} />
        {:else}
          <div class="error">Wait... Something went wrong.</div>
        {/each}
      {/if}
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
