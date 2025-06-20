<template>
    <van-nav-bar
        title="Ticket Detail"
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
        <div v-if="ticketDetail != null">
            <div class="bg-theme pt-14 pb-20">
                <vue-qrcode :value="qr_token" class="w-52 h-52 bg-gray-100 rounded-lg mx-auto mb-3"></vue-qrcode>
                <div class="text-center">
                    <van-button 
                        type="default"
                        icon="replay"
                        plain
                        size="mini"
                        class="rounded-lg border-none"
                        :loading="regenerateQRBtnLoading"
                        @click="onRegenerateQR"
                    >
                        Regenerate QR
                    </van-button>
                </div>
            </div>

            <div class="p-3 relative" style="top: -74px">
                <van-cell-group inset class="mx-0 mb-3">
                    <van-cell title="Ticket Number" :value="ticketDetail.ticket_number"></van-cell>
                    <van-cell title="Type">
                        <template #value>
                            <span :style="{ color: `#${ticketDetail.type.color}` }">
                                {{ ticketDetail.type.text }}
                            </span>
                        </template>
                    </van-cell>
                    <van-cell title="Direction">
                        <template #value>
                            <span :style="{ color: `#${ticketDetail.direction.color}` }">
                                {{ ticketDetail.direction.text }}
                            </span>
                        </template>
                    </van-cell>
                    <van-cell title="Price" :value="ticketDetail.price"></van-cell>
                    <van-cell title="Created At" :value="ticketDetail.created_at"></van-cell>
                    <van-cell title="Valid At" :value="ticketDetail.valid_at"></van-cell>
                    <van-cell title="Expired At" :value="ticketDetail.expire_at"></van-cell>
                </van-cell-group>
            </div>
        </div>

        <div v-if="errorMessage != null" class="pt-14 px-3 pb-20">
            <div
                class="bg-white rounded-lg shadow-md flex justify-center items-center"
            >
                <van-empty
                    image="error"
                    :description="errorMessage"
                    class="text-center"
                />
            </div>
        </div>
    </van-pull-refresh>
</template>

<script setup>
import { nextTick, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useTicketDetailStore } from "@/stores/ticketDetailStore";
import { useRegenerateQRStore } from "@/stores/regenerateQRStore";
import { showSuccessToast } from "vant";

const router = useRouter();
const route = useRoute();
const ticketDetailStore = useTicketDetailStore();
const ticketDetail = ref(null);
const errorMessage = ref(null);
const refreshing = ref(false);

const qr_token = ref(null);
const regenerateQRBtnLoading = ref(false);
const regenerateQRStore = useRegenerateQRStore();

const onClickLeft = () => history.back();

const fetchTicketDetail = async () => {
    await ticketDetailStore.get(route.params.ticket_number);
    ticketDetail.value = ticketDetailStore.getResponse?.data;
    errorMessage.value = ticketDetailStore.getErrorMessage;
    refreshing.value = false;

    qr_token.value = ticketDetail.value.qr_token;
};

const onRegenerateQR = async () => {
    regenerateQRBtnLoading.value = true;
    await regenerateQRStore.store(qr_token.value);
    if (regenerateQRStore.getErrorMessage == null) {
        qr_token.value = regenerateQRStore.getResponse?.data;
        showSuccessToast(regenerateQRStore.getResponse?.message);
    }
    regenerateQRBtnLoading.value = false;
}

const onRefresh = () => {
    fetchTicketDetail();
    refreshing.value = false;
};

onMounted(() => {
    fetchTicketDetail();
});
</script>

<style scoped></style>
