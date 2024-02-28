import { Dimensions, Platform, View } from "react-native";
import React, { memo, useEffect, useState } from "react";
import { LineChart } from "react-native-chart-kit";
import { format, subYears } from "date-fns";
import { dateString } from "../../utilies/datetime";

const groupDataByDay = (data) => {
    const groupedData = {};

    data.forEach((item) => {
        const dayKey = dateString(item.createdAt);

        if (!groupedData[dayKey]) {
            groupedData[dayKey] = 0;
        }

        groupedData[dayKey] += item.amount;
    });

    return groupedData;
};

const generateChartData = (groupedData) => {
    const entries = Object.entries(groupedData);
    entries.sort((a, b) => new Date(a[0]) - new Date(b[0]));

    let labels = entries.map(([day]) => day);
    const values = entries.map(([_, value]) => value);

    console.log('labels...........', labels)

    if (labels.length > 6) {
        const indices = [
            0,
            Math.round(labels.length * 1 / 4),
            Math.round(labels.length * 1 / 2),
            Math.floor(labels.length * 3 / 4),
            labels.length - 1
        ];
        if(!indices[2]%2) indices[2] = indices[2] -1
        console.log('indices...........', indices)
        labels = Array(labels.length).fill("").map((_, index) => indices.includes(index) ? labels[index] : "");
    }

    console.log('finally...........', labels)

    return { labels, values };
};

const HistChart = ({ data = [] }) => {
    const [labels, setLabels] = useState(["0"]);
    const [values, setValues] = useState([0]);

    useEffect(() => {
        const lastYear = subYears(new Date(), 1).setDate(1);
        const filteredData = data.filter(
            (item) => new Date(item.createdAt) >= lastYear
        );

        const groupedData = groupDataByDay(filteredData);
        const formattedChartData = generateChartData(groupedData);
        setLabels(formattedChartData.labels);
        setValues(formattedChartData.values);
    }, [data]);

    return (
        <View>
            <LineChart
                data={{
                    labels,
                    datasets: [
                        {
                            data: values,
                        },
                    ],
                }}
                width={Dimensions.get("screen").width}
                height={220}
                yAxisSuffix=" F"
                yAxisInterval={1}
                chartConfig={{
                    backgroundColor: "#ffffff",
                    backgroundGradientFrom: "#ffffff",
                    backgroundGradientTo: "#ffffff",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(197, 226, 245, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(33, 33, 33, ${opacity})`,
                    propsForDots: {
                        r: "5",
                        strokeWidth: "2",
                        stroke: "#0E9CFF",
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                }}
            />
        </View>
    );
};

export default memo(HistChart);
