import React from "react";
import { Timeline } from "@/components/ui/timeline";
import building1 from "@/assets/building-1.jpg";
import building2 from "@/assets/building-2.jpg";
import building3 from "@/assets/building-3.jpg";
import aboutTeam from "@/assets/about-team.jpg";

export default function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-foreground md:text-sm">
            Launched innovative smart home projects across major metro cities. Expanded our portfolio with 50+ new residential and commercial developments.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={building1}
              alt="Modern residential project"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-medium md:h-44 lg:h-60"
            />
            <img
              src={building2}
              alt="Commercial development"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-medium md:h-44 lg:h-60"
            />
            <img
              src={building3}
              alt="Luxury villa project"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-medium md:h-44 lg:h-60"
            />
            <img
              src={aboutTeam}
              alt="PropertyHub team"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-medium md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2015-2023",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-foreground md:text-sm">
            Period of rapid expansion across India. Established ourselves as a trusted name in real estate with over 300+ completed projects.
          </p>
          <p className="mb-8 text-xs font-normal text-foreground md:text-sm">
            Received multiple awards for excellence in architecture, sustainable construction, and customer satisfaction.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={building2}
              alt="Award-winning project"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-medium md:h-44 lg:h-60"
            />
            <img
              src={building3}
              alt="Sustainable development"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-medium md:h-44 lg:h-60"
            />
            <img
              src={building1}
              alt="Urban planning"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-medium md:h-44 lg:h-60"
            />
            <img
              src={aboutTeam}
              alt="Community spaces"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-medium md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "1999-2014",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-foreground md:text-sm">
            Foundation years - Built trust through quality and transparency
          </p>
          <div className="mb-8">
            <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
              ✅ Delivered 500+ residential units
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
              ✅ Established presence in 6 major cities
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
              ✅ Created 10,000+ happy homeowners
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
              ✅ Won 50+ industry awards
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground md:text-sm">
              ✅ Pioneered sustainable construction practices
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={building1}
              alt="Early projects"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-medium md:h-44 lg:h-60"
            />
            <img
              src={building2}
              alt="Historic development"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-medium md:h-44 lg:h-60"
            />
            <img
              src={building3}
              alt="Foundation projects"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-medium md:h-44 lg:h-60"
            />
            <img
              src={aboutTeam}
              alt="Growing team"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-medium md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
