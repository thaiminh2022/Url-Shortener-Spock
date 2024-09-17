<script lang="ts">
    import { currentUser, pb } from "./pocketbase";

    let username = "";
    let password = "";
    let errorMessage = "";

    async function login() {
        try {
            await pb.collection("users").authWithPassword(username, password);
        } catch (err) {
            errorMessage = "cannot login! please check your username, password";
            alert("cannot login\nerr: " + err);
        }
    }

    async function register() {
        const userData = {
            username: username,
            password: password,
            passwordConfirm: password,
        };

        try {
            await pb.collection("users").create(userData);
            await login();
        } catch (err) {
            errorMessage = "Cannot register, please try again";
            alert("cannot login, \nerr: " + err);
        }
    }
</script>

<form on:submit|preventDefault>
    <label>
        username
        <input type="text" bind:value={username} autocomplete="username"/>
    </label>
    <label>
        password
        <input type="password" min="10" bind:value={password} autocomplete="current-password"/>
    </label>

    <button on:click={register}>Register</button>
    <button on:click={login}>Login</button>
</form>

{#if errorMessage !== ""}
    <p style="color: red">{errorMessage}</p>
{/if}
