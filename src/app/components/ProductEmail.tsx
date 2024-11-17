import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const ProductEmail = ({ link }: { link: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Your product is here...</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="p-8 flex flex-col items-center">
            <Text className="text-2xl font-bold">Hi friend</Text>
            <Text className="text-lg text-gray-600">Thank you for buying your product at RisbeUI</Text>
            <Section className="flex flex-col gap-2">
              <Button href={link} className="text-white bg-blue-500 rounded-lg px-10 py-4">
                Your Download Link
              </Button>
            </Section>
            <Text>Best, RisbeUI Team.</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ProductEmail;
