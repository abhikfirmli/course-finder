import {
  ActionIcon,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  Menu,
  Modal,
  Stack,
  Tabs,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { ChevronRight } from "../../../static/icons/Icons";
import { useDisclosure } from "@mantine/hooks";
import { IconExternalLink } from "@tabler/icons-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useInstitutionDetail } from "../../../../../api/institutions/useInstitutions";

export function InstitutionCard({ institution }: { institution: any }) {
  const navigate = useNavigate();
  return (
    <>
      <Card withBorder>
        <Stack>
          <Group mb={15}>
            <Box
              p={8}
              h={56}
              w={76}
              bg="white"
              style={{
                border: "1px solid #D2D2D2",
                borderRadius: 8,
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Image
                src={institution?.logo}
                fallbackSrc="https://app.dfavo.com/uploads/college_logo/2.png"
              />
            </Box>

            <Stack gap={9}>
              <Title fz={18} fw={400} order={4} lh="15px">
                {institution?.institutionName}
                <Link to={institution?.institutionUrl} target="blank">
                  <Tooltip label="Open College Website">
                    <IconExternalLink size={16} />
                  </Tooltip>
                </Link>
              </Title>
              <Text fw={300} fz={14} lh="16.45px" c="#363636">
                {institution?.countryName}
              </Text>
            </Stack>
          </Group>

          <Divider color="var(--mantine-color-gray-2)" />

          <Group mb={4}>
            <Stack gap={7}>
              <Title fz={14} fw={500} lh="25px">
                PGWP
              </Title>
              <Text fz={14} fw={200} lh="14.1px" c="#363636">
                {institution?.is_pgwp === 0 ? "false" : "true"}
              </Text>
            </Stack>
            <Stack gap={7}>
              <Title fz={14} fw={500} lh="25px">
                Shore Type
              </Title>
              <Text fz={14} fw={200} lh="14.1px" c="#363636">
                {institution?.shoreType}
              </Text>
            </Stack>
            <Stack gap={7}>
              <Title fz={14} fw={500} lh="25px">
                Institution Type
              </Title>
              <Text fz={14} fw={200} lh="14.1px" c="#363636">
                {institution?.institutionType}
              </Text>
            </Stack>
            <Stack gap={7}>
              <Title fz={14} fw={500} lh="25px">
                Campus/es
              </Title>
              <Text fz={14} fw={200} lh="14.1px" c="#363636">
                {institution?.campusName
                  .map((campus: any) => campus.name)
                  .join(", ")}
              </Text>
            </Stack>
          </Group>
          <Group>
            <Stack>
              <Text fz={14} c="#363636">
                {institution?.institutionName.toLowerCase().replace(/ /g, "-")}
              </Text>
            </Stack>
          </Group>
          <Button
            color="#fefce8"
            onClick={() =>
              navigate(
                `/institution/${institution?.institutionName
                  .toLowerCase()
                  .replace(/ /g, "-")}/?id=${institution?.institutionId}`
              )
            }
          >
            <Group justify="space-between" gap="xl">
              <Text c="#000">View Programs (8)</Text>
              <ChevronRight width={6} fontWeight={400} color="#000" />
            </Group>
          </Button>
        </Stack>
      </Card>
    </>
  );
}
