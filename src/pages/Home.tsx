import Button from "@components/UI/Button/Button";
import { Footer, NavigationBar } from "@components/layouts";
import { ArrowUpDown, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      {/* add relative position here */}
      <NavigationBar />
      <Hero />
      <Features />
      <DeliveryStats />
      <Associates />
      <Testimonials />
      <CallToAction />
      <Footer />
    </main>
  );
}

import shipment from "@assets/images/shipment.jpg";

function Hero() {
  return (
    <section>
      <div>
        <h1>expand your business while we manage all your logistical needs</h1>

        <div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Soluta
            harum vel doloremque. Hic commodi excepturi quae iste facilis. Aut,
            saepe?
          </p>
          <Button>
            <p>get started</p>
            <ArrowUpRight />
          </Button>
        </div>
      </div>
      <img
        src={shipment}
        alt="image of a port with a ship on th ocean and containers on the port"
      />
      {/* image credit: Photo by Tom Fisk: https://www.pexels.com/photo/drone-shot-of-a-cargo-ship-on-port-3856433/ */}
    </section>
  );
}

function Features() {
  return (
    <section>
      <div>
        <h1>Lorem ipsum dolor sit.</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
          placeat ea, iure non reiciendis porro fugit temporibus, eius vel
          dolorem debitis odio!
        </p>
      </div>
      <div>
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index}>
            <span>
              <ArrowUpDown />
            </span>
            <h3>Lorem, ipsum.</h3>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
          </div>
        ))}
      </div>
    </section>
  );
}

import shipmentVideo from "@assets/images/shipment.mp4";

function DeliveryStats() {
  return (
    <section>
      <div>
        <h1>Lorem ipsum dolor sit amet consectetur.</h1>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem repudiandae doloremque aliquam, obcaecati
            necessitatibus perferendis.
          </p>
          <div>
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index}>
                <h1>20k</h1>
                <p>Lorem, ipsum.</p>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        <video width="750" autoPlay loop muted>
          <source src={shipmentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}

// video credit: Video by Jay S: https://www.pexels.com/video/a-railway-crossing-4021642/

function Associates() {
  return (
    <section>
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
    </section>
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
    <section>
      {countries.slice(0, 8).map((country, index) => (
        <Country
          key={index}
          flag={country.flags.png}
          name={country.name.common}
          alt={country.flags.alt}
        />
      ))}
    </section>
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
    <section>
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
    </section>
  );
}

import profile from "@assets/images/profile.jpg";

function Testimonials() {
  return (
    <section>
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
    </section>
  );
}
