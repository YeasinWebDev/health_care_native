import React, { useState } from "react";
import { Modal, View, Pressable, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Button, H4, Text, XStack, YStack } from "tamagui";
import Feather from "@expo/vector-icons/Feather";

export function TableDropdown({ Icon, }: { Icon?: any;}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <Button icon={Icon} onPress={() => setVisible(true)} />

      {/* Modal */}
      <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
        {/* Backdrop */}
        <TouchableWithoutFeedback onPress={() => setVisible(false)}>
          <View style={styles.backdrop}>
            {/* Prevent closing when clicking inside */}
            <TouchableWithoutFeedback>
              <View style={styles.container}>
                <YStack gap="$2" width={200}>
                  <Button
                    onPress={() => {
                      setVisible(false);
                      // your custom action
                    }}
                  >
                    <Feather name="eye" size={16} color="black" style={{ marginTop: 3 }} />
                    <Text>View</Text>
                  </Button>
                  <Button
                    onPress={() => {
                      setVisible(false);
                      // your custom action
                    }}
                  >
                    <Feather name="edit" size={16} color="black" />
                    <Text>Edit</Text>
                  </Button>
                </YStack>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    minWidth: 220,
    elevation: 10,
  },
});
