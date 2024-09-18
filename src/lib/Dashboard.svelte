<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { currentUser, pb } from "./pocketbase";

    interface URL {
        id?: string;
        user: string;
        name: string;
        url: string;
        clickTimes: number;
    }
    let urls: URL[] = [];
    let unSub: () => void;

    onMount(async () => {
        urls = await pb.collection("urls").getFullList<URL>({
            sort: "created",
        });

        unSub = await pb
            .collection("urls")
            .subscribe("*", async ({ action, record }) => {
                if (action == "create") {
                    const user = await pb
                        .collection("users")
                        .getOne(record.user);
                    record.expand = user;
                    urls = [...urls, record as unknown as URL];
                } else if (action == "delete") {
                    urls = urls.filter((e) => e.id != record.id);
                }
            });
    });

    onDestroy(() => unSub());

    let urlName = "";
    let urlValue = "";

    async function addUrl() {
        if (!$currentUser) {
            alert("no login!, pls try again");
            return;
        }

        const data: URL = {
            name: urlName,
            user: $currentUser.id,
            url: urlValue,
            clickTimes: 0,
        };
        try {
            await pb.collection("urls").create(data);
        } catch (err) {
            alert(err);
        }
    }

    async function deleteUrl(id: string) {
        try {
            await pb.collection("urls").delete(id);
        } catch (err) {
            alert("Cannot delete url:\n, err:" + err);
        }
    }

    const baseUrl = window.location.origin;
    function copyUrl(id: string) {
        const url = baseUrl + "/?id=" + id;
        navigator.clipboard.writeText(url);
        alert("Copied the text: " + url);
    }
</script>

<h2>Add url</h2>
<form
    on:submit|preventDefault={addUrl}
    style="display:flex; flex-direction:column"
>
    <div style="display:flex; flex-direction: column; row-gap: 1rem">
        <div>
            <p>Url name</p>
            <input
                type="text"
                style="width:100%; padding-block: .3rem"
                bind:value={urlName}
                required
            />
        </div>
        <div>
            <p>Url</p>
            <input
                type="url"
                style="width:100%; padding-block: .3rem"
                bind:value={urlValue}
                required
            />
        </div>
    </div>

    <button type="submit" style="margin-top: .5rem; padding-block: .5rem"
        >Add url</button
    >
</form>

<h2>Dashboard</h2>
<section style="display:flex; flex-direction:column; row-gap: 1rem">
    {#each urls as url (url.id)}
        <div style="display:flex; flex-direction:column; row-gap: .3rem">
            <div style="display:flex; column-gap: 1rem">
                <p>Name: <span style="font-weight:bold">{url.name}</span></p>
                <p>Link: {url.url}</p>
                <p>Total click:{url.clickTimes}</p>
            </div>
            <p>Shorten: {baseUrl}/?id={url.id}</p>
            <div>
                <button on:click={() => deleteUrl(url.id ?? "")}>Delete</button>
                <button on:click={() => copyUrl(url.id ?? "")}>Copy</button>
            </div>
        </div>
    {/each}
</section>
