import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Container,
  Drawer,
  Flex,
  Grid,
  Group,
  Image,
  Input,
  Loader,
  MultiSelect,
  Pagination,
  RangeSlider,
  ScrollArea,
  Select,
  SimpleGrid,
  Slider,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import DashboardLayout from "../../layout/Dashboard.layout";
import { useState } from "react";
import { SearchIcon } from "../../static/icons/Icons";
import { ProgramCard } from "../../components/cards/ProgramCard/Program.card";
import { InstitutionCard } from "../../components/cards/InstitutionCard/Institution.card";
import { useSearchParams } from "react-router-dom";
import { get_search_params } from "../../../../helpers/helpers";
import { Else, If, Then } from "react-if";
import { useCountries } from "../../../../api/masters/useCountries";
import { useDisciplines } from "../../../../api/masters/useDisciplines";
import { useInstitutionDropdown } from "../../../../api/masters/useInsitutions";
import { useStudyLevel } from "../../../../api/masters/useStudyLevel";
import { useGetPrograms } from "../../../../api/programs/usePrograms";
import { useGetInstitutions } from "../../../../api/institutions/useInstitutions";
import HeroSection from "../../components/ui/HeroSection";
import { useForm } from "@mantine/form";
import { useFeeRangeSlider } from "../../../../api/masters/useFeeRangeSlider";
import { useIntakes } from "../../../../api/masters/useIntakes";
import { stringify } from "querystring";
import { useDisclosure } from "@mantine/hooks";
import { IconFilter, IconFilterFilled } from "@tabler/icons-react";
import { relative } from "path";

