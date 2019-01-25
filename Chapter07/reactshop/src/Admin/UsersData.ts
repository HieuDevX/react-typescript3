export interface IUser {
  id: number;
  name: string;
  isAdmin: boolean;
}

export const adminUsersData: IUser[] = [
  { id: 1, name: "Hieu", isAdmin: true },
  { id: 2, name: "Nghia", isAdmin: false },
  { id: 3, name: "Chien", isAdmin: false }
];
