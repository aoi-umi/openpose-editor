<script lang="ts">
import { GithubOutlined, StarOutlined } from '@ant-design/icons-vue';
import { onMounted, ref } from 'vue';

export default {
    name: 'HeaderComp',
    components: {
        GithubOutlined,
        StarOutlined,
    },
    setup(props) {
        const env = import.meta.env;
        let stars = ref<number | null>(null);
        const repoName = env.VITE_GIT_REPO;
        const repoOwner = env.VITE_GIT_OWNER;
        onMounted(async () => {

            try {
                const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}`);
                if (response.ok) {
                    const data = await response.json();
                    stars.value = data.stargazers_count;
                } else {
                    console.error("Failed to fetch star count from GitHub");
                }
            } catch (error) {
                console.error("Error fetching star count:", error);
            }
        });

        return {
            stars,
            repoOwner,
            repoName,
        };
    },
};
</script>

<template>
    <header>
        <a-affix :offset-top="0">
            <a-page-header>
                <template #title>
                    <a-space>
                        <a :href="`https://github.com/${repoOwner}/${repoName}`"
                            target="_blank"><github-outlined /></a>
                        <span><b>{{ repoName }}</b></span>
                        <a v-if="stars !== null" :href="`https://github.com/${repoOwner}/${repoName}/stargazers`"
                            target="_blank">
                            {{ stars }} <star-outlined />
                        </a>
                    </a-space>
                </template>
            </a-page-header>
        </a-affix>
    </header>
</template>
