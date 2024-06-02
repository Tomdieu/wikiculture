import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {};

const CulturalRegions = (props: Props) => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 dark:bg-gray-800 text-2xl font-bold">
              Cultural Regions
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Explore the Diverse Cultures of Cameroon
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              From the vibrant coastal regions to the lush rainforests, each
              part of Cameroon has a unique cultural identity. Discover the
              traditions, art, and stories that make this country so
              captivating.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <ul className="grid gap-6">
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Coastal Region</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Explore the rich maritime culture, with influences from West
                    Africa and the Atlantic Ocean.
                  </p>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Learn More
                  </Link>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Grasslands Region</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Discover the vibrant traditions of the Grassfields, known
                    for their intricate textiles and royal palaces.
                  </p>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Learn More
                  </Link>
                </div>
              </li>
              <li>
                <div className="grid gap-1">
                  <h3 className="text-xl font-bold">Rainforest Region</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Immerse yourself in the rich biodiversity and traditional
                    ways of life in Cameroon's lush rainforests.
                  </p>
                  <Link
                    className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Learn More
                  </Link>
                </div>
              </li>
            </ul>
          </div>
          <Image
            alt="Image"
            className="object-fill"
            height="400"
            src="/cameroon.png"
            width="400"
          />
        </div>
      </div>
    </section>
  );
};

export default CulturalRegions;
