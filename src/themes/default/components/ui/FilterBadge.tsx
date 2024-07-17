import { Badge, Group, Text } from "@mantine/core";

export default function FilterBadge({
  value,
  title,
  count,
  onClick,
  activeTab,
}: {
  value: string;
  title: string;
  count: number;
  onClick: () => void;
  activeTab: string;
}) {
  return (
    <>
      <Badge
        variant={value === activeTab ? "white" : "transparent"}
        h="38"
        px={16}
        style={{
          border: "1px solid #D2D2D2",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <Group gap={10}>
          <Text fz={12} lh="14.1px" fw={400} tt="capitalize" c="#000000">
            {title}
          </Text>
          <Badge
            fz={12}
            lh="14.1px"
            fw={400}
            variant={value === activeTab ? "light" : "transparent"}
            {...(value !== activeTab && { color: "#70757A" })}
          >
            {count}
          </Badge>
        </Group>
      </Badge>
    </>
  );
}
