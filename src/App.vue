<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <header>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/posts">Posts</RouterLink>
        </nav>
    </header>

    <div class="container mx-auto">
        <RouterView />
    </div>
</template>

<style scoped lang="scss">
header {
    nav {
        width: 100%;
        font-size: 14px;
        text-align: center;
        margin-top: 2rem;

        a {
            display: inline-block;
            padding: 0 1rem;
            border-left: 1px solid gray;
            color: inherit;
            transition: color 0.3s ease;

            &.router-link-exact-active {
                color: hsla(160, 100%, 37%, 1);
            }

            &:first-of-type {
                border: 0;
            }
        }
    }
}
</style>
