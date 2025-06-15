import { useStationStore } from "@/stores/stationStore";
import { useRouteStore } from "@/stores/routeStore";
import { useWalletTransactionStore } from "@/stores/walletTransactionStore";

const stores = {
    routeStore: useRouteStore(),
    stationStore: useStationStore(),
    walletTransactionStore: useWalletTransactionStore()
};

const useStoreHelper = (storeName) => {
    return stores[storeName]
};

export { useStoreHelper };