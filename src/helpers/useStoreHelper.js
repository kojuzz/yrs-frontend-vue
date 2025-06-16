import { useStationStore } from "@/stores/stationStore";
import { useRouteStore } from "@/stores/routeStore";
import { useTopUpHistoryStore } from "@/stores/topUpHistoryStore";
import { useWalletTransactionStore } from "@/stores/walletTransactionStore";
import { useTicketStore } from "@/stores/ticketStore";
import { useTicketDetailStore } from "@/stores/ticketDetailStore";

const stores = {
    routeStore: useRouteStore(),
    stationStore: useStationStore(),
    topUpHistoryStore: useTopUpHistoryStore(),
    walletTransactionStore: useWalletTransactionStore(),
    ticketStore: useTicketStore(),
    ticketDetailStore: useTicketDetailStore()
};

const useStoreHelper = (storeName) => {
    return stores[storeName]
};

export { useStoreHelper };