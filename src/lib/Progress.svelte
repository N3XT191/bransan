<script>
    export let title, percentage;
</script>

<div class="progress">
    <div class="progress-title">{title}</div>
    <div class="progress-container">
        <div class="progress-total">
            <div
                class="progress-filled"
                style={"width: " + percentage.toString() + "%"}
            />
        </div>
        <div class="progress-percentage">{percentage}%</div>
    </div>
</div>

<style>
    .progress {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }
    .progress-title {
        font-size: var(--title-font-size);
        font-weight: var(--title-font-weight);
        color: var(--title-color);
        margin-bottom: 8px;
        text-align: left;
    }
    .progress-percentage {

        font-size: var(--percentage-font-size);
        font-weight: var(--percentage-font-weight);
        color: var(--percentage-color);

    }
    .progress-container {
        height: var(--progress-height);
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .progress-total {
        background-color: var(--progress-bg-color);
        height: 100%;
        width: 100%;
        margin-right: 10px;
        border-radius: 2rem;
        display: flex;
        align-items: center;
        justify-content: left;
        box-sizing: border-box;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
            rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    }
    .progress-filled {
        background-color: var(--progress-color);
        border-radius: 2rem;
        height: 100%;
    }
</style>
