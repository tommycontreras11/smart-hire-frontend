import { PlatformTypeEnum } from "@/enums/social-link.enum";

export interface ISocialLink {
  uuid: string;
  url: string;
  type: PlatformTypeEnum;
}