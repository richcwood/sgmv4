<template>
    <footer class="footer pb-0 has-background-blue-light">
        <div class="container">
            <div class="columns is-multiline content has-text-right-desktop has-text-centered-touch">
                <div class="column is-5-desktop is-full-touch has-text-left-desktop">
                    <h5 class="is-uppercase has-text-weight-bold has-text-centered-touch">Recent posts</h5>
                    <h6 v-for="article in articles" class="block article-link-block">
                        <a target="_blank" :title="article.title" :href="article.uri">{{ article.title }}</a>
                    </h6>
                </div>
                <div class="column">
                    <h5 class="is-uppercase has-text-weight-bold">Developers</h5>
                    <p><a href="/docs">Docs</a></p>
                    <p><a href="/solutions/cron">Solutions</a></p>
                </div>
                <div class="column">
                    <h5 class="is-uppercase has-text-weight-bold">Quick Links</h5>
                    <p><a target="_blank" href="https://console.saasglue.com">Sign In</a></p>
                    <p><a href="/blog">Blog</a></p>
                    <p><a href="/pricing">Pricing</a></p>
                </div>
                <div class="column">
                    <h5 class="is-uppercase has-text-weight-bold">Contact us</h5>
                    <p><a href="mailto:info@saasglue.com">info@saasglue.com</a></p>
                    <p><a href="mailto:help@saasglue.com">help@saasglue.com</a></p>
                </div>
            </div>
            <div class="columns is-vcentered py-3">
                <div class="column is-4 has-text-left-desktop has-text-centered-mobile">
                    <a href="/">
                        <img src="@/assets/images/SaasLogoRevised.svg" alt="SaaSGlue logo" width="180" height="30">
                    </a>
                </div>
                <div class="column has-text-left-desktop has-text-centered-touch">
                    <span class="pr-3"><a target="_blank" href="/privacy-policy.html">Privacy Policy</a></span>
                    <span class="pr-3"><a target="_blank" href="/terms-of-service.html">Terms of Use</a></span>
                    <p class="pr-3">Copyright © {{ new Date().getFullYear() }} SaaSGlue LLC</p>
                </div>
                <div class="column is-2">
                    <div class="level is-mobile">
                        <div class="level-right is-flex-grow-1">
                            <div class="level-item">
                                <figure class="image is-32x32">
                                    <a target="_blank" href="https://www.linkedin.com/company/saasglue/">
                                        <img src="@/assets/images/linkedin-icon.svg" alt="LinkedIn" />
                                    </a>
                                </figure>
                            </div>
                            <div class="level-item">
                                <figure class="image is-32x32">
                                    <a target="_blank" href="https://www.youtube.com/channel/UCX8IuYTUDtAZVEszO-tiKRA">
                                        <img src="@/assets/images/youtube-icon.svg" alt="Youtube" />
                                    </a>
                                </figure>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import articles, { Article } from '../pages/blog/articles';

export default defineComponent({
    name: 'MainFooter',

    computed: {
        articles(): Article[] {
            return articles.slice(-6);
        }
    }
});
</script>

<style scoped lang="scss">
@import 'bulma/sass/utilities/mixins';

.footer {
    background-color: inherit;
}

.has-line-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}

.article-link-block {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

@include touch {
    .footer {
        margin-bottom: 4rem;
    }
}
</style>
