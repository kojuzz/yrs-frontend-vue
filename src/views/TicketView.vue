<template>
    <van-nav-bar
        title="Ticket"
        :fixed="true"
        left-arrow
        @click-left="onClickLeft"
    />
    <div class="pt-[46px]"></div>
    <List :store-name="`ticketStore`" :query-parameters="{}" />
</template>

<script setup>
import List from "@/components/List.vue";
import {useRouter} from "vue-router";

const router = useRouter();

const onClickLeft = () => {
    router.back();
};
</script>

<style scoped></style>
