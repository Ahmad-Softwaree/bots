import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { shadcn } from "@clerk/themes";
import AuthButton from "./AuthButton";

const AuthLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  return (
    <ClerkProvider
      afterSignOutUrl={`/${locale}`}
      signInForceRedirectUrl={`/${locale}/admin/dashboard`}
      appearance={{
        baseTheme: shadcn,
        elements: {
          footerAction: {
            display: "none",
          },
        },
      }}>
      <AuthButton />
      {children}
    </ClerkProvider>
  );
};

export default AuthLayout;
