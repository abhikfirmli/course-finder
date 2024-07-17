import {
  AppShell,
  Avatar,
  Box,
  Burger,
  Button,
  Flex,
  Group,
  HoverCard,
  MantineProvider,
  Menu,
  NavLink,
  Popover,
  Skeleton,
  Stack,
  Text,
  Title,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { IconChevronDown, IconHome } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { theme } from "../Theme";
import Logo from "../components/Logo.component";
import {
  ArrowRightIcon,
  BackIcon,
  ChevronDownIcon,
} from "../static/icons/Icons";
import { useState } from "react";

export default function DashboardLayout({
  children,
  page,
  withHeaderBorder = true,
}: {
  children: React.ReactNode;
  page: string;
  withHeaderBorder?: boolean;
}) {
  const navigate = useNavigate();
  const [opened, { toggle }] = useDisclosure();
  const [
    destinationOpened,
    { close: destinationClose, open: destinationOpen },
  ] = useDisclosure(false);

  return (
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications position="top-right" />
      <AppShell
        header={{ height: 90 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { desktop: true, mobile: !opened },
        }}
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <Group justify="space-between" style={{ flex: 1 }}>
              <Logo width={98} />
              <Group gap={30} visibleFrom="sm">
                <Button
                  size="compact-xs"
                  variant="transparent"
                  color="#000"
                  fw={500}
                  fz={14}
                >
                  Home
                </Button>
                <HoverCard
                  width={200}
                  position="bottom"
                  withArrow
                  shadow="md"
                  // opened={destinationOpened}
                >
                  <HoverCard.Target>
                    <Button
                      fw={500}
                      fz={14}
                      size="compact-xs"
                      variant="transparent"
                      color="#000"
                    >
                      Destinations{" "}
                      <IconChevronDown
                        stroke={2}
                        color="#00000091"
                        fontSize={10}
                      />
                    </Button>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Stack>
                      <UnstyledButton>Canada</UnstyledButton>
                      <UnstyledButton>New Zealand</UnstyledButton>
                      <UnstyledButton>Australia</UnstyledButton>
                      <UnstyledButton>Germany</UnstyledButton>
                      <UnstyledButton>USA</UnstyledButton>
                    </Stack>
                  </HoverCard.Dropdown>
                </HoverCard>
                <Button
                  size="compact-xs"
                  variant="transparent"
                  color="#000"
                  fw={500}
                  fz={14}
                >
                  Accomodations
                </Button>
                <Button
                  size="compact-xs"
                  variant="transparent"
                  color="#000"
                  fw={500}
                  fz={14}
                >
                  Blog
                </Button>
                <Button
                  size="compact-xs"
                  variant="transparent"
                  color="#000"
                  fw={500}
                  fz={14}
                >
                  About Us
                </Button>
              </Group>
            </Group>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <Stack align="flex-start" w="max-content">
            <Button
              size="compact-xs"
              variant="transparent"
              color="#000"
              fw={500}
              fz={14}
            >
              Home
            </Button>
            <HoverCard
              width={200}
              position="bottom"
              withArrow
              shadow="md"
              // opened={destinationOpened}
            >
              <HoverCard.Target>
                <Button
                  fw={500}
                  fz={14}
                  size="compact-xs"
                  variant="transparent"
                  color="#000"
                >
                  Destinations{" "}
                  <IconChevronDown stroke={2} color="#00000091" fontSize={10} />
                </Button>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Stack>
                  <UnstyledButton>Canada</UnstyledButton>
                  <UnstyledButton>New Zealand</UnstyledButton>
                  <UnstyledButton>Australia</UnstyledButton>
                  <UnstyledButton>Germany</UnstyledButton>
                  <UnstyledButton>USA</UnstyledButton>
                </Stack>
              </HoverCard.Dropdown>
            </HoverCard>
            <Button
              size="compact-xs"
              variant="transparent"
              color="#000"
              fw={500}
              fz={14}
            >
              Accomodations
            </Button>
            <Button
              size="compact-xs"
              variant="transparent"
              color="#000"
              fw={500}
              fz={14}
            >
              Blog
            </Button>
            <Button
              size="compact-xs"
              variant="transparent"
              color="#000"
              fw={500}
              fz={14}
            >
              About Us
            </Button>
          </Stack>
        </AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
