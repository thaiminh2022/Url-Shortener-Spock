<script lang="ts">
    import { onMount } from "svelte";
    import Dashboard from "./lib/Dashboard.svelte";
    import Login from "./lib/Login.svelte";
    import { currentUser, pb } from "./lib/pocketbase";
    async function logout() {
        pb.authStore.clear();
    }

    onMount(async () => {
        const queryString = window.location.search;
        if (queryString) {
            const urlParams = new URLSearchParams(queryString);
            const id = urlParams.get("id");
            if (!id) return;

            try {
                const record = await pb.collection("urls").getOne(id);
                alert("redirecting")
                window.location.replace(record.url)
            } catch (err) {
                alert!(
                    "Url was not found, you sure about your url?\n err: " + err,
                );
            }
        }
    });
</script>

{#if !$currentUser}
    <Login />
{:else}
    Login as {$currentUser.username}
    <button on:click={logout}>Logout</button>
    <Dashboard />
{/if}
