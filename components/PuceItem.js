import { StyleSheet, Pressable, View, TextInput } from "react-native";
import React, { useRef, useState } from "react";

const PuceItem = ({ navigate }) => {
  const ref_input = useRef();
  const [pwd, setPwd] = useState("");

  return (
    <>
      <TextInput
        onSubmitEditing={() =>
          pwd.length > 3 ? navigate("OTPScreen") : null
        }
        ref={ref_input}
        keyboardType="numeric"
        maxLength={4}
        onChangeText={(pwd) => setPwd(pwd)}
        value={pwd}
        style={{ position: "absolute", opacity: 0 }}
      />
      <Pressable
        style={styles.ViewPuce}
        onPress={() => ref_input.current.focus()}
      >
        <View
          style={[
            styles.puce,
            {
              backgroundColor:
                pwd.length > 0 ? "#0372C1" : "rgba(3, 114, 193, 0.25)",
            },
          ]}
        ></View>
        <View
          style={[
            styles.puce,
            {
              backgroundColor:
                pwd.length > 1 ? "#0372C1" : "rgba(3, 114, 193, 0.25)",
            },
          ]}
        ></View>
        <View
          style={[
            styles.puce,
            {
              backgroundColor:
                pwd.length > 2 ? "#0372C1" : "rgba(3, 114, 193, 0.25)",
            },
          ]}
        ></View>
        <View
          style={[
            styles.puce,
            {
              backgroundColor:
                pwd.length > 3 ? "#0372C1" : "rgba(3, 114, 193, 0.25)",
            },
          ]}
        ></View>
      </Pressable>
    </>
  );
};

export default PuceItem;

const styles = StyleSheet.create({
  ViewPuce: {
    flexDirection: "row",
    gap: 25,
    marginTop: 45,
  },
  puce: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});
