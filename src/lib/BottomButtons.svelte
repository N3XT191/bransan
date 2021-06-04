<script>
    import { messaging } from "../../firebase";

    let notificationEnabled = false;
    if (Notification.permission === "granted") {
        notificationEnabled = true;
    }

    const toggleNotifications = async (event) => {
        event.preventDefault();
        messaging
            .getToken({vapidKey: "BMHHhXb5GBbGncoNwWtkcRw_EPe2wQh9zB1SL13AEH7zVKlyd2xIqtUwN1RfU_g7yQBXEwdmArexFGG01Swhepc"})
            .then((token) => {
                console.log(token);
                notificationEnabled = true;
            })
            .catch((error) => {
                console.log(error);
                console.log("permission not given");
            });
    };
</script>

{#if notificationEnabled}
    <button> notification enabled </button>
{:else}
    <button on:click={toggleNotifications}> notification disabled </button>
{/if}

<style>
</style>
