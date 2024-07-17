import React from "react";
import DashboardLayout from "../../layout/Dashboard.layout";
import {
  Box,
  Button,
  Card,
  Container,
  Group,
  Image,
  List,
  Popover,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import {
  Alarm2Icon,
  BooksIcon,
  FileText,
  UsersIcon,
} from "../../static/icons/Icons";
import {
  IconBook,
  IconBuildingBank,
  IconMapPinFilled,
} from "@tabler/icons-react";
import { Carousel } from "@mantine/carousel";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";
import { ProgramCard } from "../../components/cards/ProgramCard/Program.card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useInstitutionDetail } from "../../../../api/institutions/useInstitutions";

export default function InstitutionPage() {
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  const { data: institutionDetail } = useInstitutionDetail(
    searchParams.get("id")
  );

  console.log(institutionDetail, "<institutionDetail");

  return (
    <DashboardLayout withHeaderBorder={false} page="Institutions">
      <Stack bg={"#f5f5f5"} p={30}>
        <Card radius={8} mb={100}>
          <Stack p={20}>
            <Group justify="space-between">
              <Group gap={40}>
                <Group h={150} w={150}>
                  <Image
                    w="100%"
                    src={
                      institutionDetail?.data?.recordInfo?.institutionInfo?.logo
                    }
                    fallbackSrc="https://static-assets.dfavo.cloud/images/institutions/1-min.png"
                  />
                </Group>
                <Group align="center" gap={20}>
                  <IconMapPinFilled color="#6b6b6b" />
                  <Stack gap={7}>
                    <Title fz={14} fw={300} lh="14.1px" c="#363636">
                      Location
                    </Title>
                    <Text fz={14} fw={500} lh="14.1px">
                      {
                        institutionDetail?.data?.recordInfo?.institutionInfo
                          ?.countryName
                      }
                    </Text>
                  </Stack>
                </Group>
                <Group align="center" gap={20}>
                  <IconBuildingBank color="#6b6b6b" />
                  <Stack gap={7}>
                    <Title fz={14} fw={300} lh="14.1px" c="#363636">
                      Institution Type
                    </Title>
                    <Text fz={14} fw={500} lh="14.1px">
                      {
                        institutionDetail?.data?.recordInfo?.institutionInfo
                          ?.institutionType
                      }
                    </Text>
                  </Stack>
                </Group>
                <Group align="center" gap={20}>
                  <IconBook color="#6b6b6b" />
                  <Stack gap={7}>
                    <Title fz={14} fw={300} lh="14.1px" c="#363636">
                      Campus/es
                    </Title>
                    <Text fz={14} fw={500} lh="14.1px">
                      {institutionDetail?.data?.recordInfo?.institutionInfo?.campuses
                        .map((campus: any) => campus.campusName)
                        .join(", ")}
                    </Text>
                  </Stack>
                </Group>
              </Group>
              <Group>
                <Splide
                  aria-label="College Images"
                  options={{
                    perPage: 2,
                    perMove: 1,
                    pagination: false,
                    direction: "ttb",
                    height: "150px",

                    gap: ".5rem",
                    wheel: true,
                  }}
                >
                  {/* <Image.PreviewGroup> */}
                  <SplideSlide>
                    <Image
                      src="https://images.unsplash.com/photo-1624951517902-e05b4105e123?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                      alt="college logo"
                      width={100}
                    />
                  </SplideSlide>
                  <SplideSlide>
                    <Image
                      src="https://images.unsplash.com/photo-1600431521340-491eca880813?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
                      alt="college logo"
                      width={100}
                    />
                  </SplideSlide>

                  <SplideSlide>
                    <Image
                      src="https://images.unsplash.com/photo-1600431521340-491eca880813?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
                      alt="college logo"
                      width={100}
                    />
                  </SplideSlide>

                  <SplideSlide>
                    <Image
                      src="https://images.unsplash.com/photo-1600431521340-491eca880813?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
                      alt="college logo"
                      width={100}
                    />
                  </SplideSlide>

                  <SplideSlide>
                    <Image
                      src="https://images.unsplash.com/photo-1600431521340-491eca880813?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80"
                      alt="college logo"
                      width={100}
                    />
                  </SplideSlide>
                  {/* </Image.PreviewGroup> */}
                </Splide>
              </Group>
            </Group>
          </Stack>
        </Card>
        <Title order={4} fz={20} fw={600} c={"#000000e0"} lh={1.4}>
          Programs
        </Title>

        {institutionDetail?.data?.recordInfo?.programInfo?.map(
          (program: any, index: any) => (
            <ProgramCard key={index} program={program} isImg={true} />
          )
        )}

        <Group justify="center" mb={25}>
          <Button
            bg={"#fff"}
            c={"#000"}
            h={35}
            style={{ borderRadius: "20px", border: "1px solid #00000047" }}
            onClick={() => navigate("/")}
          >
            Go to Dashboard
          </Button>
        </Group>
        <Title order={4} fz={20} fw={600} c={"#000000e0"} lh={1.4}>
          Requirements
        </Title>
        <Card p={50}>
          <List listStyleType="disc" withPadding>
            <List.Item>
              All official academic Transcripts and grade cards
            </List.Item>
            <List.Item>Passport size photographs</List.Item>
            <List.Item>Passport photocopy</List.Item>
            <List.Item>Updated CV/Resume</List.Item>
            <List.Item>English Language Proficiency Test Scores</List.Item>
            <List.Item>Letter of Recommendations</List.Item>
          </List>
        </Card>
      </Stack>
    </DashboardLayout>
  );
}
