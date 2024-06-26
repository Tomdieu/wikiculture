"use client";
import { getAllCategories } from "@/actions/articles";
import { getAllCulturalAreas } from "@/actions/cultural_areas";
import { getAllRegions } from "@/actions/regions";
import { cn } from "@/lib/utils";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

type Props = {};

const ExtraFooter = (props: Props) => {
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["footerCategories"],
    queryFn: () => getAllCategories(),
  });
  const { data: culturalAreas, isLoading: isCulturalAreasLoading } = useQuery({
    queryKey: ["footerCulturalAreas"],
    queryFn: () => getAllCulturalAreas(),
  });
  const { data: regions, isLoading: isRegionsLoading } = useQuery({
    queryKey: ["footerRegions"],
    queryFn: () => getAllRegions(),
  });

  const pathName = usePathname();

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  return (
    <section className="w-full py-5 border-t">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 space-x-2 gap-5 items-start w-full">
        <div className="space-y-2 h-full md:col-span-4">
          <div>
            <Link href={"/"}>
              <h1 className="font-bold text-2xl">Wikiculture</h1>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Discover the Vibrant Cultures of Cameroon
          </p>
          <div>
            <Link
              href={"https://github.com/Tomdieu/wikiculture"}
              className="font-bold flex gap-2 items-center pl-2"
            >
              <GitHubLogoIcon className="w-4 h-4 lg:w-5 lg:h-5" />{" "}
              <span className="text-base lg:text-xl">Github</span>
            </Link>
          </div>
        </div>
        <div className="flex sm:hidden flex-col gap-y-2 w-full ">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Categories</AccordionTrigger>
              <AccordionContent>
                <ul>
                  {isCategoriesLoading && (
                    <Loader className="w-5 h-4 animate-spin" />
                  )}
                  {categories?.map((category, index) => (
                    <li>
                      <Link
                        href={`/articles?category=${category.name}`}
                        key={index}
                        className={cn(
                          "text-xs lg:text-sm text-muted-foreground hover:underline",
                          {
                            underline: query === category.name,
                          }
                        )}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Cultural Areas</AccordionTrigger>
              <AccordionContent>
                <ul>
                  {isCulturalAreasLoading && (
                    <Loader className="w-5 h-4 animate-spin" />
                  )}
                  {culturalAreas?.map((culturalArea, index) => (
                    <li>
                      <Link
                        href={`/cultural-regions/${culturalArea.name}`}
                        key={index}
                        className={cn(
                          "text-xs lg:text-sm text-muted-foreground hover:underline",
                          {
                            underline: query === culturalArea.name,
                          }
                        )}
                      >
                        {culturalArea.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Regions</AccordionTrigger>
              <AccordionContent>
                <ul>
                  {isRegionsLoading && (
                    <Loader className="w-5 h-4 animate-spin" />
                  )}
                  {regions?.map((region, index) => (
                    <li>
                      <Link
                        href={`/articles?region=${region.name}`}
                        key={index}
                        className={cn(
                          "text-xs lg:text-sm text-muted-foreground hover:underline",
                          {
                            underline: query === region.name,
                          }
                        )}
                      >
                        {region.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Company</AccordionTrigger>
              <AccordionContent>
                <ul>
                  {[
                    "explore",
                    "articles",
                    "cultural-regions",
                    "search",
                    "about",
                  ].map((link, index) => (
                    <li>
                      <Link
                        href={`/${link}`}
                        key={index}
                        className={cn(
                          "text-xs lg:text-sm text-muted-foreground hover:underline capitalize",
                          {
                            underline: pathName.includes(`/${link}`),
                          }
                        )}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="hidden sm:grid md:col-span-8  gap-y-5 gap-x-5 grid-cols-1 align-top sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h1 className="text-muted-foreground text-sm">Categories</h1>
            <ul>
              {isCategoriesLoading && (
                <Loader className="w-5 h-4 animate-spin" />
              )}
              {categories?.map((category, index) => (
                <li>
                  <Link
                    href={`/articles?category=${category.name}`}
                    key={index}
                    className={cn(
                      "text-xs lg:text-sm text-muted-foreground hover:underline",
                      {
                        underline: query === category.name,
                      }
                    )}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-muted-foreground text-sm">Cultural Areas</h1>
            <ul>
              {isCulturalAreasLoading && (
                <Loader className="w-5 h-4 animate-spin" />
              )}
              {culturalAreas?.map((culturalArea, index) => (
                <li>
                  <Link
                    href={`/cultural-regions/${culturalArea.name}`}
                    key={index}
                    className={cn(
                      "text-xs lg:text-sm text-muted-foreground hover:underline",
                      {
                        underline: query === culturalArea.name,
                      }
                    )}
                  >
                    {culturalArea.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-muted-foreground text-sm">Regions</h1>
            <ul>
              {isRegionsLoading && <Loader className="w-5 h-4 animate-spin" />}
              {regions?.map((region, index) => (
                <li>
                  <Link
                    href={`/articles?region=${region.name}`}
                    key={index}
                    className={cn(
                      "text-xs lg:text-sm text-muted-foreground hover:underline",
                      {
                        underline: query === region.name,
                      }
                    )}
                  >
                    {region.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h1 className="text-muted-foreground text-sm">Company</h1>
            <ul>
              {[
                "explore",
                "articles",
                "cultural-regions",
                "search",
                "about",
              ].map((link, index) => (
                <li>
                  <Link
                    href={`/${link}`}
                    key={index}
                    className={cn(
                      "text-xs lg:text-sm text-muted-foreground hover:underline capitalize",
                      {
                        underline: pathName.includes(`/${link}`),
                      }
                    )}
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExtraFooter;
