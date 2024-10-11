import "next-auth";

declare module "next-auth" {
  interface User {
    email: string;
    userId: number;
  }

  interface Session {
    user: {
      email: string;
      userId: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    email: string;
    userId: number;
  }
}
