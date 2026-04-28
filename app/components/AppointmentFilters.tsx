import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Select, Text, Adapt, Sheet } from "tamagui";

type AppointmentStatus =
  | ""
  | "SCHEDULED"
  | "INPROGRESS"
  | "COMPLETED"
  | "CANCEL";

type PaymentStatus = "" | "PAID" | "UNPAID";

type SortOrder = "asc" | "desc";

type Props = {
  status: AppointmentStatus;
  setStatus: (val: AppointmentStatus) => void;

  paymentStatus: PaymentStatus;
  setPaymentStatus: (val: PaymentStatus) => void;

  sortOrder: SortOrder;
  setSortOrder: (val: SortOrder) => void;

  onReset: () => void;
};

export default function AppointmentFilters({
  status,
  setStatus,
  paymentStatus,
  setPaymentStatus,
  sortOrder,
  setSortOrder,
  onReset,
}: Props) {
  return (
    <View style={styles.row}>
      {/* STATUS */}
      <View style={styles.col}>
        <Text fontSize="$2" marginBottom="$1">
          Status
        </Text>

        <Select value={status} onValueChange={(val) => setStatus(val as any)}>
          <Select.Trigger width={150}>
            <Select.Value placeholder="All" />
          </Select.Trigger>

          <Adapt when="sm" platform="touch">
            <Sheet modal dismissOnSnapToBottom>
              <Sheet.Frame>
                <Sheet.ScrollView>
                  <Adapt.Contents />
                </Sheet.ScrollView>
              </Sheet.Frame>
              <Sheet.Overlay />
            </Sheet>
          </Adapt>

          <Select.Content>
            <Select.Viewport>
              <Select.Item index={0} value="">
                <Select.ItemText>All</Select.ItemText>
              </Select.Item>

              <Select.Item index={1} value="SCHEDULED">
                <Select.ItemText>SCHEDULED</Select.ItemText>
              </Select.Item>

              <Select.Item index={2} value="INPROGRESS">
                <Select.ItemText>INPROGRESS</Select.ItemText>
              </Select.Item>

              <Select.Item index={3} value="COMPLETED">
                <Select.ItemText>COMPLETED</Select.ItemText>
              </Select.Item>

              <Select.Item index={4} value="CANCEL">
                <Select.ItemText>CANCEL</Select.ItemText>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select>
      </View>

      {/* PAYMENT */}
      <View style={styles.col}>
        <Text fontSize="$2" marginBottom="$1">
          Payment
        </Text>

        <Select
          value={paymentStatus}
          onValueChange={(val) => setPaymentStatus(val as any)}
        >
          <Select.Trigger width={150}>
            <Select.Value placeholder="All" />
          </Select.Trigger>

          <Select.Content>
            <Select.Viewport>
              <Select.Item index={0} value="">
                <Select.ItemText>All</Select.ItemText>
              </Select.Item>

              <Select.Item index={1} value="PAID">
                <Select.ItemText>PAID</Select.ItemText>
              </Select.Item>

              <Select.Item index={2} value="UNPAID">
                <Select.ItemText>UNPAID</Select.ItemText>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select>
      </View>

      {/* SORT */}
      <View style={styles.col}>
        <Text fontSize="$2" marginBottom="$1">
          Sort
        </Text>

        <Select value={sortOrder} onValueChange={(val) => setSortOrder(val as any)}>
          <Select.Trigger width={150}>
            <Select.Value placeholder="Sort" />
          </Select.Trigger>

          <Select.Content>
            <Select.Viewport>
              <Select.Item index={0} value="desc">
                <Select.ItemText>Newest</Select.ItemText>
              </Select.Item>

              <Select.Item index={1} value="asc">
                <Select.ItemText>Oldest</Select.ItemText>
              </Select.Item>
            </Select.Viewport>
          </Select.Content>
        </Select>
      </View>

      {/* RESET */}
      <View style={styles.resetBtn}>
        <Button backgroundColor="$red9" onPress={onReset}>
          <Text color="white">Reset</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 8,
    marginBottom: 12,
    alignItems: "flex-end",
  },
  col: {
    flexDirection: "column",
    gap: 4,
  },
  resetBtn: {
    marginTop: 18,
  },
});