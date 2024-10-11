import Image from "next/image";
import Banner from "./home/Banner";
import SubscriptionForm from "./home/SubscriptionForm";
import Subscribers from "./home/Subscribers";
import LoginForm from "./login/LoginForm";

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
      <LoginForm />
    </div>
  );
}