const alphabets = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function HomePage() {
  const programFilterForm = useForm();
  const institutionFilterForm = useForm();
  const [
    programDrawerOpened,
    { open: programDrawerOpen, close: programDrawerClose },
  ] = useDisclosure(false);
  const [
    institutionDrawerOpened,
    { open: institutionDrawerOpen, close: institutionDrawerClose },
  ] = useDisclosure(false);

  let [searchParams, setSearchParams] = useSearchParams();
  const [pageTab, setPageTab] = useState(searchParams.get("tab") ?? "programs");
  const [sortProgram, setSortProgram] = useState(
    searchParams.get("sortProgramBy") ?? ""
  );
  const [sortInstitution, setSortInstitution] = useState(
    searchParams.get("sortInstitutionBy") ?? ""
  );
  const [currentProgramPage, setCurrentProgramPage] = useState(
    searchParams.get("page") ?? 1
  );
  const [currentInstitutionPage, setCurrentInstitutionPage] = useState(
    searchParams.get("page") ?? 1
  );

  const [programSearch, setProgramSearch] = useState(
    searchParams.get("programSearch") ?? ""
  );
  const [InstitutionSearch, setInstitutionSearch] = useState(
    searchParams.get("institutionSearch") ?? ""
  );

  const [isProgramEts, setIsProgramEts] = useState("");
  const [isInstitutionEts, setIsInstitutionEts] = useState("");

  const { data: collegeCountries } = useCountries();
  const { data: disciplines } = useDisciplines();
  const { data: institutionDropdown } = useInstitutionDropdown();
  const { data: studyLevels } = useStudyLevel();
  // const { data: feeRangeSlider } = useFeeRangeSlider();
  const { data: intakes } = useIntakes();

  const {
    data: programs,
    isLoading: isProgramsLoading,
    refetch: refetchPrograms,
  } = useGetPrograms({
    page: currentProgramPage as any,
    per_page: 10,
    params: {
      ...(searchParams.has("sortProgramBy") && {
        alphabet: searchParams.get("sortProgramBy"),
      }),
      ...(searchParams.has("programSearch") && {
        search: searchParams.get("programSearch"),
      }),
      ...(searchParams.has("programFilter") &&
        JSON.parse(searchParams.get("programFilter") as any)),
    },
  });

  // const {
  //   data: institutions,
  //   isLoading: isInstitutionsLoading,
  //   refetch: refetchInstitutions,
  // } = useGetInstitutions({
  //   page: currentInstitutionPage as any,
  //   per_page: 10,
  //   params: {
  //     ...(searchParams.has("sortInstitutionBy") && {
  //       alphabet: searchParams.get("sortInstitutionBy"),
  //     }),
  //     ...(searchParams.has("institutionSearch") && {
  //       alphabet: searchParams.get("institutionSearch"),
  //     }),
  //     ...(searchParams.has("institutionFilter") &&
  //       JSON.parse(searchParams.get("institutionFilter") as any)),
  //   },
  // });

  const handleProgramPagination = (val: any) => {
    setCurrentProgramPage(val);
    setSearchParams({
      ...get_search_params(searchParams),
      page: val,
    });
  };
  const handleInstitutionPagination = (val: any) => {
    setCurrentInstitutionPage(val);
    setSearchParams({
      ...get_search_params(searchParams),
      page: val,
    });
  };

  const handleAlphabetChange = async (name: string, alphabet: any) => {
    if (name === "institutions") {
      // await setSearchParams({
      //   ...get_search_params(searchParams),
      //   sortInstitutionBy: alphabet,
      // });
      // setSortInstitution(alphabet);
      // refetchInstitutions();
    } else {
      await setSearchParams({
        ...get_search_params(searchParams),
        sortProgramBy: alphabet,
      });
      setSortProgram(alphabet);
      refetchPrograms();
    }
  };

  const handleProgramSearchChange = (value: any) => {
    setSearchParams({
      ...get_search_params(searchParams),
      programSearch: value,
    });
    setProgramSearch(value);
  };

  const handleProgramSearchSubmit = () => {
    refetchPrograms();
  };

  const handleInstitutionSearchChange = (value: any) => {
    setSearchParams({
      ...get_search_params(searchParams),
      institutionSearch: value,
    });
    setInstitutionSearch(value);
  };

  // const handleInstitutionSearchSubmit = () => {
  //   refetchInstitutions();
  // };

  // const handleInsitutionFormSubmit = async (values: any) => {
  //   await setSearchParams({
  //     ...get_search_params(searchParams),
  //     institutionFilter: JSON.stringify(values),
  //   });
  //   refetchInstitutions();
  // };

  const handleProgramFormSubmit = async (values: any) => {
    await setSearchParams({
      ...get_search_params(searchParams),
      programFilter: JSON.stringify(values),
    });
    refetchPrograms();
  };

  // const handleResetInstitutionFilter = async () => {
  //   await setSearchParams({
  //     ...get_search_params(searchParams),
  //     institutionFilter: JSON.stringify(""),
  //   });
  //   refetchInstitutions();
  // };

  const handleResetProgramFilter = async () => {
    try {
      const currentSearchParams = get_search_params(searchParams);
      await setSearchParams({
        ...currentSearchParams,
        programFilter: JSON.stringify(""),
      });
      refetchPrograms();
    } catch (error) {
      console.error("Error resetting program filter:", error);
    }
  };

  const handleProgramMinFields = (value: any) => {
    setIsProgramEts(value);
  };

  const handleInstitutionMinFields = (value: any) => {
    setIsInstitutionEts(value);
  };

  return (
    <DashboardLayout withHeaderBorder={false} page="Homepage">
      <HeroSection />

      <Box px={29} py={30} bg="#f5f5f5">
        <Tabs
          color="#f7e207"
          variant="pills"
          defaultValue={pageTab}
          mt={60}
          onChange={(value) => {
            setPageTab(value as any);
            setSearchParams({
              ...get_search_params(searchParams),
              tab: value as any,
              page: 1 as any,
            });
            setCurrentInstitutionPage(1);
            setCurrentProgramPage(1);
          }}
          style={{
            position: "sticky",
            top: 106,
            zIndex: 2,
          }}
        >
          {/* <Tabs.List grow>
            <Tabs.Tab value="programs">
              Programs
              <Badge
                fz={12}
                fw={500}
                mx={5}
                variant={pageTab === "all-programs" ? "light" : "tertiary"}
              >
                <If condition={isProgramsLoading}>
                  <Then>
                    <Loader size={9} />
                  </Then>
                  <Else>{programs?.data.metaInfo.totalRecords ?? 0}</Else>
                </If>
              </Badge>
            </Tabs.Tab>
            <Tabs.Tab value="institutions">
              Institutions
              <Badge
                fz={12}
                fw={500}
                mx={5}
                variant={pageTab === "all-programs" ? "light" : "tertiary"}
              >
                <If condition={isProgramsLoading}>
                  <Then>
                    <Loader size={9} />
                  </Then>
                  <Else>{institutions?.data.metaInfo.allRecords ?? 0}</Else>
                </If>
              </Badge>
            </Tabs.Tab>
          </Tabs.List> */}

          <If condition={pageTab === "institutions"}>
            <Then>
              {/* <Stack style={{ position: "relative" }}>
                <Group mt={15} w="100%" className="institution-search">
                  <Input
                    flex={1}
                    placeholder="Search Institution"
                    value={InstitutionSearch}
                    onChange={(e) =>
                      handleInstitutionSearchChange(e.target.value)
                    }
                  />
                  <ActionIcon
                    bg={"#fff"}
                    w={50}
                    h={35}
                    variant="filled"
                    aria-label="Settings"
                    onClick={handleInstitutionSearchSubmit}
                  >
                    <SearchIcon size="20px" />
                  </ActionIcon>
                </Group>

                <Stack lh={0} align="stretch" className="institution-alphabet">
                  <Group justify="space-between" mt={20}>
                    <Title order={5}>FILTER PROGRAM BY ALPHABET:</Title>
                    <Button
                      style={{
                        background: "none",
                        color: "#000",
                        padding: "0px",
                      }}
                      onClick={() => handleAlphabetChange("institutions", "")}
                    >
                      Clear Filter
                    </Button>
                  </Group>
                  <ScrollArea type="auto" scrollbarSize={4}>
                    <Tabs
                      variant="pills"
                      color="#f7e207"
                      value={sortInstitution}
                      styles={{
                        list: {
                          flexWrap: "nowrap",
                          overflowX: "auto",
                          width: "100%",
                        },
                      }}
                    >
                      <Tabs.List>
                        {alphabets.map((alphabet, index) => (
                          <Tabs.Tab
                            key={index}
                            value={alphabet}
                            style={{
                              fontSize: "12px",
                            }}
                            onClick={() =>
                              handleAlphabetChange("institutions", alphabet)
                            }
                          >
                            {alphabet}
                          </Tabs.Tab>
                        ))}
                      </Tabs.List>
                    </Tabs>
                  </ScrollArea>
                </Stack>

                <Grid mt={30}>
                  <Grid.Col
                    span={{ base: 12, md: 12, lg: 3 }}
                    className="institution-filter"
                    display={{ lg: "block", base: "none" }}
                  >
                    <Card>
                      <Group w="100%" justify="space-between">
                        <Text>Filter Programs</Text>
                        <Button
                          variant="transparent"
                          radius={20}
                          style={{
                            border: "1px solid #a39595",
                            height: "40px",
                            color: "#000",
                          }}
                          onClick={handleResetInstitutionFilter}
                        >
                          Reset Filter
                        </Button>
                      </Group>
                      <Stack gap="md" mt={20}>
                        <form
                          onSubmit={institutionFilterForm.onSubmit(
                            handleInsitutionFormSubmit
                          )}
                        >
                          <Stack>
                            <Select
                              label="Country"
                              placeholder="Please select Country"
                              key={institutionFilterForm.key("countryId")}
                              {...institutionFilterForm.getInputProps(
                                "countryId"
                              )}
                              data={collegeCountries ?? []}
                              searchable
                            />
                            <Select
                              label="Institution Type"
                              placeholder="Please select Institution Type"
                              data={[
                                "University",
                                "College",
                                "High School",
                                "English School",
                              ]}
                              key={institutionFilterForm.key("institutionType")}
                              {...institutionFilterForm.getInputProps(
                                "institutionType"
                              )}
                              searchable
                            />
                            <Select
                              label="Institution"
                              placeholder="Please select Institution"
                              data={institutionDropdown ?? []}
                              key={institutionFilterForm.key("institutionId")}
                              {...institutionFilterForm.getInputProps(
                                "institutionId"
                              )}
                              searchable
                            />
                            <Select
                              label="Is PGWP Available?"
                              placeholder="Please select PGWP"
                              data={["Yes", "No"]}
                              key={institutionFilterForm.key(
                                "is_pgwp_available"
                              )}
                              {...institutionFilterForm.getInputProps(
                                "is_pgwp_available"
                              )}
                              searchable
                            />
                            <Select
                              label="Study Level"
                              placeholder="Please select Study Level"
                              key={institutionFilterForm.key("studyLevelId")}
                              {...institutionFilterForm.getInputProps(
                                "studyLevelId"
                              )}
                              data={studyLevels ?? []}
                              searchable
                            />
                            <Select
                              label="Looking for"
                              placeholder="Please select Looking for"
                              key={institutionFilterForm.key("disciplineId")}
                              {...institutionFilterForm.getInputProps(
                                "disciplineId"
                              )}
                              data={disciplines ?? []}
                              searchable
                            />
                            <Select
                              label="Attendance"
                              placeholder="Please select Attendance"
                              data={["On Campus", "Online", "Blended"]}
                              key={institutionFilterForm.key("attendance")}
                              {...institutionFilterForm.getInputProps(
                                "attendance"
                              )}
                              searchable
                            />
                            <Select
                              label="Program Type"
                              placeholder="Please select Program Type"
                              data={["Full Time", "Part Time"]}
                              key={institutionFilterForm.key("programType")}
                              {...institutionFilterForm.getInputProps(
                                "programType"
                              )}
                              searchable
                            />
                            <Select
                              label="Intake"
                              placeholder="Please select Intake"
                              key={institutionFilterForm.key("intakeId")}
                              {...institutionFilterForm.getInputProps(
                                "intakeId"
                              )}
                              data={intakes ?? []}
                              searchable
                            />
                            <Select
                              label="Duration"
                              placeholder="Please select Duration"
                              data={[
                                "Less than 2 years",
                                "2 Years",
                                "3 Years",
                                "4 Years",
                                "More Than 4 Years",
                              ]}
                              key={institutionFilterForm.key("duration")}
                              {...institutionFilterForm.getInputProps(
                                "duration"
                              )}
                              searchable
                            />
                            <Select
                              label="English Test Type"
                              placeholder="Please select English Test Type"
                              data={[
                                "IELTS",
                                "TOEFL",
                                "PTE",
                                "Duolingo English Test",
                              ]}
                              key={institutionFilterForm.key("englishTestType")}
                              {...institutionFilterForm.getInputProps(
                                "englishTestType"
                              )}
                              onChange={handleInstitutionMinFields}
                              searchable
                            />
                            {isInstitutionEts && (
                              <Group>
                                <Input.Wrapper
                                  label="Min Test Score"
                                  error=""
                                  withAsterisk
                                  w="100%"
                                >
                                  <Input
                                    type="number"
                                    placeholder="Min"
                                    key={institutionFilterForm.key(
                                      "minTestScore"
                                    )}
                                    {...institutionFilterForm.getInputProps(
                                      "minTestScore"
                                    )}
                                  />
                                </Input.Wrapper>
                                <Input.Wrapper
                                  label="Max Test Score"
                                  error=""
                                  withAsterisk
                                  w="100%"
                                >
                                  <Input
                                    type="number"
                                    placeholder="Max"
                                    key={institutionFilterForm.key(
                                      "maxTestScore"
                                    )}
                                    {...institutionFilterForm.getInputProps(
                                      "maxTestScore"
                                    )}
                                  />
                                </Input.Wrapper>
                              </Group>
                            )} */}
              {/* <Text size="sm" mt="sm">
                              Tuition Fee
                            </Text>
                            <RangeSlider
                              color="#f7e207ba"
                              defaultValue={[
                                feeRangeSlider?.data?.recordInfo?.tuition_fee
                                  ?.min ?? 0,
                                feeRangeSlider?.data?.recordInfo?.tuition_fee
                                  ?.max ?? 100,
                              ]}
                              label={(value) => value}
                              minRange={10}
                              step={10}
                              min={
                                feeRangeSlider?.data?.recordInfo?.tuition_fee
                                  ?.min ?? 0
                              }
                              max={
                                feeRangeSlider?.data?.recordInfo?.tuition_fee
                                  ?.max ?? 100
                              }
                              key={institutionFilterForm.key("tuitionFee")}
                              {...institutionFilterForm.getInputProps(
                                "tuitionFee"
                              )}
                            />

                            <Text size="sm" mt="sm">
                              Application Fee
                            </Text>
                            <RangeSlider
                              color="#f7e207ba"
                              defaultValue={[
                                feeRangeSlider?.data?.recordInfo
                                  ?.application_fee?.min ?? 0,
                                feeRangeSlider?.data?.recordInfo
                                  ?.application_fee?.max ?? 100,
                              ]}
                              label={(value) => value}
                              minRange={10}
                              step={10}
                              min={
                                feeRangeSlider?.data?.recordInfo
                                  ?.application_fee?.min ?? 0
                              }
                              max={
                                feeRangeSlider?.data?.recordInfo
                                  ?.application_fee?.max ?? 100
                              }
                              key={institutionFilterForm.key("applicationFee")}
                              {...institutionFilterForm.getInputProps(
                                "applicationFee"
                              )}
                            /> */}

              {/* <Group>
                              <Button
                                flex={1}
                                mt={30}
                                type="submit"
                                color="#fce205"
                                radius={20}
                              >
                                Apply Filter
                              </Button>
                            </Group>
                          </Stack>
                        </form>
                      </Stack>
                    </Card>
                  </Grid.Col>
                  <Grid.Col
                    span={{ base: 12, md: 12, lg: 9 }}
                    className="institution-card"
                  >
                    <SimpleGrid cols={{ base: 1, sm: 1, lg: 2 }}>
                      {institutions?.data?.records?.map(
                        (institution: any, index: any) => (
                          <InstitutionCard
                            key={index}
                            institution={institution}
                          />
                        )
                      )}
                    </SimpleGrid>
                    {institutions &&
                      institutions?.data?.recordsInfo.length > 0 && (
                        <Flex justify="center" mt={20}>
                          <Pagination
                            color="#fce205"
                            defaultValue={Number(currentInstitutionPage) ?? 1}
                            total={
                              institutions?.data?.metaInfo?.totalPages || 10
                            }
                            onChange={handleInstitutionPagination}
                          />
                        </Flex>
                      )}
                  </Grid.Col>
                </Grid>

                <Drawer
                  opened={institutionDrawerOpened}
                  onClose={institutionDrawerClose}
                  position="right"
                >
                  <Card>
                    <Group w="100%" justify="space-between">
                      <Text>Filter Programs</Text>
                      <Button
                        variant="transparent"
                        radius={20}
                        style={{
                          border: "1px solid #a39595",
                          height: "40px",
                          color: "#000",
                        }}
                        onClick={handleResetInstitutionFilter}
                      >
                        Reset Filter
                      </Button>
                    </Group>
                    <Stack gap="md" mt={20}>
                      <form
                        onSubmit={institutionFilterForm.onSubmit(
                          handleInsitutionFormSubmit
                        )}
                      >
                        <Stack>
                          <Select
                            label="Country"
                            placeholder="Please select Country"
                            key={institutionFilterForm.key("countryId")}
                            {...institutionFilterForm.getInputProps(
                              "countryId"
                            )}
                            data={collegeCountries ?? []}
                            searchable
                          />
                          <Select
                            label="Institution Type"
                            placeholder="Please select Institution Type"
                            data={[
                              "University",
                              "College",
                              "High School",
                              "English School",
                            ]}
                            key={institutionFilterForm.key("institutionType")}
                            {...institutionFilterForm.getInputProps(
                              "institutionType"
                            )}
                            searchable
                          />
                          <Select
                            label="Institution"
                            placeholder="Please select Institution"
                            data={institutionDropdown ?? []}
                            key={institutionFilterForm.key("institutionId")}
                            {...institutionFilterForm.getInputProps(
                              "institutionId"
                            )}
                            searchable
                          />
                          <Select
                            label="Is PGWP Available?"
                            placeholder="Please select PGWP"
                            data={["Yes", "No"]}
                            key={institutionFilterForm.key("is_pgwp_available")}
                            {...institutionFilterForm.getInputProps(
                              "is_pgwp_available"
                            )}
                            searchable
                          />
                          <Select
                            label="Study Level"
                            placeholder="Please select Study Level"
                            key={institutionFilterForm.key("studyLevelId")}
                            {...institutionFilterForm.getInputProps(
                              "studyLevelId"
                            )}
                            data={studyLevels ?? []}
                            searchable
                          />
                          <Select
                            label="Looking for"
                            placeholder="Please select Looking for"
                            key={institutionFilterForm.key("disciplineId")}
                            {...institutionFilterForm.getInputProps(
                              "disciplineId"
                            )}
                            data={disciplines ?? []}
                            searchable
                          />
                          <Select
                            label="Attendance"
                            placeholder="Please select Attendance"
                            data={["On Campus", "Online", "Blended"]}
                            key={institutionFilterForm.key("attendance")}
                            {...institutionFilterForm.getInputProps(
                              "attendance"
                            )}
                            searchable
                          />
                          <Select
                            label="Program Type"
                            placeholder="Please select Program Type"
                            data={["Full Time", "Part Time"]}
                            key={institutionFilterForm.key("programType")}
                            {...institutionFilterForm.getInputProps(
                              "programType"
                            )}
                            searchable
                          />
                          <Select
                            label="Intake"
                            placeholder="Please select Intake"
                            key={institutionFilterForm.key("intakeId")}
                            {...institutionFilterForm.getInputProps("intakeId")}
                            data={intakes ?? []}
                            searchable
                          />
                          <Select
                            label="Duration"
                            placeholder="Please select Duration"
                            data={[
                              "Less than 2 years",
                              "2 Years",
                              "3 Years",
                              "4 Years",
                              "More Than 4 Years",
                            ]}
                            key={institutionFilterForm.key("duration")}
                            {...institutionFilterForm.getInputProps("duration")}
                            searchable
                          />
                          <Select
                            label="English Test Type"
                            placeholder="Please select English Test Type"
                            data={[
                              "IELTS",
                              "TOEFL",
                              "PTE",
                              "Duolingo English Test",
                            ]}
                            key={institutionFilterForm.key("englishTestType")}
                            {...institutionFilterForm.getInputProps(
                              "englishTestType"
                            )}
                            onChange={handleInstitutionMinFields}
                            searchable
                          />
                          {isInstitutionEts && (
                            <Group>
                              <Input.Wrapper
                                label="Min Test Score"
                                error=""
                                withAsterisk
                                w="100%"
                              >
                                <Input
                                  type="number"
                                  placeholder="Min"
                                  key={institutionFilterForm.key(
                                    "minTestScore"
                                  )}
                                  {...institutionFilterForm.getInputProps(
                                    "minTestScore"
                                  )}
                                />
                              </Input.Wrapper>
                              <Input.Wrapper
                                label="Max Test Score"
                                error=""
                                withAsterisk
                                w="100%"
                              >
                                <Input
                                  type="number"
                                  placeholder="Max"
                                  key={institutionFilterForm.key(
                                    "maxTestScore"
                                  )}
                                  {...institutionFilterForm.getInputProps(
                                    "maxTestScore"
                                  )}
                                />
                              </Input.Wrapper>
                            </Group>
                          )} */}
              {/* <Text size="sm" mt="sm">
                            Tuition Fee
                          </Text>
                          <RangeSlider
                            color="#f7e207ba"
                            defaultValue={[
                              feeRangeSlider?.data?.recordInfo?.tuition_fee
                                ?.min ?? 0,
                              feeRangeSlider?.data?.recordInfo?.tuition_fee
                                ?.max ?? 100,
                            ]}
                            label={(value) => value}
                            minRange={10}
                            step={10}
                            min={
                              feeRangeSlider?.data?.recordInfo?.tuition_fee
                                ?.min ?? 0
                            }
                            max={
                              feeRangeSlider?.data?.recordInfo?.tuition_fee
                                ?.max ?? 100
                            }
                            key={institutionFilterForm.key("tuitionFee")}
                            {...institutionFilterForm.getInputProps(
                              "tuitionFee"
                            )}
                          />

                          <Text size="sm" mt="sm">
                            Application Fee
                          </Text>
                          <RangeSlider
                            color="#f7e207ba"
                            defaultValue={[
                              feeRangeSlider?.data?.recordInfo?.application_fee
                                ?.min ?? 0,
                              feeRangeSlider?.data?.recordInfo?.application_fee
                                ?.max ?? 100,
                            ]}
                            label={(value) => value}
                            minRange={10}
                            step={10}
                            min={
                              feeRangeSlider?.data?.recordInfo?.application_fee
                                ?.min ?? 0
                            }
                            max={
                              feeRangeSlider?.data?.recordInfo?.application_fee
                                ?.max ?? 100
                            }
                            key={institutionFilterForm.key("applicationFee")}
                            {...institutionFilterForm.getInputProps(
                              "applicationFee"
                            )}
                          /> */}

              {/* <Group>
                            <Button
                              flex={1}
                              mt={30}
                              type="submit"
                              color="#fce205"
                              radius={20}
                            >
                              Apply Filter
                            </Button>
                          </Group>
                        </Stack>
                      </form>
                    </Stack>
                  </Card>
                </Drawer>

                <Button
                  bg="#fce205"
                  c="#40403a"
                  style={{
                    borderRadius: "20px",
                    padding: "10px",
                    position: "fixed",
                    bottom: "10px",
                    right: "10px",
                    width: "max-content",
                  }}
                  onClick={institutionDrawerOpen}
                  display={{ lg: "none", base: "block" }}
                >
                  <IconFilter stroke={2} size={20} />
                </Button>
              </Stack> */}
            </Then>
            <Else>
              <Stack style={{ position: "relative" }}>
                <Group mt={15} w="100%" className="program-search">
                  <Input
                    flex={1}
                    placeholder="Search Program"
                    value={programSearch}
                    onChange={(e) => handleProgramSearchChange(e.target.value)}
                  />
                  <ActionIcon
                    bg={"#fff"}
                    w={50}
                    h={35}
                    variant="filled"
                    aria-label="Settings"
                    onClick={handleProgramSearchSubmit}
                  >
                    <SearchIcon size="20px" />
                  </ActionIcon>
                </Group>
                <Stack lh={0} align="stretch" className="program-alphabet">
                  <Group justify="space-between" mt={20}>
                    <Title order={5}>FILTER PROGRAM BY ALPHABET:</Title>
                    <Button
                      style={{
                        background: "none",
                        color: "#000",
                        padding: "0px",
                      }}
                      onClick={() => handleAlphabetChange("programs", "")}
                    >
                      Clear Filter
                    </Button>
                  </Group>
                  <ScrollArea type="auto" scrollbarSize={4}>
                    <Tabs
                      mt={6}
                      variant="pills"
                      color="#f7e207"
                      value={sortProgram}
                      styles={{
                        list: {
                          flexWrap: "nowrap",
                          overflowX: "auto",
                          width: "100%",
                        },
                      }}
                    >
                      <Tabs.List>
                        {alphabets.map((alphabet, index) => (
                          <Tabs.Tab
                            key={index}
                            value={alphabet}
                            style={{
                              fontSize: "12px",
                            }}
                            onClick={() =>
                              handleAlphabetChange("programs", alphabet)
                            }
                          >
                            {alphabet}
                          </Tabs.Tab>
                        ))}
                      </Tabs.List>
                    </Tabs>
                  </ScrollArea>
                </Stack>
                <Grid mt={30}>
                  <Grid.Col
                    span={{ base: 12, md: 12, lg: 3 }}
                    className="program-filter"
                    display={{ lg: "block", base: "none" }}
                  >
                    <Card>
                      <Group w="100%" justify="space-between">
                        <Text>Filter Programs</Text>
                        <Button
                          variant="transparent"
                          radius={20}
                          style={{
                            border: "1px solid #a39595",
                            height: "40px",
                            color: "#000",
                          }}
                          onClick={handleResetProgramFilter}
                        >
                          Reset Filter
                        </Button>
                      </Group>
                      <Stack gap="md" mt={20}>
                        <form
                          onSubmit={programFilterForm.onSubmit(
                            handleProgramFormSubmit
                          )}
                        >
                          <Stack>
                            <MultiSelect
                              label="Country"
                              placeholder="Please select Country"
                              key={programFilterForm.key("country_id")}
                              {...programFilterForm.getInputProps("country_id")}
                              data={collegeCountries ?? []}
                              searchable
                            />
                            {/* <Select
                          label="State"
                          placeholder="Please select State"
                          data={['React', 'Angular', 'Vue', 'Svelte']}
                          searchable
                        /> */}
                            {/* <Select
                              label="Institution Type"
                              placeholder="Please select Institution Type"
                              data={[
                                "University",
                                "College",
                                "High School",
                                "English School",
                              ]}
                              key={programFilterForm.key("institution_type")}
                              {...programFilterForm.getInputProps(
                                "institution_type"
                              )}
                              searchable
                            /> */}
                            <MultiSelect
                              label="Institution"
                              placeholder="Please select Institution"
                              data={institutionDropdown ?? []}
                              key={programFilterForm.key("institution_id")}
                              {...programFilterForm.getInputProps(
                                "institution_id"
                              )}
                              searchable
                            />
                            <Select
                              label="Is PGWP Available?"
                              placeholder="Please select PGWP"
                              data={["yes", "no"]}
                              key={programFilterForm.key("is_pgwp")}
                              {...programFilterForm.getInputProps("is_pgwp")}
                              searchable
                            />
                            <MultiSelect
                              label="Study Level"
                              placeholder="Please select Study Level"
                              key={programFilterForm.key("study_level_id")}
                              {...programFilterForm.getInputProps(
                                "study_level_id"
                              )}
                              data={studyLevels ?? []}
                              searchable
                            />
                            <MultiSelect
                              label="Looking for"
                              placeholder="Please select Looking for"
                              key={programFilterForm.key("discipline_id")}
                              {...programFilterForm.getInputProps(
                                "discipline_id"
                              )}
                              data={disciplines ?? []}
                              searchable
                            />
                            <Select
                              label="Attendance"
                              placeholder="Please select Attendance"
                              data={[
                                { label: "On Campus", value: "on_campus" },
                                { label: "Online", value: "online" },
                                { label: "Blended", value: "blended" },
                              ]}
                              key={programFilterForm.key("attendance_on")}
                              {...programFilterForm.getInputProps(
                                "attendance_on"
                              )}
                              searchable
                            />
                            <Select
                              label="Program Type"
                              placeholder="Please select Program Type"
                              data={[
                                { label: "Full Time", value: "full_time" },
                                { label: "Part Time", value: "part_time" },
                              ]}
                              key={programFilterForm.key("program_type")}
                              {...programFilterForm.getInputProps(
                                "program_type"
                              )}
                              searchable
                            />
                            <MultiSelect
                              label="Intake"
                              placeholder="Please select Intake"
                              data={intakes ?? []}
                              key={programFilterForm.key("intake_id")}
                              {...programFilterForm.getInputProps("intake_id")}
                              searchable
                            />
                            {/* <Select
                              label="Duration"
                              placeholder="Please select Duration"
                              data={[
                                "Less than 2 years",
                                "2 Years",
                                "3 Years",
                                "4 Years",
                                "More Than 4 Years",
                              ]}
                              key={programFilterForm.key("duration")}
                              {...programFilterForm.getInputProps("duration")}
                              searchable
                            />
                            <Select
                              label="English Test Type"
                              placeholder="Please select English Test Type"
                              data={[
                                "IELTS",
                                "TOEFL",
                                "PTE",
                                "Duolingo English Test",
                              ]}
                              key={programFilterForm.key("englishTestType")}
                              {...programFilterForm.getInputProps(
                                "englishTestType"
                              )}
                              onChange={handleProgramMinFields}
                              searchable
                            /> */}
                            {/* {isProgramEts && (
                              <Group>
                                <Input.Wrapper
                                  label="Min Test Score"
                                  error=""
                                  withAsterisk
                                  w="100%"
                                >
                                  <Input
                                    type="number"
                                    placeholder="Min"
                                    key={programFilterForm.key("minTestScore")}
                                    {...programFilterForm.getInputProps(
                                      "minTestScore"
                                    )}
                                  />
                                </Input.Wrapper>
                                <Input.Wrapper
                                  label="Max Test Score"
                                  error=""
                                  withAsterisk
                                  w="100%"
                                >
                                  <Input
                                    type="number"
                                    placeholder="Max"
                                    key={programFilterForm.key("maxTestScore")}
                                    {...programFilterForm.getInputProps(
                                      "maxTestScore"
                                    )}
                                  />
                                </Input.Wrapper>
                              </Group>
                            )} */}
                            {/* <Text size="sm" mt="sm">
                              Tuition Fee
                            </Text>
                            <RangeSlider
                              color="#f7e207ba"
                              defaultValue={[
                                feeRangeSlider?.data?.recordInfo?.tuition_fee
                                  ?.min ?? 0,
                                feeRangeSlider?.data?.recordInfo?.tuition_fee
                                  ?.max ?? 100,
                              ]}
                              label={(value) => value}
                              minRange={10}
                              step={10}
                              min={
                                feeRangeSlider?.data?.recordInfo?.tuition_fee
                                  ?.min ?? 0
                              }
                              max={
                                feeRangeSlider?.data?.recordInfo?.tuition_fee
                                  ?.max ?? 100
                              }
                              key={programFilterForm.key("tuitionFee")}
                              {...programFilterForm.getInputProps("tuitionFee")}
                            />

                            <Text size="sm" mt="sm">
                              Application Fee
                            </Text>
                            <RangeSlider
                              color="#f7e207ba"
                              defaultValue={[
                                feeRangeSlider?.data?.recordInfo
                                  ?.application_fee?.min ?? 0,
                                feeRangeSlider?.data?.recordInfo
                                  ?.application_fee?.max ?? 100,
                              ]}
                              label={(value) => value}
                              minRange={10}
                              step={10}
                              min={
                                feeRangeSlider?.data?.recordInfo
                                  ?.application_fee?.min ?? 0
                              }
                              max={
                                feeRangeSlider?.data?.recordInfo
                                  ?.application_fee?.max ?? 100
                              }
                              key={programFilterForm.key("applicationFee")}
                              {...programFilterForm.getInputProps(
                                "applicationFee"
                              )}
                            /> */}
                            <Group>
                              <Button
                                flex={1}
                                mt={30}
                                type="submit"
                                color="#fce205"
                                radius={20}
                              >
                                Apply Filter
                              </Button>
                            </Group>
                          </Stack>
                        </form>
                      </Stack>
                    </Card>
                  </Grid.Col>
                  <Grid.Col
                    span={{ base: 12, md: 12, lg: 9 }}
                    className="program-card"
                  >
                    <Stack>
                      {programs &&
                        programs?.data?.records?.map(
                          (program: any, index: any) => (
                            <ProgramCard
                              key={index}
                              program={program}
                              isImg={false}
                            />
                          )
                        )}
                      {programs && programs?.data?.records.length > 0 && (
                        <Flex justify="center">
                          <Pagination
                            color="#fce205"
                            defaultValue={Number(currentProgramPage) ?? 1}
                            total={programs?.data?.metaInfo?.totalPages || 10}
                            onChange={handleProgramPagination}
                          />
                        </Flex>
                      )}
                    </Stack>
                  </Grid.Col>
                </Grid>

                <Drawer
                  opened={programDrawerOpened}
                  onClose={programDrawerClose}
                  position="right"
                >
                  <Card>
                    <Group w="100%" justify="space-between">
                      <Text>Filter Programs</Text>
                      <Button
                        variant="transparent"
                        radius={20}
                        style={{
                          border: "1px solid #a39595",
                          height: "40px",
                          color: "#000",
                        }}
                        onClick={handleResetProgramFilter}
                      >
                        Reset Filter
                      </Button>
                    </Group>
                    <Stack gap="md" mt={20}>
                      <form
                        onSubmit={programFilterForm.onSubmit(
                          handleProgramFormSubmit
                        )}
                      >
                        <Stack>
                          <MultiSelect
                            label="Country"
                            placeholder="Please select Country"
                            key={programFilterForm.key("country_id")}
                            {...programFilterForm.getInputProps("country_id")}
                            data={collegeCountries ?? []}
                            searchable
                          />
                          {/* <Select
                          label="State"
                          placeholder="Please select State"
                          data={['React', 'Angular', 'Vue', 'Svelte']}
                          searchable
                        /> */}
                          {/* <Select
                            label="Institution Type"
                            placeholder="Please select Institution Type"
                            data={[
                              "University",
                              "College",
                              "High School",
                              "English School",
                            ]}
                            key={programFilterForm.key("institutionType")}
                            {...programFilterForm.getInputProps(
                              "institutionType"
                            )}
                            searchable
                          /> */}
                          <MultiSelect
                            label="Institution"
                            placeholder="Please select Institution"
                            data={institutionDropdown ?? []}
                            key={programFilterForm.key("institution_id")}
                            {...programFilterForm.getInputProps(
                              "institution_id"
                            )}
                            searchable
                          />
                          <Select
                            label="Is PGWP Available?"
                            placeholder="Please select PGWP"
                            data={["yes", "no"]}
                            key={programFilterForm.key("is_pgwp")}
                            {...programFilterForm.getInputProps("is_pgwp")}
                            searchable
                          />
                          <MultiSelect
                            label="Study Level"
                            placeholder="Please select Study Level"
                            key={programFilterForm.key("study_level_id")}
                            {...programFilterForm.getInputProps(
                              "study_level_id"
                            )}
                            data={studyLevels ?? []}
                            searchable
                          />
                          <MultiSelect
                            label="Looking for"
                            placeholder="Please select Looking for"
                            key={programFilterForm.key("discipline_id")}
                            {...programFilterForm.getInputProps(
                              "discipline_id"
                            )}
                            data={disciplines ?? []}
                            searchable
                          />
                          <Select
                            label="Attendance"
                            placeholder="Please select Attendance"
                            data={[
                              { label: "On Campus", value: "on_campus" },
                              { label: "Online", value: "online" },
                              { label: "Blended", value: "blended" },
                            ]}
                            key={programFilterForm.key("attendance_on")}
                            {...programFilterForm.getInputProps(
                              "attendance_on"
                            )}
                            searchable
                          />
                          <Select
                            label="Program Type"
                            placeholder="Please select Program Type"
                            data={[
                              { label: "Full Time", value: "full_time" },
                              { label: "Part Time", value: "part_time" },
                            ]}
                            key={programFilterForm.key("program_type")}
                            {...programFilterForm.getInputProps("program_type")}
                            searchable
                          />
                          <MultiSelect
                            label="Intake"
                            placeholder="Please select Intake"
                            data={intakes ?? []}
                            key={programFilterForm.key("intake_id")}
                            {...programFilterForm.getInputProps("intake_id")}
                            searchable
                          />
                          {/* <Select
                            label="Duration"
                            placeholder="Please select Duration"
                            data={[
                              "Less than 2 years",
                              "2 Years",
                              "3 Years",
                              "4 Years",
                              "More Than 4 Years",
                            ]}
                            key={programFilterForm.key("duration")}
                            {...programFilterForm.getInputProps("duration")}
                            searchable
                          />
                          <Select
                            label="English Test Type"
                            placeholder="Please select English Test Type"
                            data={[
                              "IELTS",
                              "TOEFL",
                              "PTE",
                              "Duolingo English Test",
                            ]}
                            key={programFilterForm.key("englishTestType")}
                            {...programFilterForm.getInputProps(
                              "englishTestType"
                            )}
                            onChange={handleProgramMinFields}
                            searchable
                          /> */}
                          {/* {isProgramEts && (
                            <Group>
                              <Input.Wrapper
                                label="Min Test Score"
                                error=""
                                withAsterisk
                                w="100%"
                              >
                                <Input
                                  type="number"
                                  placeholder="Min"
                                  key={programFilterForm.key("minTestScore")}
                                  {...programFilterForm.getInputProps(
                                    "minTestScore"
                                  )}
                                />
                              </Input.Wrapper>
                              <Input.Wrapper
                                label="Max Test Score"
                                error=""
                                withAsterisk
                                w="100%"
                              >
                                <Input
                                  type="number"
                                  placeholder="Max"
                                  key={programFilterForm.key("maxTestScore")}
                                  {...programFilterForm.getInputProps(
                                    "maxTestScore"
                                  )}
                                />
                              </Input.Wrapper>
                            </Group>
                          )} */}
                          {/* <Text size="sm" mt="sm">
                            Tuition Fee
                          </Text>
                          <RangeSlider
                            color="#f7e207ba"
                            defaultValue={[
                              feeRangeSlider?.data?.recordInfo?.tuition_fee
                                ?.min ?? 0,
                              feeRangeSlider?.data?.recordInfo?.tuition_fee
                                ?.max ?? 100,
                            ]}
                            label={(value) => value}
                            minRange={10}
                            step={10}
                            min={
                              feeRangeSlider?.data?.recordInfo?.tuition_fee
                                ?.min ?? 0
                            }
                            max={
                              feeRangeSlider?.data?.recordInfo?.tuition_fee
                                ?.max ?? 100
                            }
                            key={programFilterForm.key("tuitionFee")}
                            {...programFilterForm.getInputProps("tuitionFee")}
                          /> */}

                          {/* <Text size="sm" mt="sm">
                            Application Fee
                          </Text>
                          <RangeSlider
                            color="#f7e207ba"
                            defaultValue={[
                              feeRangeSlider?.data?.recordInfo?.application_fee
                                ?.min ?? 0,
                              feeRangeSlider?.data?.recordInfo?.application_fee
                                ?.max ?? 100,
                            ]}
                            label={(value) => value}
                            minRange={10}
                            step={10}
                            min={
                              feeRangeSlider?.data?.recordInfo?.application_fee
                                ?.min ?? 0
                            }
                            max={
                              feeRangeSlider?.data?.recordInfo?.application_fee
                                ?.max ?? 100
                            }
                            key={programFilterForm.key("applicationFee")}
                            {...programFilterForm.getInputProps(
                              "applicationFee"
                            )}
                          /> */}
                          <Group>
                            <Button
                              flex={1}
                              mt={30}
                              type="submit"
                              color="#fce205"
                              radius={20}
                            >
                              Apply Filter
                            </Button>
                          </Group>
                        </Stack>
                      </form>
                    </Stack>
                  </Card>
                </Drawer>

                <Button
                  bg="#fce205"
                  c="#40403a"
                  style={{
                    borderRadius: "20px",
                    padding: "10px",
                    position: "fixed",
                    bottom: "10px",
                    right: "10px",
                    width: "max-content",
                  }}
                  onClick={programDrawerOpen}
                  display={{ lg: "none", base: "block" }}
                >
                  <IconFilter stroke={2} size={20} />
                </Button>
              </Stack>
            </Else>
          </If>
        </Tabs>
      </Box>
    </DashboardLayout>
  );
}
