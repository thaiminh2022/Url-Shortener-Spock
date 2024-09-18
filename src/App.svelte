<script lang="ts">
    import { onMount } from "svelte";
    import Dashboard from "./lib/Dashboard.svelte";
    import Login from "./lib/Login.svelte";
    import { currentUser, pb } from "./lib/pocketbase";
    import "./reset.css";
    async function logout() {
        pb.authStore.clear();
    }
    interface URL {
        id?: string;
        user: string;
        name: string;
        url: string;
        clickTimes: number;
    }
    let hasPramsID = false;
    onMount(async () => {
        const queryString = window.location.search;
        if (queryString) {
            const urlParams = new URLSearchParams(queryString);
            const id = urlParams.get("id");
            if (!id) return;

            hasPramsID = true;
            try {
                const record: URL = await pb.collection("urls").getOne(id);
                const newClickTimes = record.clickTimes + 1;

                const data = {
                    ...record,
                    clickTimes: newClickTimes,
                };
                await pb.collection("urls").update(id, data);
                window.location.replace(record.url);
            } catch (err) {
                alert!(
                    "Url was not found, you sure about your url?\n err: " + err,
                );
            }
        }
    });
</script>

{#if hasPramsID}
    Redirecting...
{:else if !$currentUser}
    <Login />
{:else}
    Login as {$currentUser.username}
    <button on:click={logout}>Logout</button>
    <Dashboard />
{/if}
