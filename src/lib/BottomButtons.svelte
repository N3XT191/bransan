<script>
    import { messaging } from "../../firebase";

    let notificationState = null;
    if (messaging !== null) {
        let notificationState = Notification.permission;
    }

    const toggleNotifications = async () => {
        if (notificationState === null) return;
        if (notificationState === "denied") return;
        await messaging
            .getToken({
                vapidKey:
                    "BMHHhXb5GBbGncoNwWtkcRw_EPe2wQh9zB1SL13AEH7zVKlyd2xIqtUwN1RfU_g7yQBXEwdmArexFGG01Swhepc",
            })
            .then((token) => {
                console.log(token);
                fetch("https://bransan.vercel.app/api/subscribe", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token: token }),
                })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                notificationState = Notification.permission;
            })
            .catch((error) => {
                console.log(error);
                console.log("permission not given");
                notificationState = Notification.permission;
            });
    };
</script>

<div id="button-container">
    {#if messaging === null}
        <button id="notification-button" class="button fixed">
            Notifications unsupported
        </button>
    {:else}
        <button
            id="notification-button"
            class="button"
            class:fixed={notificationState !== "default"}
            on:click={toggleNotifications}
        >
            {notificationState === "default"
                ? "Enable notifications"
                : notificationState === "granted"
                ? "Notifications enabled"
                : "Notifications blocked"}
        </button>
    {/if}

    <div id="dot" />
    <a
        class="button"
        href="https://github.com/shajidhasan/bransan"
        id="github-button"
        target="_blank">GitHub</a
    >
</div>

<style>
    #button-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    #dot {
        height: 5px;
        width: 5px;
        background-color: grey;
        border-radius: 50%;
    }
    .button {
        text-decoration: none;
        border: none;
        background-color: white;
        padding: 0px;
        font-size: 0.8rem;
        cursor: pointer;
        color: var(--progress-color);
        font-family: "Comfortaa", cursive;
    }
    .fixed {
        color: grey;
    }
    #notification-button {
        margin-right: 5px;
    }
    #github-button {
        margin-left: 5px;
    }
</style>
