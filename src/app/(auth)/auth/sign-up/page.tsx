"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserRoleEnum } from "@/enums/common.enum";
import { useGetAllDepartment } from "@/hooks/api/department.hook";
import { useGetAllInstitution } from "@/hooks/api/institution.hook";
import { useGetAllPositionType } from "@/hooks/api/position-type";
import { useSignUp } from "@/mutations/api/auth";
import { ICreateCandidate } from "@/providers/http/candidates/interface";
import { ICreateRecruiter } from "@/providers/http/recruiters/interface";
import { ISignUp, signUpSchema } from "@/schema/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false);
  const [departmentSelected, setDepartmentSelected] = useState<string | null>(null);

  const { data: departments } = useGetAllDepartment();
  const { data: positions } = useGetAllPositionType(departmentSelected || "", true);
  const { data: institutions } = useGetAllInstitution();

  const candidateForm = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      user: {
        email: "",
        name: "",
        password: "",
        identification: "",
        desired_salary: "",
        positionUUID: "",
        departmentUUID: "",
      },
      type: UserRoleEnum.CANDIDATE,
    },
  });

  const recruiterForm = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      user: {
        email: "",
        name: "",
        password: "",
        identification: "",
        institution: "",
      },
      type: UserRoleEnum.RECRUITER,
    },
  });

  const { mutate: createUser } = useSignUp(() => {
    candidateForm.reset();
    recruiterForm.reset();    
    router.push("/auth/sign-in");
    setShowPassword(false);
  });


  const handleSubmitWithRole = (role: UserRoleEnum) => (values: ISignUp) => {
    if (role === UserRoleEnum.CANDIDATE) {
      createUser({
        user: values.user as ICreateCandidate,
        type: UserRoleEnum.CANDIDATE,
      });
    } else {
      createUser({
        user: values.user as ICreateRecruiter,
        type: UserRoleEnum.RECRUITER,
      });
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>
            Choose the type of account you want to create
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="candidate" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="candidate">Candidate</TabsTrigger>
              <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
            </TabsList>

            <TabsContent value="candidate">
              <Form {...candidateForm}>
                <form
                  onSubmit={candidateForm.handleSubmit(
                    handleSubmitWithRole(UserRoleEnum.CANDIDATE)
                  )}
                  className="flex flex-col gap-4"
                >
                  <h2 className="text-xl font-semibold">
                    Candidate Registration
                  </h2>

                  <FormField
                    control={candidateForm.control}
                    name="user.identification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identification</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={candidateForm.control}
                    name="user.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={candidateForm.control}
                    name="user.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={candidateForm.control}
                    name="user.password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="********"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={candidateForm.control}
                    name="user.desired_salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Desired Salary</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={candidateForm.control}
                    name="user.departmentUUID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Department</FormLabel>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setDepartmentSelected(value);
                          }}
                          value={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a department" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {departments &&
                              departments.map((department) => (
                                <SelectItem
                                  key={department.uuid}
                                  value={department.uuid}
                                >
                                  {department.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={candidateForm.control}
                    name="user.positionUUID"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!departmentSelected}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select a position" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {positions &&
                              positions.map((position) => (
                                <SelectItem
                                  key={position.uuid}
                                  value={position.uuid}
                                >
                                  {position.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Register as Candidate</Button>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <a
                      href="/auth/sign-in"
                      className="underline underline-offset-4"
                    >
                      Sign in
                    </a>
                  </div>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="recruiter">
              <Form {...recruiterForm}>
                <form
                  onSubmit={recruiterForm.handleSubmit(
                    handleSubmitWithRole(UserRoleEnum.RECRUITER)
                  )}
                  className="flex flex-col gap-4"
                >
                  <h2 className="text-xl font-semibold">
                    Recruiter Registration
                  </h2>

                  <FormField
                    control={recruiterForm.control}
                    name="user.identification"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Identification</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={recruiterForm.control}
                    name="user.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={recruiterForm.control}
                    name="user.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={recruiterForm.control}
                    name="user.password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="********"
                              {...field}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-2 top-1/2 -translate-y-1/2"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={recruiterForm.control}
                    name="user.institution"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institution</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl className="w-full">
                            <SelectTrigger>
                              <SelectValue placeholder="Select or enter an institution" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {institutions &&
                              institutions.map((institution) => (
                                <SelectItem
                                  key={institution.uuid}
                                  value={institution.name}
                                >
                                  {institution.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Register as Recruiter</Button>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <a
                      href="/auth/sign-in"
                      className="underline underline-offset-4"
                    >
                      Sign in
                    </a>
                  </div>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
