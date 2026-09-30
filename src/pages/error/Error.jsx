import { Helmet } from "react-helmet";
import { useNavigate, useRouteError } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";

const Error = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  const notFound = !error || error.status === 404;

  return (
    <section className="flex min-h-screen flex-col bg-rose-glow">
      <Helmet>
        <title>{notFound ? "Page not found" : "Something went wrong"} | SoulMatch</title>
      </Helmet>
      <div className="container-page py-6">
        <Logo />
      </div>
      <div className="container-page flex flex-1 flex-col items-center justify-center pb-24 text-center">
        <p className="font-display text-[8rem] font-light leading-none text-primary/20 md:text-[12rem]">
          {notFound ? "404" : "Oops"}
        </p>
        <h1 className="-mt-4 text-3xl font-light md:text-5xl">
          {notFound ? <>This page has <em className="text-primary">moved on</em></> : "Something went wrong"}
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          {notFound
            ? "The page you're looking for doesn't exist — but your match might be just a click away."
            : "An unexpected error occurred. Please try again in a moment."}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" size="lg" onClick={() => navigate(-1)}><ArrowLeft /> Go back</Button>
          <Button size="lg" onClick={() => navigate("/")}><Home /> Take me home</Button>
        </div>
      </div>
    </section>
  );
};

export default Error;
