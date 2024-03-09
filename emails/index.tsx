import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
  Tailwind,
  CodeInline,
  Link,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  Code?: string;
}

export default function AccountVerificationEmailTemplate({ Code }: EmailProps) {
  return (
    <Html>
      <Head>
        <title>Please verify your Email to use Uncut</title>
      </Head>
      <Preview>Use the following Verification code to use Uncut</Preview>
      <Tailwind>
        <Body>
          <Container className="max-w-2xl mx-auto p-4">
            <Link
              href="http://localhost:3000"
              className="flex items-center justify-center mb-4"
            >
              <Img
                className="h-16"
                alt="Uncut Logo"
                src="data:image/png;base64,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"
              />
            </Link>
            <Heading className="text-2xl font-bold mb-2">
              Verify Your Email
            </Heading>
            <Text className="mb-4">
              Welcome to Uncut! To access our platform and start engaging with
              the community, please verify your email address by using the
              provided verification code.
            </Text>
            <Text className="font-semibold mb-1">Verification Code:</Text>
            <div className="bg-gray-200 rounded p-2 px-4 h-12 flex items-center select-all">
              <CodeInline className="text-2xl tracking-widest">
                {Code}
              </CodeInline>
            </div>
            <Text className="text-sm">
              This code is valid for a limited time and should not be shared
              with anyone for security reasons.
            </Text>
            <Text className="mt-4">Thank you for choosing Uncut.</Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
