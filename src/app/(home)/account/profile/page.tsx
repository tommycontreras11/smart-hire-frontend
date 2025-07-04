"use client";

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
import { useGetOneCandidate } from "@/hooks/api/candidate.hook";
import { useUpdateCandidate } from "@/mutations/api/candidates";
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
  Edit,
  Edit3,
  Eye,
  EyeOff,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Plus,
  Save,
  Settings,
  Shield,
  Trash2,
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

  const { data: user } = useGetOneCandidate(userAuth?.uuid || '');

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
      identification: "",
      email: "",
      name: "",
      password: "",
      phone: "",
      location: "",
      desired_salary: "",
      social_links: [],
      competencyUUIDs: [],
    },
  });

  const { mutate: updateCandidate } = useUpdateCandidate(() => {});

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log("Saving user data:", user);
  };

  const addSkill = () => {};

  const removeSkill = (skillToRemove: string) => {};

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
              <Button onClick={handleSave}>
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
                <AvatarImage src={user?.avatar || ""} alt={user?.name} />
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
              <p className="text-lg text-muted-foreground">{user?.desiredPosition.name}</p>
              <Badge variant="outline" className="bg-primary/10">
                {user?.department?.name}
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
                  Started {new Date(user.startDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Manager</h4>
              <p className="text-sm text-muted-foreground">{user.manager}</p>
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
                        value={user.name}
                        onChange={(e) =>
                          setUser({ ...user, name: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                          setUser({ ...user, email: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        value={user.phone}
                        onChange={(e) =>
                          setUser({ ...user, phone: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={user.location}
                        onChange={(e) =>
                          setUser({ ...user, location: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={user.bio}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                        setUser({ ...user, bio: e.target.value })
                      }
                      disabled={!isEditing}
                      className="min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Social Links</CardTitle>
                  <CardDescription>
                    Add your professional social media profiles
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      value={user.socialLinks.linkedin}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          socialLinks: {
                            ...user.socialLinks,
                            linkedin: e.target.value,
                          },
                        })
                      }
                      disabled={!isEditing}
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio</Label>
                    <Input
                      id="portfolio"
                      value={user.socialLinks.portfolio}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          socialLinks: {
                            ...user.socialLinks,
                            portfolio: e.target.value,
                          },
                        })
                      }
                      disabled={!isEditing}
                      placeholder="https://yourportfolio.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                      id="github"
                      value={user.socialLinks.github}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          socialLinks: {
                            ...user.socialLinks,
                            github: e.target.value,
                          },
                        })
                      }
                      disabled={!isEditing}
                      placeholder="https://github.com/yourusername"
                    />
                  </div>
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
                        value={user.title}
                        onChange={(e) =>
                          setUser({ ...user, title: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Select
                        value={user.department}
                        onValueChange={(value) =>
                          setUser({ ...user, department: value })
                        }
                        disabled={!isEditing}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="Engineering">
                            Engineering
                          </SelectItem>
                          <SelectItem value="Product">Product</SelectItem>
                          <SelectItem value="Marketing">Marketing</SelectItem>
                          <SelectItem value="Sales">Sales</SelectItem>
                          <SelectItem value="HR">Human Resources</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="employeeId">Employee ID</Label>
                      <Input
                        id="employeeId"
                        value={user.employeeId}
                        disabled
                        className="bg-muted"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="manager">Manager</Label>
                      <Input
                        id="manager"
                        value={user.manager}
                        onChange={(e) =>
                          setUser({ ...user, manager: e.target.value })
                        }
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
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
                <CardContent>
                  <div className="space-y-4">
                    {isEditing && (
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Add a new skill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === "Enter" && addSkill()}
                        />
                        <Button onClick={addSkill} size="icon">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {user.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-sm"
                        >
                          {skill}
                          {isEditing && (
                            <button
                              onClick={() => removeSkill(skill)}
                              className="ml-2 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
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
                      {user.education.map((edu) => (
                        <div
                          key={edu.id}
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
                                    {edu.degree}
                                  </h5>
                                  <div className="flex items-center space-x-2 text-muted-foreground mt-1">
                                    <Building className="h-4 w-4" />
                                    <span>{edu.institution}</span>
                                  </div>
                                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                    <div className="flex items-center space-x-1">
                                      <CalendarDays className="h-4 w-4" />
                                      <span>{edu.year}</span>
                                    </div>
                                    {edu.gpa && (
                                      <div className="flex items-center space-x-1">
                                        <Award className="h-4 w-4" />
                                        <span>GPA: {edu.gpa}</span>
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
                                onClick={() => openEducationDialog(edu)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteEducation(edu.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {user.education.length === 0 && (
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
                      {user.certifications.map((cert) => (
                        <div
                          key={cert.id}
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
                                    <span>{cert.issuer}</span>
                                  </div>
                                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                                    <div className="flex items-center space-x-1">
                                      <CalendarDays className="h-4 w-4" />
                                      <span>
                                        Issued:{" "}
                                        {new Date(
                                          cert.issueDate
                                        ).toLocaleDateString()}
                                      </span>
                                    </div>
                                    {cert.expiryDate && (
                                      <div className="flex items-center space-x-1">
                                        <CalendarDays className="h-4 w-4" />
                                        <span>
                                          Expires:{" "}
                                          {new Date(
                                            cert.expiryDate
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  {cert.credentialId && (
                                    <div className="mt-2">
                                      <Badge
                                        variant="outline"
                                        className="text-xs"
                                      >
                                        ID: {cert.credentialId}
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
                                onClick={() => openCertificationDialog(cert)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteCertification(cert.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {user.certifications.length === 0 && (
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
    </main>
  );
}
