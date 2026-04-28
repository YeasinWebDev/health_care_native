import React, { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Card, Text, XStack, YStack, Separator, Spinner, Button } from "tamagui";

import { TableDropdown } from "../TableDropdown";
import { PaymentBadge, PrescriptionBadge, StatusBadge } from "./DoctoBadges";
import { useGetDoctorAppointments } from "../../hooks/doctor/useDoctorAppointment";
import { formatDateTime } from "../../utils/formatDateTime";
import AppointmentFilters from "../AppointmentFilters";

const COL = {
  patient: 200,
  date: 200,
  status: 140,
  payment: 140,
  prescription: 160,
  actions: 100,
};

const LIMIT = 4;

export default function DoctorAppointment() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const { data, isLoading, error } = useGetDoctorAppointments({
    page,
    limit: LIMIT,
  });

  const appointments = data?.data?.data || [];
  const meta = data?.data?.meta;
  const totalPages = meta?.totalPages || Math.ceil((meta?.total ?? 0) / LIMIT) || 1;
  const currentPage = meta?.page || page;

  if (isLoading) {
    return <Spinner scale={1.2} />;
  }

  if (error) {
    return (
      <Card p="$4">
        <Text color="red">Failed to load appointments</Text>
      </Card>
    );
  }

  console.log(meta, "meta")
  return (
    <Card borderRadius="$6">
      {/* Header */}
      <YStack mt="$3" ml="$2" mb="$2">
        <Text fontSize="$6" fontWeight="800">
          Appointments
        </Text>
        <Text fontSize="$2" theme="alt2">
          Manage all patient appointments in one place
        </Text>
      </YStack>

      <AppointmentFilters
        status={status}
        setStatus={(val) => {
          setPage(1);
          setStatus(val);
        }}
        paymentStatus={paymentStatus}
        setPaymentStatus={(val) => {
          setPage(1);
          setPaymentStatus(val);
        }}
        sortOrder={sortOrder}
        setSortOrder={(val) => {
          setPage(1);
          setSortOrder(val);
        }}
        onReset={() => {
          setPage(1);
          setStatus("");
          setPaymentStatus("");
          setSortOrder("desc");
        }}
      />
      {/* Table */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} bounces={false}>
        <YStack minWidth={1000} mt="$2" height={330}>

          {/* HEADER */}
          <XStack bg="$gray2" py="$3" px="$3" borderRadius="$4">
            <Text width={COL.patient} fontWeight="800">Patient</Text>
            <Text width={COL.date} fontWeight="800">Date & Time</Text>
            <Text width={COL.status} fontWeight="800">Status</Text>
            <Text width={COL.payment} fontWeight="800">Payment</Text>
            <Text width={COL.prescription} fontWeight="800">Prescription</Text>
            <Text width={COL.actions} textAlign="right" fontWeight="800">
              Actions
            </Text>
          </XStack>

          <Separator />

          {/* ROWS */}
          {appointments.map((item: any, index: number) => {
            const isEven = index % 2 === 0;

            return (
              <XStack
                key={item.id}
                py="$3"
                px="$3"
                backgroundColor={isEven ? "$gray4" : "$gray1"}
                alignItems="center"
              >
                {/* Patient */}
                <YStack width={COL.patient}>
                  <Text fontWeight="700">{item.patient.name}</Text>
                  <Text fontSize="$2" theme="alt2">
                    {item.patient.email}
                  </Text>
                </YStack>

                {/* Date */}
                <YStack width={COL.date}>
                  <Text fontWeight="700">{formatDateTime(item.schedule.startDateTime).date}</Text>
                  <Text fontSize="$2" theme="alt2">
                    {formatDateTime(item.schedule.startDateTime).time}
                  </Text>
                </YStack>

                {/* Status */}
                <XStack width={COL.status}>
                  <StatusBadge status={item.status} />
                </XStack>

                {/* Payment */}
                <XStack width={COL.payment}>
                  <PaymentBadge paid={item.paymentStatus} />
                </XStack>

                {/* Prescription */}
                <XStack width={COL.prescription}>
                  <PrescriptionBadge provided={item.prescription} />
                </XStack>

                {/* Actions */}
                <XStack width={COL.actions} justifyContent="flex-end">
                  <TableDropdown
                    Icon={() => (
                      <Entypo name="dots-three-vertical" size={18} />
                    )}
                  />
                </XStack>
              </XStack>
            );
          })}
        </YStack>
      </ScrollView>

      {/* Pagination */}
      <XStack mt="$4" justifyContent="space-between" alignItems="center" px="$2" backgroundColor='$colorTransparent'>
        <Button
          disabled={page === 1}
          onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
          backgroundColor='$blue9'
          disabledStyle={{ backgroundColor: 'grey' }}
        >
          <Text color='white'>Previous</Text>
        </Button>

        <Text fontWeight="700">
          Page {page} of {totalPages}
        </Text>

        <Button
          disabled={page === totalPages}
          onPress={() => setPage((prev) => prev + 1)}
          backgroundColor='$blue9'

          disabledStyle={{ backgroundColor: 'grey' }}
        >
          <Text color='white'>Next</Text>
        </Button>
      </XStack>
    </Card>
  );
}