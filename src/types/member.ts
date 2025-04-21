export interface Member {
  _id?: string;
  name: string;
  role: string;
  department: string;
  year: string;
  skills: string[];
  image: string;
  github?: string;
  linkedin?: string;
  featured: boolean;
}

export interface MemberFormData extends Omit<Member, '_id'> {}

export interface MemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (memberData: MemberFormData) => Promise<void>;
  member?: Member;
} 