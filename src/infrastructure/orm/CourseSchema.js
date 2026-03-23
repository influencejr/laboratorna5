import { EntitySchema } from "typeorm";
import { Course } from "../../domain/Course.js";

export const CourseSchema = new EntitySchema({
    name: "Course",
    target: Course,
    columns: {
        id: { primary: true, type: "int", generated: true },
        title: { type: "varchar" },
        capacity: { type: "int" },
        enrolledCount: { type: "int" }
    }
});