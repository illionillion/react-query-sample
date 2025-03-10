import { TimelineForm } from "@/components/timeline-form";
import { Container, Heading, VStack } from "@yamada-ui/react";

export default function Home() {
  return (
    <Container>
      <VStack>
        <Heading>掲示板</Heading>
        <TimelineForm />
      </VStack>
    </Container>
  );
}
