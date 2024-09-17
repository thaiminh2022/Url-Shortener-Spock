<script lang="ts">
    import { onMount } from "svelte";
    import { pb } from "./pocketbase";
    import { generateId } from "./utils";

    interface URL {
        id?: string;
        name: string;
        url: string;
        shortenedID: string;
        clickTimes: number;
    }
    let urls: URL[] = [];

    onMount(async () => {
        urls = await pb.collection("urls").getFullList<URL>({
            sort: "created",
        });
        alert(generateId(10))
    });

    let urlName = "";
    let urlValue = "";

    async function addUrl() {
        const data: URL ={
            name: urlName,
            url: urlValue,
            shortenedID: "",
            clickTimes: 0,
        }
        await pb.collection('urls').create()
    }
</script>

<form on:submit|preventDefault>
    <label>
        URL Name:
        <input type="text" bind:value={urlName} />
    </label>
    <label>
        URL Name:
        <input type="url" bind:value={urlValue} />
    </label>
    <button>add url</button>
</form>

{#each urls as url (url.id)}
    <div>
        <strong>{url.name}</strong>
        <span>
            <p>{url.url}</p>
            <p>{url.shortenedID}</p>
            <p>{url.clickTimes}</p>
        </span>
    </div>
{/each}

