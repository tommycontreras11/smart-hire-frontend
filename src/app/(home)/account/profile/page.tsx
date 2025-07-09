"use client";

import { PdfViewerModal } from "@/components/common/candidates/pdf-viewer.modal";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/auth-context";
import { PlatformTypeEnum } from "@/enums/social-link.enum";
import { useGetProfile } from "@/hooks/api/auth.provider.hook";
import { useGetAllCompetency } from "@/hooks/api/competency.hook";
import { cn } from "@/lib/utils";
import {
  useUpdateCandidate,
  useUpdateCandidateProfile,
} from "@/mutations/api/candidates";
import { IUpdateCandidateProfile } from "@/providers/http/candidates/interface";
import { updateCandidateProfileFormSchema } from "@/schema/candidate.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Award,
  Bell,
  Briefcase,
  Building,
  Calendar,
  CalendarDays,
  Camera,
  Check,
  CheckCircle,
  ChevronsUpDown,
  Download,
  Edit,
  Edit3,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Github,
  Globe,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Settings,
  Shield,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";

// Types for education and certification
interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  description?: string;
  gpa?: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
  description?: string;
}

// Mock user data
const mockUser = {
  id: "1",
  name: "Ana García Rodríguez",
  email: "ana.garcia@company.com",
  phone: "+52 55 1234 5678",
  location: "Ciudad de México, México",
  avatar: "",
  title: "Senior UX/UI Designer",
  department: "Design",
  employeeId: "EMP-2024-001",
  startDate: "2023-03-15",
  manager: "Carlos Mendoza",
  bio: "Passionate UX/UI designer with 5+ years of experience creating user-centered digital experiences. I specialize in design systems, user research, and prototyping.",
  skills: [
    "Figma",
    "Adobe XD",
    "Sketch",
    "Prototyping",
    "User Research",
    "Design Systems",
    "HTML/CSS",
    "JavaScript",
  ],
  education: [
    {
      id: "1",
      degree: "Master in Digital Design",
      institution: "Universidad de las Américas",
      year: "2020",
      description:
        "Specialized in user experience design and digital product development.",
      gpa: "3.8",
    },
    {
      id: "2",
      degree: "Bachelor in Graphic Design",
      institution: "Universidad Nacional",
      year: "2018",
      description: "Focused on visual communication and brand identity design.",
      gpa: "3.6",
    },
  ] as Education[],
  certifications: [
    {
      id: "1",
      name: "Google UX Design Certificate",
      issuer: "Google",
      issueDate: "2023-01-15",
      credentialId: "GUX-2023-001",
      description:
        "Comprehensive UX design program covering user research, wireframing, and prototyping.",
    },
    {
      id: "2",
      name: "Adobe Certified Expert",
      issuer: "Adobe",
      issueDate: "2022-08-20",
      expiryDate: "2025-08-20",
      credentialId: "ACE-2022-456",
      description:
        "Expert-level certification in Adobe Creative Suite applications.",
    },
    {
      id: "3",
      name: "Figma Professional Certification",
      issuer: "Figma",
      issueDate: "2023-06-10",
      credentialId: "FPC-2023-789",
      description:
        "Advanced certification in Figma design and prototyping tools.",
    },
  ] as Certification[],
  socialLinks: {
    linkedin: "https://linkedin.com/in/anagarcia",
    portfolio: "https://anagarcia.design",
    github: "https://github.com/anagarcia",
  },
};

