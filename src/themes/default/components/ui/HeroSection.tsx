import {
  Button,
  Container,
  Grid,
  Group,
  Image,
  Text,
  Title,
} from "@mantine/core";
import { IconPhone } from "@tabler/icons-react";

export default function HeroSection() {
  return (
    <Group bg={"#faf8eb"}>
      <Container
        size={"lg"}
        className="hero-section"
        style={{ paddingTop: "35px" }}
      >
        <Grid mb={0} style={{ position: "relative" }}>
          <Grid.Col span={{ base: 12, md: 12, lg: 6 }} mb={20}>
            <Title order={1} fz={40} mt={50}>
              Your Success Journey
              <br />
              Starts With Us!
            </Title>
            <Text fz={18} mt={25}>
              Learn Overseas Can Fulfil Your International Education Dream By
              Finding The Best Fit For You At Top Universities and Colleges
              Around The World.
            </Text>
            <Group mt={33} style={{ display: "flex", gap: "40px" }}>
              <Button
                w={300}
                h={50}
                radius={30}
                style={{
                  background: "#fce205",
                  color: "black",
                  border: "#fce205",
                }}
                onClick={() =>
                  (window.location.href =
                    "https://frm.li/t/LK1721295569300E24XUCZJ19")
                }
              >
                Start Your Journey Now
              </Button>
              {/* <Button
                w={200}
                h={50}
                radius={30}
                style={{
                  background: "transparent",
                  color: "#000",
                  border: "1px solid #000",
                }}
              >
                <IconPhone />
                Talk to Experts
              </Button> */}
            </Group>
          </Grid.Col>
          <Grid.Col
            display={{ base: "none", lg: "block" }}
            span={{ base: 12, md: 12, lg: 6 }}
          >
            <Image
              radius=""
              src="assets/images/hero_section.png"
              style={{ position: "absolute", width: "500px", bottom: "8px" }}
            />
          </Grid.Col>
        </Grid>
      </Container>
    </Group>
  );
}
