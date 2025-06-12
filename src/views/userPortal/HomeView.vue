<template>
    <van-nav-bar :fixed="true">
        <template #left>
            <div class="flex justify-start">
                <img
                    src="@/assets/image/logo.png"
                    alt="YRS"
                    class="w-8 h-8 rounded-lg bg-white p-1 mr-1"
                />
                <div>
                    <h5 class="text-left text-white text-xs mb-0">YRS</h5>
                    <p class="text-left text-white text-xs mb-0">
                        Yangon Railway Service
                    </p>
                </div>
            </div>
        </template>
    </van-nav-bar>
    <div class="bg-theme pt-14 px-3 pb-12"></div>

    <div class="relative p-3" style="top: -56px">
        <div class="origin-component">
            <van-field
                v-model="originStationTitle"
                is-link
                readonly
                label="Origin"
                placeholder="Select Origin"
                @click="originFieldClick"
            />
            <van-popup
                v-model:show="showOriginPicker"
                destroy-on-close
                position="bottom"
            >
                <van-picker
                    title="Station"
                    confirm-button-text="Confirm"
                    cancel-button-text="Cancel"
                    :columns="stations"
                    :columns-field-names="{ text: 'title', value: 'slug' }"
                    @confirm="originPickerConfirm"
                    @cancel="showOriginPicker = false"
                    @change="originPickerChange"
                />
            </van-popup>
        </div>

        <div class="destination-component">
            <van-field
                v-model="destinationStationTitle"
                is-link
                readonly
                label="Destination"
                placeholder="Select Destination"
                @click="destinationFieldClick"
            />
            <van-popup
                v-model:show="showDestinationPicker"
                destroy-on-close
                position="bottom"
            >
                <van-picker
                    title="Station"
                    confirm-button-text="Confirm"
                    cancel-button-text="Cancel"
                    :columns="stations"
                    :columns-field-names="{ text: 'title', value: 'slug' }"
                    @confirm="destinationPickerConfirm"
                    @cancel="showDestinationPicker = false"
                    @change="destinationPickerChange"
                />
            </van-popup>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useStationStore } from "@/stores/userPortal/stationStore";

    const stationStore = useStationStore();
    const page = ref(1);
    const last_page = ref(null);
    const finished = ref(false);
    const stations = ref([]);

    const originStationTitle = ref("");
    const originStationSlug = ref("");
    const showOriginPicker = ref(false);

    const destinationStationTitle = ref("");
    const destinationStationSlug = ref("");
    const showDestinationPicker = ref(false);

    // Fetch Station
    const fetchStation = async () => {
        if(finished.value == false) {
            await stationStore.get({
                page: page.value,
                search: "",
            });
            stations.value.push(...(stationStore.getResponse?.data ?? []));
            last_page.value = stationStore.getResponse?.meta.last_page ?? null;
            if(page.value >= last_page.value) {
                finished.value = true;
            } else {
                page.value++;
            }
        }
    }

    // Origin Stations
    const originFieldClick = () => {
        showOriginPicker.value = true;
        fetchStation();
    };
    const originPickerConfirm = ({ selectedOptions }) => {
      originStationTitle.value = selectedOptions[0]?.title;
      originStationSlug.value = selectedOptions[0]?.slug;
      showOriginPicker.value = false;
    };
    const originPickerChange = ({selectedValues, selectedOptions, selectedIndexes, columnIndex}) => {
        if(stations.value[stations.value.length - 1]?.slug == selectedOptions[0]?.slug) {
            fetchStation();
        }
    };

    // Destination Stations
    const destinationFieldClick = () => {
        showDestinationPicker.value = true;
        fetchStation();
    };
    const destinationPickerConfirm = ({ selectedOptions }) => {
      destinationStationTitle.value = selectedOptions[0]?.title;
      destinationStationSlug.value = selectedOptions[0]?.slug;
      showDestinationPicker.value = false;
    };
    const destinationPickerChange = ({selectedValues, selectedOptions, selectedIndexes, columnIndex}) => {
        if(stations.value[stations.value.length - 1]?.slug == selectedOptions[0]?.slug) {
            fetchStation();
        }
    };
    
</script>
<style scope></style>