export default function Profile() {
  const { user: userAuth } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Education state
  const [isEducationDialogOpen, setIsEducationDialogOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(
    null
  );

  const [socialLink, setSociaLink] = useState({
    url: "",
    type: PlatformTypeEnum,
  });

  const [selectedSkills, setSelectedSkills] = useState<
    { uuid: string; name: string }[]
  >([]);
  const [skillsOpen, setSkillsOpen] = useState(false);

  const [selectedCV, setSelectedCV] = useState<{
    url: string;
    name: string;
  } | null>(null);

  const [isAddingPlatform, setIsAddingPlatform] = useState(false);

  const { data: user } = useGetProfile(userAuth?.uuid || "");

  const [uploadingCV, setUploadingCV] = useState(false);

  const [educationForm, setEducationForm] = useState<Partial<Education>>({});

  // Certification state
  const [isCertificationDialogOpen, setIsCertificationDialogOpen] =
    useState(false);
  const [editingCertification, setEditingCertification] =
    useState<Certification | null>(null);
  const [certificationForm, setCertificationForm] = useState<
    Partial<Certification>
  >({});

  const form = useForm<IUpdateCandidateProfile>({
    resolver: zodResolver(updateCandidateProfileFormSchema),
    defaultValues: {
      personal: {
        identification: "",
        email: "",
        name: "",
        password: "",
        phone: "",
        bio: "",
        location: "",
        desired_salary: "",
        social_links: [],
        file: undefined,
      },
      professional: {
        education: {
          uuid: "",
          title: "",
          description: "",
          grade: "",
          start_date: undefined,
          end_date: undefined,
          institutionUUID: "",
          academicDisciplineUUID: "",
        },
        certification: {
          uuid: "",
          name: "",
          description: "",
          expedition_date: undefined,
          expiration_date: undefined,
          credential_id: "",
          credential_link: "",
          institutionUUID: "",
          competencyUUIDs: [],
        },
        competencyUUIDs: [],
      },
    },
  });

  const { mutate: updateCandidate } = useUpdateCandidateProfile(() => {});
  const { data: competencies } = useGetAllCompetency();

  const handleSave = (data: Partial<IUpdateCandidateProfile>) => {
    console.log(data.personal?.file);
    // const formData = new FormData()
    // setIsEditing(false);

    // if(data.personal?.file) formData.append('file', data.personal?.file)
    // updateCandidate({ uuid: userAuth!.uuid, data: formData });
  };

  const addSkill = () => {};

  // CV Upload handler
  const handleCVUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file only.");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB.");
      return;
    }

    setUploadingCV(true);

    try {
      const formData = new FormData();
      setIsEditing(false);

      formData.append("file", file);
      console.log("file: ", formData.get("file"));
      updateCandidate({ uuid: userAuth!.uuid, data: formData });
    } catch (error) {
      alert("Error uploading file. Please try again.");
    } finally {
      setUploadingCV(false);
    }
  };

  // Education functions
  const openEducationDialog = (education?: Education) => {
    if (education) {
      setEditingEducation(education);
      setEducationForm(education);
    } else {
      setEditingEducation(null);
      setEducationForm({});
    }
    setIsEducationDialogOpen(true);
  };

  const saveEducation = () => {
    if (
      !educationForm.degree ||
      !educationForm.institution ||
      !educationForm.year
    )
      return;

    if (editingEducation) {
    }

    setIsEducationDialogOpen(false);
    setEducationForm({});
    setEditingEducation(null);
  };

  const deleteEducation = (id: string) => {};

  // Certification functions
  const openCertificationDialog = (certification?: Certification) => {
    if (certification) {
      setEditingCertification(certification);
      setCertificationForm(certification);
    } else {
      setEditingCertification(null);
      setCertificationForm({});
    }
    setIsCertificationDialogOpen(true);
  };

  const saveCertification = () => {
    if (
      !certificationForm.name ||
      !certificationForm.issuer ||
      !certificationForm.issueDate
    )
      return;

    if (editingCertification) {
    } else {
    }

    setIsCertificationDialogOpen(false);
    setCertificationForm({});
    setEditingCertification(null);
  };

  const deleteCertification = (id: string) => {};

  const getPlatformLabel = (type: PlatformTypeEnum) => {
    switch (type) {
      case PlatformTypeEnum.GITHUB:
        return "GitHub";
      case PlatformTypeEnum.PORTFOLIO:
        return "Portfolio";
      default:
        return type;
    }
  };

  const getPlatformIcon = (type: PlatformTypeEnum) => {
    switch (type) {
      case PlatformTypeEnum.GITHUB:
        return <Github className="h-4 w-4" />;
      case PlatformTypeEnum.PORTFOLIO:
        return <Globe className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  const toggleSkill = (skill: { uuid: string; name: string }) => {
    setSelectedSkills((prev) =>
      prev.some((s) => s.uuid === skill.uuid)
        ? prev.filter((s) => s.uuid !== skill.uuid)
        : [...prev, skill]
    );
  };

  const removeSkill = (uuid: string) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill.uuid !== uuid));
  };

  const filteredSkills =
    competencies &&
    competencies.filter(
      (skill) =>
        !selectedSkills.some((selected) => skill.uuid === selected.uuid)
    );

  return (
    <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Overview Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="text-center">
            <div className="relative mx-auto">
              <Avatar className="h-32 w-32 mx-auto">
                <AvatarImage src={user?.photo || ""} alt={user?.name} />
                <AvatarFallback className="text-2xl">
                  {user?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute bottom-0 right-0 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-lg text-muted-foreground">
                {user?.requests && user?.requests[0].jobPosition.name}
              </p>
              <Badge variant="outline" className="bg-primary/10">
                {user?.requests &&
                  user?.requests[0].jobPosition.department.name}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{user?.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{user?.location}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span>ID: {user?.identification}</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>
                  {user?.requests && user?.requests[0]?.started_at
                    ? `Started ${new Date(user?.requests[0]?.started_at).toLocaleDateString()}`
                    : "Not started"}
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Manager</h4>
              <p className="text-sm text-muted-foreground">{`${user?.requests && user?.requests[0]?.recruitment ? user?.requests[0]?.recruitment?.recruiter.name : "None"}`}</p>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="personal" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="professional">Professional</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Personal Information Tab */}
            <TabsContent value="personal" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={user?.name}
                        onChange={(e) => {}}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user?.email}
                        onChange={(e) => {}}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={user?.phone}
                        onChange={(e) => {}}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={user?.location}
                        onChange={(e) => {}}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={user?.bio}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {}}
                      disabled={!isEditing}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Platforms Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Professional Platforms
                  </CardTitle>
                  <CardDescription>
                    Manage your professional online presence
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {user?.socialLinks && user?.socialLinks.length > 0 && (
                    <div className="space-y-3">
                      {user?.socialLinks.map((platform) => (
                        <div
                          key={platform.type}
                          className="flex items-center justify-between p-4 border rounded-lg bg-muted/30"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              {getPlatformIcon(platform.type)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {getPlatformLabel(platform.type)}
                              </div>
                              <div className="text-sm text-muted-foreground truncate max-w-[300px]">
                                {platform.url}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                window.open(platform.url, "_blank")
                              }
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {}}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {!isAddingPlatform ? (
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingPlatform(true)}
                      className="w-full"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Platform
                    </Button>
                  ) : (
                    <div className="space-y-4 p-4 border rounded-lg bg-muted/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="platform-type">Platform Type</Label>
                          <Select value={""} onValueChange={(value) => {}}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select platform type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value={PlatformTypeEnum.GITHUB}>
                                <div className="flex items-center gap-2">
                                  <Github className="h-4 w-4" />
                                  GitHub
                                </div>
                              </SelectItem>
                              <SelectItem value={PlatformTypeEnum.PORTFOLIO}>
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4" />
                                  Portfolio
                                </div>
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="platform-url">URL</Label>
                          <Input
                            id="platform-url"
                            type="url"
                            placeholder="https://..."
                            value={""}
                            onChange={(e) => {}}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => {}} disabled={true}>
                          Add Platform
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsAddingPlatform(false);
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Professional Information Tab */}
            <TabsContent value="professional" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Job Information</CardTitle>
                  <CardDescription>
                    Your current role and employment details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        value={
                          user?.requests && user?.requests[0]?.jobPosition?.name
                        }
                        onChange={(e) => {}}
                        disabled={true}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        value={
                          user?.requests &&
                          user?.requests[0]?.jobPosition?.department?.name
                        }
                        onChange={(e) => {}}
                        disabled={true}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        value={user?.identification}
                        disabled={!isEditing}
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager">Manager</Label>
                      <Input
                        id="manager"
                        value={
                          user?.requests &&
                          user?.requests[0]?.recruitment.recruiter.name
                        }
                        onChange={(e) => {}}
                        disabled={true}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Curriculum/Resume Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Curriculum Vitae / Resume
                  </CardTitle>
                  <CardDescription>
                    Upload and manage your CV or resume document
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user?.curriculum ? (
                    <div className="space-y-4">
                      {/* Current CV Display */}
                      <div className="border rounded-lg p-4 bg-accent/50">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">
                                Curriculum
                              </h4>
                              {/*Implement this on the backend*/}
                              {/* <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                <div className="flex items-center space-x-1">
                                  <CalendarDays className="h-4 w-4" />
                                  <span>Uploaded: {new Date(user.curriculum.uploadDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <FileText className="h-4 w-4" />
                                  <span>Size: {user.curriculum.fileSize}</span>
                                </div>
                              </div> */}
                              <div className="mt-3">
                                <Badge
                                  variant="outline"
                                  className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                >
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  Current CV
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => user.curriculum && setSelectedCV({ url: user.curriculum, name: user.name })}
                              title="View CV"
                            >
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {}}
                              title="Download CV"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Upload New CV */}
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                        <div className="text-center">
                          <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-4" />
                          <h4 className="font-medium mb-2">Upload New CV</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Replace your current CV with a new version
                          </p>
                          <div className="flex justify-center">
                            <Button variant="outline" disabled={uploadingCV}>
                              <label className="cursor-pointer flex items-center">
                                {uploadingCV ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"></div>
                                    Uploading...
                                  </>
                                ) : (
                                  <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Choose New File
                                  </>
                                )}
                                <input
                                  type="file"
                                  accept=".pdf"
                                  onChange={handleCVUpload}
                                  className="hidden"
                                  disabled={uploadingCV}
                                />
                              </label>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* No CV Uploaded State */
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
                      <div className="text-center">
                        <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h4 className="font-medium mb-2">No CV Uploaded</h4>
                        <p className="text-sm text-muted-foreground mb-6">
                          Upload your curriculum vitae or resume to complete
                          your profile
                        </p>
                        <Button disabled={uploadingCV}>
                          <label className="cursor-pointer flex items-center">
                            {uploadingCV ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="mr-2 h-4 w-4" />
                                Upload CV
                              </>
                            )}
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={handleCVUpload}
                              className="hidden"
                              disabled={uploadingCV}
                            />
                          </label>
                        </Button>
                        <p className="text-xs text-muted-foreground mt-2">
                          PDF files only, max 10MB
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="mr-2 h-5 w-5" />
                    Skills
                  </CardTitle>
                  <CardDescription>
                    Manage your professional skills and expertise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Selected Skills Display */}
                  {selectedSkills && selectedSkills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedSkills.map((skill) => (
                        <Badge
                          key={skill.uuid}
                          variant="secondary"
                          className="px-3 py-1"
                        >
                          {skill.name}
                          <button
                            onClick={() => removeSkill(skill.uuid)}
                            className="ml-2 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Skills Multi-Select */}
                  <Popover open={skillsOpen} onOpenChange={setSkillsOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={skillsOpen}
                        className="w-full justify-between"
                      >
                        Add skills...
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="Search skills..." />
                        <CommandList>
                          <CommandEmpty>No skills found.</CommandEmpty>
                          <CommandGroup>
                            {filteredSkills &&
                              filteredSkills.map((skill) => (
                                <CommandItem
                                  key={skill.uuid}
                                  value={skill.uuid}
                                  onSelect={() => {
                                    toggleSkill({
                                      uuid: skill.uuid,
                                      name: skill.name,
                                    });
                                    console.log(skill);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      selectedSkills.some(
                                        (s) => s.uuid === skill.uuid
                                      )
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {skill.name}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </CardContent>
              </Card>

              {/* Enhanced Education & Certifications Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5" />
                    Education & Certifications
                  </CardTitle>
                  <CardDescription>
                    Manage your educational background and professional
                    certifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Education Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium flex items-center">
                        <GraduationCap className="mr-2 h-4 w-4" />
                        Education
                      </h4>
                      <Dialog
                        open={isEducationDialogOpen}
                        onOpenChange={setIsEducationDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEducationDialog()}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Education
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                          <DialogHeader>
                            <DialogTitle>
                              {editingEducation
                                ? "Edit Education"
                                : "Add Education"}
                            </DialogTitle>
                            <DialogDescription>
                              Add your educational background and
                              qualifications.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="degree">Degree/Program</Label>
                              <Input
                                id="degree"
                                value={educationForm.degree || ""}
                                onChange={(e) =>
                                  setEducationForm({
                                    ...educationForm,
                                    degree: e.target.value,
                                  })
                                }
                                placeholder="e.g., Bachelor of Science in Computer Science"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="institution">Institution</Label>
                              <Input
                                id="institution"
                                value={educationForm.institution || ""}
                                onChange={(e) =>
                                  setEducationForm({
                                    ...educationForm,
                                    institution: e.target.value,
                                  })
                                }
                                placeholder="e.g., Stanford University"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="year">Graduation Year</Label>
                                <Input
                                  id="year"
                                  value={educationForm.year || ""}
                                  onChange={(e) =>
                                    setEducationForm({
                                      ...educationForm,
                                      year: e.target.value,
                                    })
                                  }
                                  placeholder="2023"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="gpa">GPA (Optional)</Label>
                                <Input
                                  id="gpa"
                                  value={educationForm.gpa || ""}
                                  onChange={(e) =>
                                    setEducationForm({
                                      ...educationForm,
                                      gpa: e.target.value,
                                    })
                                  }
                                  placeholder="3.8"
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="description">
                                Description (Optional)
                              </Label>
                              <Textarea
                                id="description"
                                value={educationForm.description || ""}
                                onChange={(
                                  e: ChangeEvent<HTMLTextAreaElement>
                                ) =>
                                  setEducationForm({
                                    ...educationForm,
                                    description: e.target.value,
                                  })
                                }
                                placeholder="Relevant coursework, achievements, or focus areas..."
                                className="min-h-[80px]"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() => setIsEducationDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={saveEducation}>
                              {editingEducation ? "Update" : "Add"} Education
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="space-y-4">
                      {user?.educations &&
                        user.educations.map((edu) => (
                          <div
                            key={edu.uuid}
                            className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-start space-x-3">
                                  <div className="p-2 bg-primary/10 rounded-lg">
                                    <GraduationCap className="h-4 w-4 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-lg">
                                      {edu.title}
                                    </h5>
                                    <div className="flex items-center space-x-2 text-muted-foreground mt-1">
                                      <Building className="h-4 w-4" />
                                      <span>{edu.institution.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                      <div className="flex items-center space-x-1">
                                        <CalendarDays className="h-4 w-4" />
                                        <span>
                                          {edu.start_date?.getFullYear()}
                                        </span>
                                      </div>
                                      {edu.grade && (
                                        <div className="flex items-center space-x-1">
                                          <Award className="h-4 w-4" />
                                          <span>Grade: {edu.grade}</span>
                                        </div>
                                      )}
                                    </div>
                                    {edu.description && (
                                      <p className="text-sm text-muted-foreground mt-2">
                                        {edu.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {}}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {}}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}

                      {user?.educations && user?.educations.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">
                          <GraduationCap className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>No education records added yet.</p>
                          <p className="text-sm">
                            Click "Add Education" to get started.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Certifications Section */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium flex items-center">
                        <Award className="mr-2 h-4 w-4" />
                        Certifications
                      </h4>
                      <Dialog
                        open={isCertificationDialogOpen}
                        onOpenChange={setIsCertificationDialogOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openCertificationDialog()}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Certification
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[525px]">
                          <DialogHeader>
                            <DialogTitle>
                              {editingCertification
                                ? "Edit Certification"
                                : "Add Certification"}
                            </DialogTitle>
                            <DialogDescription>
                              Add your professional certifications and
                              credentials.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="certName">
                                Certification Name
                              </Label>
                              <Input
                                id="certName"
                                value={certificationForm.name || ""}
                                onChange={(e) =>
                                  setCertificationForm({
                                    ...certificationForm,
                                    name: e.target.value,
                                  })
                                }
                                placeholder="e.g., AWS Certified Solutions Architect"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="issuer">
                                Issuing Organization
                              </Label>
                              <Input
                                id="issuer"
                                value={certificationForm.issuer || ""}
                                onChange={(e) =>
                                  setCertificationForm({
                                    ...certificationForm,
                                    issuer: e.target.value,
                                  })
                                }
                                placeholder="e.g., Amazon Web Services"
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="issueDate">Issue Date</Label>
                                <Input
                                  id="issueDate"
                                  type="date"
                                  value={certificationForm.issueDate || ""}
                                  onChange={(e) =>
                                    setCertificationForm({
                                      ...certificationForm,
                                      issueDate: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="expiryDate">
                                  Expiry Date (Optional)
                                </Label>
                                <Input
                                  id="expiryDate"
                                  type="date"
                                  value={certificationForm.expiryDate || ""}
                                  onChange={(e) =>
                                    setCertificationForm({
                                      ...certificationForm,
                                      expiryDate: e.target.value,
                                    })
                                  }
                                />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="credentialId">
                                Credential ID (Optional)
                              </Label>
                              <Input
                                id="credentialId"
                                value={certificationForm.credentialId || ""}
                                onChange={(e) =>
                                  setCertificationForm({
                                    ...certificationForm,
                                    credentialId: e.target.value,
                                  })
                                }
                                placeholder="e.g., AWS-SAA-2023-001"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="certDescription">
                                Description (Optional)
                              </Label>
                              <Textarea
                                id="certDescription"
                                value={certificationForm.description || ""}
                                onChange={(e) =>
                                  setCertificationForm({
                                    ...certificationForm,
                                    description: e.target.value,
                                  })
                                }
                                placeholder="Brief description of the certification..."
                                className="min-h-[80px]"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button
                              variant="outline"
                              onClick={() =>
                                setIsCertificationDialogOpen(false)
                              }
                            >
                              Cancel
                            </Button>
                            <Button onClick={saveCertification}>
                              {editingCertification ? "Update" : "Add"}{" "}
                              Certification
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <div className="space-y-4">
                      {user?.certifications &&
                        user?.certifications.map((cert) => (
                          <div
                            key={cert.uuid}
                            className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-start space-x-3">
                                  <div className="p-2 bg-primary/10 rounded-lg">
                                    <Award className="h-4 w-4 text-primary" />
                                  </div>
                                  <div className="flex-1">
                                    <h5 className="font-semibold text-lg">
                                      {cert.name}
                                    </h5>
                                    <div className="flex items-center space-x-2 text-muted-foreground mt-1">
                                      <Building className="h-4 w-4" />
                                      <span>{cert.institution.name}</span>
                                    </div>
                                    <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                      {cert.expedition_date && (
                                        <div className="flex items-center space-x-1">
                                          <CalendarDays className="h-4 w-4" />
                                          <span>
                                            Issued:{" "}
                                            {new Date(
                                              cert.expedition_date
                                            ).toLocaleDateString()}
                                          </span>
                                        </div>
                                      )}
                                      {cert.expiration_date && (
                                        <div className="flex items-center space-x-1">
                                          <CalendarDays className="h-4 w-4" />
                                          <span>
                                            Expires:{" "}
                                            {new Date(
                                              cert.expiration_date
                                            ).toLocaleDateString()}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                    {cert.credential_id && (
                                      <div className="mt-2">
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          ID: {cert.credential_id}
                                        </Badge>
                                      </div>
                                    )}
                                    {cert.description && (
                                      <p className="text-sm text-muted-foreground mt-2">
                                        {cert.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {}}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => {}}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}

                      {user?.certifications &&
                        user?.certifications.length === 0 && (
                          <div className="text-center py-8 text-muted-foreground">
                            <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p>No certifications added yet.</p>
                            <p className="text-sm">
                              Click "Add Certification" to get started.
                            </p>
                          </div>
                        )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5" />
                    Password & Security
                  </CardTitle>
                  <CardDescription>
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="current-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
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
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">
                      Confirm New Password
                    </Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                    />
                  </div>
                  <Button>Update Password</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive verification codes via SMS
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Authenticator App</h4>
                      <p className="text-sm text-muted-foreground">
                        Use an authenticator app for verification
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Bell className="mr-2 h-5 w-5" />
                    Notifications
                  </CardTitle>
                  <CardDescription>
                    Configure how you receive notifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive updates via email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Push Notifications</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications in your browser
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Weekly Reports</h4>
                      <p className="text-sm text-muted-foreground">
                        Get weekly activity summaries
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5" />
                    Display Preferences
                  </CardTitle>
                  <CardDescription>
                    Customize your interface preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Español</SelectItem>
                        <SelectItem value="fr">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="america/mexico_city">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="america/mexico_city">
                          America/Mexico City
                        </SelectItem>
                        <SelectItem value="america/new_york">
                          America/New York
                        </SelectItem>
                        <SelectItem value="europe/london">
                          Europe/London
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Dark Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        Use dark theme interface
                      </p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {selectedCV && (
        <PdfViewerModal
          open={!!selectedCV}
          onOpenChange={(open) => !open && setSelectedCV(null)}
          pdfUrl={selectedCV.url}
          candidateName={selectedCV.name}
        />
      )}
    </main>
  );
}
