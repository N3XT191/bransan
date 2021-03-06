<script>
  import moment from "moment";
  import Progress from "./lib/Progress.svelte";
  import BottomButtons from "./lib/BottomButtons.svelte";
  import { db, messaging } from "../firebase";
  import { DoubleBounce } from "svelte-loading-spinners";
  import { fade } from "svelte/transition";

  let loading = true;
  let progresses = [];
  let lastChecked = null;

  if (messaging !== null)
    messaging.onMessage((payload) => {
      loadData();
    });

  const loadData = async () => {
    loading = true;
    await db
      .collection("progressData")
      .orderBy("updatedOn", "desc")
      .limit(1)
      .get()
      .then((querySnapshot) => {
        const doc = querySnapshot.docs[0].data();
        progresses = doc.data;
        lastChecked = moment(doc.checkedOn.toDate()).fromNow();
        loading = false;
      });
  };
  loadData();
</script>

<main>
  {#if loading}
    <div id="loading-screen" transition:fade={{ duration: 800 }}>
      <DoubleBounce size="100" color="#2095f2" unit="px" duration="1s" />
    </div>
  {:else}
    <div id="center-screen" transition:fade={{ duration: 800 }}>
      <div id="container">
        {#if progresses !== []}
          {#each progresses as progress}
            <Progress title={progress.title} percentage={progress.percentage} />
          {/each}
          <div class="info">
            Last checked: {lastChecked}
          </div>
          <BottomButtons />
        {:else}
          <div class="error">Wait... Something went wrong.</div>
        {/if}
      </div>
    </div>
  {/if}
</main>

<style>
  #loading-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--background-color);
    padding: 10px;
    width: 100%;
    position: absolute;
  }
  #loading-screen::after {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
    z-index: -1;
    content: url("assets/background.svg");
  }

  #center-screen {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--background-color);
    padding: 10px;
    box-sizing: border-box;
  }
  #center-screen::after {
    content: "";
    background-image: url("assets/background.svg");
    background-position: center;
    background-repeat: repeat;
    background-size: contain;
    opacity: 0.5;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: 1;
  }
  #container {
    background-color: white;
    border-radius: 25px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding: 40px 60px;
    display: grid;
    grid-template-columns: 1;
    gap: 25px;
    z-index: 2;
  }
 
  .info {
    text-align: center;
    color: grey;
  }

  @media only screen and (max-width: 600px) {
    #container {
      border-radius: 0;
      width:100%;
    }
    #center-screen{
      padding:20px
    }
  }
  @media only screen and (min-width: 880px) {
    #container {
      min-width: 600px;
    }
  }
</style>
