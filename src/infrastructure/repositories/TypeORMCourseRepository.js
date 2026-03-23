import { Course } from "../../domain/Course.js";

export class TypeORMCourseRepository {
    constructor(dataSource) {
        this.repository = dataSource.getRepository(Course);
    }

    async getById(id) {
        return await this.repository.findOneBy({ id });
    }

    async save(course) {
        await this.repository.save(course);
    }
}