<template>
    <nav :class="{'has-shadow': hasScrollOffset}" class="navbar is-transparent has-background-blue-light" role="navigation" aria-label="main navigation">
        <div class="container py-2">
            <div class="navbar-brand">
                <a href="/" class="navbar-item">
                    <img src="@/assets/images/SaasLogoRevised.svg" alt="SaaSGlue logo" width="180" height="30">
                </a>
            </div>
            <div class="navbar-menu">
                <div class="navbar-start">
                    <MenuLink href="/solutions/cron" class="navbar-item">Solutions</MenuLink>
                    <MenuLink href="/pricing" class="navbar-item">Pricing</MenuLink>
                    <!-- <MenuLink href="/news" class="navbar-item">News</MenuLink> -->
                    <MenuLink href="/blog" class="navbar-item">Blog</MenuLink>
                    <MenuLink href="/docs" class="navbar-item">Docs</MenuLink>
                    <MenuLink href="/livedemo" class="navbar-item live-demo">Live Demo !</MenuLink>
                </div>
                <div class="navbar-end">
                    <div class="navbar-item">
                        <MenuLink target="_blank" href="https://console.saasglue.com/" class="button is-primary has-action-shadow">
                            <strong>Sign In</strong>
                        </MenuLink>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    import MenuLink from './MenuLink.vue';

    export default defineComponent({
        components: { MenuLink },

        data () {
            return {
                hasScrollOffset: false
            };
        },

        mounted (): void {
            document.addEventListener('scroll', this.onScroll);
        },

        unmounted (): void {
            document.removeEventListener('scroll', this.onScroll);
        },

        methods: {
            onScroll (): void {
                this.hasScrollOffset = document.documentElement.scrollTop > 60;
            }
        }
    });
</script>

<style scoped lang="scss">
    .navbar {
        position: sticky;
        top: 0;
        transition: box-shadow .3s linear;
        background-color: inherit;
    }

    .navbar-start {
        flex-grow: 1;
        justify-content: center;
    }

    .navbar-item {
        text-transform: uppercase;
    }

    .navbar.has-shadow {
        box-shadow: 0 0 10px RGB(0 0 0 / 30%);
    }

    .has-action-shadow {
        box-shadow: 0 18px 20px -15px RGB(0 0 0 / 40%);
    }

    .live-demo {
        color: #00BF90;
        font-weight: bold;
    }
</style>
