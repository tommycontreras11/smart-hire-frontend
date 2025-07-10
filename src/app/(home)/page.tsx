"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/contexts/auth-context";
import { JobPositionContractTypeEnum } from "@/enums/job-position.enum";
import { UserRoleEnum } from "@/enums/user.enum";
import { useGetAllCountry } from "@/hooks/api/country.hook";
import { useGetAllJobPosition } from "@/hooks/api/job-position.hook";
import { useGetAllRequest } from "@/hooks/api/request.hook";
import { useCreateRequest } from "@/mutations/api/requests";
import { ICreateRequest } from "@/providers/http/requests/interface";
import { debounceWithParameters } from "@/utils/job-position";
import { capitalizeFirstLetter } from "@/utils/string";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  Clock,
  DollarSign,
  MapPin,
  Search,
} from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const { user, isLoggedIn } = useAuth();

  const isCandidate = useMemo(() => {
    return user?.role === UserRoleEnum.CANDIDATE;
  }, [user]);
  const [jobOrSkillFilter, setJobOrSkillFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [contractTypeFilter, setContractTypeFilter] = useState("");

  const handleSearchTermChange = debounceWithParameters((jobOrSkillFilter) => {
    setJobOrSkillFilter(jobOrSkillFilter);
  }, 500);

  const { data: requests, refetch: refetchRequests } = useGetAllRequest();

  const { data: jobPositions, refetch: refetchJobPositions } =
    useGetAllJobPosition({
      jobOrSkill: jobOrSkillFilter,
      location: locationFilter,
      contractType: contractTypeFilter,
    });

  const { data: countries, isLoading: isLoadingCountries } = useGetAllCountry();

  const { mutate: createRequest } = useCreateRequest(() => {
    refetchRequests();
    refetchJobPositions();
  });

  const jobPositionContractType = Object.values(
    JobPositionContractTypeEnum
  ).map((type) => ({
    value: type,
    label: capitalizeFirstLetter(type.replace("_", " ")),
  }));

  const handleSubmit = (data: Partial<ICreateRequest>) => {
    if (!data.jobPositionUUID || !user) return;

    createRequest({ candidateUUID: user!.uuid, jobPositionUUID: data.jobPositionUUID });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-blue-500 to-blue-700">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 z-0" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl text-white font-bold tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Find your next one
              <span className="text-white"> opportunity</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Explore the best job opportunities and take the next step in your
              career.
            </motion.p>
          </div>

          <motion.div
            className="mt-10 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by job skills, title or company"
                  className="pl-10 bg-white"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleSearchTermChange(e.target.value)
                  }
                />
              </div>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-full sm:w-[200px] bg-white">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  {!isLoadingCountries &&
                    countries &&
                    countries.map((country) => (
                      <SelectItem key={country.uuid} value={country.name}>
                        {country.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Select
                value={contractTypeFilter}
                onValueChange={setContractTypeFilter}
              >
                <SelectTrigger className="w-full sm:w-[200px] bg-white">
                  <SelectValue placeholder="Contract Type" />
                </SelectTrigger>
                <SelectContent>
                  {jobPositionContractType.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label.replace("_", " ")}
                    </SelectItem>
                  ))}{" "}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Jobs List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6">
          {jobPositions &&
            jobPositions.map((job, index) => {
              const isApplied = requests?.some(
                (request) =>
                  request.jobPosition.uuid === job.uuid &&
                  request.candidate.uuid === user?.uuid
              );

              return (
                <motion.div
                  key={job.uuid}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="group relative bg-card hover:shadow-lg transition-shadow rounded-lg p-6 border">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                            {job.name}
                          </h3>
                          <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <Building2 className="h-4 w-4" />
                            <span>{job.recruiter.institution.name}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            <span>{job.country.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span>
                              {capitalizeFirstLetter(
                                job.contract_type.replace("_", " ")
                              )}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>{`${`$${job.minimum_salary}`} -${`$${job.maximum_salary}`} USD`}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{job.posted}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground line-clamp-2">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {job.competencies.map((competency) => (
                            <Badge key={competency.uuid} variant="secondary">
                              {competency.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-3 sm:min-w-[120px]">
                        {(isCandidate || !user) && !isApplied && (
                          <Button
                            className="flex-1"
                            size="lg"
                            onClick={() => {
                              if (!isCandidate || !user) {
                                toast.success("Error", {
                                  description:
                                    "You must be logged in as a candidate to apply for a job",
                                  duration: 3000,
                                });
                                return;
                              }

                              handleSubmit({ jobPositionUUID: job.uuid });
                            }}
                          >
                            Apply
                          </Button>
                        )}
                        <Button variant="outline" className="flex-1" size="lg">
                          See Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>
      </section>
    </>
  );
}
