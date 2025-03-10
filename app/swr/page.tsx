import { TimelineFormSWR } from "@/components/timeline-form-swr";
import { Container, Heading, VStack } from "@yamada-ui/react";

export default function Page() {
  return (
    <Container>
      <VStack>
        <Heading>掲示板</Heading>
        <TimelineFormSWR />
      </VStack>
    </Container>
  );
}
