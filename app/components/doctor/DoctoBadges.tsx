import { Card, Text } from "tamagui";

export const StatusBadge = ({ status }: { status: string }) => {
  const style = status === "SCHEDULED" ? { bg: "$blue3", color: "$blue10" } : status === "COMPLETED" ? { bg: "$green3", color: "$green10" } : { bg: "$gray3", color: "$gray10" };

  return (
    <Card backgroundColor={style.bg} px="$3" py="$1.5" borderRadius="$10">
      <Text fontSize="$2" fontWeight="700" color={style.color}>
        {status}
      </Text>
    </Card>
  );
};

export const PaymentBadge = ({ paid }: { paid: string }) => {
  const style = paid === "PAID" ? { bg: "$green3", color: "$green10", text: "Paid" } : { bg: "$red3", color: "$red10", text: "Unpaid" };

  return (
    <Card backgroundColor={style.bg} px="$3" py="$1.5" borderRadius="$10">
      <Text fontSize="$2" fontWeight="700" color={style.color}>
        {style.text}
      </Text>
    </Card>
  );
};

export const PrescriptionBadge = ({ provided }: { provided: any }) => {
  if (!provided) return <Text>-</Text>;

  return (
    <Card backgroundColor="$green2" px="$3" py="$1.5" borderRadius="$10">
      <Text fontSize="$2" fontWeight="700" color="$green10">
        Provided
      </Text>
    </Card>
  );
};