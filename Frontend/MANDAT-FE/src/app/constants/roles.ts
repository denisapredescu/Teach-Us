export class Roles {
  public Student: string = "student";
  public Mentor: string = "mentor";
  public Admin: string = "admin";

  public isStudent(role: string| null): boolean {
    return role === this.Student;
  }

  public isMentor(role: string | null): boolean {
    return role === this.Mentor;
  }

  public isAdmin(role: string | null): boolean {
    return role === this.Admin;
  }
}

export const RoleToBoolean = new Map<string, boolean>([
  ["mentor", true],
  ["student", false],
]);
