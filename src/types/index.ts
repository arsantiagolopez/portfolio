export interface Project {
  name: string;
  alt: string;
  href: string;
}

export interface DetailedProject {
  id: number;
  name: string;
  label: string;
  height: string;
  href: string;
  github: string;
  description: string;
  frontend: string[];
  backend: string[];
  devops: string[];
}

export interface Tech {
  name: string;
  label: string;
  width: number;
}
