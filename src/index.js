import "reflect-metadata";
import express from "express";
import { DataSource } from "typeorm";

import { Course } from "./domain/Course.js";
import { CourseSchema } from "./infrastructure/orm/CourseSchema.js";

import { TypeORMCourseRepository } from "./infrastructure/repositories/TypeORMCourseRepository.js";
import { RegisterStudentToCourse } from "./application/use-cases/RegisterStudentToCourse.js";
import { StudentController } from "./interface/StudentController.js";

const app = express();
app.use(express.json());

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",     
    port: 5432,            
    username: "postgres",  
    password: "root", 
    database: "student_db",    
    synchronize: true,     
    logging: false,
    entities: [CourseSchema],
});

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source (PostgreSQL) has been initialized!");

        const courseRepository = new TypeORMCourseRepository(AppDataSource);
        
        const registerUseCase = new RegisterStudentToCourse(courseRepository);
        
        const studentController = new StudentController(registerUseCase);

        const repo = AppDataSource.getRepository(Course);
        const count = await repo.count();
        if (count === 0) {
            await repo.save(new Course(null, "test", 5, 0));
            console.log("Seed: Initial course created in PostgreSQL");
        }

        app.post("/register", (req, res) => studentController.handleRegistration(req, res));
        
        app.get("/courses", async (req, res) => {
            const allCourses = await repo.find();
            res.json(allCourses);
        });

        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        })
        .catch((error) => {
        console.error("Error during PostgreSQL initialization:", error);
        process.exit(1); 
    });