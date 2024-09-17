<script lang="ts">
    import Dashboard from "./lib/Dashboard.svelte";
    import Login from "./lib/Login.svelte";
    import { currentUser, pb } from "./lib/pocketbase";
    async function logout() {
        pb.authStore.clear();
    }
</script>

{#if !$currentUser}
    <Login />
{:else}
        Login as {$currentUser.username}
        <button on:click={logout}>Logout</button>
    <Dashboard />
{/if}
