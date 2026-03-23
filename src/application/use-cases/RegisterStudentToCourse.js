export class RegisterStudentToCourse {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }

    async execute(courseId, studentId) {
        const course = await this.courseRepository.getById(courseId);
        if (!course) throw new Error("Course not found");

        course.incrementEnrollment();

        await this.courseRepository.save(course);
        
        return { success: true, message: `Student ${studentId} registered to ${course.title}` };
    }
}