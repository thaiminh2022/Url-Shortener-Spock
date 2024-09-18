<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { currentUser, pb } from "./pocketbase";
    import { generateId } from "./utils";

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
</script>

<h2>Add url</h2>
<form on:submit|preventDefault={addUrl}>
    <label>
        URL Name:
        <input type="text" bind:value={urlName} required />
    </label>
    <label>
        URL:
        <input type="url" bind:value={urlValue} required />
    </label>
    <button type="submit">add url</button>
</form>

<h2>Dashboard</h2>
<section>
    {#each urls as url (url.id)}
        <div>
            <strong>{url.name}</strong>
            <span>
                <p>{url.url}</p>
                <p>{url.id}</p>
                <p>{url.clickTimes}</p>
            </span>
        </div>
    {/each}
</section>
