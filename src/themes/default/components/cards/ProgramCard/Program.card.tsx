import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  Input,
  Menu,
  Modal,
  Popover,
  Radio,
  Select,
  Stack,
  Tabs,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  Alarm2Icon,
  ApplyIcon,
  BookIcon,
  BooksIcon,
  ChevronDownIcon,
  FileText,
  HorizontalDotsIcon,
  UsersIcon,
} from "../../../static/icons/Icons";
import { useDisclosure } from "@mantine/hooks";
import { DateInput } from "@mantine/dates";
import { Else, If, Then } from "react-if";
import { useForm } from "@mantine/form";

export function ProgramCard({ program, isImg }: { program: any; isImg: any }) {
  const applyForm = useForm();

  const [
    isChecklistModalOpened,
    { open: openChecklistModal, close: closeChecklistModal },
  ] = useDisclosure(false);

  const [isIntakeOpened, { close: closeIntake, open: openIntake }] =
    useDisclosure(false);
  const [isEtsOpened, { close: closeEts, open: openEts }] =
    useDisclosure(false);

  const [isApplyModalOpened, { open: openApplyModal, close: closeApplyModal }] =
    useDisclosure(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
  };

  const handleFormSubmit = () => {};
  console.log(program, "<programamamamam");
  return (
    <>
      <Card withBorder p="md">
        <Stack>
          <Group justify="space-between">
            <Group>
              <If condition={isImg}>
                <Then>
                  <Box
                    p={8}
                    h={56}
                    w={76}
                    bg="white"
                    style={{
                      border: "1px solid #D2D2D2",
                      borderRadius: 8,
                    }}
                  >
                    <Image
                      w="100%"
                      src={program?.logo}
                      fallbackSrc="https://app.dfavo.com/uploads/college_logo/2.png"
                    />
                  </Box>
                </Then>
                <Else>
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
                    <Text>
                      {program?.programName?.charAt(0).toUpperCase() || "A"}
                    </Text>
                  </Box>
                </Else>
              </If>
              <Stack gap={9}>
                <Title fz={18} fw={400} order={4} lh="21.15px">
                  {program?.program?.name ?? "--"}
                </Title>
                <Group>
                  <Text fw={300} fz={14} lh="16.45px" c="#363636">
                    {program?.program?.institution?.name +
                      " " +
                      "(" +
                      program?.program?.institution?.country?.name +
                      ")"}
                  </Text>
                  <Group>
                    <Text fz={14} fw={500}>
                      Campus:
                    </Text>
                    <Text fz={14}>{program?.campus?.name ?? "--"}</Text>
                  </Group>
                </Group>
              </Stack>
            </Group>

            <Group gap={14}>
              <Popover width={300} position="bottom" withArrow shadow="md">
                <Popover.Target>
                  <Button
                    color="#fce205"
                    h={36}
                    size="sm"
                    px={16}
                    radius={20}
                    style={{ color: "#000" }}
                  >
                    Apply Now
                  </Button>
                </Popover.Target>
                <Popover.Dropdown style={{ width: "auto" }}>
                  <Stack justify="center" align="stretch">
                    <Text fz={13} c="#363636">
                      Select Campus
                    </Text>
                    <UnstyledButton onClick={openApplyModal}>
                      {program?.campus?.name}
                    </UnstyledButton>
                  </Stack>
                </Popover.Dropdown>
              </Popover>
            </Group>
          </Group>

          <Divider color="var(--mantine-color-gray-2)" />

          <Group gap="xl" mb={48}>
            <Group align="start" gap={8}>
              <FileText />
              <Stack gap={5}>
                <Title fz={14} fw={300} lh="14.1px" c="#363636">
                  Intake
                </Title>
                <Group
                  align="center"
                  onClick={openChecklistModal}
                  style={{
                    cursor: "pointer",
                  }}
                >
                  <Popover
                    width={300}
                    position="bottom"
                    shadow="md"
                    opened={isIntakeOpened}
                  >
                    <Popover.Target>
                      <UnstyledButton
                        fz={15}
                        onMouseEnter={openIntake}
                        onMouseLeave={closeIntake}
                        style={{ color: "#000" }}
                      >
                        {program?.program?.intakes &&
                          program?.program?.intakes.length > 0 &&
                          program?.program?.intakes
                            .slice(0, 2)
                            .map((item: any) => item.intake)
                            .join(", ")}{" "}
                        <ChevronDownIcon />
                      </UnstyledButton>
                    </Popover.Target>
                    <Popover.Dropdown
                      style={{ width: "auto", pointerEvents: "none" }}
                    >
                      <Stack justify="center" align="stretch">
                        <Text fz={13}>
                          {program?.program?.intakes &&
                            program?.program?.intakes.length > 0 &&
                            program?.program?.intakes
                              .slice(2)
                              .map((item: any) => item.intake)
                              .join(", ")}
                        </Text>
                      </Stack>
                    </Popover.Dropdown>
                  </Popover>
                </Group>
              </Stack>
            </Group>
            <Group align="start" gap={8}>
              <Alarm2Icon />
              <Stack gap={7}>
                <Title fz={14} fw={300} lh="14.1px" c="#363636">
                  Duration
                </Title>
                <Text fz={14} fw={500} lh="14.1px">
                  {program?.duration}
                </Text>
              </Stack>
            </Group>
            <Group align="start" gap={8}>
              <UsersIcon />
              <Stack gap={7}>
                <Title fz={14} fw={300} lh="14.1px" c="#363636">
                  Tuition Fee
                </Title>
                <Text fz={14} fw={500} lh="14.1px">
                  AUD $24500
                </Text>
              </Stack>
            </Group>
            <Group align="start" gap={8}>
              <BooksIcon />
              <Stack gap={7}>
                <Title fz={14} fw={300} lh="14.1px" c="#363636">
                  Application Fee
                </Title>
                <Text fz={14} fw={500} lh="14.1px">
                  AUD $0
                </Text>
              </Stack>
            </Group>
            <Group align="start" gap={8}>
              <FileText />
              <Stack gap={7}>
                <Title fz={14} fw={300} lh="14.1px" c="#363636">
                  English Test Scores
                </Title>
                <Popover
                  width={300}
                  position="bottom"
                  withArrow
                  shadow="md"
                  opened={isEtsOpened}
                >
                  <Popover.Target>
                    <UnstyledButton
                      fz={13}
                      onMouseEnter={openEts}
                      onMouseLeave={closeEts}
                      style={{ color: "#000" }}
                    >
                      {program?.program?.testscores &&
                        program?.program?.testscores.length > 0 &&
                        program?.program?.testscores
                          .slice(0, 2)
                          .map(
                            (item: any) =>
                              item.scoreName + " " + "(" + item.score + ")"
                          )
                          .join(", ")}{" "}
                      <ChevronDownIcon />
                    </UnstyledButton>
                  </Popover.Target>
                  <Popover.Dropdown
                    style={{ width: "auto", pointerEvents: "none" }}
                  >
                    <Stack justify="center" align="stretch">
                      <Text fz={13}>
                        {program?.etsDetails &&
                          program?.etsDetails.length > 0 &&
                          program?.etsDetails
                            .slice(2)
                            .map(
                              (item: any) =>
                                item.scoreName + " " + "(" + item.score + ")"
                            )
                            .join(", ")}
                      </Text>
                    </Stack>
                  </Popover.Dropdown>
                </Popover>
              </Stack>
            </Group>
            <Group align="start" gap={8}>
              <FileText />
              <Stack gap={7}>
                <Title fz={14} fw={300} lh="14.1px" c="#363636">
                  Open Intakes
                </Title>
                <Text fz={14} fw={500} lh="14.1px">
                  <If
                    condition={
                      program?.openIntake && program?.openIntake.length > 0
                    }
                  >
                    <Then>
                      <Badge fz={12} fw={500} variant={"light"}>
                        {program?.openIntake &&
                          program?.openIntake.length > 0 &&
                          program?.openIntake.map((intake: any) => {
                            return (
                              intake?.intakeName +
                              "," +
                              intake?.intakeYear +
                              " " +
                              "(" +
                              intake?.status +
                              ")"
                            );
                          })}
                      </Badge>
                    </Then>
                    <Else>Not Open</Else>
                  </If>
                </Text>
              </Stack>
            </Group>
          </Group>
        </Stack>
      </Card>

      {/* apply now modal */}

      <Modal.Root
        size="lg"
        radius="lg"
        opened={isApplyModalOpened}
        onClose={closeApplyModal}
        styles={{
          header: {
            backgroundColor: "#F5F5F5",
          },
        }}
        centered
      >
        <Modal.Overlay />

        <Modal.Content radius="lg">
          <Modal.Header pb={0}>
            <Stack w="100%" gap={19}>
              <Flex w="100%" align="end">
                <Modal.CloseButton />
              </Flex>
              <form onSubmit={applyForm.onSubmit(handleFormSubmit)}>
                <Group grow>
                  <Input.Wrapper
                    // onChange={handleChange}
                    label="First name"
                    error=""
                    withAsterisk
                  >
                    <Input
                      key={applyForm.key("first_name")}
                      {...applyForm.getInputProps("first_name")}
                      placeholder="Enter your first name"
                    />
                  </Input.Wrapper>
                  <Input.Wrapper label="Last name" error="" withAsterisk>
                    <Input
                      placeholder="Enter your last name"
                      key={applyForm.key("last_name")}
                      {...applyForm.getInputProps("last_name")}
                    />
                  </Input.Wrapper>
                </Group>
                <Group grow>
                  <Input.Wrapper label="Email" error="" withAsterisk>
                    <Input
                      placeholder="Enter your email address"
                      key={applyForm.key("email")}
                      {...applyForm.getInputProps("email")}
                    />
                  </Input.Wrapper>
                </Group>
                <Group grow>
                  <Input.Wrapper label="Phone Number" error="" withAsterisk>
                    <Input
                      placeholder="Enter your Phone Number"
                      key={applyForm.key("phone_number")}
                      {...applyForm.getInputProps("phone_number")}
                    />
                  </Input.Wrapper>
                </Group>
                <Group grow>
                  <DateInput
                    // value={""}
                    // onChange={""}
                    label="Date of Birth"
                    placeholder="Select Date"
                    key={applyForm.key("date_of_birth")}
                    {...applyForm.getInputProps("date_of_birth")}
                    withAsterisk
                  />
                </Group>
                <Group gap={"xl"} grow>
                  <Radio.Group
                    label="Gender"
                    withAsterisk
                    key={applyForm.key("gender")}
                    {...applyForm.getInputProps("gender")}
                  >
                    <Group mt="xs">
                      <Radio value="male" label="Male" />
                      <Radio value="female" label="Female" />
                    </Group>
                  </Radio.Group>
                  <Radio.Group
                    name="marital status"
                    label="Marital Status"
                    withAsterisk
                    key={applyForm.key("marital_status")}
                    {...applyForm.getInputProps("marital_status")}
                  >
                    <Group mt="xs">
                      <Radio value="married" label="Married" />
                      <Radio value="unmarried" label="Unmarried" />
                    </Group>
                  </Radio.Group>
                </Group>
                <Group grow>
                  <Select
                    label="Country"
                    placeholder="Please select country"
                    data={["React", "Angular", "Vue", "Svelte"]}
                    key={applyForm.key("countryId")}
                    {...applyForm.getInputProps("countryId")}
                    searchable
                    withAsterisk
                  />
                </Group>
                <Group grow>
                  <Select
                    label="State"
                    placeholder="Please select State"
                    data={["React", "Angular", "Vue", "Svelte"]}
                    key={applyForm.key("stateId")}
                    {...applyForm.getInputProps("stateId")}
                    searchable
                    withAsterisk
                  />
                </Group>
                <Group grow>
                  <Select
                    label="City"
                    placeholder="Please select city"
                    data={["React", "Angular", "Vue", "Svelte"]}
                    key={applyForm.key("cityId")}
                    {...applyForm.getInputProps("cityId")}
                    searchable
                    withAsterisk
                  />
                </Group>
                <Group mb={30}>
                  <Button
                    type="submit"
                    color="#fce205"
                    h={36}
                    size="sm"
                    px={16}
                    radius={20}
                    style={{ color: "#000" }}
                  >
                    Send Enquiry
                  </Button>
                </Group>
              </form>
            </Stack>
          </Modal.Header>
          <Modal.Body p="xl"></Modal.Body>
        </Modal.Content>
      </Modal.Root>
    </>
  );
}
