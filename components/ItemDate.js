import { StyleSheet, FlatList, View } from "react-native";
import React, { memo } from "react";
import HistItems from "./history/HistItems";

const ItemDate = ({ data, onSelect, active }) => {
    const flatListRef = React.useRef();

    const scrollToCurrentMonth = () => {
        if (flatListRef.current && active >= 0 && active < 12) {
            flatListRef.current.scrollToIndex({ animated: true, index: active });
        }
    };

    return (
        <>
            <FlatList
                ref={flatListRef}
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
                renderItem={({ item }) => <HistItems label={item.nom} id={item.id} onPress={(e) => onSelect(e)} active={item.id === active} />}
                onLayout={scrollToCurrentMonth}
                onScrollToIndexFailed={item => {
                    const wait = new Promise(resolve => setTimeout(resolve, 500));
                    wait.then(() => {
                        flatListRef.current?.scrollToIndex({ index: item.index, animated: true });
                    });
                }}
            />
        </>
    );
};

export default memo(ItemDate);

const styles = StyleSheet.create({});
