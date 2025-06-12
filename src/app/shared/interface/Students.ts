export interface Student {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    course: "angular" | "react" | "vue";
}