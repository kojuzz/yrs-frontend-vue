<template>
    <van-nav-bar
        title="Route Detail"
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
        <div v-if="routeDetail != null">
            <div class="bg-theme pt-14 pb-20">
                <h6 class="text-center text-white">
                    {{ routeDetail.title }}
                </h6>
                <p class="text-center text-white text-xs mb-0">
                    {{ routeDetail.description }}
                </p>
                <div class="text-center">
                    <span
                        class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset"
                    >
                        {{ routeDetail.direction.text }}
                    </span>
                </div>
            </div>
            <div class="p-3 relative" style="top: -74px">
                <!-- Origin and Destination -->
                <van-grid :border="false" :column-num="3" class="mb-5">
                    <van-grid-item class="origin-grid-item">
                        <p class="text-sm text-center text-theme mb-1">
                            Origin
                        </p>
                        <p class="text-xs text-center text-gray-700 mb-1">
                            {{ routeDetail.origin_station_title }}
                        </p>
                        <p class="text-xs text-center text-gray-500 mb-1">
                            {{ routeDetail.origin_station_time }}
                        </p>
                    </van-grid-item>
                    <van-grid-item>
                        <van-icon name="arrow" size="16" />
                    </van-grid-item>
                    <van-grid-item class="destination-grid-item">
                        <p class="text-sm text-center text-theme mb-1">
                            Destination
                        </p>
                        <p class="text-xs text-center text-gray-700 mb-1">
                            {{ routeDetail.destination_station_title }}
                        </p>
                        <p class="text-xs text-center text-gray-500 mb-1">
                            {{ routeDetail.destination_station_time }}
                        </p>
                    </van-grid-item>
                </van-grid>

                <!-- Total Stations and Traveling Time -->
                <van-grid :border="false" :column-num="2" class="mb-5">
                    <van-grid-item class="total-station-grid-item">
                        <p class="text-sm text-center text-theme mb-1">
                            Total Stations
                        </p>
                        <p class="text-xs text-center text-gray-700 mb-1">
                            {{ routeDetail.total_stations }} Stations
                        </p>
                    </van-grid-item>
                    <van-grid-item class="traveling-time-grid-item">
                        <p class="text-sm text-center text-theme mb-1">
                            Traveling Time
                        </p>
                        <p class="text-xs text-center text-gray-700 mb-1">
                            {{ routeDetail.travelling_minutes }} minutes
                        </p>
                    </van-grid-item>
                </van-grid>

                <!-- Schedule and Map -->
                <van-tabs>
                    <van-tab>
                        <template #title>Schedule</template>
                        <div class="py-2">
                            <van-steps 
                                direction="vertical" 
                                class="rounded-lg mb-5"
                            >                                
                                <van-step 
                                    v-for="station_schedule in routeDetail.station_schedules" 
                                    :key="station_schedule.slug"
                                >
                                    <template #active-icon>
                                        <img src="@/assets/image/station.png" alt="" class="w-6 h-6">
                                    </template>
                                    <template #inactive-icon>
                                        <img src="@/assets/image/station.png" alt="" class="w-6 h-6">
                                    </template>
                                    <template #finish-icon>
                                        <img src="@/assets/image/station.png" alt="" class="w-6 h-6">
                                    </template>
                                    <p class="text-sm text-gray-700">{{ station_schedule.title }}</p>
                                    <p class="text-xs text-gray-500">{{ station_schedule.time }}</p>
                                </van-step>
                            </van-steps>
                        </div>
                    </van-tab>
                    <van-tab>
                        <template #title>Map</template>
                        <div class="py-2">

                        </div>
                    </van-tab>
                </van-tabs>
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
import { useRouteDetailStore } from "@/stores/userPortal/routeDetailStore";

const onClickLeft = () => history.back();
const router = useRouter();
const route = useRoute();
const routeDetailStore = useRouteDetailStore();
const routeDetail = ref(null);
const errorMessage = ref(null);
const refreshing = ref(false);
let map = null;

const fetchRouteDetail = async () => {
    await routeDetailStore.get(route.params.slug);
    routeDetail.value = routeDetailStore.getResponse?.data;
    errorMessage.value = routeDetailStore.getErrorMessage;
    refreshing.value = false;
    // if (routeDetail.value != null) {
    //     nextTick(() => {
    //         initMap();
    //     });
    // }
};
const onRefresh = () => {
    fetchRouteDetail();
};

onMounted(() => {
    fetchRouteDetail();
});
</script>

<style scope>
    .origin-grid-item .van-grid-item__content {
        border-radius: 8px 0 0 8px !important;
    }
    .destination-grid-item .van-grid-item__content {
        border-radius: 0 8px 8px 0 !important;
    }
    .total-station-grid-item .van-grid-item__content {
        border-radius: 8px 0 0 8px !important;
    }
    .traveling-time-grid-item .van-grid-item__content {
        border-radius: 0 8px 8px 0 !important;
    }
</style>
