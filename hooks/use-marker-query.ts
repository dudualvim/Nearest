import { useSocket } from "@/components/providers/socket-provider";
import { useInfiniteQuery } from "@tanstack/react-query";
import qs from "query-string";

interface MarkerQueryProps {
    queryKey: string,
    apiUrl: string,
    paramKey: "lobbyId" | "placeId",
    paramValue: string,
};

export const useMarkerQuery = ({
    queryKey,
    apiUrl,
    paramKey,
    paramValue,
}: MarkerQueryProps) => {
    const { isConnected  } = useSocket();

    const fetchMarkers = async ({ pageParam = undefined }) => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query:{
                cursor: pageParam,
                [paramKey]: paramValue,
            }
        }, {skipNull: true}); 

        const res = await fetch(url);
        return res.json();
    };

   
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMarkers,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: isConnected ? false : 1000,
        initialPageParam: undefined,
    });

    return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
    };
}