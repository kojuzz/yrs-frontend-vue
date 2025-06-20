<template>
    <van-nav-bar
        title="Wallet Transaction Detail"
        :fixed="true"
        left-arrow
        @click-left="onClickLeft"
    />
    <van-pull-refresh
        v-model="refreshing"
        pulling-text="Pull to refresh"
        loosing-text="Release to refresh"
        loading-text="Loading..."
        success-text="Refresh success"
        @refresh="onRefresh"
    >
    
        <div v-if="walletTransactionDetail != null">
            
            <div class="bg-theme pt-14 pb-20">
                <img :src="walletTransactionDetail.type.icon" alt="" class="w-20 h-20 p-2 bg-gray-100 rounded-lg mx-auto mb-3">
                <div class="text-center">
                    <van-tag color="#fcfcfc" :text-color="`#${walletTransactionDetail.type.color}`" size="medium" round>
                        {{ walletTransactionDetail.type.text }}
                    </van-tag>
                </div>
            </div>

            <div class="p-3 relative" style="top: -74px">            
                <van-cell-group inset class="mx-0 mb-3">
                    <van-cell title="Trx ID" :value="walletTransactionDetail.trx_id"></van-cell>
                    <van-cell title="From" :value="walletTransactionDetail.from"></van-cell>
                    <van-cell title="To" :value="walletTransactionDetail.to"></van-cell>
                    <van-cell title="Type" :value="walletTransactionDetail.type.text"></van-cell>
                    <van-cell title="Amount">
                        <template #value>
                            <span :style="{ color: `#${walletTransactionDetail.type.color}` }">
                                {{ walletTransactionDetail.method.sign }}{{ walletTransactionDetail.amount }}
                            </span>
                        </template>
                    </van-cell>
                    <van-cell title="Type" :value="walletTransactionDetail.created_at"></van-cell>
                    <van-cell title="Description" :value="walletTransactionDetail.description"></van-cell>
                </van-cell-group>
            </div>
        </div>

        <div v-if="errorMessage != null" class="pt-14 px-3 pb-20">
            <div class="bg-white rounded-lg shadow-md flex justify-center items-center">
                <van-empty image="error" :description="errorMessage" class="text-center" />
            </div>
        </div>
    </van-pull-refresh>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useWalletTransactionDetailStore } from "@/stores/walletTransactionDetailStore";

const router = useRouter();
const route = useRoute();
const walletTransactionDetailStore = useWalletTransactionDetailStore();
const walletTransactionDetail = ref(null);
const errorMessage = ref(null);
const refreshing = ref(false);

const onClickLeft = () => history.back();

const fetchWalletTransactionDetail = async () => {
    await walletTransactionDetailStore.get(route.params.trx_id);
    walletTransactionDetail.value = walletTransactionDetailStore.getResponse?.data;
    errorMessage.value = walletTransactionDetailStore.getErrorMessage;
    refreshing.value = false;
};

const onRefresh = () => {
    fetchWalletTransactionDetail();
    refreshing.value = false;
};

onMounted(() => {
    fetchWalletTransactionDetail();
});

</script>

<style scoped></style>
