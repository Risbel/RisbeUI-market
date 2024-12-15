import { Body, Container, Head, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";

const ProductEmail = () => {
  return (
    <Html>
      <Head />
      <Preview>Your product is here...</Preview>
      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="p-8 flex flex-col items-center">
            <Img
              src={`https://risbeui-market.vercel.app/icons8-tailwind-css-128.png`}
              width="42"
              height="42"
              alt="Linear"
              style={{
                borderRadius: 21,
                width: 42,
                height: 42,
              }}
            />
            <Text className="text-2xl font-bold">Hi friend</Text>
            <Text className="text-lg text-gray-600">Thank you for buying your product at RisbeUI</Text>
            <Section className="flex flex-col gap-2">
              <Link href={"https://risbeui-market.vercel.app"} className="text-white bg-blue-500 rounded-lg px-10 py-4">
                Go to RisbeUI
              </Link>
            </Section>
            <Text>Best, RisbeUI Team.</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ProductEmail;
