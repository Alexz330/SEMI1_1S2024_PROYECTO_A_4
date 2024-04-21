export interface Publication {
    id: string;
    content: string;
    photoUrl: string;
    authorId: string;
    created_at: string;
    author: Author;
}
  
export interface Publications {
    publications: Publication[];
  }
interface Photo {
    id: string;
    userId: string;
  }
  
  interface Author {
    id: string;
    name: string;
    lastname: string;
    username: string;
    password: string;
    email: string;
    isActive: boolean;
    created_at: string;
    updated_at: string;
    photos: Photo[];
  }
  
