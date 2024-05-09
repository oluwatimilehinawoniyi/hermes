import Button from "@components/UI/Button/Button";
import { Features, Footer, Hero, WhatWeDo } from "@components/layouts";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <Features />
      <WhatWeDo />
      <Associates />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}

function Associates() {
  return (
    <Section>
      <div className="">
        <h1>we serve more than 50+ countries</h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Alias dolor
          praesentium facere temporibus nam minus.
        </p>
      </div>
      <div className="">
        <CountriesCarousel />
      </div>
    </Section>
  );
}

import { useState, useEffect } from "react";

interface CountryData {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  name: {
    common: string;
  };
}

function CountriesCarousel() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCountries(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchCountries();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Section>
      {countries.slice(0, 8).map((country, index) => (
        <Country
          key={index}
          flag={country.flags.png}
          name={country.name.common}
          alt={country.flags.alt}
        />
      ))}
    </Section>
  );
}

function Country({
  alt,
  flag,
  name,
}: {
  alt: string;
  name: string;
  flag: string;
}) {
  return (
    <div>
      <span>
        <img src={flag} alt={alt} />
      </span>
      <p>{name}</p>
    </div>
  );
}

function CallToAction() {
  return (
    <Section>
      <div>
        <h1>
          It's your time to make the impact you've always dreamed of. We are
          ready to have you work with us!
        </h1>
        <Button>
          <p>get started</p>
          <ArrowUpRight />
        </Button>
      </div>
    </Section>
  );
}

import profile from "@assets/images/profile.jpg";
import Section from "@components/UI/Section/Section";

function Testimonials() {
  return (
    <Section>
      <h1>your fellow associates said:</h1>
      <div>
        <div className="">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi odit
            numquam unde, accusantium eum id omnis incidunt facilis deleniti
            alias! Consectetur commodi saepe repudiandae itaque aliquam
            deserunt, earum eos. Laboriosam esse, amet quo earum dicta quas
            excepturi. Praesentium eius beatae, sit odio, nihil dignissimos
            ipsum nesciunt consequatur voluptatibus error nemo?
          </p>
          <div>
            <div>
              <span>
                <img src={profile} alt="profile picture" />
              </span>
              <span>
                <h2>john doe</h2>
                <p>head of sales, alaska</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
